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

  addListener() {
    const toGarage = document.querySelector('.nav__garageBtn');
    const toWinners = document.querySelector('.nav__winnersBtn');
    const cpanel = document.querySelector('.control-panel');
    const garage = document.querySelector('.garage-wrapper');
    const table = document.querySelector('.table-wrapper');
    toGarage?.addEventListener('click', () => {
      cpanel?.classList.remove('hidden');
      garage?.classList.remove('hidden');
      table?.classList.add('hidden');
    });
    toWinners?.addEventListener('click', () => {
      cpanel?.classList.add('hidden');
      garage?.classList.add('hidden');
      table?.classList.remove('hidden');
    });
  }

  init(): HTMLElement {
    const header = this.header.render();
    const main = this.main.render();
    const footer = this.footer.render();
    this.body.append(header);
    this.body.append(main);
    this.body.append(footer);
    this.addListener();
    return this.body;
  }
}