'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()

class EstimatorController {
  async dashboard({ response, auth }) {
    await authenticate.estimator(response, auth)

    const user = await auth.getUser()

    await user.load('estimates.project')

    return {
      success: true,
      user
    }
  }
}

module.exports = EstimatorController
