// Define "require"

const onChart = require("./onChart.cjs");
const onDOM = require("./onDOM.cjs");
const onHistogram = require("./onHistogram.cjs");
const onProps = require("./onProps.cjs");
const onQuote = require("./onQuote.cjs");
const onUserSync = require("./onUserSync.cjs");

const { TdMessage } = require("../utils/enum.cjs");

module.exports = function({state,event,payload}) {	
    switch(event) {
        
		case TdMessage.Chart: {
			return onChart({state, payload});
			break;
		}

		case TdMessage.DOM: {
			return onDOM({state, payload});
			break
		}

		case TdMessage.Histogram: {
			return onHistogram({state, payload});
			break
		}

		case TdMessage.Quote: {
			return onQuote({state, payload});
			break
		}

		case TdMessage.UserSync: {
			return onUserSync({state, payload});
			break
		}

		case TdMessage.Props: {
			return onProps({state, payload});
			break;
		}

		default: {
			return state;
		}

	}

	return state;
}
