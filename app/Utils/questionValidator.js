class questionValidator {
  checkYesNo(question) {
    const keys = Object.keys(question)

    if (keys.length !== 1) return false

    if (keys[0] !== 'text') return false

    if (typeof question.text !== 'string') return false

    if (question.text.length === 0) return false

    return true
  }

  checkMultiChoice(question) {
    const keys = Object.keys(question)

    if (keys.length !== 2) return false

    if (keys[0] !== 'text' && keys[1] !== 'text') return false

    if (keys[1] !== 'answers' && keys[0] !== 'answers') return false

    if (typeof question.text !== 'string') return false

    if (question.text.length === 0) return false

    if (!Array.isArray(question.answers)) return false

    if (question.answers.length === 0) return false

    return true
  }

  checkGeneral(question) {
    const keys = Object.keys(question)

    if (keys.length !== 1) return false

    if (keys[0] !== 'text') return false

    if (typeof question.text !== 'string') return false

    if (question.text.length === 0) return false

    return true
  }
}

module.exports = questionValidator
