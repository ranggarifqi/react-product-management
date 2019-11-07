import { action, computed, observable } from "mobx";

class ProductStore {
  @observable items = 0;

  @action addItems () {
    this.items++;
  }
}
export default ProductStore