var config = require('../config');
var ak = require('../account-kit')

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
      // use ak client to get accessToken
      ak.accessToken(authCode)
        .then((json) => {
          user = {
            userId: json.id,
            accessToken: json.access_token,
            expiresAt: json.token_refresh_interval_sec
          };
          //TODO fetch accountDetails
        })
        .catch(error => errors.push(error));
    }
    return {
      user,
      errors
    }
  }
}

module.exports = root
