const STORAGE_KEY       = 'tradovate-api-access-token'
const EXPIRATION_KEY    = 'tradovate-api-access-expiration'
const DEVICE_ID_KEY     = 'tradovate-device-id'
const AVAIL_ACCTS_KEY   = 'tradovate-api-available-accounts'

const { red, green } = require('./logger.cjs');
const fs = require('fs');
const path = require('path');

const sessionFilePath = `${process.cwd()}/sessionFile.json`;

// Ensure that sessionStorage is globally accessible
global.sessionStorage = {}

// Update the global sessionStorage with an existing `sessionFile` if one exists
if (fs.existsSync(sessionFilePath)) {
    let sessionFile = fs.readFileSync(sessionFilePath,"utf8");
    if (sessionFile) global.sessionStorage = JSON.parse(sessionFile);
}

/**
 * Overwrites the `sessionFile` (or de facto writes a new one if one does not yet exist) with the `global.sessionStorage`
 * This will enable us to minimize requests for tokens by reusing unexpired tokens between reloads
 */
const writeSession = function() {
    fs.writeFile(sessionFilePath, JSON.stringify(global.sessionStorage), 'utf8', (err) => { 
        if (err) {
            console.log(red('Error writing session file')); 
        } else {
            console.log(green('Wrote new session file')); 
        }
    });
}

const setAvailableAccounts = accounts => {
    
    global.sessionStorage[AVAIL_ACCTS_KEY] = accounts;
    writeSession();
}

/**
 * Returns and array of available accounts or undefined.
 * @returns Account[]
 */
const getAvailableAccounts = () => {
    return global.sessionStorage[AVAIL_ACCTS_KEY];
}

/**
 * Use a predicate function to find an account. May be undefined.
 */
const queryAvailableAccounts = predicate => {
    return getAvailableAccounts().find(predicate)
}

const setDeviceId = (id) => {
    
    global.sessionStorage[DEVICE_ID_KEY] = id;
    writeSession();

}

const getDeviceId = () => {
    
    return  global.sessionStorage[DEVICE_ID_KEY];

}

const setAccessToken = (token, expiration) => {
    
    if(!token || !expiration) throw new Error('attempted to set undefined token');

    global.sessionStorage[STORAGE_KEY] = token;
    global.sessionStorage[EXPIRATION_KEY] = expiration;
    writeSession();

}

const getAccessToken = () => {

    const token = global.sessionStorage[STORAGE_KEY];
    const expiration = global.sessionStorage[EXPIRATION_KEY];

    if(!token) {
        console.warn('No access token retrieved. Please request an access token.')
    }
    return { token, expiration }
}

const tokenIsValid = expiration => new Date(expiration) - new Date() > 0 

module.exports = {
    setAvailableAccounts,
    getAvailableAccounts,
    queryAvailableAccounts,
    setDeviceId,
    getDeviceId,
    setAccessToken,
    getAccessToken,
    tokenIsValid,
    writeSession
}