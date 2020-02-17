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
    return this.belongsTo('App/Models/Project')
  }
}

LumberList.STATUS = {
  OPEN: 'LUMBER_LIST_OPEN',
  AWAITING_MANAGER_APPROVAL: 'AWAITING_MANAGER_APPROVAL',
  REJECTED: 'LUMBER_LIST_REJECTED',
  COMPLETED: 'LUMBER_LIST_COMPLETED',
  CANCELLED: 'LUMBER_LIST_CANCELLED'
}

module.exports = LumberList
