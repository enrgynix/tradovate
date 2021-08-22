// onDOM.js

/**
 * @function onDOM
 * @description Parses the 
 * @param {Object} params
 * @param {Object} params.state
 * @param {Object} params.payload
 * @returns {Object}
 */
// export function onDOM({state,payload} = { state: {}, payload: {}}) {
module.exports = function({state,payload} = { state: {}, payload: {}}) {
	
	// Extract the Tradovate `doms` object from the payload
	let { doms } = payload || [];

	// Traverse the `doms` array and handle the contents
	doms.forEach(({bids, offers, contractId, timestamp}) => {
		
		// If the DOM received is for our state `symbol`, inject the DOM data into the `state.doms` object
		if (contractId === state?.symbol) state.doms = {bids, offers, contractId, timestamp};
	
	})

	return state;
}