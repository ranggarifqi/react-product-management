import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import api from "../config/api";

import DefaultLayout from "../layouts/DefaultLayout";
import MyRedirect from "../components/MyRedirect";
import MySnackbar from "../components/MySnackbar";

import {
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress
} from "@material-ui/core";
import { inject, observer } from "mobx-react";

@inject("productStore")
@observer
class ProductEditScreen extends Component {
  state = {
    name: "",
    sku: "",
    price: 0,
    image: "",
    description: "",
    redirect: false,
    redirectTo: null,
    submitLoading: false,
    showSnackbar: false,
    snackbarMessage: null,
    finishFetchProduct: false
  };

  componentDidMount() {
    this.getProductById();
  }

  async getProductById() {
    const id = this.props.match.params.id;
    const token = window.localStorage.getItem("token");
    const { data } = await api.get(`/products/${id}`, {
      headers: {
        Authorization: token
      }
    });
    this.setState({
      name: data.name,
      sku: data.sku,
      price: parseInt(data.price),
      image: data.image,
      description: data.description,
      finishFetchProduct: true
    });
  }

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };
  onChangeSku = e => {
    this.setState({ sku: e.target.value });
  };
  onChangePrice = e => {
    this.setState({ price: e.target.value });
  };
  onChangeImage = e => {
    this.setState({ image: e.target.value });
  };
  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ submitLoading: true });
    const { name, sku, price, image, description } = this.state;
    const payload = {
      name,
      sku,
      price,
      image: image === "" ? null : image,
      description
    };
    console.log("on Submit", payload);
    try {
      const token = window.localStorage.getItem("token");
      const id = this.props.match.params.id;
      await api.patch(`/products/${id}`, payload, {
        headers: {
          Authorization: token
        }
      });
      this.props.productStore.addItem({ id: sku, ...payload });
      this.setState({ redirect: true, redirectTo: "/products" });
    } catch (error) {
      console.log(error);
      let errMsg;
      if (error.response) {
        errMsg = error.response.data.message;
      } else {
        errMsg = error.message;
      }
      this.setState({
        showSnackbar: true,
        snackbarMessage: errMsg
      });
    } finally {
      this.setState({ submitLoading: false });
    }
  };

  renderButton = () => {
    const { submitLoading } = this.state;

    if (submitLoading) {
      return (
        <div style={{ marginLeft: "auto" }}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div style={{ marginLeft: "auto" }}>
        <Button component={Link} to="/products">
          Kembali
        </Button>
        <Button type="submit" style={{ color: "green" }}>
          Submit
        </Button>
      </div>
    );
  };

  render() {
    const {
      name,
      sku,
      price,
      image,
      description,
      showSnackbar,
      snackbarMessage,
      redirect,
      redirectTo,
      finishFetchProduct
    } = this.state;
    return (
      <DefaultLayout toolbarTitle="Edit Products">
        <Card>
          <ValidatorForm
            ref="productAddForm"
            onSubmit={this.onSubmit}
            onError={errors => console.log(errors)}
          >
            <CardContent>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Product Name*"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                disabled={!finishFetchProduct}
                onChange={this.onChangeName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="sku"
                label="Product SKU*"
                name="sku"
                autoComplete="sku"
                autoFocus
                value={sku}
                disabled={!finishFetchProduct}
                onChange={this.onChangeSku}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="price"
                label="Product Price*"
                name="price"
                autoComplete="price"
                autoFocus
                value={price}
                disabled={!finishFetchProduct}
                onChange={this.onChangePrice}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "this field have to be numeric"
                ]}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="image"
                label="Product Image URL"
                name="image"
                autoComplete="image"
                autoFocus
                value={image}
                disabled={!finishFetchProduct}
                onChange={this.onChangeImage}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows="4"
                id="description"
                label="Product Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                disabled={!finishFetchProduct}
                onChange={this.onChangeDescription}
              />
            </CardContent>
            <CardActions>{this.renderButton()}</CardActions>
          </ValidatorForm>
        </Card>
        <MySnackbar
          visible={showSnackbar}
          message={snackbarMessage}
          onClose={() => this.setState({ showSnackbar: false })}
        />
        <MyRedirect redirect={redirect} routeName={redirectTo} />
      </DefaultLayout>
    );
  }
}

export default withRouter(ProductEditScreen);
