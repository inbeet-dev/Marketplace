'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')

class SupplierController {
  async getSuppliers({ response, auth }) {
    await authenticate.admin(response, auth)

    const inReviewSupplier = await User.query().where({
      role: User.ROLES.supplier,
      status: User.STATUS.inReview
    })

    const activeSupplier = await User.query().where({
      role: User.ROLES.supplier,
      status: User.STATUS.active
    })

    const deActiveSupplier = await User.query().where({
      role: User.ROLES.supplier,
      status: User.STATUS.deActive
    })

    return {
      success: true,
      data: {
        suppliers: {
          inReview: inReviewSupplier,
          active: activeSupplier,
          deActive: deActiveSupplier
        }
      }
    }
  }
}

module.exports = SupplierController
