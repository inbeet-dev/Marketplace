'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LumberList extends Model {
  items() {
    return this.hasMany('App/Models/LumberListItem')
  }

  bids() {
    return this.hasMany('App/Models/LumberListBid')
  }

  estimator() {
    return this.belongsTo('App/Models/User', 'estimator_id')
  }

  bidItems() {
    return this.manyThrough('App/Models/LumberListItem', 'bidItems')
  }

  project() {
    return this.hasOne('App/Models/Project', 'project_id', 'id')
  }
}

LumberList.STATUS = {
  open: 'open',
  inReview: 'In Review',
  received: 'Received',
  complete: 'Complete',
  awaitingCustomerApproval: 'Awaiting Customer Approval',
  awaitingAdminApproval: 'Awaiting Admin Approval'
}

module.exports = LumberList
