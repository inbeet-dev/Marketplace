class AnswerValidator {
  checkYesNo(answer) {
    const keys = Object.keys(answer)

    if (keys.length !== 1) return false

    if (keys[0] !== 'boolean') return false

    if (typeof answer.boolean !== 'boolean') return false

    return true
  }

  checkMultiChoice(answer) {
    const keys = Object.keys(answer)

    if (keys.length !== 1) return false

    if (keys[0] !== 'choice') return false

    if (typeof answer.choice !== 'number') return false

    return true
  }

  checkGeneral(answer) {
    const keys = Object.keys(answer)

    if (keys.length !== 1) return false

    if (keys[0] !== 'text') return false

    if (typeof answer.text !== 'string') return false

    if (answer.text.length === 0) return false

    return true
  }
}

module.exports = AnswerValidator
