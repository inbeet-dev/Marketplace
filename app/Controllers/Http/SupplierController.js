'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')
const Database = use('Database')

class SupplierController {
  async getSuppliers({ response, auth }) {
    await authenticate.admin(response, auth)

    const inReviewOrActvieSupplier = await Database.from('users')
      .where('role', User.ROLES.supplier)
      .whereIn('status', [User.STATUS.active, User.STATUS.inReview])

    const cancelledOrPausedSupplier = await Database.from('users')
      .where('role', User.ROLES.supplier)
      .whereIn('status', [User.STATUS.cancelled, User.STATUS.paused])

    return {
      success: true,
      data: {
        suppliers: {
          inReviewOrActive: inReviewOrActvieSupplier,
          cancelledOrPaused: cancelledOrPausedSupplier
        }
      }
    }
  }
}

module.exports = SupplierController
