import { getWinners } from '../../model/api';
import GarageView from '../garage/garageView';

const { cars, carsCount } = await getWinners();

export default class WinnersView {
  wrapper: HTMLDivElement;

  constructor() {
    this.wrapper = document.createElement('div');
  }

  renderWinner(): string[] {
    return cars.map(item => {
      return `<tr>
                <th>${item.id}</th>
                <th>${GarageView.getCarImage(item.car.color)}</th>
                <th>${item.car.name}</th>
                <th>${item.wins}</th>
                <th>${item.time}</th>
              </tr>
      `;
    });     
  }

  renderWinnersTable(): void {
    const html = `
    <div class="title-wrapper">
      <h1 class="title winners__title">Winners (${carsCount})</h1>
      <h2 class="subtitle winners__subtitle">Page #n</h2>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time</th>
        </tr>
      </thead>
      <tbody>
        ${this.renderWinner()}
      </tbody>
    </table>
    `;
    this.wrapper.innerHTML = html;
  }

  render(): HTMLDivElement {
    this.wrapper.classList.add('table-wrapper', 'hidden');
    this.renderWinnersTable();
    return this.wrapper;
  }
}