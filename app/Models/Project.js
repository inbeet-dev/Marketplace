'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  files() {
    return this.hasMany('App/Models/ProjectFile')
  }

  questions() {
    return this.hasMany('App/Models/ProjectQuestion')
  }

  lumberLists() {
    return this.hasMany('App/Models/LumberList')
  }

  lumberList() {
    return this.hasOne('App/Models/LumberList', 'id', 'project_id')
  }

  customer() {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }

  suppliers() {
    return this.belongsToMany(
      'App/Models/User',
      'project_id',
      'supplier_id'
    ).pivotTable('project_suppliers')
  }

  lumberListItems() {
    return this.manyThrough('App/Models/LumberList', 'items')
  }
}

Project.STATUS = {
  IN_REVIEW: 'IN_REVIEW',
  LUMBER_LIST_OPEN: 'LUMBER_LIST_OPEN',
  LUMBER_LIST_COMPLETED: 'LUMBER_LIST_COMPLETED',
  OPEN_FOR_BIDS: 'OPEN_FOR_BIDS',
  WATING_FOR_SUPPLIER_CONFIRMATION: 'WATING_FOR_SUPPLIER_CONFIRMATION',
  COMPLETED: 'PROJECT_COMPLETED',
  BLOCKED: 'PROJECT_BLOCKED',
  CANCELLED: 'PROJECT_CANCELLED',
  ON_HOLD: 'PROJECT_ON_HOLD'
}

module.exports = Project
