// Pending Tradovate Release
// Based on tradovate documentation https://community.tradovate.com/t/introducing-autotrade/2795/print
const connect = require('./src/utils/connect.js');
const initialize = require('./src/utils/initialize.js');
const SubStrategy = require('./src/strategies/SubStrategy.js');

/**
 * TODO
 * @SubStrategy
 * FIX THE ORDER MODEL = wide in morning, tight in afternoon, with a sigma * momentum (ACF????) parameter
 * 
 * 
 */

module.exports = async function(args) {

	// // // // // // // // // // // // // // // //
    // Custom Scripts Section                    //
    // // // // // // // // // // // // // // // //

    // // // // // // // // // // // // // // // //
    // Login Section                             //
    // // // // // // // // // // // // // // // //

    await connect();

    // // // // // // // // // // // // // // // //
    // Configuration Section                     //
    // // // // // // // // // // // // // // // //

    await initialize(SubStrategy, args);

    // Once constructed, the strategy will run in an event-driven manner.
    // Each tick will fire the Strategy.tick(prevState, data) function, which
    // will produce the next Strategy state. Each tick event considers the 
    // previous state and the incoming data.
}