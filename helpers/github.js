const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('../config.js');


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
  
  return request.getAsync(options)
    .then((res) => {
      console.log('done api call');
      let parsedBody = JSON.parse(res.body);
      // console.log('body : ', parsedBody[0]);
      // console.log('count of items', parsedBody.length);
      let repos = [];
      for (var repo of parsedBody) {
        let obj = {
          id: repo.id,
          username: repo.owner.login,
          repoUrl: repo.owner.url,
          updated_at: repo.updated_at,
          stargazers_count: repo.stargazers_count
        };
        repos.push(obj);
        // console.log('id:', obj.id);
      }
      // console.log('repos: ', repos)
      return Promise.resolve(repos);
    })
    .catch((error) => {
      console.log('error in github file retrieval: ', error);
    })
  // return new Promise (function (resolve, reject) {
  //   request
  //     .get(options, function (err, res, body) {
  //       // console.log('err', err);
  //       console.log('inside api req')
  //       // console.log('body: ', body);
  //       let parsedBody = JSON.parse(body);
  //       // console.log('body : ', parsedBody[0]);
  //       // console.log('count of items', parsedBody.length);
  //       let repos = [];
  //       for (var repo of parsedBody) {
  //         let obj = {
  //           id: repo.id,
  //           username: repo.owner.login,
  //           repoUrl: repo.owner.url,
  //           updated_at: repo.updated_at
  //         };
  //         repos.push(obj);
  //         // console.log('id:', obj.id);
  //       }
        
  //       // cb(err, repos);
  //       if (err) {
  //         console.log('error in request: ', err)
  //         reject(err);
          
  //       } else {
  //         console.log('resolve in request')
  //        resolve(repos);
  //       }
           
  //     })
  //   })
  

}

// getReposByUsername('octocat'); //for isolated testing. run node github.js
module.exports.getReposByUsername = getReposByUsername;