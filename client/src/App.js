import React, { Component, useState, useEffect } from 'react';
import {Button} from '@material-ui/core';

import logo from './logo.svg';

import './App.css';

const getPayroll = async() => {
  const response = await fetch('/api/payroll');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body.data;
}

const App = () => {

  let [payroll, setPayroll] = useState([]);

  useState(() => {
    getPayroll().then(res => {
      console.log(res);
    })
  }, []);

  return (
    <div className="App">
      {/* <footer className="App-footer">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </footer> */}
      <header>
        <h1>UNAPEC nomina de profesores</h1>
      </header>
      <main>
        <div className="payroll"></div>
        <Button>aaa</Button>
      </main>
    </div>
  );
}

// class App extends Component {
//   state = {
//     response: '',
//     post: '',
//     responseToPost: '',
//   };

//   componentDidMount() {
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));
//   }

//   callApi = async () => {
//     const response = await fetch('/api/hello');
//     const body = await response.json();

//     if (response.status !== 200) throw Error(body.message);

//     return body;
//   };

//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();

//     this.setState({ responseToPost: body });
//   };

//   render() {

//   }
// }

export default App;
