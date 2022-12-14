import ControlPanel from '../control-panel/control-panel';
import GarageView from '../garage/garageView';
import WinnersView from '../winners/winnersView';

export default class Main {
  main: HTMLElement;

  controlPanel: ControlPanel;

  garageView: GarageView;

  winnersView: WinnersView;

  constructor() {
    this.main = document.createElement('main');
    this.controlPanel = new ControlPanel();
    this.garageView = new GarageView();
    this.winnersView = new WinnersView();
  }

  renderPagination() {
    const paginationWrapper: HTMLDivElement = document.createElement('div');
    const prevButton: HTMLButtonElement = document.createElement('button');
    const nextButton: HTMLButtonElement = document.createElement('button');

    paginationWrapper.classList.add('pagination-wrapper');
    prevButton.classList.add('btn', 'prev-btn');
    nextButton.classList.add('btn', 'next-btn');

    prevButton.textContent = 'Previous';
    nextButton.textContent = 'Next';

    paginationWrapper.append(prevButton);
    paginationWrapper.append(nextButton);

    this.main.append(paginationWrapper);
  }

  render(): HTMLElement {
    const panel: HTMLElement = this.controlPanel.render();
    const garageView: HTMLDivElement = this.garageView.render();
    const winnersView: HTMLDivElement = this.winnersView.render();
    this.main.classList.add('main');
    this.main.append(panel);
    this.main.append(garageView);
    this.main.append(winnersView);
    this.renderPagination();
    return this.main;
  }
}