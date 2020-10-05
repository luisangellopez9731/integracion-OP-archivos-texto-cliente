import React, {Component, useState, useEffect, useRef} from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Icon,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import UnapecLogo from './assets/unapec-logo.png'

import "./App.css";
import bodyParser from "body-parser";

const getPayroll = async () => {
  const response = await fetch("/api/payroll");
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body.data;
};

const App = () => {
  let [adding, setAdding] = useState(false);
  let [payroll, setPayroll] = useState([]);

  let [newDocument, setNewDocument] = useState("");
  let [newAccountNumber, setNewAccountNumber] = useState("");
  let [newSalary, setNewSalary] = useState(1.0);

  let [generateMessage, setGenerateMessage] = useState("");

  let payrollRef = useRef();

  const add = () => {
    setAdding(true);
    setTimeout(function () {
      payrollRef.current.scroll(0, 1000);
    }, 100);
  };

  const addNew = () => {
    var payroll_ = payroll;
    payroll_.push({
      Document: newDocument,
      AccountNumber: newAccountNumber,
      Salary: newSalary,
    });

    setPayroll(payroll_);
    setAdding(false);
    setNewSalary("1");
    setNewDocument("");
    setNewAccountNumber("");
  };

  const remove = index => {
    var payr = Array.from(payroll);
    payr.splice(index, 1);
    setPayroll(payr);
  };

  const generate = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({post: payroll}),
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    if (body.data == "ok") {
      setGenerateMessage("Generado y enviado");
    } else {
      setGenerateMessage(body.error);
    }

    return body.data;
  };

  useState(() => {
    getPayroll().then(res => {
      console.log(res);
      setPayroll(res);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <img src={UnapecLogo}/>
        <h3>Nomina de profesores</h3>
      </header>
      <main>
        <div style={{textAlign: "right"}}>
          <Button className="margin" onClick={add} variant="contained" color="primary">
            Agregar
          </Button>
        </div>
        <div className="payroll" ref={payrollRef}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Cedula</TableCell>
                  <TableCell align="center">Numero de cuenta</TableCell>
                  <TableCell align="center">Monto</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payroll.map((row, i) => (
                  <TableRow key={row.ID}>
                    <TableCell align="center" component="th" scope="row">
                      {row.Document}
                    </TableCell>
                    <TableCell align="center">{row.AccountNumber}</TableCell>
                    <TableCell align="center">{row.Salary}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          remove(i);
                        }}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {adding ? (
                  <TableRow>
                    <TableCell align="center">
                      <TextField
                        id="standard-basic"
                        label="Cedula"
                        value={newDocument}
                        onChange={e => setNewDocument(e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        id="standard-basic"
                        label="Numero de cuenta"
                        value={newAccountNumber}
                        onChange={e => setNewAccountNumber(e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        id="standard-basic"
                        label="Monto"
                        value={newSalary}
                        onChange={e => setNewSalary(e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary" onClick={addNew}>Aceptar</Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Button
          onClick={generate}
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          className="margin"
        >
          Generar y enviar
        </Button>
        <div>
          <p>{generateMessage}</p>
        </div>
      </main>
    </div>
  );
};

export default App;
