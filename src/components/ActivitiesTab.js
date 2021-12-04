import React from "react";
import { Checkbox } from "@mui/material";
import categoriesData from '../data/activityCategories.json';
import activitiesData from '../data/activitiesData.json';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import {FormControl,FormLabel,RadioGroup, FormControlLabel, Radio} from '@mui/material';
import StarRatings from "react-star-ratings";


const ActivitiesTab = () => {

    const [categories, setCategories] = useState();
    const [activities, setActivities] = useState();
    useEffect(() => {
        setCategories(categoriesData);
        setActivities(activitiesData);
    });

    return (
    <div>
        <Grid container direction="row" spacing={2} justifyContent="left"
        >
          <Grid style={{ height: "100vh", background: "white", borderRadius: "5px", marginTop: "12px" }} item xs={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend"><b>CATEGORIES</b></FormLabel>
              <>
                    {
                        (categories ?
                            categories.map((item, key) => {
                                return (
                                    <div>
                                        <Checkbox id={"category" + key} defaultChecked />
                                        <label id="noCategoryLabel">
                                            {item}
                                        </label>
                                    </div>
                                )
                            }) :
                            <h3> No Categories </h3>
                        )
                    }
                </>
            </FormControl>
          </Grid>

        
        <Grid container item xs={6}  >

            <div id="main">
                
                <>
                    {
                        (activities ?
                            activities.map((item, key) => {
                                return (
                                    <div >
                                        <Card id="activityCard"  >
                                           
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                rowSpacing={5}
                                                alignItems="center" >
                                                    <img src={item.image} height="150px" width="200px" />
                                                    <div id="text">
                                                        <h4> {item.name}</h4>
                                                    </div>
                                                    <div id="cardColumn">
                                                        <span> <p id="price"> {item.price}</p> </span>
                                                    </div>
                                                    <div>
                                                        <StarRatings
                                                            rating={item.rating}
                                                            starRatedColor="orange"
                                                            starDimension="20px"
                                                            starSpacing="5px"
                                                        />
                                                        <p>{item.rating}</p>
                                                        
                                                    </div>
                                                    

                                                </Grid>
                                        
                                        </Card>
                                    </div>
                                )
                            }) :
                            <h3> Keep Calm. Loading.... </h3>
                        )
                    }
                </>

            </div>

        </Grid>

                    


    
        </Grid>
      </div>);

































};

export default ActivitiesTab;