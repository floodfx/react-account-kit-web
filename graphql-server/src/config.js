var nconf = module.exports = require('nconf')
var guid = require('guid')

nconf
  .argv() // read command line args
  .env([  // read environment vars
    'AK_APP_ID',
    'AK_APP_SECRET',
    'AK_APP_VERSION',
    'CSRF',
  ])
  .defaults({
    AK_APP_ID: '',
    AK_APP_SECRET: '',
    AK_APP_VERSION: 'v1.1',
    CSRF: guid.raw() // generate csrf by defaut
  })
