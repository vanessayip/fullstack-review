const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/search/repositories',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    q: user: username,
    sort: 'updated',
    order: 'desc'
  };
  
  request
    .get(options, function (err, res, body) {
      console.log('err', err);
      console.log('res', res);
      console.log('body', body);
    });

}

// getReposByUsername(); //for isolated testing. run node github.js
module.exports.getReposByUsername = getReposByUsername;