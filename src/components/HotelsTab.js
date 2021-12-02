
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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GoogleMapReact from 'google-map-react';
import StarRatings from './react-star-ratings';


var axios = require("axios").default;




// var options = {
//   method: 'GET',
//   url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
//   params: {query: 'chicago', locale: 'en_US', currency: 'USD'},
//   headers: {
//     'x-rapidapi-host': 'hotels4.p.rapidapi.com',
//     'x-rapidapi-key': '0b92bc2163msh779aa268fcc6588p140b6ajsn7a01b442d227'
//   }
// };



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

  return (<div>
    <Grid container direction="row" spacing={2} justifyContent="center"
    >
      <Grid item xs={3}>
        <Item>Filter</Item>
      </Grid>

      <Grid item xs={6}>
        <Grid container item xs={12} >
          {hotels.map((hotel) => {
            return (<Grid container xs={12} style={{ background: "white" , margin : "4px" , padding : "4px" , borderRadius : "7px" }}>
              
              <Grid xs={4}>
              <div >
              <img src={hotel.optimizedThumbUrls.srpDesktop}/>
              </div> </Grid>
              <Grid xs={6}>
              <div>
              <h3> {hotel.name} </h3>
              <p> {hotel.streetAddress} </p>
              <p> rating :  {hotel.starRating} </p>
              <p> rooms left : {hotel.roomsLeft} </p>
              </div> </Grid>

            </Grid>);
          })}
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <Item>map</Item>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "key" }}
        // defaultCenter={this.props.center}
        // defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </Grid>

    </Grid>
  </div>);
};

export default HotelsTab;