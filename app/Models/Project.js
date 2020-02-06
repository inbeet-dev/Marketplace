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
  open: 'Lumber List open',
  lumberListCompleted: 'Lumber List Completed',
  openForBids: 'Open For Bids',
  awatingAdminApproval: 'Awaiting Admin Approval',
  complete: 'Project Complete',
  canceled: 'Project Canceled',
  onHold: 'Project On Hold'
}

module.exports = Project
