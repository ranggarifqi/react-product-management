import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom';
import DefaultLayout from "../layouts/DefaultLayout";
import api from "../config/api";

import CardList from "../components/CardList";

import {
  CircularProgress,
  Fab
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";

@inject("productStore")
@observer
class ProductScreen extends Component {
  state = {
    fetchLoading: false
  };

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      this.setState({ fetchLoading: true });
      const token = window.localStorage.getItem("token");
      const { data } = await api.get("/products", {
        headers: {
          Authorization: token
        }
      });
      this.props.productStore.setItems(data.products, true);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ fetchLoading: false });
    }
  }

  renderContent() {
    const { classes, productStore } = this.props;
    if (this.fetchLoading) {
      return <CircularProgress />;
    }
    return (
      <div>
        <CardList items={productStore.items} />
        <Fab className={classes.fab} color="primary" component={Link} to="/products/add" >
          <AddIcon />
        </Fab>
      </div>
    );
  }

  render() {
    return (
      <DefaultLayout toolbarTitle="Manage Products">
        {this.renderContent()}
      </DefaultLayout>
    );
  }
}

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40
  }
});

export default withStyles(styles)(ProductScreen);
