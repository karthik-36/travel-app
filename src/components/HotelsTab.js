
import * as React from 'react';
import { useState, useEffect } from 'react';
import travelData from '../data/travelCards.json';
import reccData from '../data/recommendCards.json';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import {FormControl,FormLabel,RadioGroup, FormControlLabel, Radio} from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GoogleMapReact from 'google-map-react';
import StarRatings from 'react-star-ratings';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

import { Marker } from "react-simple-maps";
//import MapChart from "./MapChart";


var axios = require("axios").default;


var options = {
  method: 'GET',
  url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/search',
  params: {
    checkin_date: '2022-03-26',
    checkout_date: '2022-03-27',
    sort_order: 'STAR_RATING_HIGHEST_FIRST',
    destination_id: '1708350',
    adults_number: '1',
    locale: 'en_US',
    currency: 'USD',
    children_ages: '4,0,15',
    price_min: '10',
    star_rating_ids: '3,4,5',
    accommodation_ids: '20,8,15,5,1',
    price_max: '500',
    page_number: '1',
    theme_ids: '14,27,25',
    amenity_ids: '527,2063',
    guest_rating_min: '4'
  },
  headers: {
    'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
    'x-rapidapi-key': '0b92bc2163msh779aa268fcc6588p140b6ajsn7a01b442d227'
  }
};

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });


// let defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

const HotelsTab = () => {

  let [hotels, setHotels] = useState([]);

  let getHotels = function () {

    axios.request(options).then(function (response) {
      setHotels(response.data.searchResults.results);
      console.log("after set ");

    }).catch(function (error) {
      console.error(error);
    });

  }

  useEffect(() => {
    getHotels();
    console.log(hotels)
  }, []);



  useEffect(() => {
    console.log(hotels)
  }, [hotels]);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  // 55.74702, lon: 37.63087
  const [position, setPosition] = useState({ coordinates: [55.74702, 37.63088], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function handleChangeRadio(e) {

    console.log(e.target.value);
    let newHotels = [];
    if(e.target.value == "Price"){
      
      newHotels = hotels.sort((a,b) => {
        return a.ratePlan.price.exactCurrent - b.ratePlan.price.exactCurrent;

        
      }) 

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x,i) => { return newHotels[i]; }));

    }
    else if(e.target.value == "Vacancy"){

      newHotels = hotels.sort((a,b) => {
        if(!b.roomsLeft){
          b.roomsLeft = 7;
        }
        return b.roomsLeft - a.roomsLeft;
      }) 

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x,i) => { return newHotels[i]; }));
    }
    else if(e.target.value == "Star Rating"){

      newHotels = hotels.sort((a,b) => {
        return b.starRating - a.starRating;
      }) 

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x,i) => { return newHotels[i]; }));
    }
    


  //  this.setState({ selected: ev.target.value });
  };

  return (<div>
    <Grid container direction="row" spacing={2} justifyContent="center"
    >
      <Grid style={{ height: "100vh", background: "white", borderRadius: "5px", marginTop: "12px"  }} item xs={3}>
        <FormControl  component="fieldset">
          <FormLabel component="legend"><b>Sort hotel by</b></FormLabel>
          <RadioGroup
            aria-label="Sort by"
            defaultValue="Star Rating"
            name="radio-buttons-group"
            onChange={handleChangeRadio}
          >
            <FormControlLabel value="Star Rating" control={<Radio />} label="Star Rating" />
            <FormControlLabel value="Price" control={<Radio />} label="Price" />
            <FormControlLabel value="Vacancy" control={<Radio />} label="Vacancy" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <Grid container item xs={12}  >
          {hotels.map((hotel) => {
            return (<Grid container xs={12} style={{ background: "white", margin: "4px", padding: "5px", borderRadius: "7px", boxShadow: "2px 4px" }}>

              <Grid xs={12} sm={12} md={12} lg={4}>
                <div >
                  <img style={{ border: "3px solid black", borderRadius: "4px", marginRight: "20px" }} src={hotel.optimizedThumbUrls.srpDesktop} />
                </div> </Grid>
              <Grid xs={12} sm={12} md={12} lg={5}>
                <div style={{ textAlign: "left", padding: "5px", marginLeft: "5px", paddingLeft: "15px", borderLeft: "2px solid black" }}>
                  <h3> {hotel.name} </h3>
                  <p> {hotel.address.streetAddress} </p>
                  <p>{hotel.ratePlan.price.fullyBundledPricePerStay.split("&nbsp;").join(" ")}</p>

                </div> </Grid>
              <Grid xs={12} sm={12} md={12} lg={3}>
                <div style={{ textAlign: "left", padding: "23px 5px 5px" }}>
                  {/* <p> rating :  {hotel.starRating} </p> */}
                  <StarRatings
                    rating={hotel.starRating}
                    starRatedColor="orange"
                    starDimension="20px"
                    starSpacing="5px"
                  />
                  <p> <b> Rooms left </b> : {hotel.roomsLeft ? hotel.roomsLeft : 7} </p>
                  <Button variant="contained" color="success">Book Now</Button>

                </div> </Grid>

            </Grid>);
          })}
        </Grid>
      </Grid>

      <Grid style={{ height: "100vh", background: "white", borderRadius: "5px", marginTop: "12px" }} item xs={3}>


        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact> */}
        <div>
          {/* <ComposableMap>
        <Geographies geography={geoUrl}>
          {({geographies}) => geographies.map(geo =>
            <Geography key={geo.rsmKey} geography={geo} />
          )}
        </Geographies>
      </ComposableMap> */}
          <ComposableMap
            center={position.coordinates}
            style={{ background: "white", border: "2px solid black" }}
            projection="geoAlbers"
            projectionConfig={{
              scale: 200
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#DDD"
                    stroke="#FFF"
                  />
                ))
              }
            </Geographies>
            {/* <Marker coordinates={[-101, 53]} fill="#777">
        <text textAnchor="middle" fill="#F53">
          Canada
        </text>
      </Marker>
      <Marker coordinates={[-102, 38]} fill="#777">
        <text textAnchor="middle" fill="#F53">
          USA
        </text>
      </Marker>
      <Marker coordinates={[-103, 25]} fill="#FFF">
        <text textAnchor="middle" fill="#000">
          Mexico
        </text>
      </Marker> */}

            {
              hotels.map((hotel) => {
                return (<Marker coordinates={[hotel.coordinate.lon, hotel.coordinate.lat]} fill="#777">
                  <text textAnchor="middle" fill="#000">
                    v
                  </text>
                </Marker>)
              })
            }


          </ComposableMap>
          {/* <ComposableMap>
        <ZoomableGroup
          zoom={position.zoom}
          center={[55.74702,37.63088 ]}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ZoomableGroup>
        {
        hotels.map((hotel) => {
          return (  <Marker coordinates={[hotel.coordinate.lat,hotel.coordinate.lon]} fill="#777">
          <text textAnchor="middle" fill="#F53">
            v
           </text>
          </Marker>)
        })
      }
      </ComposableMap> */}

          {/* <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div> */}

        </div>
      </Grid>

    </Grid>
  </div>);
};

export default HotelsTab;