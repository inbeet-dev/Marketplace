'use strict'

const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to bash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeSave', 'User.hashPassword')
  }

  static get hidden() {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  projects() {
    return this.hasMany('App/Models/Project')
  }

  estimates() {
    return this.hasMany('App/Models/LumberList', 'id', 'estimator_id')
  }

  supplies() {
    return this.hasMany('App/Models/LumberListBid', 'id', 'supplier_id')
  }

  listBid() {
    return this.hasMany('App/Models/LumberListBid', 'id', 'supplier_id')
  }

  bidItems() {
    return this.manyThrough(
      'App/Models/LumberListBid',
      'items',
      'id',
      'supplier_id'
    )
  }

  estimatedProject() {
    return this.manyThrough(
      'App/Models/LumberList',
      'project',
      'id',
      'estimator_id'
    )
  }
}

User.ROLES = {
  customer: 'customer',
  supplier: 'supplier',
  estimator: 'estimator',
  supportCustomer: 'customer support',
  admin: 'admin'
}

User.STATUS = {
  active: 'active',
  deActive: 'de-active',
  terminated: 'terminated',
  inReview: 'in review'
}

module.exports = User
