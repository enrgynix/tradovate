/**
 * @function latestTimestamp
 * @description Iterates over a list of objects, each containing a `timestamp`, and returns the object with the most recent / latest timestamp
 * @param {Array} arr
 * @param {Array.<Object>} obj
 * @param {Array.<Object.<String>>} timestamp ISO 8601 format, e.g., "2018-03-16T18:00:00.000Z"
 * @returns {Object} The object found with the latest timestamp, empty object if none found
 */
// export function latestTimestamp(arr=[]) {
module.exports = function(arr=[]) {

	// Reduce the array by assigning the `acc` accumulator to be the actual object within the array
	return arr?.reduce((acc, obj) => 
		acc = (acc?.timestamp > obj?.timestamp) ? acc : obj, 
		undefined
	) || { };
	
}