import React from "react";
import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/DefaultLayout";
import { Button } from "@material-ui/core";

const ProductAddScreen = () => {
  return (
    <DefaultLayout toolbarTitle="Add Products">
      <Button variant="contained" component={Link} to="/products">Kembali</Button>
    </DefaultLayout>
  );
};

export default ProductAddScreen;
