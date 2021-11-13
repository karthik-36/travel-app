import React from 'react';
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
import { TextField } from '@mui/material';

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
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
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
          <div align="left" style={{display:"flex", alignItems:"center"}}>
            <TextField id="outlined-basic" label="Date" variant="outlined"/>
            <TextField id="outlined-basic" label="Description" variant="outlined"/>
            <TextField id="outlined-basic" label="Amount" variant="outlined"/>
            <Button variant="contained">Add Expense</Button>
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
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left" colSpan={3}>
                            {trip.tripName}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trip.ledger.map((expense) => (
                          <TableRow
                            key={expense.date}
                          >
                            <TableCell align="left">{expense.date}</TableCell>
                            <TableCell align="center">{expense.reason}</TableCell>
                            <TableCell align="right">{expense.amount}</TableCell>
                          </TableRow>
                        ))}
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
