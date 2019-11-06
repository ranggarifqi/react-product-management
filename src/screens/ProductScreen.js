import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import DefaultLayout from "../layouts/DefaultLayout";

@inject('productStore')
@observer
class ProductScreen extends Component {
  render() {
    return (
      <DefaultLayout toolbarTitle="Manage Products">
        <div>Manage Products</div>
      </DefaultLayout>
    );
  }
};

export default ProductScreen;
