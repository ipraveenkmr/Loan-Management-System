import { useState } from "react";
import { Typography, Button, Box, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

export default function Calculator() {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [time, setTime] = useState(0);
  const [emi, setEmi] = useState(0);
  const [totalinterest, setTotalinterest] = useState(0);
  const [principal, setPrincipal] = useState(0);

  const handlePrincipalchange = (event) => {
    setPrincipal(event.target.value);
  };
  const handleInterestchange = (event) => {
    setInterest(event.target.value);
  };
  const handleTimechange = (event) => {
    setTime(event.target.value);
  };

  const calculateLoan = () => {
    if (principal > 0 && interest > 0 && time > 0) {
      let p = parseFloat(principal);
      let r = parseFloat(interest);
      let n = parseFloat(time);

      let actualRate = parseFloat(r / 12 / 100);

      let calcemi =
        p *
        actualRate *
        (Math.pow(1 + actualRate, n) / (Math.pow(1 + actualRate, n) - 1));

      setEmi(Math.round(calcemi));
      setAmount(Math.round(calcemi * n));
      setTotalinterest(Math.round(calcemi * n - p));
    } else {
      toast.error("Amount, Interest and Period must be greater than 0!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        toastId: "id",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className="mt-10">
        <Card>
          <div style={{ overflowY: "auto", padding: "40px" }}>
            <Typography variant="h5" align="center">
              Loan Calculator
            </Typography>
            <Box sx={{ m: 2 }} />
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Box sx={{ m: 2 }} />
                <TextField
                  label="Enter loan Amount"
                  type="number"
                  variant="outlined"
                  name="loan_amount"
                  onChange={handlePrincipalchange}
                  value={principal}
                  sx={{ minWidth: "92%" }}
                />
                <Box sx={{ m: 2 }} />
                <TextField
                  label="Enter interest rate"
                  variant="outlined"
                  type="number"
                  name="interest_rate"
                  onChange={handleInterestchange}
                  value={interest}
                  sx={{ minWidth: "92%" }}
                />
                <Box sx={{ m: 2 }} />
                <TextField
                  label="Enter loan period in month"
                  variant="outlined"
                  type="number"
                  name="loan_period_in_month"
                  onChange={handleTimechange}
                  value={time}
                  sx={{ minWidth: "92%" }}
                />
                <Box
                  m={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FormControl
                    size="large"
                    align="center"
                    style={{ marginTop: "10px" }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={calculateLoan}
                    >
                      Calculate
                    </Button>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                alignItems="center"
                justifyContent="center"
              >
                <Box sx={{ m: 2 }} />
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="p">Loan EMI</Typography>
                          <Box sx={{ m: 1 }} />
                          <Typography variant="h6" className="font-bold">
                            ₹ {emi}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ m: 2 }} />
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="p">
                            Total Interest Payable
                          </Typography>
                          <Box sx={{ m: 1 }} />
                          <Typography variant="h6" className="font-bold">
                            ₹ {totalinterest}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ m: 2 }} />
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="p">
                            Total Payment (Principal + Interest)
                          </Typography>
                          <Box sx={{ m: 1 }} />
                          <Typography variant="h6" className="font-bold">
                            ₹ {amount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
          </div>
        </Card>
      </Container>
    </>
  );
}
