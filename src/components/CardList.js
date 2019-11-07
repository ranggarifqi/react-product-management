import React from "react";

import CardItem from "./CardItem";
import { Grid } from "@material-ui/core";

const CardList = ({ items }) => {
  return (
    <Grid container spacing={3}>
      {items.map(item => {
        return (
          <Grid item xs={4}>
            <CardItem item={item} key={item.id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardList;
