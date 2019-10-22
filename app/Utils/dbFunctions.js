const ServerException = use('App/Exceptions/ServerException')

module.exports = {
  save: async (object, response) => {
    try {
      await object.save()
    } catch (err) {
      throw new ServerException(err, 500)
    }
  }
}
