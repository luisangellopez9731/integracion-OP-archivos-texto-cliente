import React, {Component, useState, useEffect} from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import logo from "./logo.svg";

import "./App.css";

const getPayroll = async () => {
  const response = await fetch("/api/payroll");
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body.data;
};

const App = () => {
  let [adding, setAdding] = useState(false);
  let [payroll, setPayroll] = useState([]);

  const add = () => {
    setAdding(true);
  };

  useState(() => {
    getPayroll().then(res => {
      console.log(res);
      setPayroll(res);
    });
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
        <div className="payroll">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Cedula</TableCell>
                  <TableCell align="right">Numero de cuenta</TableCell>
                  <TableCell align="right">Moneda</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payroll.map(row => (
                  <TableRow key={row.ID}>
                    <TableCell component="th" scope="row">
                      {row.Document}
                    </TableCell>
                    <TableCell align="right">{row.AccountNumber}</TableCell>
                    <TableCell align="right">DOP</TableCell>
                    <TableCell align="right">{row.Salary}</TableCell>
                    <TableCell align="right"><Button>Eliminar</Button></TableCell>
                  </TableRow>
                ))}
                {adding ? (
                  <TableRow>
                    <TableCell><TextField id="standard-basic" label="Cedula" /></TableCell>
                    <TableCell><TextField id="standard-basic" label="Numero de cuenta" /></TableCell>
                    <TableCell></TableCell>
                    <TableCell><TextField id="standard-basic" label="Monto" /></TableCell>
                    <TableCell><Button>Eliminar</Button></TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <Button onClick={add}>Agregar</Button>
        </div>
        <Button>Generar y enviar</Button>
      </main>
    </div>
  );
};

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
