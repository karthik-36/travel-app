
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
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

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
import SimpleDialog from "./DialogHotel"
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


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"



  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  

const HotelsTab = () => {

  let [hotels, setHotels] = useState([]);

  let getHotels = function () {

    console.log("hotel1");
    console.log(hotelsList.searchResults.results);
    setHotels(hotelsList.searchResults.results);
    // axios.request(options).then(function (response) {

    // //  setHotels(response.data.searchResults.results);
    //   console.log("after set ");

    // }).catch(function (error) {
    //   console.error(error);
    // });

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

  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState("xyz");

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


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
    if (e.target.value == "Price") {

      newHotels = hotels.sort((a, b) => {
        return a.ratePlan.price.exactCurrent - b.ratePlan.price.exactCurrent;


      })

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x, i) => { return newHotels[i]; }));

    }
    else if (e.target.value == "Vacancy") {

      newHotels = hotels.sort((a, b) => {
        if (!b.roomsLeft) {
          b.roomsLeft = 7;
        }
        return b.roomsLeft - a.roomsLeft;
      })

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x, i) => { return newHotels[i]; }));
    }
    else if (e.target.value == "Star Rating") {

      newHotels = hotels.sort((a, b) => {
        return b.starRating - a.starRating;
      })

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x, i) => { return newHotels[i]; }));
    }



    //  this.setState({ selected: ev.target.value });
  };





  return (<div>
    <Grid container direction="row" spacing={2} justifyContent="center"
    >
      <Grid style={{ height: "100vh", background: "white", borderRadius: "5px", marginTop: "12px" , borderBottomRightRadius : "100px" }} item xs={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend"><b>Sort hotel by</b></FormLabel>
          <RadioGroup
            aria-label="Sort by"
            defaultValue="Star Rating"
            name="radio-buttons-group"
            onChange={handleChangeRadio}
          >
            <FormControlLabel style={{ padding: "5px", borderRadius: "5px" }} value="Star Rating" control={<Radio />} label="Star Rating" />
            <FormControlLabel style={{ padding: "5px", borderRadius: "5px" }} value="Price" control={<Radio />} label="Price" />
            <FormControlLabel style={{ padding: "5px", borderRadius: "5px" }} value="Vacancy" control={<Radio />} label="Vacancy" />
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
                  <SimpleDialog HotelName = {hotel.name} cost = {hotel.ratePlan.price.fullyBundledPricePerStay.split("&nbsp;").join(" ")}/>
                  {/* <Button variant="contained" color="success" style={{ background: "rgb(30,255,147)", padding: "5px", borderRadius: "5px" }}><b>Book Now</b></Button> */}
                  
                </div> </Grid>

            </Grid>);
          })}
        </Grid>
      </Grid>

      <Grid style={{ height: "100vh", background: "white", borderRadius: "5px", marginTop: "12px" , borderBottomLeftRadius : "100px" }} item xs={3}>
        <div>

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




        </div>
      </Grid>

    </Grid>
  </div>);
};

var hotelsList = {
  "header": "Moscow, Russia",
  "query": {
    "destination": {
      "id": "1153093",
      "value": "Moscow, Russia",
      "resolvedLocation": "CITY:1153093:UNKNOWN:UNKNOWN"
    }
  },
  "searchResults": {
    "totalCount": 2529,
    "results": [
      {
        "id": 676613,
        "name": "Sadovnicheskaya Hotel",
        "starRating": 5,
        "urls": {},
        "address": {
          "streetAddress": "Sadovnicheskaya 20 str. 1",
          "extendedAddress": "Zamoskworieczje",
          "locality": "Moscow",
          "postalCode": "114122",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.3,
          "rating": "4.3",
          "total": 179,
          "scale": 5,
          "badge": "fabulous",
          "badgeText": "Fabulous"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "0.9 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "0.5 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$277",
            "exactCurrent": 277.47,
            "old": "$462",
            "fullyBundledPricePerStay": "total $333 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": false,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Central Administrative Okrug",
        "deals": {
          "specialDeal": {
            "dealText": "Save40%"
          },
          "priceReasoning": "DRR-527"
        },
        "messaging": {
          "scarcity": "4 left on our app"
        },
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|TESCO",
        "coordinate": {
          "lat": 55.74702,
          "lon": 37.63087
        },
        "roomsLeft": 4,
        "providerType": "LOCAL",
        "supplierHotelId": 17787669,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/18000000/17790000/17787700/17787669/b3b244f6_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 133660,
        "name": "Radisson Collection Hotel, Moscow",
        "starRating": 5,
        "urls": {},
        "address": {
          "streetAddress": "2/1 Kutuzovsky Avenue",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "121248",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.6,
          "rating": "4.6",
          "total": 221,
          "scale": 5,
          "badge": "superb",
          "badgeText": "Superb"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "1.9 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "2.1 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$292",
            "exactCurrent": 292.36,
            "fullyBundledPricePerStay": "total $351 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": false,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Dorogomilovo",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|TESCO",
        "coordinate": {
          "lat": 55.75173,
          "lon": 37.56669
        },
        "providerType": "LOCAL",
        "supplierHotelId": 520503,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/1000000/530000/520600/520503/1cb31097_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 583038496,
        "name": "Hyatt Regency Moscow Petrovsky Park",
        "starRating": 5,
        "urls": {},
        "address": {
          "streetAddress": "Leningradsky Avenue 36, Building 33",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "125167",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.7,
          "rating": "4.7",
          "total": 68,
          "scale": 5,
          "badge": "exceptional",
          "badgeText": "Exceptional"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "2.8 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "3.5 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$122",
            "exactCurrent": 121.82,
            "fullyBundledPricePerStay": "total $146 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Airport District",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|priceRangeUK|TESCO",
        "coordinate": {
          "lat": 55.78683,
          "lon": 37.5665
        },
        "providerType": "LOCAL",
        "supplierHotelId": 18188703,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/19000000/18190000/18188800/18188703/659fc313_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 471879,
        "name": "Avshar Hotel",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Novo-Nikolskaya 2A, microrayon Opalikha",
          "extendedAddress": "",
          "locality": "Krasnogorsk",
          "postalCode": "143443",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 5,
          "rating": "5.0",
          "total": 1,
          "scale": 5,
          "badge": "exceptional",
          "badgeText": "Exceptional"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "15 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "15 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$135",
            "exactCurrent": 135.35,
            "fullyBundledPricePerStay": "total $162 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": true,
            "noCCRequired": false
          },
          "type": "Dual"
        },
        "neighbourhood": "Krasnogorsk",
        "deals": {},
        "messaging": {
          "scarcity": "2 left on our app"
        },
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|TESCO",
        "coordinate": {
          "lat": 55.83743,
          "lon": 37.25958
        },
        "roomsLeft": 2,
        "providerType": "LOCAL",
        "supplierHotelId": 8962971,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/9000000/8970000/8963000/8962971/36df3f95_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 1250363264,
        "name": "Armega",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Shestovo Village 44",
          "extendedAddress": "",
          "locality": "Lukino",
          "postalCode": "142000",
          "region": "Moscow Oblast",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.3,
          "rating": "4.3",
          "total": 11,
          "scale": 5,
          "badge": "fabulous",
          "badgeText": "Fabulous"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "20 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "19 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$130",
            "exactCurrent": 129.71,
            "fullyBundledPricePerStay": "total $156 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": true,
            "noCCRequired": false
          },
          "type": "Dual"
        },
        "neighbourhood": "Lukino",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13",
        "coordinate": {
          "lat": 55.495612,
          "lon": 37.844971
        },
        "providerType": "LOCAL",
        "supplierHotelId": 39042602,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/40000000/39050000/39042700/39042602/dd168e90_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 446797,
        "name": "Aparthotel Adagio Moscow Paveletskaya",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Bakhrushina Street 11",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "115054",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.6,
          "rating": "4.6",
          "total": 33,
          "scale": 5,
          "badge": "superb",
          "badgeText": "Superb"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "1.6 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "1.0 mile"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$70",
            "exactCurrent": 69.93,
            "fullyBundledPricePerStay": "total $84 for 1&nbsp;apartment, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": false,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Zamoskvorechye District",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|TESCO",
        "coordinate": {
          "lat": 55.735886,
          "lon": 37.634941
        },
        "providerType": "LOCAL",
        "supplierHotelId": 7213099,
        "vrBadge": "Condo Hotel",
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/8000000/7220000/7213100/7213099/e184cb6a_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 619669920,
        "name": "President-Hotel",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "B. Yakimanka 24",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "103134",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.4,
          "rating": "4.4",
          "total": 233,
          "scale": 5,
          "badge": "fabulous",
          "badgeText": "Fabulous"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "1.3 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "0.7 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$106",
            "exactCurrent": 105.97,
            "old": "$118",
            "fullyBundledPricePerStay": "total $158 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": false,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Yakimanka",
        "deals": {
          "secretPrice": {
            "dealText": "Save more with Secret Prices"
          },
          "priceReasoning": "DRR-443"
        },
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|HRW|TESCO",
        "coordinate": {
          "lat": 55.73754,
          "lon": 37.61266
        },
        "providerType": "LOCAL",
        "supplierHotelId": 19333435,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/20000000/19340000/19333500/19333435/9bd94e0d_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 219422,
        "name": "Radisson Slavyanskaya Hotel and Business Centre, Moscow",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Europe Square, 2",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "121059",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.2,
          "rating": "4.2",
          "total": 338,
          "scale": 5,
          "badge": "very-good",
          "badgeText": "Very Good"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "2.1 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "2.0 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$338",
            "exactCurrent": 338.38,
            "fullyBundledPricePerStay": "total $406 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Dorogomilovo",
        "deals": {},
        "messaging": {
          "scarcity": "3 left on our app"
        },
        "badging": {
          "hotelBadge": {
            "type": "vipBasic",
            "label": "VIP"
          }
        },
        "pimmsAttributes": "DoubleStamps|TESCO",
        "coordinate": {
          "lat": 55.74276,
          "lon": 37.5683
        },
        "roomsLeft": 3,
        "providerType": "LOCAL",
        "supplierHotelId": 26199,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/1000000/30000/26200/26199/fd3c5ef6_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 453294,
        "name": "DoubleTree by Hilton Hotel Moscow - Marina",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Bld. 1, 39 Leningradskoe Shosse",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "125212",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.8,
          "rating": "4.8",
          "total": 68,
          "scale": 5,
          "badge": "exceptional",
          "badgeText": "Exceptional"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "7.3 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "7.9 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$138",
            "exactCurrent": 138.06,
            "fullyBundledPricePerStay": "total $166 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": false,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Voykovsky",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|priceRangeUK|TESCO",
        "coordinate": {
          "lat": 55.83277,
          "lon": 37.48591
        },
        "providerType": "LOCAL",
        "supplierHotelId": 7422047,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/8000000/7430000/7422100/7422047/ee31d795_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 447796,
        "name": "Mercure Moscow Paveletskaya",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Bakhrushina Street 11",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "115184",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.4,
          "rating": "4.4",
          "total": 76,
          "scale": 5,
          "badge": "fabulous",
          "badgeText": "Fabulous"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "1.6 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "1.0 mile"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$203",
            "exactCurrent": 203.03,
            "fullyBundledPricePerStay": "total $244 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Zamoskvorechye District",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|HRW|TESCO|showGoldContentDescriptionHCOMUSenUS",
        "coordinate": {
          "lat": 55.73589,
          "lon": 37.63492
        },
        "providerType": "LOCAL",
        "supplierHotelId": 6915566,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/7000000/6920000/6915600/6915566/909b5244_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 493304,
        "name": "Diamant Domodedovo",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Poselok Denezhnikovo, 27",
          "extendedAddress": "",
          "locality": "Konstantinovskoe",
          "postalCode": "140164",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.1,
          "rating": "4.1",
          "total": 7,
          "scale": 5,
          "badge": "very-good",
          "badgeText": "Very Good"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "29 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "29 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$94",
            "exactCurrent": 94.41,
            "old": "$105",
            "fullyBundledPricePerStay": "total $113 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": true,
            "noCCRequired": false
          },
          "type": "Dual"
        },
        "neighbourhood": "Konstantinovskoe",
        "deals": {
          "specialDeal": {
            "dealText": "Save10%"
          },
          "priceReasoning": "DRR-527"
        },
        "messaging": {
          "scarcity": "3 left on our app"
        },
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|TESCO",
        "coordinate": {
          "lat": 55.440469,
          "lon": 38.106368
        },
        "roomsLeft": 3,
        "providerType": "LOCAL",
        "supplierHotelId": 9868294,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/10000000/9870000/9868300/9868294/e5a3d65c_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 482133,
        "name": "Hotel Sevastopol Modern",
        "starRating": 3,
        "urls": {},
        "address": {
          "streetAddress": "1a Bolshaya Yushunskaya Street 1 A",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "117303",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.3,
          "rating": "4.3",
          "total": 16,
          "scale": 5,
          "badge": "fabulous",
          "badgeText": "Fabulous"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "7.4 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "6.7 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$57",
            "exactCurrent": 57.25,
            "old": "$64",
            "fullyBundledPricePerStay": "total $69 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": true,
            "noCCRequired": false
          },
          "type": "Dual"
        },
        "neighbourhood": "Zyuzino District",
        "deals": {
          "specialDeal": {
            "dealText": "Save10%"
          },
          "priceReasoning": "DRR-527"
        },
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|TESCO|showGoldContentDescriptionHCOMUSenUS",
        "coordinate": {
          "lat": 55.65093,
          "lon": 37.59523
        },
        "providerType": "LOCAL",
        "supplierHotelId": 1159664,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/2000000/1160000/1159700/1159664/80c2f1dc_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      },
      {
        "id": 1057420704,
        "name": "Sanatoriy Valuevo",
        "starRating": 3,
        "urls": {},
        "address": {
          "streetAddress": "Village Valuevo",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "108821",
          "region": "Moscow Region",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 5,
          "rating": "5.0",
          "total": 1,
          "scale": 5,
          "badge": "exceptional",
          "badgeText": "Exceptional"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "16 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "16 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$45",
            "exactCurrent": 44.67,
            "old": "$50",
            "fullyBundledPricePerStay": "total $70 for 1&nbsp;room, 4&nbsp;guests"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "HC"
        },
        "neighbourhood": "Moscow",
        "deals": {
          "secretPrice": {
            "dealText": "Save more with Secret Prices"
          },
          "priceReasoning": "DRR-443"
        },
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|TESCO",
        "coordinate": {
          "lat": 55.571135,
          "lon": 37.355338
        },
        "providerType": "LOCAL",
        "supplierHotelId": 33013147,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://exp.cdn-hotels.com/hotels/34000000/33020000/33013200/33013147/6668cbea_z.jpg?impolicy=fcrop&w=250&h=140&q=high"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageGroup": "EXPEDIA_IN_POLYGON",
      "nextPageStartIndex": 13,
      "nextPageNumber": 1,
      "nextPageGroup": "TPI_IN_POLYGON"
    }
  },
  "sortResults": {
    "options": [
      {
        "label": "Featured",
        "itemMeta": "popular",
        "choices": [
          {
            "label": "Featured",
            "value": "BEST_SELLER",
            "selected": false
          }
        ],
        "enhancedChoices": []
      },
      {
        "label": "Star rating",
        "itemMeta": "star",
        "selectedChoiceLabel": "Stars (high to low)",
        "choices": [
          {
            "label": "Stars (high to low)",
            "value": "STAR_RATING_HIGHEST_FIRST",
            "selected": true
          },
          {
            "label": "Stars (low to high)",
            "value": "STAR_RATING_LOWEST_FIRST",
            "selected": false
          }
        ],
        "enhancedChoices": []
      },
      {
        "label": "Distance",
        "itemMeta": "distance",
        "choices": [
          {
            "label": "Distance to city center",
            "value": "DISTANCE_FROM_LANDMARK",
            "selected": false
          }
        ],
        "enhancedChoices": [
          {
            "label": "Landmarks",
            "itemMeta": "landmarks",
            "choices": [
              {
                "label": "City center",
                "id": 1153093
              },
              {
                "label": "Arbat Street",
                "id": 1707917
              },
              {
                "label": "Arena CSKA",
                "id": 10674386
              },
              {
                "label": "Aviapark",
                "id": 10895026
              },
              {
                "label": "Bolshoi Theatre",
                "id": 1647670
              },
              {
                "label": "Crocus Expo Center",
                "id": 1688939
              },
              {
                "label": "Embassy of the United States of America",
                "id": 1796900
              },
              {
                "label": "Exhibition of Achievements of National Economy",
                "id": 1799141
              },
              {
                "label": "Expocentre",
                "id": 1688969
              },
              {
                "label": "Luzhniki Stadium",
                "id": 1708350
              },
              {
                "label": "Megasport Arena",
                "id": 1708351
              },
              {
                "label": "Ministry of Foreign Affairs",
                "id": 1786332
              },
              {
                "label": "Moscow City",
                "id": 10666602
              },
              {
                "label": "Moscow Kremlin",
                "id": 1647675
              },
              {
                "label": "Moscow State University",
                "id": 1708449
              },
              {
                "label": "Prospekt Mira",
                "id": 1665956
              },
              {
                "label": "Red Square",
                "id": 1647668
              },
              {
                "label": "St. Basil's Cathedral",
                "id": 1647674
              },
              {
                "label": "Third Ring Road",
                "id": 1786010
              },
              {
                "label": "Tverskaya Street",
                "id": 11422273
              }
            ]
          },
          {
            "label": "Train stations",
            "itemMeta": "stations",
            "choices": [
              {
                "label": "Baumanskaya Station",
                "id": 1705654
              },
              {
                "label": "Belorusskaya Station - Koltsevaya Line",
                "id": 1705670
              },
              {
                "label": "Bratislavskaya Station",
                "id": 1705866
              },
              {
                "label": "Kievsky Station",
                "id": 1770167
              },
              {
                "label": "Kiyevskaya Station",
                "id": 1705671
              },
              {
                "label": "Kiyevsky Station",
                "id": 1705552
              },
              {
                "label": "Krasnopresnenskaya Station",
                "id": 1705672
              },
              {
                "label": "Kuntsevskaya Station",
                "id": 1705556
              },
              {
                "label": "Moscow Belorussky Station",
                "id": 1709351
              },
              {
                "label": "Moscow Kazansky Station",
                "id": 1770164
              },
              {
                "label": "Moscow Kursky Station",
                "id": 1770165
              },
              {
                "label": "Moscow Leningradsky Station",
                "id": 1770163
              },
              {
                "label": "Moscow Yaroslavsky Station",
                "id": 1770161
              },
              {
                "label": "Paveletskaya Station",
                "id": 1708370
              },
              {
                "label": "Paveletsky Station",
                "id": 1770166
              },
              {
                "label": "Shosse Entuziastov Station",
                "id": 1705767
              },
              {
                "label": "Smolenskaya Station",
                "id": 1705666
              },
              {
                "label": "Tverskaya Station",
                "id": 1705547
              },
              {
                "label": "VDNKh Station",
                "id": 1705692
              },
              {
                "label": "Yugo-Zapadnaya Station",
                "id": 1705541
              }
            ]
          },
          {
            "label": "Airports",
            "itemMeta": "airports",
            "choices": [
              {
                "label": "Moscow (DME-Domodedovo Intl.)",
                "id": 1666007
              },
              {
                "label": "Moscow (VKO-Vnukovo Intl.)",
                "id": 1666214
              },
              {
                "label": "Podolsk (OSF-Ostafyevo)",
                "id": 12459347
              },
              {
                "label": "Sheremetyevo Airport (SVO)",
                "id": 1666194
              },
              {
                "label": "Zhukovsky (ZIA)",
                "id": 10674387
              }
            ]
          }
        ]
      },
      {
        "label": "Guest rating",
        "itemMeta": "rating",
        "choices": [
          {
            "label": "Guest rating",
            "value": "GUEST_RATING",
            "selected": false
          }
        ],
        "enhancedChoices": []
      },
      {
        "label": "Price",
        "itemMeta": "price",
        "choices": [
          {
            "label": "Price (high to low)",
            "value": "PRICE_HIGHEST_FIRST",
            "selected": false
          },
          {
            "label": "Price (low to high)",
            "value": "PRICE",
            "selected": false
          }
        ],
        "enhancedChoices": []
      }
    ],
    "distanceOptionLandmarkId": 1153093
  },
  "filters": {
    "applied": true,
    "name": {
      "item": {
        "value": ""
      },
      "autosuggest": {
        "additionalUrlParams": {
          "resolved-location": "CITY:1153093:UNKNOWN:UNKNOWN",
          "q-destination": "Moscow, Russia",
          "destination-id": "1153093"
        }
      }
    },
    "starRating": {
      "applied": true,
      "items": [
        {
          "value": 5,
          "applied": true
        },
        {
          "value": 4,
          "applied": true
        },
        {
          "value": 3,
          "applied": true
        },
        {
          "value": 2,
          "disabled": true
        },
        {
          "value": 1,
          "disabled": true
        }
      ]
    },
    "guestRating": {
      "applied": true,
      "range": {
        "min": {
          "defaultValue": 0,
          "value": 4
        },
        "max": {
          "defaultValue": 5
        }
      }
    },
    "landmarks": {
      "selectedOrder": [],
      "items": [
        {
          "label": "City center",
          "value": "1153093"
        },
        {
          "label": "Third Ring Road",
          "value": "1786010"
        },
        {
          "label": "Red Square",
          "value": "1647668"
        },
        {
          "label": "Sheremetyevo Airport (SVO)",
          "value": "1666194"
        },
        {
          "label": "Moscow Kremlin",
          "value": "1647675"
        },
        {
          "label": "Moscow (DME-Domodedovo Intl.)",
          "value": "1666007"
        },
        {
          "label": "Arbat Street",
          "value": "1707917"
        },
        {
          "label": "Bolshoi Theatre",
          "value": "1647670"
        },
        {
          "label": "St. Basil's Cathedral",
          "value": "1647674"
        },
        {
          "label": "Moscow (VKO-Vnukovo Intl.)",
          "value": "1666214"
        },
        {
          "label": "Expocentre",
          "value": "1688969"
        },
        {
          "label": "Moscow Leningradsky Station",
          "value": "1770163"
        },
        {
          "label": "Crocus Expo Center",
          "value": "1688939"
        },
        {
          "label": "Paveletskaya Station",
          "value": "1708370"
        },
        {
          "label": "Moscow Belorussky Station",
          "value": "1709351"
        },
        {
          "label": "Paveletsky Station",
          "value": "1770166"
        },
        {
          "label": "Embassy of the United States of America",
          "value": "1796900"
        },
        {
          "label": "Moscow City",
          "value": "10666602"
        },
        {
          "label": "Moscow Kazansky Station",
          "value": "1770164"
        },
        {
          "label": "Tverskaya Street",
          "value": "11422273"
        }
      ],
      "distance": []
    },
    "neighbourhood": {
      "applied": false,
      "items": [
        {
          "label": "Arbat",
          "value": "1665959"
        },
        {
          "label": "Izmaylovo",
          "value": "10779356"
        },
        {
          "label": "Sokolniki",
          "value": "1786031",
          "disabled": true
        },
        {
          "label": "Airport District",
          "value": "1805744"
        },
        {
          "label": "Tverskoy",
          "value": "1792341"
        },
        {
          "label": "Khamovniki",
          "value": "1707738"
        },
        {
          "label": "Lyublino District",
          "value": "11425835",
          "disabled": true
        },
        {
          "label": "Vostochnoye Izmaylovo District",
          "value": "10873994",
          "disabled": true
        },
        {
          "label": "Novo-Peredelkino",
          "value": "10565800",
          "disabled": true
        },
        {
          "label": "Mitino District",
          "value": "11388207",
          "disabled": true
        },
        {
          "label": "Basmanny",
          "value": "1707737"
        },
        {
          "label": "Tagansky",
          "value": "1707807"
        },
        {
          "label": "Vykhino-Zhulebino District",
          "value": "11426695",
          "disabled": true
        },
        {
          "label": "Akademicheskiy",
          "value": "10873979",
          "disabled": true
        },
        {
          "label": "Presnensky",
          "value": "1707806"
        },
        {
          "label": "Prospekt Vernadskogo",
          "value": "10873984",
          "disabled": true
        },
        {
          "label": "Yaroslavsky District",
          "value": "11386120",
          "disabled": true
        },
        {
          "label": "Sokol",
          "value": "10674385",
          "disabled": true
        },
        {
          "label": "Brateyevo District",
          "value": "11423836",
          "disabled": true
        },
        {
          "label": "Otradnoye",
          "value": "10873962",
          "disabled": true
        },
        {
          "label": "Ryazansky",
          "value": "10873960",
          "disabled": true
        },
        {
          "label": "Moscow City Centre",
          "value": "10565407"
        },
        {
          "label": "Tsaritsyno",
          "value": "10565393",
          "disabled": true
        },
        {
          "label": "Maryino District",
          "value": "11426142",
          "disabled": true
        },
        {
          "label": "Danilovsky District",
          "value": "1812327",
          "disabled": true
        },
        {
          "label": "Chertanovo Yuzhnoye",
          "value": "10565799",
          "disabled": true
        },
        {
          "label": "Maryina Roshcha",
          "value": "10873976",
          "disabled": true
        },
        {
          "label": "Ostankinsky",
          "value": "10565395",
          "disabled": true
        },
        {
          "label": "Begovoy",
          "value": "1665962",
          "disabled": true
        },
        {
          "label": "Krasnoselsky",
          "value": "1707739",
          "disabled": true
        },
        {
          "label": "Butyrsky",
          "value": "10565391",
          "disabled": true
        },
        {
          "label": "Dorogomilovo",
          "value": "1792342"
        },
        {
          "label": "Severnoye Medvedkovo District",
          "value": "11425235",
          "disabled": true
        },
        {
          "label": "Altufyevsky District",
          "value": "11422945",
          "disabled": true
        },
        {
          "label": "Bibirevo District",
          "value": "11422786",
          "disabled": true
        },
        {
          "label": "Gagarinsky",
          "value": "10873952",
          "disabled": true
        },
        {
          "label": "Bogorodskoye",
          "value": "10383754",
          "disabled": true
        },
        {
          "label": "Khoroshevskiy",
          "value": "1786029",
          "disabled": true
        },
        {
          "label": "Khoroshevo-Mnevniki",
          "value": "1695454",
          "disabled": true
        },
        {
          "label": "Voykovsky",
          "value": "10873961"
        },
        {
          "label": "Zyablikovo District",
          "value": "11426311",
          "disabled": true
        },
        {
          "label": "Tekstilshchiki District",
          "value": "11426277",
          "disabled": true
        },
        {
          "label": "Severny District",
          "value": "11425033",
          "disabled": true
        },
        {
          "label": "Koptevo District",
          "value": "11427377",
          "disabled": true
        },
        {
          "label": "Nekrasovka District",
          "value": "11386766",
          "disabled": true
        },
        {
          "label": "Yakimanka",
          "value": "1707818"
        },
        {
          "label": "Beskudnikovsky District",
          "value": "11426648",
          "disabled": true
        },
        {
          "label": "Horoshovsky",
          "value": "10873983",
          "disabled": true
        },
        {
          "label": "Pechatniki District",
          "value": "11427467",
          "disabled": true
        },
        {
          "label": "Alexeevsky",
          "value": "1786012",
          "disabled": true
        },
        {
          "label": "Losinoostrovsky District",
          "value": "11425947",
          "disabled": true
        },
        {
          "label": "Perovo District",
          "value": "12547349",
          "disabled": true
        },
        {
          "label": "Tyoply Stan District",
          "value": "12540339"
        },
        {
          "label": "Novokosino District",
          "value": "12542445",
          "disabled": true
        },
        {
          "label": "Golovinsky District",
          "value": "11422855",
          "disabled": true
        },
        {
          "label": "Yuzhnoportovy District",
          "value": "11427554",
          "disabled": true
        },
        {
          "label": "Mozhaysky District",
          "value": "12540341",
          "disabled": true
        },
        {
          "label": "Kurkino District",
          "value": "11425153",
          "disabled": true
        },
        {
          "label": "Biryulyovo Vostochnoye District",
          "value": "12538294",
          "disabled": true
        },
        {
          "label": "Kosino-Ukhtomsky District",
          "value": "12543059",
          "disabled": true
        },
        {
          "label": "Matushkino District",
          "value": "11425376",
          "disabled": true
        },
        {
          "label": "Nizhegorodsky District",
          "value": "11426396",
          "disabled": true
        },
        {
          "label": "Nagatinsky Zaton District",
          "value": "12538325",
          "disabled": true
        },
        {
          "label": "South-Eastern Administrative District",
          "value": "12525313",
          "disabled": true
        },
        {
          "label": "Meshchansky District",
          "value": "12544787"
        },
        {
          "label": "Golyanovo District",
          "value": "11388231",
          "disabled": true
        },
        {
          "label": "Kotlovka District",
          "value": "12548944",
          "disabled": true
        },
        {
          "label": "Shchukino District",
          "value": "12546169",
          "disabled": true
        },
        {
          "label": "Obruchevsky District",
          "value": "12542446",
          "disabled": true
        },
        {
          "label": "Gorskoe",
          "value": "11420929"
        },
        {
          "label": "Nagatino-Sadovniki District",
          "value": "12523128",
          "disabled": true
        },
        {
          "label": "Zyuzino District",
          "value": "12537734"
        },
        {
          "label": "Chertanovo Severnoye District",
          "value": "12544137",
          "disabled": true
        },
        {
          "label": "Levoberezhny District",
          "value": "11423066",
          "disabled": true
        },
        {
          "label": "Northern Administrative Okrug",
          "value": "12542526"
        },
        {
          "label": "Chertanovo Tsentralnoye District",
          "value": "12545742",
          "disabled": true
        },
        {
          "label": "Orekhovo-Borisovo Yuzhnoye District",
          "value": "12543039",
          "disabled": true
        },
        {
          "label": "Molzhaninovsky District",
          "value": "11387899",
          "disabled": true
        },
        {
          "label": "Savelovsky",
          "value": "10873982"
        },
        {
          "label": "Preobrazhenskoye District",
          "value": "12542447",
          "disabled": true
        },
        {
          "label": "Central Administrative Okrug",
          "value": "12537744"
        },
        {
          "label": "Cheryomushki District",
          "value": "12540340",
          "disabled": true
        },
        {
          "label": "North-Eastern Administrative Okrug",
          "value": "12525316"
        },
        {
          "label": "Veshnyaki District",
          "value": "12547348",
          "disabled": true
        },
        {
          "label": "Zamoskvorechye District",
          "value": "12549599"
        },
        {
          "label": "Yasenevo District",
          "value": "12545748",
          "disabled": true
        },
        {
          "label": "Butovo",
          "value": "12537728",
          "disabled": true
        },
        {
          "label": "Konkovo District",
          "value": "12548943",
          "disabled": true
        },
        {
          "label": "Ivanovskoye District",
          "value": "11386055",
          "disabled": true
        },
        {
          "label": "Babushkinsky District",
          "value": "12511201",
          "disabled": true
        },
        {
          "label": "Zapadnoye Degunino District",
          "value": "12541406",
          "disabled": true
        },
        {
          "label": "Ochakovo-Matveyevskoye District",
          "value": "12547347",
          "disabled": true
        },
        {
          "label": "Lomonosovsky District",
          "value": "12540342",
          "disabled": true
        },
        {
          "label": "Fili-Davydkovo District",
          "value": "12545741",
          "disabled": true
        },
        {
          "label": "Sokolinaya Gora District",
          "value": "12540836",
          "disabled": true
        },
        {
          "label": "North-Western Administrative Okrug",
          "value": "12537741",
          "disabled": true
        },
        {
          "label": "Southern Administrative Okrug",
          "value": "12544152"
        },
        {
          "label": "Nagorny District",
          "value": "11388076",
          "disabled": true
        },
        {
          "label": "Yuzhnoye Medvedkovo District",
          "value": "11426497",
          "disabled": true
        },
        {
          "label": "Vostochny District",
          "value": "11408949",
          "disabled": true
        },
        {
          "label": "Severnoye Butovo",
          "value": "12549045",
          "disabled": true
        }
      ]
    },
    "accommodationType": {
      "applied": true,
      "items": [
        {
          "label": "Apart-hotels",
          "value": "20",
          "applied": true
        },
        {
          "label": "Apartments",
          "value": "15",
          "applied": true
        },
        {
          "label": "B&Bs",
          "value": "5",
          "applied": true
        },
        {
          "label": "Capsule hotels",
          "value": "43",
          "disabled": true
        },
        {
          "label": "Caravan parks",
          "value": "21",
          "disabled": true
        },
        {
          "label": "Cottages",
          "value": "11",
          "disabled": true
        },
        {
          "label": "Country houses",
          "value": "24",
          "disabled": true
        },
        {
          "label": "Guest houses",
          "value": "30",
          "disabled": true
        },
        {
          "label": "Hostels",
          "value": "12",
          "disabled": true
        },
        {
          "label": "Hotels",
          "value": "1",
          "applied": true
        },
        {
          "label": "Inns",
          "value": "8",
          "applied": true
        },
        {
          "label": "Resorts",
          "value": "3",
          "disabled": true
        },
        {
          "label": "Vacation homes",
          "value": "4",
          "disabled": true
        }
      ]
    },
    "facilities": {
      "applied": true,
      "items": [
        {
          "label": "24-hour front desk",
          "value": "2063",
          "applied": true
        },
        {
          "label": "Airport transfers",
          "value": "513"
        },
        {
          "label": "Bar",
          "value": "515"
        },
        {
          "label": "Bathtub in room",
          "value": "517"
        },
        {
          "label": "Breakfast included",
          "value": "2048"
        },
        {
          "label": "Business facilities",
          "value": "519"
        },
        {
          "label": "Casino",
          "value": "2112",
          "disabled": true
        },
        {
          "label": "Childcare",
          "value": "521"
        },
        {
          "label": "Connecting rooms available",
          "value": "523"
        },
        {
          "label": "Cribs available",
          "value": "525"
        },
        {
          "label": "Electric vehicle charging point",
          "value": "1073743315"
        },
        {
          "label": "Gym",
          "value": "2"
        },
        {
          "label": "Internet Access",
          "value": "8"
        },
        {
          "label": "Kitchen",
          "value": "32"
        },
        {
          "label": "Meeting Facilities",
          "value": "1"
        },
        {
          "label": "Non-smoking",
          "value": "529"
        },
        {
          "label": "Parking available",
          "value": "16384"
        },
        {
          "label": "Parking included",
          "value": "134234112"
        },
        {
          "label": "Pet Friendly",
          "value": "64"
        },
        {
          "label": "Pool",
          "value": "128"
        },
        {
          "label": "Restaurant",
          "value": "256"
        },
        {
          "label": "Ski-in/ski-out",
          "value": "535",
          "disabled": true
        },
        {
          "label": "Ski shuttle",
          "value": "531",
          "disabled": true
        },
        {
          "label": "Ski storage",
          "value": "533",
          "disabled": true
        },
        {
          "label": "Smoking areas",
          "value": "537"
        },
        {
          "label": "Spa",
          "value": "539"
        },
        {
          "label": "WiFi included",
          "value": "527",
          "applied": true
        }
      ]
    },
    "accessibility": {
      "applied": false,
      "items": [
        {
          "label": "Accessibility equipment for the deaf",
          "value": "2097152"
        },
        {
          "label": "Accessible bathroom",
          "value": "131072"
        },
        {
          "label": "Accessible parking",
          "value": "524288"
        },
        {
          "label": "Accessible path of travel",
          "value": "65536"
        },
        {
          "label": "Braille or raised signage",
          "value": "4194304"
        },
        {
          "label": "In-room accessibility",
          "value": "1048576"
        },
        {
          "label": "Roll-in shower",
          "value": "262144"
        },
        {
          "label": "Wheelchair accessible rooms",
          "value": "541"
        }
      ]
    },
    "themesAndTypes": {
      "applied": true,
      "items": [
        {
          "label": "Adventure",
          "value": "18"
        },
        {
          "label": "Beach",
          "value": "6",
          "disabled": true
        },
        {
          "label": "Boutique",
          "value": "4"
        },
        {
          "label": "Business",
          "value": "14",
          "applied": true
        },
        {
          "label": "Casino",
          "value": "8",
          "disabled": true
        },
        {
          "label": "Family-friendly",
          "value": "25",
          "applied": true
        },
        {
          "label": "Golf",
          "value": "26",
          "disabled": true
        },
        {
          "label": "Historic",
          "value": "2",
          "disabled": true
        },
        {
          "label": "Hot Springs",
          "value": "22",
          "disabled": true
        },
        {
          "label": "Luxury",
          "value": "15"
        },
        {
          "label": "Romantic",
          "value": "1",
          "disabled": true
        },
        {
          "label": "Ski",
          "value": "28",
          "disabled": true
        },
        {
          "label": "Spa Hotel",
          "value": "27",
          "applied": true
        },
        {
          "label": "Winery/Vineyard",
          "value": "19",
          "disabled": true
        }
      ]
    },
    "price": {
      "label": "Nightly Price",
      "range": {
        "min": {
          "defaultValue": 0,
          "value": 10
        },
        "max": {
          "defaultValue": 500,
          "value": 500
        },
        "increments": 5
      },
      "multiplier": 1,
      "applied": true
    },
    "paymentPreference": {
      "items": [
        {
          "label": "Free cancellation",
          "value": "fc"
        },
        {
          "label": "Pay with Hotels.com gift card",
          "value": "gc"
        }
      ]
    },
    "welcomeRewards": {
      "label": "Hotels.com® Rewards",
      "items": [
        {
          "label": "Collect stamps",
          "value": "collect"
        },
        {
          "label": "Redeem reward* nights",
          "value": "redeem"
        }
      ]
    }
  },
  "pointOfSale": {
    "currency": {
      "code": "USD",
      "symbol": "$",
      "separators": ",.",
      "format": "${0}"
    }
  }
};

export default HotelsTab;