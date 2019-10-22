'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddLocationToProjectsSchema extends Schema {
  up() {
    this.alter('projects', (table) => {
      table.specificType('location', 'geometry')
    })
  }

  down() {
    this.alter('to_projects', (table) => {
      table.dropColumn('location')
    })
  }
}

module.exports = AddLocationToProjectsSchema
