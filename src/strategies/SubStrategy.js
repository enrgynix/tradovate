// SubStrategy.js
// Write your own custom definition here

// jStat and simple-statistics are two useful modules for some statistical efforts and regressions, if that is a part of your strategy.
// jStat is mainly used for abstracting certain array functions, e.g., min() and max()
const jStat = require('jStat');
// https://simplestatistics.org/docs/#linearregression
const ss = require('simple-statistics');
const StDev = ss.standardDeviation;

const { latestTimestamp, NaNZero, round, red, magenta } = require('../utils/helpers.js');

const Strategy = require('./Strategy.js');
const { decisionInterval } = require('../env.js');

/**
 * @class SubStrategy
 * @description General template for a strategy, helper functions are abstracted
 * @param {Object} params
 * @param {Object} socket Tradovate WebSocket class
 * @param {Integer} symbol Fixed symbol for trading against
 */
class SubStrategy extends Strategy {
	constructor(...args) {
		super(...args);
	}

	async next(...args) {
		super.next(...args);
	}

	alpha(...args) {
		super.alpha(...args);

		let { quotes, ticks, bars, volumes, histograms, providerTickSize, productSession, maxMilliseconds, fills, warmup, overtradingHalfLife } = this.state;
		let { bidPrice, askPrice, midPrice, tradePrice, openingPrice } = quotes[quotes.length - 1] || {}

		// Estimate the relative position from high watermark (in ticks) 
		let lastPrice = tradePrice || midPrice || openingPrice;
	
		

		/** 
		 * Given the sigma, we can estimate a positional Z-score
		 * Fundamentally, due to hedging activity, the `averagePrice` is the important one as price
		 * will tend back towards it. The opening price only matters if we are ranging (i.e.,
		 * fundamental news), so we don't need to consider the z-score relative to the `openingPrice`.
		 */ 

		// Assess the histogram
		let prices = Object.values(histograms).map(({price}) => price);
		let histVolumes = Object.values(histograms).map(({volume}) => volume);
		let totalVolume = jStat.sum(histVolumes);

		// Estimate the average price based on the histogram
		let averagePrice = jStat.sum(
			Object.values(histograms).map(({price, volume}) => price * volume)
		) / totalVolume;

		let minPrice = jStat.min(prices);
		let maxPrice = jStat.max(prices);
		let medianPrice = jStat.median(prices);

		// Estimate sigma from histogram on the basis of full width half maximum
		// FWHM = 2.36sigma in a normal distribution
		// https://math.stackexchange.com/questions/2437742/estimating-the-standard-deviation-by-simply-looking-at-a-histogram
		let fullMax = jStat.max(histVolumes);
		let halfMax = fullMax / 2.0;
		let sortedHistogram = Object.entries(histograms).sort((a,b) => a[0] - b[0]);
		let leftTail = sortedHistogram.find(x=>x[1].volume > halfMax)?.[1].price;
		let rightTail = sortedHistogram.reverse().find(x=>x[1].volume > halfMax)?.[1].price;
		let fwhmSigma = Math.abs( (rightTail - leftTail) / 2.36 );

		// Alternate sigma approach: pure standard deviation from histogram
		let standardSigma = Math.sqrt(
			jStat.sum(Object.values(histograms).map(({price, volume}) => Math.pow((price - averagePrice), 2) * volume)) 
			/ 
			jStat.sum(histVolumes)
		);

		// The sigmas are bound to conflict, so, take the average of the two to reflect the value of both of their information
		// The sigmas are in units of points
		let sigma = (fwhmSigma + standardSigma) / 2.0;
		let skew = jStat.sum(Object.values(histograms).map(({price, volume}) => Math.pow((price - averagePrice), 3) * volume)) / ((totalVolume - 1)* Math.pow(sigma, 3));
		let skewCorrected = Math.sign(skew) * Math.pow(Math.abs(skew), (1/3));
		let zScore = (lastPrice - averagePrice) / sigma;
		let zScoreCorrected = zScore - skewCorrected;

		let zScoreBias = NaNZero(
			Math.max(1, Math.log(Math.abs(zScoreCorrected) + 1) + 1),
			1
		);

		/**
		 * TODO
		 * Estimate the volume per trading time, notionally in minutes, per the maxMilliseconds parameter
		 * Estimate the session time smile, which trends from 1 at market open, to 0.5 at midday, to 1 at market close.
		 * To accomplish this, we take `t` to be the elapsed session, and `Tau/2` to be half the session length
		 */
		let currentTime = this.timestamp(); // (clock && (clock.replay + (Date.now() - clock.current))) || Date.now();
		let sessionStart = (new Date(currentTime)).setHours(productSession.morningTime.hour,productSession.morningTime.minute,0,0);
		let sessionEnd = (new Date(currentTime)).setHours(productSession.stopTime.hour,productSession.stopTime.minute,0,0);
		let sessionTotal = sessionEnd - sessionStart;
		let elapsedSession = (currentTime - sessionStart);

		let sessionSmile = 2 * Math.pow((elapsedSession / sessionTotal - 0.5), 2) + 0.5;
		let sessionDecay = Math.exp( -(Math.log(2) * (elapsedSession / sessionTotal)) );


		/**
		 * Estimate the Hawkes process for market orders on both sides, both time and index-based
		 * The Hawkes self-excitation process gives us a heuristic for (immediate and recent) 
		 * market order impact, so we can update our assessment based on large orders occurring
		 * Because we take a sigmoid to transform the heavily decayed values to 0, and the
		 * overpowering values to 1, we get binary picture of the market impact
		 * 
		 * We use both time-based decay and index-based decay to get a rich estimate of the Hawkes
		 * values, averaging together for simplicity.
	 	 */ 

		// Hawkes exponent is intended to be positive for bid > ask impact, i.e. we end up with greater Hawkes bias / risk premium for selling action
		// Hawkes bias is strictly positive
		
		let tau = Math.abs( maxMilliseconds / Math.log(0.01) );
		let integral = tau * 0.99 / maxMilliseconds;
		
		let volumePerSession = totalVolume / elapsedSession;
		let volumePerInterval = volumePerSession * maxMilliseconds;
		let decayedVolumePerInterval = integral * volumePerInterval;

		let hawkes = this.hawkesProcess(volumes);
		let hawkesFactor = (hawkes.bid - hawkes.ask) / decayedVolumePerInterval;
		let hawkesBias =  NaNZero(
			Math.max(1, Math.log(hawkesFactor + 1) + 1),
			1
		);
		
		// Define the trend bias, which will help us set our entry and exit price relative to the current bid
		let naiveVolatility = bars?.length && StDev([...new Set(bars?.slice(-30)?.map(({close}) => close))]) || 0;
		let volatilityBias =  NaNZero(
			Math.max(1, Math.log(Math.abs(naiveVolatility) + 1) + 1),
			1
		);
		
		// Get a sigmoid structure to show that outlier percent 
		let absolutePosition = (lastPrice - openingPrice) / openingPrice * 100;
		let relativePosition = (lastPrice - averagePrice) / averagePrice * 100;
		let shapeFactor =  NaNZero(
			Math.max(Math.abs(absolutePosition / relativePosition), 1),
			1
		);

		let rangeBias = 1 / ( 1 + Math.exp(-(shapeFactor * absolutePosition)));
		let beta = rangeBias;

		// Get a gamma bias to shift our entry and exit down (perhaps with the exit being below the current ask) to counter the uncertainty 
		// could use volatility and the last known fill
		// NOTE: Gamma will fail in a market replay
		let lastFill = (new Date( 
			NaNZero(
				Math.max(
					warmup,
					latestTimestamp(fills)?.timestamp
				),
				warmup
			)
		)).getTime();
		let timeSince = this.timestamp() - lastFill;
		let overtradingTime = timeSince / decisionInterval;
		let halfLifeFactor = Math.log(2) / overtradingHalfLife;
		let gammaDecay =  Math.exp(-(overtradingTime * halfLifeFactor));
		let gamma = volatilityBias * gammaDecay;

		/**
		 * Define the risk-premium:
		 * The z-score (in units of sigma) can be gently coaxed into a semi-useful form 
		 * by taking ln(z+1), which gives a [0,+inf) nearly linear form. Because of the 
		 * size and value of the /ES, this nearly converts a Z-score into a sub-linear
		 * point target. We subtract the Hawkes process bias (which adds premium for a
		 * selling excitation process, and reduces premium in a buying excitation process)
		 * and bound the risk premium to a minimum of zero.
		 * 
		 * Notably, using the z-score as inferred by the histogram means that as the trading
		 * session progresses and the histogram evolves, we get a more realistic picture
		 * of market sentiment and the potential range (the sigma value should increase).
		 * The z-score tells us essentially a normalized position in range and by
		 * sub-linearizing it, we get a starting point for our risk premium that's still
		 * reasonably close to the bid. We take on more risk premium in highly volatile days,
		 * and on wide ranging days.
		 */

		// TODO add the time component vs. last update to position.
		
		// let S = sessionSmile;
		let T = sessionDecay;
		let Z = zScoreBias;
		let H = hawkesBias;
		let V = volatilityBias;
		let lambda = T * Z * H * V;

	
		let askBias = lambda * beta//  + gamma;
		let bidBias = lambda * (1 - beta)//  + gamma;


		// Return our `entryPrice` as the bid, less the `riskPremium`
		// Return our `exitPrice` as the bid plus one tick for good measure

		// 1 tick scalps
		// this.state.entryPrice = bidPrice - providerTickSize;
		// this.state.exitPrice = bidPrice;
		
		// Actual spread model
		this.state.entryPrice = round(bidPrice - bidBias - gamma, providerTickSize);
		this.state.exitPrice = round(askPrice + askBias - gamma, providerTickSize);
		
		// Undercut scalping model
		// this.state.entryPrice = round(bidPrice - bidBias, providerTickSize);
		// this.state.exitPrice = round(this.state.entryPrice + providerTickSize, providerTickSize);

		this.state.lambda = lambda;
		this.state.beta = beta;
		this.state.gamma = gamma;
		this.state.askBias = askBias;
		this.state.bidBias = bidBias;

		console.log(volumes.length);
		// console.log(`${volumes.length} ${sigma.toFixed(2)} ${green(this.state.entryPrice.toFixed(2))} <- ${bidBias.toFixed(2)} <- ${yellow(lastPrice.toFixed(2))} -> ${askBias.toFixed(2)} -> ${red(this.state.exitPrice.toFixed(2))} lambda${lambda.toFixed(2)} = T${T.toFixed(2)} x Z${Z.toFixed(2)} x (H${H.toFixed(2)} --> hA${hawkes.ask.toFixed(2)} hB${hawkes.bid.toFixed(2)}) x V${V.toFixed(2)} beta${beta.toFixed(2)} k${shapeFactor.toFixed(2)} gamma${gamma.toFixed(2)}`); // openingPrice);
		
	}

	async manageOrders(...args) {
		super.manageOrders(...args);
		// We call this simply to ensure it gets called, no more
	}

	async trimPosition(qty) {
		super.trimPosition(...arguments);
		// It really doesn't matter what happens. We absolutely do NOT want to be overleveraged. So, trim down to the max position or liquidate, and KILL.
		
		// Extract the required parameters for the liquidatePosition request
		let { accountSpec, accountId, symbol, allowOrders } = this.state;


		// Send a OSO order to limit buy to enter at the risk premium below bid, and limit sell to exit at the profit target over bid
		let request = {
			body: {
                accountId,
                contractId: symbol,
                admin: false
            }
		}
		
		// If we have a request built, prepare to send it
		if (allowOrders && request) {

			// Write a log for awareness
			this.pending = true;
			const data = await this.socket.order.liquidatePosition(request);
			console.log(red(`liquidatePosition ${JSON.stringify(data)}`));
			this.hesitations.liquidatePosition.push(data);
			this.pending = false;

			// Kill the strategy.
			this.killed = true;

		}
		
	}

	async workingNetPos(workingOrders) {
		super.workingNetPos(...arguments);
		// In this scenario, DO NOTHING
	}
    
    async workingNoPos(workingOrders=[]) {
		super.workingNoPos(...arguments);
		// If we've been waiting too long on the order and price information has changed, we need to modify it.
		
		// Unwrap some time-based state information
		let { decisionInterval, allowOrders, quotes, bidBias, orderVersions } = this.state;

		// Determine our number of intervals elapsed
		let maxTimestamp = jStat.max(workingOrders?.map(({timestamp}) => (new Date(timestamp)).getTime()));
		let currentTime = this.timestamp();
		let intervalsElapsed = Math.floor((currentTime - maxTimestamp) / decisionInterval);
		
		// Determine if we are outside our latest target range (i.e., the price is leaving us), but dont replace if we're getting closer.
		let { bidPrice, askPrice, midPrice, tradePrice, openingPrice } = quotes[quotes.length - 1] || {}
		let entryOrder = workingOrders?.find(({action})=>action==='Buy');
		let entryOrderVersions = orderVersions?.filter(({orderId}) => orderId === entryOrder?.id);
		let entryOrderVersion = entryOrderVersions?.[0];
		let entryPrice = entryOrderVersion?.price;
		let shouldReplace = Math.abs(bidPrice - entryPrice) > bidBias;

		// If we've passed a full interval (in terms of market state / information), then proceed to cancel orders
		if (allowOrders && intervalsElapsed >= 1 && shouldReplace) { // && Date.now() >= delays.workingNoPos) {
			
			// Iterate through our working orders to cancel them
			workingOrders.forEach(async ({id}) => {
			
				// Build a closing order request
				let request = {
					body: {
						orderId: id
					}
				}
				
				// Keep track of state via the `orderSingleton` and send `cancelOrder` requests
				// delays.workingNoPos = Date.now() + minMilliseconds;
				this.pending = true;
				const data = await this.socket.order.cancelOrder(request)
				console.log(magenta(`cancelOrder: ${JSON.stringify(data)}`));
				this.hesitations.cancelOrder.push(data); 
				this.pending = false; 

			})
		}

    }

    async inactiveNetPos(...args) {
		super.inactiveNetPos(...args);

		// Extract positions and account information from the `state`
		let { positions, providerTickSize, accountSpec, accountId, symbol, allowOrders } = this.state;
		
		// Find our current active position and grab the `netPos` and `netPrice` fields
		let { 
			netPos = undefined, 
			netPrice = undefined 
		} = positions.find(({contractId}) => contractId === symbol);
		
		// Assign a recovery price for a closing order to ensure profitable exit
		let price = round(netPrice / netPos + providerTickSize, providerTickSize)

		// Place a profitable closing order
		let request = netPos && netPrice && {
			body: {
				accountSpec, 
				accountId, 
				action: 'Sell',
				symbol, 
				orderQty: netPos, 
				orderType: 'Limit', 
				price,
				isAutomated: true
			}
		}

		// If we have a request built, prepare to send it
		if (allowOrders && request) { // && Date.now() >= delays.inactiveNetPos) {
			
			// Keep track of state via the `orderSingleton` and send the `placeOrder` request
			// delays.inactiveNetPos = Date.now() + minMilliseconds;
			this.pending = true; 
			const data = await this.socket.order.placeOrder(request);
			console.log(magenta(`placeOrder ${JSON.stringify(data)}`));
			this.hesitations?.placeOrder.push(data);
			this.pending = false;

		}
		
    }

	/**
	 * @function inactiveNoPos
	 * @description Overrides the parent `inactiveNoPos` method to submit a `placeOSO` order if one is not working or if we don't have any existing promise.
	 * @param  {...any} args Any arguments needed for the function, however, none should be necessary as everything is transmitted through `this.state`
	 */
	async inactiveNoPos(...args) {
		super.inactiveNoPos(...args);
		
		// Extract the alpha-defined `entryPrice` and `exitPrice` from the state
		let { accountSpec, accountId, symbol, entryPrice, exitPrice, allowOrders } = this.state;

		// Specify order parameters to be re-used on both the buy and sell side of the OSO bracket
		let orderQty = 1, orderType = 'Limit';

		// Send a OSO order to limit buy to enter at the risk premium below bid, and limit sell to exit at the profit target over bid
		let request = entryPrice && exitPrice && {
			body: {
                accountSpec,
                accountId,
                action: 'Buy',
                symbol,
                orderQty,
                orderType,
                price: entryPrice,
                isAutomated: true,
                bracket1: {
					action: 'Sell',
					orderType,
					price: exitPrice,
				}
            }
		}
		
		// If we have a request built, prepare to send it
		if (allowOrders && request) { // && Date.now() >= delays.inactiveNoPos) {

			// Write a log for awareness
			// delays.inactiveNoPos = Date.now() + minMilliseconds;
			this.pending = true;
			const data = await this.socket.order.placeOSO(request);
			console.log(magenta(`placeOSO ${JSON.stringify(data)}`));
			this.hesitations.placeOSO.push(data);
			this.pending = false;
			// 

		}
    }

	// Add any custom child class methods, namely to ensure they have access to `this`
	/**
	 * @function hawkesProcess
	 * @description Estimates a Hawkes self-exciting process intensity of buying and selling market order volume, based on the time history
	 * @param {Array} arr `state.bars` or `state.ticks` or `state.volumes` containing objects with `bidVolume`, `offerVolume`, and integer `timestamp` fields
	 * @returns {Object} { bid, ask }
	 */
	hawkesProcess(arr=[]) {

		let { maxMilliseconds } = this.state;
		
		let now = this.timestamp(); // (clock && (clock.replay + (Date.now() - clock.current))) || Date.now();

		// Build a tau shape factor, to decay the impact of information to ~1% after `maxMilliseconds`
		let tau = Math.abs( maxMilliseconds / Math.log(0.01) );
		
		// Reduce the array to perform the Hawkes process summation
		let res = arr?.reduce((acc, tick) => {

			// Extract the volume and timestamp
			let { bidVolume, offerVolume, timestamp } = tick;

			// Get the elapsed time (milliseconds)
			let milliSeconds = (now - timestamp);
			
			// Generate a decay factor
			let decay = Math.exp(-(milliSeconds/tau));
			
			// Accumulate the decay on the volume observed
			acc.ask += offerVolume * decay;
			acc.bid += bidVolume * decay;

			return acc;

		},{ ask: 0, bid: 0 }) || { ask: 0, bid: 0 };

		return res;
	
	}
}	

module.exports = SubStrategy;