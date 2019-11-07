import React from "react";

import CardItem from './CardItem';

const CardList = ({ items }) => {
  return items.map(item => {
    return <CardItem item={item} key={item.id} />;
  });
};

export default CardList;
