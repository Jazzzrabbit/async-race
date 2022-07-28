export default class Footer {
  footer: HTMLElement;

  constructor() {
    this.footer = document.createElement('footer');
  }

  renderContent() {
    const github = document.createElement('a');
    const year = document.createElement('p');
    const logo = document.createElement('a');
    const logoImg = document.createElement('img');

    github.classList.add('github');
    year.classList.add('year');
    logo.classList.add('logo');
    logoImg.classList.add('logo__img');

    github.textContent = 'Github: Jazzzrabbit';
    year.textContent = '2022';
    logo.href = '#';
    logoImg.alt = 'RS-School-logo';

    logo.append(logoImg);
    this.footer.append(github, year, logo);
  }

  render() {
    this.renderContent();
    return this.footer;
  }
}