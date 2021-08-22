// configureRobot.js

const TradovateSocket = require('../socket/TradovateSocket.cjs');
const MarketDataSocket = require('../socket/MarketDataSocket.cjs');
const { getAvailableAccounts } = require('./storage.cjs');
const getJSON = require('./getJSON.cjs');
const { URLs } = require('./enum.cjs');
const { 
	symbol, 
	maxIndex,
	maxMilliseconds, 
	minMilliseconds,
	minAllowedTradingTime,
	maxAllowedTradingTime,
	morningTime,
	elementSize, 
	asMuchAsElements, 
	decisionInterval,
	overtradingHalfLife,
	warmup,
	getBars, 
	getVolumes,
	getTicks, 
	getDOMs, 
	getHistograms, 
	getQuotes, 
	maxPosition 
} = require('../env.cjs');


module.exports = async function(Strategy, { env, startTimestamp, allowOrders }) {
    
	console.log(allowOrders);
	
	// Grab the URLs from the `env` field
	let wss = URLs?.[env]?.wss;
	let mds = URLs?.[env]?.mds;

	// Connect to Tradovate, account, and order socket
	console.log(`Connecting to ${wss} ${env} ${startTimestamp}`);
	const socket = new TradovateSocket({ url: wss, startTimestamp });
	await socket.connect();
	
	// Connect to market data socket
	console.log(`Connecting to ${mds} environment`);
	const mdsocket = new MarketDataSocket({ url: mds });
	await mdsocket.connect();
	
	// Grab our initial `contract` which contains the `providerTickSize` and `contractMaturityId`
	let contract = await socket.contract.contractItem({query:{id: symbol}});
	let { providerTickSize, contractMaturityId } = contract || {};

	// Grab the `contractMaturity`, which contains a `productId`
	let contractMaturity = await socket.contractMaturity.contractMaturityItem({query:{id: contractMaturityId}});
	let { productId } = contractMaturity;

	// Grab the `product` and use it to grab the `productSession`
	// Inject a custom `morningTime` field to indicate the day trading session start, since `productSession` is 23/5 rather than 17/6/5
	let product = await socket.product.productItem({query:{id: productId}});
	let productSession = await socket.productSession.productSessionItem({query:{id: productId}});
	productSession.morningTime = morningTime;

	// Initialize !!! each !!! strategy independently
	// Strategies should independently manage orders, state, etc.
	const { id, name } = getAvailableAccounts()[0];
	let strategy = new Strategy({
		socket, 
		symbol, 
		accountId: id, 
		accountSpec: name,
		warmup: warmup ? Date.now() + warmup : Date.now(),
		maxIndex,
		maxMilliseconds,
		minMilliseconds,
		minAllowedTradingTime,
		maxAllowedTradingTime,
		overtradingHalfLife,
		decisionInterval,
		providerTickSize,
		productSession,
		maxPosition,
		allowOrders,
		log: false
	});

	/**
	 * Set up the Tradovate Socket Event-Driven Listener
	 * STANDARD, DO NOT EDIT
	 */
	socket.ws.addEventListener('message', (msg) => {
		getJSON(msg)?.forEach?.(data => {
			let details = data?.d;
			let payload = typeof details === 'object' ? details : JSON.parse(details); // data?.d;
			let event = payload && (
				('users' in payload) ? 'usersync' :
				(data?.e === 'props') ? 'props' : 
				undefined);
			
			if (data?.e === 'clock') strategy.state.clock = {
				current: Date.now(),
				replay: new Date(payload.t).getTime()
			}
		
			// Inject the received state back into the counter
			if (data?.i) strategy.state.socket.counter.received = data?.i;

			event && payload && strategy.next({state: strategy.state, event, payload});
		})
	});

	/**
	 * Set up the Market Data Event-Driven Listener
	 * STANDARD, DO NOT EDIT
	 */
	mdsocket.ws.addEventListener('message', (msg) => {
		getJSON(msg)?.forEach?.(data => {
			let details = data?.d;
			let payload = typeof details === 'object' ? details : JSON.parse(details); // data?.d;
			let event = payload && (
				('doms' in payload) ? 'doms' :
				('histograms' in payload) ? 'histograms' :
				('quotes' in payload) ? 'quotes' :
				('charts' in payload) ? 'charts' : 
				undefined);

			if (data?.e === 'clock') strategy.state.clock = {
				current: Date.now(),
				replay: new Date(payload.t).getTime()
			}

			event && payload && strategy.next({state: strategy.state, event, payload});
		})
	});

	/**
	 * Kickstart the user syncRequest and market data subscriptions for the ONE chosen contract
	 * syncRequest, subscribeQuote, subscribeDOM, subscribeHistogram are standard
	 * getChart parameters can be edited
	 */
	await socket.user.syncRequest({ body: { users: [getAvailableAccounts()[0].userId] } });
	getQuotes && await mdsocket.md.subscribeQuote({body:{symbol}});
	getDOMs && await mdsocket.md.subscribeDOM({body:{symbol}});
	getHistograms && await mdsocket.md.subscribeHistogram({body:{symbol}});

	if (getVolumes) {
		
		strategy.state.volumeSubscription = await mdsocket.md.getChart({body:{
			symbol,
			chartDescription: {
				underlyingType: 'Tick',
				elementSize,
				elementSizeUnit: 'Volume',
				withHistogram: false
			},
			timeRange: {
				asMuchAsElements
			}
		}});

		// Inject a helper field
		strategy.state.volumeSubscription.elementSize = elementSize;

	}

	if (getTicks) {
		strategy.state.tickSubscription = await mdsocket.md.getChart({body:{
			symbol,
			chartDescription: {
				underlyingType: 'Tick',
				elementSize,
				elementSizeUnit: 'UnderlyingUnits',
				withHistogram: false
			},
			timeRange: {
				asMuchAsElements
			}
		}});

		// Inject a helper field
		strategy.state.tickSubscription.elementSize = elementSize;
	}

	if (getBars) {
		strategy.state.barSubscription = await mdsocket.md.getChart({body:{
			symbol,
			chartDescription: {
				underlyingType: 'MinuteBar',
				elementSize,
				elementSizeUnit: 'UnderlyingUnits',
				withHistogram: false
			},
			timeRange: {
				asMuchAsElements
			}
		}});

		// Inject a helper field
		strategy.state.barSubscription.elementSize = elementSize;
	}
	
}