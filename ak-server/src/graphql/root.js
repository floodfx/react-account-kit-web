var config = require('../config');

const CSRF = config.get('CSRF')

const root = {
  init: () => {
    return {
      appId: config.get('AK_APP_ID'),
      csrf: CSRF,
      version: config.get('AK_APP_VERSION')
    }
  },
  auth: ({csrfNonce, authCode}) => {
    let errors = []
    let user = null
    if(CSRF !== csrfNonce) {
      errors.push("CSRF Validation Failed")
    } else {
      // use ak client to validate
    }
    return {
      user,
      errors
    }
  }
}

module.exports = root
