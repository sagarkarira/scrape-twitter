const fetch = require('isomorphic-fetch')
const queryString = require('query-string')

const checkStatus = (response) => {
  if (response.ok) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const toJson = response => response.json()
const toText = response => response.text()

const toHtml = response => response['items_html'].trim()

const query = (url, options) => {
  const qs = queryString.stringify(options)
  return fetch(url + (qs.length ? `?${qs}` : ''))
    .then(checkStatus)
    .then(toJson)
    .then(toHtml)
}

const get = (url) => {
  return fetch(url)
    .then(checkStatus)
    .then(toText)
}

module.exports = query
module.exports.get = get
