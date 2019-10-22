'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { request, response }) {
    response.status(error.status).send({
      success: false,
      error: error.message
    })
    return null
  }
}

module.exports = CustomException
