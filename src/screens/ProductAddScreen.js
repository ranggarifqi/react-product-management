import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import DefaultLayout from "../layouts/DefaultLayout";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

const ProductAddScreen = () => {
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeSku = e => {
    setSku(e.target.value);
  };
  const onChangePrice = e => {
    setPrice(e.target.value);
  };
  const onChangeImage = e => {
    setImage(e.target.value);
  };
  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("on Submit");
  };

  return (
    <DefaultLayout toolbarTitle="Add Products">
      <Card>
        <ValidatorForm
          ref={formRef}
          onSubmit={onSubmit}
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
              onChange={onChangeName}
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
              onChange={onChangeSku}
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
              onChange={onChangePrice}
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
              onChange={onChangeImage}
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
              onChange={onChangeDescription}
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
};

export default ProductAddScreen;
