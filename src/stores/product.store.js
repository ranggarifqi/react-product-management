import { action, computed, observable } from "mobx";

class ProductStore {
  @observable items = [];

  @action setItems (newItems, firstTime = false) {
    if (firstTime) {
      this.items = newItems;
    } else {
      this.items = [...this.items, ...newItems];
    }
  }

  @action addItem (newItem) {
    this.items = [...this.items, newItem];
  }
}
export default ProductStore