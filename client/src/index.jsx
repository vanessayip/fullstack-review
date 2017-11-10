import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    console.log('inside app comp search');
    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify({username: term})
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
  
  componentDidMount() {
    console.log('inside componentDidMount');
    $.ajax({
      type: 'GET',
      url: '/repos',
      contentType: 'application/json',
    })
    .done((result) => {
      // console.log('result from get repos: ', result);
      this.setState({repos: result});
      console.log('inside state: ', this.state.repos);
    })
    .fail((error) => {
      console.log('error from get repos:', error);
    })  
  }
}

ReactDOM.render(<App />, document.getElementById('app'));