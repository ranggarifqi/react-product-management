import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import DefaultLayout from "../layouts/DefaultLayout";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

class ProductAddScreen extends Component {
  state = {
    name: "",
    sku: "",
    price: 0,
    image: "",
    description: ""
  };

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

  onSubmit = e => {
    e.preventDefault();
    const { name, sku, price, image, description } = this.state;
    const payload = {
      name,
      sku,
      price,
      image: image === "" ? null : image,
      description
    };
    console.log("on Submit", payload);
  };

  render() {
    const { name, sku, price, image, description } = this.state;
    return (
      <DefaultLayout toolbarTitle="Add Products">
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
                onChange={this.onChangeDescription}
              />
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/products"
                style={{ marginLeft: "auto" }}
              >
                Kembali
              </Button>
              <Button type="submit" style={{ color: "green" }}>
                Submit
              </Button>
            </CardActions>
          </ValidatorForm>
        </Card>
      </DefaultLayout>
    );
  }
}

export default ProductAddScreen;
