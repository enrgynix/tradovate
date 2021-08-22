// onProps.js
// import { TdProps, TdSyncProps } from '../utils/enum.mjs';
// import { insertionUpdate } from '../utils/insertionUpdate.cjs';

const { TdProps, TdSyncProps } = require('../utils/enum.cjs');
const insertionUpdate = require('../utils/insertionUpdate.cjs');


/**
 * @function onProps
 * @description Parses the Props payload
 * @param {Object} params
 * @param {Object} params.state
 * @param {Object} params.payload
 * @returns {Object}
 */
// export function onProps({state,payload}) {
module.exports = function({state,payload}) {
	
	// Extract the generic Tradovate `props` entity metadata from the payload
	let { entity, entityType, eventType } = payload;

	// We need to determine what `entityType` we are dealing with and handle it accordingly 
	switch (entityType) {
		
		// Update an entities via their `id` parameter
		// TODO: there may be other `props` with a similar `id` parameter
		case TdProps.command:
		case TdProps.commandReport:
		case TdProps.executionReport:
		case TdProps.order:
		case TdProps.orderVersion:
		case TdProps.orderStrategy:
		case TdProps.orderStrategyLink:
		case TdProps.position:
		case TdProps.fill:
		case TdProps.fillPair:
			insertionUpdate({state, entityType, entity, sharedKey: 'id'})
			break;
		
		default:
			break;
	}

	return state;
}

