'use strict'

const ProjectQuestion = use('App/Models/ProjectQuestion')
const Project = use('App/Models/Project')
const { validate } = use('Validator')
const { save } = use('App/Utils/dbFunctions')
const QuestionValidator = use('App/Utils/questionValidator')
const AnswerValidator = use('App/Utils/answerValidation')
const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')

class QuestionController {
  async createQuestion({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const { type, projectId, question } = request.all()

    const rules = {
      type: 'required',
      projectId: 'required',
      question: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    const projectQuestion = new ProjectQuestion()

    const questionValidator = new QuestionValidator()
    if (type === ProjectQuestion.TYPES.yesNo) {
      if (!questionValidator.checkYesNo(question))
        throw new ServerException('Question is invalid', 400)
    } else if (type === ProjectQuestion.TYPES.multiChoice) {
      if (!questionValidator.checkMultiChoice(question))
        throw new ServerException('Question is invalid', 400)
    } else if (type === ProjectQuestion.TYPES.general) {
      if (!questionValidator.checkGeneral(question))
        throw new ServerException('Question is invalid', 400)
    } else {
      throw new ServerException('Type is invalid', 400)
    }

    projectQuestion.type = type
    projectQuestion.project_id = projectId
    projectQuestion.question = question
    projectQuestion.answer = {}
    projectQuestion.asked_at = new Date()
    projectQuestion.status = ProjectQuestion.STATUS.notAnswered

    await save(projectQuestion, response)

    return {
      success: true,
      data: {
        projectQuestion
      }
    }
  }

  async getQuestion({ response, params, auth }) {
    await authenticate.allUser(response, auth)

    const id = params.id

    const question = await ProjectQuestion.query()
      .where('project_id', id)
      .fetch()
    if (!question) throw new ServerException('Question not found', 404)

    return {
      success: true,
      question
    }
  }

  async addAnswer({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const rules = {
      questionId: 'required',
      answer: 'required'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { questionId, answer } = request.all()

    const projectQuestion = await ProjectQuestion.find(questionId)
    if (!projectQuestion) throw new ServerException('Question not found', 404)

    const answerValidator = new AnswerValidator()

    if (projectQuestion.type === ProjectQuestion.TYPES.yesNo) {
      if (!answerValidator.checkYesNo(answer))
        throw new ServerException('Invalid answer', 400)
    } else if (projectQuestion.type === ProjectQuestion.TYPES.multiChoice) {
      if (!answerValidator.checkMultiChoice(answer))
        throw new ServerException('Invalid answer', 400)
    } else if (projectQuestion.type === ProjectQuestion.TYPES.general) {
      if (!answerValidator.checkGeneral(answer))
        throw new ServerException('Invalid answer', 400)
    }

    projectQuestion.answer = answer
    projectQuestion.answered_at = new Date()
    projectQuestion.status = ProjectQuestion.STATUS.answered

    await save(projectQuestion, response)

    const project = await Project.find(projectQuestion.project_id)
    if (!project) throw new ServerException('Project not found', 404)

    const customer = await User.find(project.user_id)

    await Mail.send('emails.project.answer', { project }, (message) => {
      message
        .to(customer.email)
        .from(Env.get('MAIL_FROM'), 'Lumber Click')
        .subject('Answer Submitted')
    })

    return {
      success: true,
      question: projectQuestion
    }
  }

  async getAnswers({ params, response, auth }) {
    await authenticate.allUser(response, auth)

    const id = params.id

    const project = await Project.find(id)
    if (!project) throw new ServerException('Project not found', 404)

    const questions = await project.questions().fetch()

    return {
      success: true,
      questions
    }
  }

  async answerAll({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const { projectQuestions } = request.all()

    if (!Array.isArray(projectQuestions))
      throw new ServerException('project Question must be an array', 400)

    let projectQuestion = []
    for (let i = 0; i < projectQuestions.length; i++) {
      projectQuestion = await ProjectQuestion.find(projectQuestions[i].id)
      if (projectQuestion) {
        if (projectQuestion.answered_at) {
          if (projectQuestions[i].answer) {
            const answerValidator = new AnswerValidator()

            if (projectQuestion.type === ProjectQuestion.TYPES.yesNo) {
              if (!answerValidator.checkYesNo(projectQuestions[i].answer))
                throw new ServerException('Invalid answer', 400)
            } else if (
              projectQuestion.type === ProjectQuestion.TYPES.multiChoice
            ) {
              if (!answerValidator.checkMultiChoice(projectQuestions[i].answer))
                throw new ServerException('Invalid answer', 400)
            } else if (projectQuestion.type === ProjectQuestion.TYPES.general) {
              if (!answerValidator.checkGeneral(projectQuestions[i].answer))
                throw new ServerException('Invalid answer', 400)
            }
            projectQuestion.answer = projectQuestions[i].answer
            projectQuestion.answered_at = new Date()
          }

          if (projectQuestions[i].status) {
            projectQuestion.status = projectQuestions[i].status
          }

          await save(projectQuestion, response)
        }
      }
    }

    return {
      success: true
    }
  }
}

module.exports = QuestionController
