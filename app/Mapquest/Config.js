const NodeGeocoder = require('node-geocoder')
const Env = use('Env')

const options = {
  provider: Env.get('MAP_PROVIDER'),
  httpAdapter: Env.get('HTTP_ADAPTER'),
  apiKey: Env.get('API_KEY'),
  formatter: Env.get('FORMATTER')
}

const geocoder = NodeGeocoder(options)

module.exports.geocoder = geocoder
