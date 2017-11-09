const request = require('request');
const config = require('../config.js');
// const bodyParser = require('body-parser');
const db = require('../database/index.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    qs: {
      q: 'owner', //default: owner
      sort: 'updated', //default: full name
      order: 'desc' //default: when full name, asc, otherwise desc
    }
  };
  
  request
    .get(options, function (err, res, body) {
      // console.log('err', err);
      console.log('inside api req')
      console.log('cb def: ', cb);
      let parsedBody = JSON.parse(body);
      // console.log('body : ', parsedBody[0]);
      // console.log('count of items', parsedBody.length);
      let repos = [];
      for (var repo of parsedBody) {
        let obj = {
          id: repo.id,
          username: repo.owner.login,
          repoUrl: repo.owner.url,
          updated_at: repo.updated_at
        };
        repos.push(obj);
        // console.log('id:', obj.id);
      }
      
      db.save(repos, cb);
      
    });

}

getReposByUsername('octocat'); //for isolated testing. run node github.js
module.exports.getReposByUsername = getReposByUsername;