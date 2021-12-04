import React from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import tripsInfo from '../data/fundsInfo.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { useEffect, useState } from 'react';
import { StylesContext } from '@material-ui/styles';
import { TextField, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const gridStyles = makeStyles({
  container: {
    height: "150%",
    minHeight: 100,
    border: "1px solid black",
  },
  containerTall: { 
    minHeight: 250
  }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

let expenses = [
{
  "trip": "N/A",
  "date": "01/01/1969",
  "description": "N/A",
  "amount": "0"
}
]

function addRowsFromArray(tripName) {
  return (expenses.map((expense) => { 
    if (expense.trip === tripName)
      return (<TableRow
          key={expense.description}
        >
          <TableCell align="left">{expense.date}</TableCell>
          <TableCell align="center">{expense.description}</TableCell>
          <TableCell align="right">{expense.amount}</TableCell>
        </TableRow>)
  }))
}

function addJSONToArray(trip) {

  trip.ledger.forEach(expense => {
    var newExpense = {
      "trip": trip.tripName,
      "date": expense.date,
      "description": expense.reason,
      "amount": expense.amount
    };

    var foundMatch = false;
    expenses.forEach(ex => {
      if (ex.description === expense.reason)
        foundMatch = true;
    })

    if (!foundMatch)
      expenses.push(newExpense)

  });

}


function addNewExpense() {

  var tripBox = document.getElementById("tripbox-select")
  var dateBox = document.getElementById("datebox")
  var descriptionBox = document.getElementById("descbox")
  var amtBox = document.getElementById("amtbox")

  var tableToModify = document.getElementById("table_" + tripBox.innerHTML)

  if (tripBox.innerHTML === "" || amtBox.value === "")
    return

  expenses.push({
    "trip": tripBox.innerHTML,
    "date": dateBox.value,
    "description": descriptionBox.value,
    "amount": '$' + amtBox.value
  })

  expenses = expenses.sort(function(a,b) {
    return new Date(b.date) - new Date(a.date);
  })

  ReactDOM.render(addRowsFromArray(tripBox.innerHTML), tableToModify)
}

const TripPicker = () => {
  const [tripName, setTripName] = React.useState();
  const handleTripChange = (name) => {
    setTripName(name);
  };

  return (
    <FormControl id="tripbox" fullWidth style={{paddingLeft:"10px", paddingRight:"10px"}}>
      <InputLabel id="tripbox-label">Trip</InputLabel>
      <Select 
        labelId="tripbox-label"
        id="tripbox-select" 
        value={tripName}
        label="Trip"
        onChange={handleTripChange}
        variant="standard"
      >
        <MenuItem value={"Trip to New York"}>Trip to New York</MenuItem>
        <MenuItem value={"Trip to Paris"}>Trip to Paris</MenuItem>
      </Select>
    </FormControl>
  );
}

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
      setSelectedDate(date);
  };
  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
              format="MM/dd/yyyy"
              id="datebox"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
          />
      </MuiPickersUtilsProvider>
  );
}

function ManageFunds() {

  const [trips, setTrips] = useState();
  useEffect(() => {
    setTrips(tripsInfo);
  });

  const useClass = gridStyles();

  return (
    <Grid container direction="row" spacing={2}>
    <Grid item xs>
      <div className={useClass.container}>
      <List sx={{width: '100%', }}>
        {trips ? (
          trips.map((trip) => (
            <>
              <ListItem
                key={trip.id}
                // commenting this out for now, not any use to delete trips here rather than on trip menu
                // secondaryAction={
                //   <IconButton edge="end" aria-label="delete">
                //     <DeleteIcon />
                //   </IconButton>
                // }
              >
                <ListItemText primary={trip.tripName} />
              </ListItem>

              {trip.people.map((person) => (
                <ListItem 
                  key={trip.id + "_" + person}
                  sx={{pl:4}}
                >
                    <ListItemText primary={person} />
                </ListItem>
                ))}
            
            </>
          ))
          
        )

        : (<h1> no data </h1>)}

      </List>
      </div>

    </Grid>
    <Grid item container direction="column" xs spacing={2}>
      <Grid item xs>
        <div className={useClass.container} >
          <div align="left" style={{display:"flex", alignItems:"center", paddingTop:"10px", margin:"5px"}}>
            <TripPicker />
          </div>
          <div align="left" style={{display:"flex", alignItems:"center", paddingTop:"10px", margin:"5px"}}>
            <DatePicker />
            <TextField id="descbox" label="Description" variant="standard" style={{marginLeft:"10px", marginRight:"10px"}}/>
            <TextField type="number" id="amtbox" label="Amount" variant="standard" style={{marginLeft:"10px", marginRight:"10px"}}/>
            <Button variant="contained" onClick={addNewExpense}>Add Expense</Button>
          </div>
        </div>
      </Grid>
      <Grid item xs>
        <div className={clsx(useClass.container, useClass.containerTall)}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                {trips ? (
                  trips.map((trip) => (
                    <>
                      {addJSONToArray(trip)}
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left" colSpan={2}>
                            {trip.tripName}
                          </StyledTableCell>
                          <StyledTableCell align="right" colSpan={1}>
                            You Owe:
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody id={"table_" + trip.tripName}>
                        {addRowsFromArray(trip.tripName)}
                      </TableBody>
                    </>
                  ))
                ) : (<h1> no data </h1>)}
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
    <Grid item xs>
      <div className={useClass.container}>
        <div>Total</div>
        <div>You owe: $74</div>
      </div>
      
    </Grid>
  </Grid>
  );
}

export default ManageFunds;
