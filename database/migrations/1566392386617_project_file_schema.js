'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectFileSchema extends Schema {
  up() {
    this.create('project_files', (table) => {
      table.increments()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
      table.string('path', 128).notNullable()
      table.string('type', 128).notNullable()
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('project_files')
  }
}

module.exports = ProjectFileSchema
