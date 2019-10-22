'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSupplierSchema extends Schema {
  up() {
    this.create('project_suppliers', (table) => {
      table.increments()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
      table
        .integer('supplier_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('project_suppliers')
  }
}

module.exports = ProjectSupplierSchema
