import React from "react";
import { Checkbox } from "@mui/material";
import allAirlinesData from '../data/airlines.json';
import flightsData from '../data/flightsData.json'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useEffect, useState } from 'react';



const FlightsTab = () => {
    const [allAirlines, setAllairlines] = useState();
    const [flights, setFlights] = useState();
    useEffect(() => {
        setAllairlines(allAirlinesData);
        setFlights(flightsData)
    });
    return (
        <div id="flightsContainer">
            <div id="leftPane">
                <h3> Filter by </h3>
                <p id="stopsHeading"> Stops: </p>

                <div id="noStopContainer">
                    <Checkbox id="noStopCheck" defaultChecked />
                    <label id="noStopLabel">
                        No stop
                    </label>
                </div>

                <div id="oneStopContainer">
                    <Checkbox id="oneStopCheck" defaultChecked />
                    <label id="oneStopLabel">
                        1 stop
                    </label>
                </div>



                <p id="stopsHeading"> Airlines: </p>
                <>
                    {
                        (allAirlines ?
                            allAirlines.map((item, key) => {
                                return (
                                    <div>
                                        <Checkbox id={"flight" + key} defaultChecked />
                                        <label id="noStopLabel">
                                            {item}
                                        </label>
                                    </div>
                                )
                            }) :
                            <h3> No airlines to display </h3>
                        )
                    }
                </>


            </div>
            <div id="mainPane">
                <h3> Departing Flights</h3>
                <>
                    {
                        (flights ?
                            flights.map((item, key) => {
                                return (
                                    <div>
                                        <Card id="flightCard">
                                            <div id="flightContainer">
                                            <img src={item.img} height="100px" width="100px" />
                                                <div id="cardColumn">
                                                    <p> {item.departureTime} - {item.arrivalTime}</p>
                                                    <h4> {item.name}</h4>
                                                </div>
                                                <div id="cardColumn">
                                                    <p> {item.duration}</p>
                                                    <span> <p> {item.departureAirport} - {item.arrivalAirport}</p> </span>
                                                </div>
                                                <div id="cardColumn">
                                                    <p> {item.stopsCount} Stop(s)</p>
                                                    <span> <p> {item.stops}</p> </span>
                                                </div>
                                                <div id="cardColumn">
                                                    <p> Price </p>
                                                    <span> <p id="price"> {item.price}</p> </span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )
                            }) :
                            <h3> Keep Calm. Loading.... </h3>
                        )
                    }
                </>

            </div>
        </div>
    );
};

export default FlightsTab;