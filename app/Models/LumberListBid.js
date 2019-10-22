'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LumberListBid extends Model {
  items() {
    return this.hasMany('App/Models/LumberListBidItem')
  }

  supplier() {
    return this.hasOne('App/Models/User', 'supplier_id', 'id')
  }
}

LumberListBid.STATUS = {
  open: 'Open Bid',
  paused: 'Paused Bid',
  complete: 'Complete Bid',
  cancel: 'Cancel Bid'
}

module.exports = LumberListBid
