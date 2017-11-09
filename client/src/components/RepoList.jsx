import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    Look, {props.repos[0].name} has a repo at {props.repos[0].url}
  </div>
)

export default RepoList;