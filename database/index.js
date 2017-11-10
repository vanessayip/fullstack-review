const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});
mongoose.Promise = require('bluebird');


let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  username: String,
  updated_at: Date,
  stargazers_count: Number,
  repoUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

  // This function should save a repo or repos to
  // the MongoDB
let save = (repos, cb) => {
  console.log('inside save');
  
  return Promise.all(repos.map(function (aRepo) {
    var query = {id: aRepo.id};
  
    var update = new Repo({
      id: aRepo.id,
      username: aRepo.username,
      updated_at: aRepo.updated_at,
      repoUrl: aRepo.repoUrl,
      stargazers_count: aRepo.stargazers_count
    });
    
    var options = {upsert: true};
    
    return Repo.findOneAndUpdate(query, update, options).exec()
      .then((results) => {
        console.log('success adding: ', results)
      })
      .catch((error) => {
        console.log('error: ', error); 
      })
  }))
  .then((results) => {
    console.log('success: ', results)
    return Promise.resolve('made it! done saving')
  })
  .catch((error) => {
    console.log('error, duplicate entries: ', error); 
    return Promise.resolve('there was an error')
  })
}
    //aRepo, an array of repos
    // for (var aRepo of repos) {
    //   var query = {id: aRepo.id};
      
    //   var update = new Repo({
    //     id: aRepo.id,
    //     username: aRepo.username,
    //     updated_at: aRepo.updated_at,
    //     repoUrl: aRepo.repoUrl
    //   });
      
    //   var options = {upsert: true};
      
      // Repo.findOneAndUpdate(query, update, options, function (error, result) {
      //   if (error) {
      //     console.log('error on updating. record already exists');
      //     reject(error)
      //   } else {
          
      //     console.log('result: ', result);
      //     resolve(result);
      //     //why do i not need to save if done through update?
      //     // update.save(function (err, success) {
      //     //   if (err) {
      //     //     console.log('error on save: ', err);
      //     //   } else {
      //     //     console.log('success on save!', success);
      //     //   }
      //     // })
          
      //   }
      // });

module.exports.findTop25 = function () {
  console.log('inside findtop25');
  return Repo.find().sort({stargazers_count: -1, updated_at: -1}).limit(25);
}
module.exports.save = save;