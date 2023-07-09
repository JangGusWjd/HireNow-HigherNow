import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CheckApp = () => {
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://49.247.33.67:8080/apply/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div>
      <h1>Data:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <button type="submit">Fetch Data</button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.applicationId}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.createdTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CheckApp;
