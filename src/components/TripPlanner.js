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
    const handleChange = (event, newValue) => {
        // history.push(`/home/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
    };

    return (
        <>
            <TripInfo />
            <div id="tabFrame">
                <Tabs variant="fullWidth" style = {{fontWeight : "bold" , backgroundColor : "rgb(120,255,167)"  , textAlign : "center" , justifyContent : "center" , borderTopLeftRadius : "40px" , borderTopRightRadius : "40px" }} value={selectedTab} onChange={handleChange}>
                    <Tab style = {{fontWeight : "bold" }} label="Flights" icon={<FaPlane/>} />
                    <Tab style = {{fontWeight : "bold" }} label="Hotels" icon={<FaHotel/>}/>
                    <Tab style = {{fontWeight : "bold" }} label="Activities" icon={<FaBasketballBall/>}/>
                </Tabs>
            
                {selectedTab === 0 && <FlightsTab />}
                {selectedTab === 1 && <HotelsTab />}
                {selectedTab === 2 && <ActivitiesTab />}
            </div>
        </>
    );
}


const TripInfo = () => {
    return (
        <Card id="formParent">
            <form>
                <div id="textFieldContainer"> <TextField className="textfield" id="origin" label="Origin" variant="outlined" /> </div>
                <FaArrowsAltH id="arrowIcon" size={30} />
                <div id="textFieldContainer"> <TextField className="textfield" id="destination" label="Destination" variant="outlined" /> </div>
                <div id="textFieldContainer">
                    <DatePicker />
                </div>
                <div id="textFieldContainer"> <TextField className="textfield" id="adults" label="Adults" variant="outlined" /> </div>
                <div id="textFieldContainer"> <TextField className="textfield" id="budget" label="Max Budget" variant="outlined" /> </div>

                <Button id="submit" variant="contained" style = {{color : "black", padding : "4px" , font : "bold" , background: "rgb(30,255,147)"}}><b>Let's Go</b></Button>

            </form>
        </Card>
    )
}

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