import Header from '../view/header/header';

export default class App {
  body: HTMLElement;

  header: Header;

  constructor() {
    this.body = document.body;
    this.header = new Header();
  }

  init() {
    const header = this.header.render();
    this.body.append(header);
    return this.body;
  }
}