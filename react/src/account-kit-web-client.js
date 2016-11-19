import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const authQuery = `
  query authQuery($csrfNonce: String!, $authCode: String!){
    auth(csrfNonce:$csrfNonce, authCode:$authCode) {
      user {
        userId
        accessToken
        expiresAt
        phone {
          country_prefix
          number
          national_number
        }
        email {
          address
        }
      },
      errors
    }
  }
`;

const initQuery = `
  {
    init {
     appId,
     csrf,
     version
    }
  }
`;

class AccountKitWebClient {

  constructor(graphQlClientUrl) {
    this.client = new Lokka({
      transport: new Transport(graphQlClientUrl, {credentials: false})
    });
  }

  init() {
    return this.client.query(initQuery)
  }

  auth(csrfNonce, authCode) {
    return this.client.query(authQuery, {csrfNonce, authCode})
  }

  phoneLogin(countryCode, phone) {
    return new Promise((resolve, reject) => {
      window.AccountKit.login('PHONE', {
        countryCode: countryCode,
        phoneNumber: phone
      }, (res) => {
        if (res.status === "PARTIALLY_AUTHENTICATED") {
          resolve({
            status: res.status,
            authCode: res.code,
            csrfNonce: res.state
          });
        }
        else {
          reject({status: res.status})
        }
      });
    });
  }

  emailLogin(email) {
    return new Promise((resolve, reject) => {
      window.AccountKit.login('EMAIL', {
        emailAddress: email
      }, (res) => {
        if (res.status === "PARTIALLY_AUTHENTICATED") {
          resolve({
            status: res.status,
            authCode: res.code,
            csrfNonce: res.state
          });
        }
        else {
          reject({status: res.status})
        }
      });
    });
  }

}

export default AccountKitWebClient
