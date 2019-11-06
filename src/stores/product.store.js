import { action, computed, observable } from "mobx";

class ProductStore {
  @observable items = 0;

  @action setItems (amt) {
    this.items = amt;
  }
}
export default ProductStore