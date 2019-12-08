'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')

class SupplierController {
  async getSuppliers({ response, auth }) {
    await authenticate.admin(response, auth)

    const inReviewOrActvieSupplier = await User.query().whereRaw(
      'role = ? and status in (?, ?)',
      [User.ROLES.supplier, User.STATUS.active, User.STATUS.inReview]
    )

    const cancelledOrPausedSupplier = await User.query().whereRaw(
      'role = ? and status in (?, ?)',
      [User.ROLES.supplier, User.STATUS.cancelled, User.STATUS.paused]
    )

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
