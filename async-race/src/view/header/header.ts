export default class Header {
  header: HTMLHeadElement;

  constructor() {
    this.header = document.createElement('header');
  }

  renderNav(): void {
    const nav = document.createElement('nav');
    const garageBtn = document.createElement('a');
    const winnersBtn = document.createElement('a');
    nav.classList.add('nav');
    garageBtn.classList.add('nav__garageBtn', 'btn');
    winnersBtn.classList.add('nav__winnersBtn', 'btn');
    garageBtn.href = '#';
    winnersBtn.href = '#';
    garageBtn.textContent = 'Garage';
    winnersBtn.textContent = 'Winners';

    nav.append(garageBtn);
    nav.append(winnersBtn);
    this.header.append(nav);
  }

  render(): HTMLHeadElement {
    this.renderNav();
    this.header.classList.add('header');
    return this.header;
  }
}

//   constructor() {
//     this.container = document.createElement('div');
//   }

//   renderHeader() {
//     //create header and its wrapper
//     const header: HTMLElement = document.createElement('head');
//     header.classList.add('header');
//     const headerWrapper: HTMLDivElement = document.createElement('div');
//     headerWrapper.classList.add('header__wrapper');

//     header.append();
//   }

//   renderHeaderButtons() {
//     //create header buttons to switch pages
//     const toGaragePage: HTMLButtonElement = document.createElement('button');
//     const toWinnersPage: HTMLButtonElement = document.createElement('button');
//     toGaragePage.classList.add('btn');
//     toWinnersPage.classList.add('btn');
//     toGaragePage.textContent = 'To Garage';
//     toWinnersPage.textContent = 'To Winners';
//   }

//   renderHeaderForm() {
//     //create header form to add and edit cars
//     const form = document.createElement('form');
//     form.classList.add('form');

//     const create = document.createElement('button');
//     const update = document.createElement('button');
//     create.classList.add('btn');
//     update.classList.add('btn');
//     create.textContent = 'Create';
//     update.textContent = 'Update';

//     const createInput = document.createElement('input');
//     const updateInput = document.createElement('input');
//     createInput.type = 'text';
//     updateInput.type = 'text';
//   }
// }

// function renderMainPage(): void {
//   const header = document.createElement('header');
//   header.classList.add('header');

//   const headerNav = document.createElement('nav');
//   headerNav.classList.add('nav');
//   const garageButton = document.createElement('a');
//   const winnersButton = document.createElement('a');
//   garageButton.classList.add('nav__garageButton', 'button');
//   winnersButton.classList.add('nav__winnersButton', 'button');

//   const headerForm = document.createElement('form');
//   const createInput = document.createElement('input');
//   const createColor = document.createElement('input');
//   const createButton = document.createElement('button');
// }