export default class Header {
  header: HTMLElement;

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

  render(): HTMLElement {
    this.renderNav();
    this.header.classList.add('header');
    return this.header;
  }
}