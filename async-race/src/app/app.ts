import { generateCars, getSelectCarId, removeCar, nextPage, prevPage } from '../controller/listeners';
import { currentState } from '../model/state';
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

  addChangePageListener(): void {
    const toGarage = document.querySelector('.nav__garageBtn') as HTMLButtonElement;
    const toWinners = document.querySelector('.nav__winnersBtn') as HTMLButtonElement;
    const cpanel = document.querySelector('.control-panel') as HTMLDivElement;
    const garage = document.querySelector('.garage-wrapper') as HTMLDivElement;
    const table = document.querySelector('.table-wrapper') as HTMLDivElement;
    toGarage?.addEventListener('click', () => {
      currentState.isGarage = true;
      currentState.isWinners = false;
      cpanel?.classList.remove('hidden');
      garage?.classList.remove('hidden');
      table?.classList.add('hidden');
    });
    toWinners?.addEventListener('click', () => {
      currentState.isGarage = false;
      currentState.isWinners = true;
      cpanel?.classList.add('hidden');
      garage?.classList.add('hidden');
      table?.classList.remove('hidden');
    });
  }

  static addEditCarListener(): void {
    const select: NodeListOf<Element> = document.querySelectorAll('.select-car');

    [...select].map(item => item.addEventListener('click', getSelectCarId));
  }

  static addRemoveCarListener(): void {
    const remove: NodeListOf<Element> = document.querySelectorAll('.remove-car');

    [...remove].map(item => item.addEventListener('click', removeCar));
  }

  addGenerateCarsListener(): void {
    const generate = document.querySelector('.buttons__generate') as HTMLButtonElement;

    generate.addEventListener('click', generateCars);
  }

  addPaginationListener(): void {
    const nextPageBtn = document.querySelector('.next-btn') as HTMLButtonElement;
    const prevPageBtn = document.querySelector('.prev-btn') as HTMLButtonElement;

    nextPageBtn.addEventListener('click', nextPage);
    prevPageBtn.addEventListener('click', prevPage);
  }

  init(): HTMLElement {
    const header: HTMLElement = this.header.render();
    const main: HTMLElement = this.main.render();
    const footer: HTMLElement = this.footer.render();
    this.body.append(header);
    this.body.append(main);
    this.body.append(footer);
    this.addChangePageListener();
    App.addEditCarListener();
    App.addRemoveCarListener();
    this.addGenerateCarsListener();
    this.addPaginationListener();
    return this.body;
  }
}