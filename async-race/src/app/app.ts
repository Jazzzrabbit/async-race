import Footer from '../view/footer/footer';
import Header from '../view/header/header';
import Main from '../view/main/main';

export default class App {
  body: HTMLElement;

  header: Header;

  main: Main;

  footer: Footer;

  constructor() {
    this.body = document.body;
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  init(): HTMLElement {
    const header = this.header.render();
    const main = this.main.render();
    const footer = this.footer.render();
    this.body.append(header);
    this.body.append(main);
    this.body.append(footer);
    return this.body;
  }
}