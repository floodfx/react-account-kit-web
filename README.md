# react-account-kit-web
[React](https://facebook.github.io/react/) Component and [GraphQL](http://graphql.org/) server for [Account Kit](https://developers.facebook.com/docs/accountkit)

### Not for standalone use
React Component and GraphQL server were designed and developed for using together.

## React Component
### Install
```bash
npm install --save react-account-kit-web
```
### Components
```javascript
import { AccountKitWeb, AccountKitWebClient } from 'react-account-kit-web';
```
#### AccountKitWeb
`AccountKitWeb` is the React component that loads the AccountKit javascript code 
and initializes it using data returned from the GraphQL server.  It expects to be passed
a `AccountKitWebClient` initialized with the url for the GraphQL server.  Also requires an
`onInit` function and accepts an optional `debug` flag.

```javascript
constructor(props) {
  super(props);
  this.accountKitWebClient = new AccountKitWebClient('http://localhost:8080/graphql');
  ...
}
...
render() {
...
  <AccountKitWeb
    onInit={this.onInit}
    client={this.accountKitWebClient}
    debug={true}
  />
...
}
```


## GraphQL Server
### Install
Clone this repository 
#### Suggestions?
Lmk how we could make this better

### Run
```bash
node index.js --AK_APP_ID=YOUR_FACEBOOK_APP_ID --AK_APP_SECRET=YOUR_FACEBOOK_APP_SECRET
```
#### Configuration Settings
- AK_APP_ID (required) - your Facebook App ID (enabled with Account Kit)
- AK_APP_SECRET (required) - your Facebook App Secret
- AK_APP_VERSION (optional) - your Facebook App Account Kit Version (defaults to `v1.1`)
- CSRF (optional) - Token used against Cross Site Request Forgery (defaults to a generated GUID)

## Example
See `example/basic` folder for a working example React App.

### Note
The React app in `example/basic` was generated using the [Create React App](https://github.com/facebookincubator/create-react-app) Project.
