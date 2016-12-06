var config = require('../config');
var ak = require('../account-kit')

var CSRF = config.get('CSRF')

var root = {
  init: () => {
    return {
      appId: config.get('AK_APP_ID'),
      csrf: CSRF,
      version: config.get('AK_APP_VERSION')
    }
  },
  auth: (input) => {
    console.log("input", input)
    var csrfNonce = input.csrfNonce;
    var authCode = input.authCode;
    return new Promise((resolve, reject) => {
      var errors = []
      var user = null
      if(CSRF !== csrfNonce) {
        errors.push("CSRF Validation Failed")
        reject({user, errors});
      } else {
        // use ak client to get accessToken
        ak.accessToken(authCode)
          .then((json) => {
            user = {
              userId: json.id,
              accessToken: json.access_token,
              expiresAt: json.token_refresh_interval_sec
            };
            // now that we have the accessToken, fetch accountDetails
            ak.accountDetails(user.accessToken)
              .then((adJson) => {
                user.phone = adJson.phone
                user.email = adJson.email
                resolve({user, errors})
              })
              .catch((error) => {
                console.log(error, "\n\n\n")
                //TODO this can't be right
                errors.push(error.error.error.message)
                reject({user, errors})
              })
          })
          .catch((error) => {
            console.log(error, "\n\n\n")
            //TODO this can't be right
            errors.push(error.error.error.message)
            reject({user, errors})
          });
      }
    });
  }
}

module.exports = root
