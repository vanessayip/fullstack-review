const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});
mongoose.Promise = require('bluebird');


let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  username: [{type: String, ref:'User'}],
  updated_at: Date,
  stargazers_count: Number,
  repoUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

let userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  repos: [{type: Schema.Types.ObjectId, ref: 'Repo'}]
});

let User = mongoose.model('User', userSchema);
  // This function should save a repo or repos to
  // the MongoDB
module.exports.save = (repos, cb) => {
  console.log('inside save');
  
  var options = {upsert: true};
  
  var queryUser = {username: repos[0].username};
  
  var updateUser = new User({
    username: repos[0].username
  });
  
  return User.findOneAndUpdate(queryUser, updateUser, options).exec()
    .then((result) => {
      return Promise.all(repos.map(function (aRepo) {
        var queryRepo = {id: aRepo.id};
      
        var updateRepo = new Repo({
          id: aRepo.id,
          username: aRepo.username,
          updated_at: aRepo.updated_at,
          repoUrl: aRepo.repoUrl,
          stargazers_count: aRepo.stargazers_count
        });
        
        return Repo.findOneAndUpdate(queryRepo, updateRepo, options).exec()
          .then((results) => {
            console.log('success adding: ', results)
          })
          .catch((error) => {
            console.log('error: ', error); 
          });
      }))
    })
    .catch((error) => {
      console.log('error, duplicate user entries: ', error); 
      return Promise.resolve('there was an error')
    })
    .then((results) => {
      console.log('success: ', results)
      return Promise.resolve('made it! done saving')
    })
    .catch((error) => {
      console.log('error, duplicate repo entries: ', error); 
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
// module.exports.save = save;