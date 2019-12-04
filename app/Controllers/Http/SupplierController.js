'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')

class SupplierController {
  async getSuppliers({ response, auth }) {
    await authenticate.admin(response, auth)

    const inReviewSupplier = await User.query().where({
      role: 'supplier',
      status: User.STATUS.inReview
    })

    return {
      success: true,
      data: {
        suppliers: {
          inReview: inReviewSupplier
        }
      }
    }
  }
}

module.exports = SupplierController
