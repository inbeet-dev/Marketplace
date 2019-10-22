'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LumberListSchema extends Schema {
  up() {
    this.create('lumber_lists', (table) => {
      table.increments()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
      table
        .integer('estimator_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('status')
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('lumber_lists')
  }
}

module.exports = LumberListSchema
