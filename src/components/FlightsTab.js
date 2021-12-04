import React from "react";
import { Checkbox } from "@mui/material";
import allAirlinesData from '../data/airlines.json';
import data from '../data/flightsData.json'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useEffect, useState } from 'react';



var flightsData = data
const FlightsTab = () => {
    const [allAirlines, setAllairlines] = useState(allAirlinesData);
    const [flights, setFlights] = useState(flightsData);

    const handleAirlineCheck = (val, isChecked) =>{
        // console.log("Tise==> checkbox clicked "+val+" "+isChecked)

        // console.log("Tise==> "+JSON.stringify(flightsData))
        if (!isChecked){
            var newData = []
            for (var flight in flightsData){
                if (flightsData[flight]["name"] != val){
                    newData.push(flightsData[flight])
                }
            }
            flightsData = newData
            setFlights(newData)
        }
        else{
            console.log("Tise adding "+val)
            var newData = Array.from(flightsData)
            for (var flight in data){
                if (data[flight]["name"] == val){
                    console.log("Tise found "+val)
                    newData.push(data[flight])
                }
            }
            // console.log("Tise newdata is "+JSON.stringify(newData))
            flightsData = newData
            setFlights(flightsData)
        }
        
    }

    useEffect(() => {
        console.log("Tise==> useEffect called ")
        setFlights(flightsData)
    }, [flightsData]);
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
                                        <Checkbox onChange={(e)=>handleAirlineCheck(item, e.target.checked)} id={"flight" + key} defaultChecked />
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