import { data } from "autoprefixer";

export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItems(item) {
    this._element.append(item);
  }
}
