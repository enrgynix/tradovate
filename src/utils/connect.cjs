
const { v4 } = require('uuid');
const DeviceUUID = v4;
const { USER, PASS, CID, SEC } = require('../env.cjs');
const { setDeviceId, getDeviceId, setAccessToken, getAccessToken, tokenIsValid, setAvailableAccounts, getAvailableAccounts } = require('./storage.cjs');
const { tvPost, tvGet } = require('./services.cjs');

//set device ID, behaves differently for browser and mobile device.
const deviceID = function() {
	let DEVICE_ID;
	const device = getDeviceId()
    DEVICE_ID = device || DeviceUUID()
    setDeviceId(DEVICE_ID)
	return DEVICE_ID;
}

const handleRetry = async (data, json) => {
    const ticket    = json['p-ticket'],
          time      = json['p-time'],
          captcha   = json['p-captcha']

    if(captcha) {
        console.error('Captcha present, cannot retry auth request via third party application. Please try again in an hour.')
        return
    }

    console.log(`Time Penalty present. Retrying operation in ${time}s`)

    await waitForMs(time * 1000) 
    await connect({ ...data, 'p-ticket': ticket })   
}

const connect = async (data) => {

    if (!data) {
        data = {
            name:       USER,
            password:   PASS,
            appId:      "Sample App",
            appVersion: "1.0",
            cid:        CID,
            sec:        SEC,
            deviceId:   deviceID(),
        }
    }

    let { token, expiration } = getAccessToken()

    if(token && tokenIsValid(expiration)) {
        const accounts = await tvGet('/account/list')
        setAvailableAccounts(accounts)
        
        // Make sure we reconnect if we hit expiration
        let reconnect = (new Date(expiration) - Date.now()) - 5e3; // connect 5 seconds before time is up


        setTimeout(() => {
            connect(data);
        }, reconnect);
        
        console.log(`Already connected with valid token. Reconnecting in ${(reconnect / 6e4).toFixed(2)}min`); 
        
        return
    }

    const authResponse = await tvPost('/auth/accesstokenrequest', data, false)

    if(authResponse['p-ticket']) {
        return await handleRetry(data, authResponse) 
    } else {
        const { errorText, accessToken, userId, userStatus, name, expirationTime } = authResponse

        if(errorText) {
            console.error(errorText)
            return
        }
        
        setAccessToken(accessToken, expirationTime)

        const accounts = await tvGet('/account/list')

        setAvailableAccounts(accounts)

        console.log(`Successfully stored access token ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`)
    }
}

const waitForMs = t => {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, t)
    })
}

module.exports = connect;