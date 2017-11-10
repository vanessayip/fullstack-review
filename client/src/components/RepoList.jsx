import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const list = this.props.repos.map((repo, idx) => {
      return (
        <div key = {idx}>
          <li>Repo_id: {repo.id}</li>
          <li>Username: {repo.username}</li>
          url: {repo.repoUrl}
        </div>
        )
      }
    );
    
    return (
      <div>
        <h4> Repo List Component </h4>
        {list}
      </div>
    )
  }
}

export default RepoList;