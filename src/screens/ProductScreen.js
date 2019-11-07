import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import convert from 'xml-js';

import DefaultLayout from "../layouts/DefaultLayout";
import api from "../config/api";

import CardList from "../components/CardList";
import ConfirmationDialog from "../components/ConfirmationDialog";

import { CircularProgress, Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import elevenia from "../config/elevenia";

@inject("productStore")
@observer
class ProductScreen extends Component {
  state = {
    fetchLoading: false,
    deleteLoading: false,
    fetchMessage: ''
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
      if (data.totalItems === 0) {
        // Fetch ke Elevenia
        const elProducts = await this.fetchFromElevenia();

        // Post ke Server agar disimpan di DB
        for (let v of elProducts) {
          console.log('Posting', v);
          await api.post('/products', v, {
            headers: {
              Authorization: token
            }
          })
        }
        
        // Reload pagenya
        location.reload();
      } else {
        this.props.productStore.setItems(data.products, true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ fetchLoading: false });
    }
  }

  async fetchFromElevenia() {
    try {
      this.setState({ fetchMessage: 'Fetching Data from Elevenia...' })
      const { data } = await elevenia.get('/prodservices/product/listing?page=1');
      var parsed = JSON.parse(convert.xml2json(data, {compact: true, spaces: 2}));
      const products = parsed.Products.product.slice(0, 6)
      const mappedProducts = products.map((v) => {
        return {
          name: v.prdNm['_text'],
          price: parseInt(v.selPrc['_text']),
          description: `${v.dispCtgrNm['_text']} - ${v.dispCtgrNmMid['_text']} - ${v.dispCtgrNmRoot['_text']}`,
          image: 'https://dummyimage.com/600x400/000/fff',
          sku: v.sellerPrdCd['_text']
        }
      });
      this.setState({ fetchMessage: '' })
      return Promise.resolve(mappedProducts);
    } catch (error) {
      this.setState({ fetchMessage: '' })
      return Promise.reject(error);
    }
  }

  renderContent() {
    const { classes, productStore } = this.props;
    if (this.state.fetchLoading) {
      return (
        <div>
          <CircularProgress />
          <p>{this.state.fetchMessage}</p>
        </div>
      );
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
