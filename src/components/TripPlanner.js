// import { AppBar } from '@mui/material';
import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Tabs, Tab, AppBar } from "@material-ui/core"
import FlightsTab from './FlightsTab';
import HotelsTab from './HotelsTab';
import ActivitiesTab from './ActivitiesTab'
import { FaArrowsAltH } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaBasketballBall } from "react-icons/fa";
import Card from '@mui/material/Card';


import App from '../App';
import { TextField, Button } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const TripPlanner = props => {
    // const { match, history } = props;
    // const { params } = match;
    // const { page } = params;
    const indexToTabName = {
        flights: 0,
        hotels: 1,
        activities: 2
    };

    const [selectedTab, setSelectedTab] = React.useState(0);
    const [show, setShow] =  React.useState(false);
    const [origin, setOrigin] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [adults, setAdults] = React.useState('');
    const [budget, setBudget] = React.useState('');


    
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleLets =  (event, newValue) => {
        let count = 0;
        if(origin.length == 0){
            toast.error('origin cannot be empty', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                count++;
        }
        if(destination.length == 0){
            toast.error('you need to fill your destination', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                count++;
        }
        if(adults.length == 0){
            toast.error('you need to enter the number of adults', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            count++;
        }
        if(!Number.isInteger(parseInt(adults))){
            toast.error('Adults field should only contain numbers', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            count++;
            
        }
        if(budget.length == 0){
            toast.error('you need to enter your trip budget', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            count++;
        }
        if(!Number.isInteger(parseInt(budget))){
            toast.error('budget can be in dollars only!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            count++;
            
        }
        if(count == 0){
            setShow(true);
        }
        
    };

    const handleChangeText = (event, newValue) => {
                console.log(event.target.id);
                console.log(event.target.value);
            };

    return (
        <>
          
            <Card id="formParent">
            <form>
                <div id="textFieldContainer"> <TextField  onChange={e => setOrigin(e.target.value)} className="textfield" id="origin" label="Origin" variant="outlined" /> </div>
                <FaArrowsAltH id="arrowIcon" size={30} />
                <div id="textFieldContainer"> <TextField onChange={e => setDestination(e.target.value)}  className="textfield" id="destination" label="Destination" variant="outlined" /> </div>
                <div id="textFieldContainer">
                    <DatePicker />
                </div>
                <div id="textFieldContainer"> <TextField onChange={e => setAdults(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} className="textfield" id="adults" label="Adults" variant="outlined" /> </div>
                <div id="textFieldContainer"> <TextField onChange={e => setBudget(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} className="textfield" id="budget" label="Max Budget" variant="outlined" /> </div>

                <Button onClick = {handleLets}  id="submit" variant="contained" style = {{color : "black", padding : "4px" , font : "bold" , background: "rgb(30,255,147)"}}><b>Let's Go</b></Button>

            </form>
        </Card>
            <div id="tabFrame">
                <Tabs variant="fullWidth" style = {{fontWeight : "bold" , backgroundColor : "rgb(120,255,167)"  , textAlign : "center" , justifyContent : "center" , borderTopLeftRadius : "40px" , borderTopRightRadius : "40px" }} value={selectedTab} onChange={handleChange}>
                    <Tab style = {{fontWeight : "bold" }} label="Flights" icon={<FaPlane/>} />
                    <Tab style = {{fontWeight : "bold" }} label="Hotels" icon={<FaHotel/>}/>
                    <Tab style = {{fontWeight : "bold" }} label="Activities" icon={<FaBasketballBall/>}/>
                </Tabs>
            {show ? ( <div> {selectedTab === 0 && <FlightsTab />}
                {selectedTab === 1 && <HotelsTab />}
                {selectedTab === 2 && <ActivitiesTab />} </div>) : (<h1 style = {{height : "100vh", paddingBotton : "100%"}}> Fill in your trip details and hit Lets Go!</h1>) }
             
            </div>
            <ToastContainer position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />  
        </>
    );
}


// const TripInfo = () => {
    
//     const handleChangeText = (event, newValue) => {
//         console.log(event.target.id);
//         console.log(event.target.value);
   
//     };

//     return (
   
//     )
// }

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="duration"
                label="Pick your trip duration"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}


export default TripPlanner;

// FaArrowsAltH