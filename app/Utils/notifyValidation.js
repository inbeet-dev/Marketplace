const { notifyConfig } = use('App/Utils/constVar')

class Notificaion {
  validator(notif) {
    const notifyArr = []
    for (const key in notifyConfig) {
      notifyArr.push(notifyConfig[key])
    }

    for (let i = 0; i < notifyArr.length; i++) {
      if (notifyArr[i] === notif) return true
    }

    return false
  }
}

module.exports = Notificaion
