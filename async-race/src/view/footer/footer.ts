export default class Footer {
  footer: HTMLElement;

  constructor() {
    this.footer = document.createElement('footer');
  }

  renderContent(): void {
    const github: HTMLAnchorElement = document.createElement('a');
    const year: HTMLParagraphElement = document.createElement('p');
    const logo: HTMLDivElement = document.createElement('div');
    const logoLink: HTMLAnchorElement = document.createElement('a');

    github.classList.add('github');
    year.classList.add('year');
    logo.classList.add('logo');

    github.textContent = 'Github: Jazzzrabbit';
    year.textContent = '2022';
    github.href = 'https://github.com/Jazzzrabbit';
    logoLink.href = 'https://rs.school/js/';

    logoLink.append(logo);
    this.footer.append(github, year, logoLink);
  }

  render(): HTMLElement {
    this.footer.classList.add('footer');
    this.renderContent();
    return this.footer;
  }
}