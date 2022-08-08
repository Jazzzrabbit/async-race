export default class Header {
  header: HTMLElement;

  constructor() {
    this.header = document.createElement('header');
  }

  renderNav(): void {
    const nav: HTMLElement = document.createElement('nav');
    const garageBtn: HTMLAnchorElement = document.createElement('a');
    const winnersBtn: HTMLAnchorElement = document.createElement('a');
    nav.classList.add('nav');
    garageBtn.classList.add('nav__garage-btn', 'btn');
    winnersBtn.classList.add('nav__winners-btn', 'btn');
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