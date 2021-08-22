module.exports = function(msg) {
	if(msg.data.slice(0,1) !== 'a') return
	try {
		let res = JSON.parse(msg.data.slice(1));
		if (res) return res;
	} catch(err) {
		console.error(msg.data);
		console.error(err);
		return;
	}
	// return JSON.parse(msg.data.slice(1))
}