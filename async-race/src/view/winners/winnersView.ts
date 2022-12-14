import { currentState } from '../../model/state';
import GarageView from '../garage/garageView';

export default class WinnersView {
  wrapper: HTMLDivElement;

  constructor() {
    this.wrapper = document.createElement('div');
  }

  static renderWinner(): string {
    return currentState.winners.map(item => {
      return `<tr>
                <th>${item.id}</th>
                <th>${GarageView.getCarImage(item.car.color)}</th>
                <th>${item.car.name}</th>
                <th>${item.wins}</th>
                <th>${item.time}</th>
              </tr>
      `;
    }).join('');     
  }

  static renderWinnersTable(): string {
    return `
    <div class="title-wrapper">
      <h1 class="title winners__title">Winners (${currentState.winnersCount})</h1>
      <h2 class="subtitle winners__subtitle">Page #${currentState.winnersPage}</h2>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th class="wins" id="wins">Wins</th>
          <th class="time" id="time">Best time</th>
        </tr>
      </thead>
      <tbody>
        ${this.renderWinner()}
      </tbody>
    </table>
    `;
  }

  render(): HTMLDivElement {
    this.wrapper.classList.add('table-wrapper', 'hidden');
    this.wrapper.innerHTML = WinnersView.renderWinnersTable();
    return this.wrapper;
  }
}