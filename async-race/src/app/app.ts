import Header from '../view/header/header';
import Main from '../view/main/main';

export default class App {
  body: HTMLElement;

  header: Header;

  main: Main;

  constructor() {
    this.body = document.body;
    this.header = new Header();
    this.main = new Main();
  }

  init(): HTMLElement {
    const header = this.header.render();
    const main = this.main.render();
    this.body.append(header);
    this.body.append(main);
    return this.body;
  }
}