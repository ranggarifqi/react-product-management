import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import DefaultLayout from "../layouts/DefaultLayout";

@inject('productStore')
@observer
class ProductScreen extends Component {

  onClickBtn = () => {
    this.props.productStore.addItems();
  }

  render() {
    return (
      <DefaultLayout toolbarTitle="Manage Products">
        <div>Manage Products {this.props.productStore.items}</div>
        <button onClick={this.onClickBtn}>Add</button>
      </DefaultLayout>
    );
  }
};

export default ProductScreen;
