const TradovateSocket = require("./TradovateSocket.cjs");
const getJSON = require('../utils/getJSON.cjs');

/**
 * Constructor for the MarketData Socket.
 */
class MarketDataSocket extends TradovateSocket {

	constructor(...args) {
		super(...args);
		this.subscriptions = [];
	}
	
	subscriptionListener(fn) {
		
		this.ws.addEventListener('message',msg=>{
			const results = getJSON(msg)
			if(!results) return      
			// if (results.find(isQuote || isDOM || isHistogram || isChart)) fn()
	
			results
				.filter(isQuote)                                //we only want Quote events
				.map(data => data.d.quotes)                     //transform our data into the quotes object
				.flat()                                         //its an array of arrays of quotes right now, so flatten
				.forEach(({entries,timestamp,id,contractId}) => { if (fn) fn({...entries,timestamp,id,contractId})})            //finally call the function
	
	
		})
	}
	
	onQuote(callback) {
		this.ws.addEventListener('message',msg=>{
			const results = getJSON(msg)
			if(!results) return      
			
			results
				.filter(isQuote)                                //we only want Quote events
				.map(data => data.d.quotes)                     //transform our data into the quotes object
				.flat()                                         //its an array of arrays of quotes right now, so flatten
				.forEach(({entries,timestamp,id,contractId}) => callback({...entries,timestamp,id,contractId}) ) 
		})
	}
	
	
	async subscribeQuote(symbol, fn) {
	
		const { subscriptionId } = await this.request({
			url: 'md/subscribeQuote',
			body: { symbol }
		})
	
		const subscriber = msg => {
			const results = getJSON(msg)
			if(!results) return      
	
			results
				.filter(isQuote)                                //we only want Quote events
				.map(data => data.d.quotes)                     //transform our data into the quotes object
				.flat()                                         //its an array of arrays of quotes right now, so flatten
				.filter(({id}) => id === subscriptionId)        //filter out subscriptions that aren't this one
				.forEach(({entries,timestamp,id,contractId}) => { if (fn) fn({...entries,timestamp,id,contractId})})            //finally call the function
	
		}
	
		//listen for events
		this.ws.addEventListener('message', subscriber)
	
		//return an unsubscribe function.
		const subscription = () => {
			this.ws.removeEventListener('message', subscriber)
			this.request({
				url: 'md/unsubscribeQuote',
				body: { symbol }
			})
		}
	
		this.subscriptions.push({ symbol, subscription })
		return subscription
	}
	
	unsubscribeAll() {
	
		this.subscriptions.map(sub => {
	
			const { symbol, subscription } = sub
	
			console.log(`Closing subscription to ${symbol}.`)
			subscription()
		
		})
	
		this.subscriptions = [];
	
	}
	
	unsubscribe(symbol) {
		const maybeSub = this.subscriptions.find(sub => sub.symbol === symbol)
		if(!maybeSub) return
	
		const { subscription } = maybeSub
	
		console.log(`Closing subscription to ${symbol}.`)
		this.subscriptions.splice(this.subscriptions.indexOf(maybeSub), 1)
		subscription()
	}
	
	
	async subscribeDOM(symbol, fn) {
		const { subscriptionId } = await this.request({
			url: 'md/subscribeDOM',
			body: { symbol }
		})   
	
		
		const subscriber = msg => {
			const results = getJSON(msg)
			if(!results) return
	
			results
				.filter(isDOM)
				.map(data => data.d.doms)
				.flat()
				.filter(({contractId}) => subscriptionId === contractId)
				.forEach(dom => fn(dom))
		}
	
		this.ws.addEventListener('message', subscriber)
	
		const subscription = () => {
			this.ws.removeEventListener('message', subscriber)
			this.request({
				url: 'md/unsubscribeDOM',
				body: { symbol }
			})
		}
	
		this.subscriptions.push({symbol, subscription})
		return subscription
	
	}
	
	async subscribeHistogram(symbol, fn) {
		const { subscriptionId } = await this.request({
			url:  'md/subscribeHistogram',
			body: { symbol }
		})
	
		const subscriber = msg => {
			const results = getJSON(msg)
			if(!results) return
	
			results
				.filter(isHistogram)
				.map(data => data.d.histograms)
				.flat()
				.filter(({contractId}) => contractId === subscriptionId)
				.forEach(hist => fn(hist))
		}
	
		const subscription = () => {
			this.ws.removeEventListener('message', subscriber)
			this.request({
				url: 'md/unsubscribeHistogram',
				body: { symbol }
			})
		}
		
		this.ws.addEventListener('message', subscriber)
		this.subscriptions.push({ symbol, subscription })
		return subscription
	}
	
	
	
	async getChart({symbol, chartDescription, timeRange}, fn) {
		
		const { realtimeId, historicalId } = await this.request({
			url: 'md/getChart',
			body: {
				symbol,
				chartDescription,
				timeRange
			}
		})
	
		const subscriber = msg => {
			const results = getJSON(msg)
			if(!results) return
			
			results
				.filter(isChart)
				.map(data => data.d.charts)
				.flat()
				.filter(({id, eoh}) => !eoh && (id === realtimeId || id === historicalId))
				.forEach(fn)
		}
	
		const subscription = () => {
			this.ws.removeEventListener('message', subscriber)
			this.request({
				url: 'md/cancelChart',
				body: {
					subscriptionId: historicalId
				}
			})
		}
	
		this.ws.addEventListener('message', subscriber)
		this.subscriptions.push({symbol, subscription})
		return subscription
	}
	
	// TODO: Override the super
	disconnect() {
		super.disconnect(); // TradovateSocket.prototype.disconnect.call(this)
		this.subscriptions.forEach(({subscription}) => subscription());
		this.subscriptions = [];
	}
	
}

//MarketDataSocket extends TradovateSocket, clone its prototype using Object.assign
// MarketDataSocket.prototype = Object.assign({}, TradovateSocket.prototype) // , API, API.prototype)

const isQuote = data => data.e && data.d && data.d.quotes
const isDOM = data => data.e && data.d && data.d.doms
const isHistogram = data => data.e && data.d && data.d.histograms
const isChart = data => data.e && data.e === 'chart'

Array.prototype.tap = function(fn) {
	this.forEach(fn)
	return this
}

module.exports = MarketDataSocket;