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

  addChangePageListener() {
    const toGarage = document.querySelector('.nav__garageBtn') as HTMLButtonElement;
    const toWinners = document.querySelector('.nav__winnersBtn') as HTMLButtonElement;
    const cpanel = document.querySelector('.control-panel') as HTMLDivElement;
    const garage = document.querySelector('.garage-wrapper') as HTMLDivElement;
    const table = document.querySelector('.table-wrapper') as HTMLDivElement;
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
    const header: HTMLElement = this.header.render();
    const main: HTMLElement = this.main.render();
    const footer: HTMLElement = this.footer.render();
    this.body.append(header);
    this.body.append(main);
    this.body.append(footer);
    this.addChangePageListener();
    return this.body;
  }
}