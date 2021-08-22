
// NOTE: May fail if `replay`
const { URLs } = require('./enum.cjs');
const { getAccessToken } = require('./storage.cjs');
const fetch = require('node-fetch');

// TODO
const URL = URLs?.d?.url;

const tvGet = async (endpoint, query = null) => {
    const { token } = getAccessToken()
    try {
        let q = ''
        if(query) {
            q = Object.keys(query).reduce((acc, next, i, arr) => {
                acc += next + '=' + query[next]
                if(i !== arr.length - 1) acc += '&'
                return acc
            }, '?')
        }

        let url = query !== null
            ? URL + endpoint + q
            : URL + endpoint

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const js = await res.json()

        return js

    } catch(err) {
        console.error(err)
    }
}

const tvPost = async (endpoint, data, _usetoken = true) => {
    const { token } = getAccessToken()
    const bearer = _usetoken ? { Authorization: `Bearer ${token}` } : {} 
    try {
        
        const res = await fetch(URL + endpoint, {
            method: 'POST',
            headers: {
                ...bearer,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(res.status);
        }
        const js = await res.json()

        return js

    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    tvGet,
    tvPost
}