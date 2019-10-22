'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LumberListItem extends Model {
  bidItems() {
    return this.hasMany('App/Models/LumberListBidItem')
  }

  lumberList() {
    return this.hasOne('App/Models/LumberList', 'lumber_list_id', 'id')
  }
}

module.exports = LumberListItem
