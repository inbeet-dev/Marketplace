'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.increments()
      table.string('name', 128).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('notify_config')
      table.string('status', 128)
      table.text('close_reason')
      table.dateTime('closed_at')
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
