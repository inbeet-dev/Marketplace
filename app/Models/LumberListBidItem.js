'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LumberListBidItem extends Model {
  listItem() {
    return this.hasOne('App/Models/LumberListItem', 'lumber_list_item_id', 'id')
  }

  lumberListBid() {
    return this.hasOne('App/Models/LumberListBid', 'lumber_list_bid_id', 'id')
  }
}

module.exports = LumberListBidItem
