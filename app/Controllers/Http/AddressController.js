'use strict'

const { getLocation } = use('App/Mapquest/Function')

class AddressController {
  async getLocation({ request, response }) {
    const { address } = request.all()

    let location

    try {
      location = await getLocation(address)
    } catch (err) {
      return response.status(404).json({
        error: 'ELOCATIONNOTFOUND',
        message: 'location not found'
      })
    }

    const { latitude: lat, longitude: long } = location[0]

    return {
      lat,
      long
    }
  }
}

module.exports = AddressController
