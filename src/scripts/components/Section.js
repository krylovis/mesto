export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  setItem(item) {
    this._container.append(item);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }
}