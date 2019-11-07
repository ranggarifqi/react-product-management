import React from "react";
import { Link } from 'react-router-dom';

import { withStyles } from "@material-ui/styles";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const CardItem = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            SKU Number: {item.sku}
          </Typography>
          <Typography variant="subtitle2" component="h2">
            Rp {parseInt(item.price).toLocaleString('id-ID')},00
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description.length > 100 ? item.description.substr(0, 100) + '...' : item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={`/products/${item.id}/edit`}>
          Edit
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default withStyles(styles)(CardItem);
