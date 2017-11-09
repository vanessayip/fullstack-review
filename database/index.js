const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
mongoose.Promise = require('bluebird');

let repoSchema = mongoose.Schema({
  id: Number,
  username: String,
  updated_at: Date,
  repoUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

  // This function should save a repo or repos to
  // the MongoDB
let save = (repos) => {
  //aRepo, an array of repos
  for (var aRepo of repos)
  var newRepo = new Repo({
    id: aRepo.id,
    username: aRepo.username,
    updated_at: aRepo.updated_at,
    repoUrl: aRepo.repoUrl
  })
  console.log('inside save');
}

module.exports.save = save;