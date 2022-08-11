import { generateCars, getSelectCarId, removeCar, nextPage, 
  prevPage, startCar, stopCar, startRace, reset, createNewCar, editCar,
  sortByTime, sortByWins, addListeners } from '../controller/listeners';
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
    const toGarage = document.querySelector('.nav__garage-btn') as HTMLButtonElement;
    const toWinners = document.querySelector('.nav__winners-btn') as HTMLButtonElement;
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

  static addStartCarListener(): void {
    const start: NodeListOf<Element> = document.querySelectorAll('.start-car');

    [...start].map(item => item.addEventListener('click', startCar));
  }

  static addStopCarListener(): void {
    const stop: NodeListOf<Element> = document.querySelectorAll('.stop-car');

    [...stop].map(item => item.addEventListener('click', stopCar));
  }

  addStartRaceListener(): void {
    const race = document.querySelector('.buttons__race') as HTMLButtonElement;

    race.addEventListener('click', startRace);
  }

  addResetListener(): void {
    const resetButton = document.querySelector('.buttons__reset') as HTMLButtonElement;
    
    resetButton.addEventListener('click', reset);
  }

  addCreateFormListener(): void {
    const create = document.querySelector('.create-btn') as HTMLButtonElement;

    create.addEventListener('click', createNewCar);
  }

  addEditFormListener(): void {
    const edit = document.querySelector('.edit-btn') as HTMLButtonElement;

    edit.addEventListener('click', editCar);
  }

  static addSortByTimeListener(): void {
    const time = document.getElementById('time') as HTMLElement;
    
    time.addEventListener('click', sortByTime);
  }

  static addSortByWinsListener(): void {
    const wins = document.getElementById('wins') as HTMLElement;

    wins.addEventListener('click', sortByWins);
  }

  init(): HTMLElement {
    const header: HTMLElement = this.header.render();
    const main: HTMLElement = this.main.render();
    const footer: HTMLElement = this.footer.render();
    this.body.append(header);
    this.body.append(main);
    this.body.append(footer);
    this.addChangePageListener();
    addListeners();
    this.addResetListener();
    this.addStartRaceListener();
    this.addGenerateCarsListener();
    this.addPaginationListener();
    this.addCreateFormListener();
    this.addEditFormListener();
    return this.body;
  }
}