'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectQuestionSchema extends Schema {
  up() {
    this.create('project_questions', (table) => {
      table.increments()
      table.string('type', 128)
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
      table.jsonb('question').defaultTo('{}')
      table.jsonb('answer').defaultTo('{}')
      table.dateTime('asked_at')
      table.dateTime('answered_at')
      table.integer('status')
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('project_questions')
  }
}

module.exports = ProjectQuestionSchema
