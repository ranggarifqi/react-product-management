import { action, computed, observable } from "mobx";

class ProductStore {
  @observable items = [];

  @action addItems (newItems, firstTime = false) {
    if (firstTime) {
      this.items = newItems;
    } else {
      this.items = [...this.items, ...newItems];
    }
  }
}
export default ProductStore