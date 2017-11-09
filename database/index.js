const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});
mongoose.Promise = require('bluebird');

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  username: String,
  updated_at: Date,
  repoUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

  // This function should save a repo or repos to
  // the MongoDB
let save = (repos, cb) => {
  console.log('inside save');
  //aRepo, an array of repos
  for (var aRepo of repos) {
    var newRepo = new Repo({
      id: aRepo.id,
      username: aRepo.username,
      updated_at: aRepo.updated_at,
      repoUrl: aRepo.repoUrl
    })
    newRepo.save(function (err, success) {
      if (err) {
        console.log('error: ', err);
      } else {
        console.log('success!', succeess);
      }
    })
  }

  

  // cb();
}

module.exports.save = save;