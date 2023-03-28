export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  setItemAppend(item) {
    this._container.append(item);
  }

  setItemPrepend(item) {
    this._container.prepend(item);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }
}