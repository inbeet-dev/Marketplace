'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProjectQuestion extends Model {}

ProjectQuestion.TYPES = {
  yesNo: 'yes-no',
  multiChoice: 'multi-choice',
  general: 'general'
}

ProjectQuestion.STATUS = {
  notAnswered: 0,
  answered: 1
}

module.exports = ProjectQuestion
