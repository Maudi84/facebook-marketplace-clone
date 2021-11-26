import React, {useContext} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import CategoryContext from './CategoryContext';

const fetchListings = (setListings, currCat, search) => {
  let toBeFetched = '/v0/listings';
  if (currCat) {
    toBeFetched = '/v0/listings/' + currCat;
  }
  if (search.length > 0) {
    toBeFetched += '?search=' + search;
  }
  fetch(toBeFetched, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setListings(json);
    });
};

/**
 * @return {object}
 */
function ListGrid() {
  const [listings, setListings] = React.useState([]);
  const {currCat} = useContext(CategoryContext);
  const {search} = useContext(CategoryContext);
  React.useEffect(() => {
    fetchListings(setListings, currCat, search);
  }, [currCat, search]);
  console.log(search);

  return (
    <Grid container spacing={3}>
      <Grid container item spacing={2}>
        {listings.map((listing) => (
          <Grid item xs={6} key={listing.id}>
            <CardActionArea>
              <Card sx={{width: 200}}>
                <CardMedia
                  component='img'
                  height='140'
                  image="https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg"
                  alt={listing.listings.title}
                />
                <CardContent>
                  <Typography variant='h5'>
                    {listing.listings.price}
                  </Typography>
                  <Typography gutterBottom variant='h6'>
                    {listing.listings.title}
                  </Typography>
                  <Typography variant='body2'>
                    {listing.listings.content}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default ListGrid;
