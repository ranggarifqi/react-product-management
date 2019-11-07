import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import api from "../config/api";

import CardList from "../components/CardList";
import ConfirmationDialog from "../components/ConfirmationDialog";

import { CircularProgress, Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";

@inject("productStore")
@observer
class ProductScreen extends Component {
  state = {
    fetchLoading: false,
    deleteLoading: false
  };

  componentDidMount() {
    this.fetchProducts();
  }

  handleDialogClose = () => {
    this.props.productStore.closeDeleteDialog();
  };

  handleDelete = async () => {
    try {
      this.setState({ deleteLoading: true });
      const token = window.localStorage.getItem("token");
      await api.delete(`/products/${this.props.productStore.idWillBeDeleted}`, {
        headers: {
          Authorization: token
        }
      });
      this.props.productStore.deleteItemsById();
      this.props.productStore.closeDeleteDialog();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ deleteLoading: false });
      console.log('Selesai Delete');
    }
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
        <Fab
          className={classes.fab}
          color="primary"
          component={Link}
          to="/products/add"
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }

  render() {
    return (
      <DefaultLayout toolbarTitle="Manage Products">
        {this.renderContent()}
        <ConfirmationDialog
          id={this.props.productStore.idWillBeDeleted}
          showDialog={this.props.productStore.showDeleteDialog}
          handleClose={this.handleDialogClose}
          onDelete={this.handleDelete}
          disableClose={this.state.deleteLoading}
        />
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
