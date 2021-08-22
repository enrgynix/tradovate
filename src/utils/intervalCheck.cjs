module.exports = function(ms=100) {
	let counter = 0;
	let timestamp = Date.now()
	let prevTimestamp = Date.now()
	let check = setInterval(() => {
		counter += 1;
		timestamp = Date.now()
		console.log(counter, timestamp - prevTimestamp);
		prevTimestamp = timestamp;
	}, ms)
}