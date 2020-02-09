const { geocoder } = use('App/Mapquest/Config')

const getLocation = (address) => {
  return new Promise((resolve, reject) => {
    geocoder.geocode(address, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports.getLocation = getLocation
