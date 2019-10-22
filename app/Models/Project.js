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

  lists() {
    return this.hasMany('App/Models/LumberList')
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
}

Project.STATUS = {
  open: 'Lumber List open',
  LumberListComplete: 'Lumber List Complete',
  awating: 'Awaiting Manager Approval',
  complete: 'Project Complete',
  canceled: 'Project Canceled',
  onHold: 'Project On Hold'
}

module.exports = Project
