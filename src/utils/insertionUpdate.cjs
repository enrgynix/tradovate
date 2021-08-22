
const { TdSyncProps } = require('./enum.cjs');

/**
 * @function insertionUpdate
 * @description Used to specifically update a `props` object within a `Strategy.state`
 * @param {Object} params
 * @param {Object} params.state A `Strategy.state` object
 * @param {String} params.entityType
 * @param {Object} params.entity A `props` entity
 * @param {String} params.sharedKey The UID key of a `props` entity 
 */
// export function insertionUpdate({state,entityType,entity,sharedKey}) {
module.exports = function({state,entityType,entity,sharedKey}) {

	// Determine if an `entity` with the `sharedKey` is present in the `entityType` array
	// If present, overwrite it; if not, push it into the array
	const maybe = state[TdSyncProps[entityType]].findIndex((obj) => entity[sharedKey] === obj[sharedKey]);
	if (maybe < 0) {
		state[TdSyncProps[entityType]].push(entity);
	} else {
		state[TdSyncProps[entityType]][maybe] = entity;
	}
}