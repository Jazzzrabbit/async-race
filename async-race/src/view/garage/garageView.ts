import sprite from '../../assets/img/sprite.svg';
import { currentState } from '../../model/state';

export default class GarageView {
  wrapper: HTMLDivElement;

  constructor() {
    this.wrapper = document.createElement('div');
  }

  static getCarImage(color: string): string {
    return `
      <svg class="car-svg" fill=${color}>
        <use href=${sprite}#car width="4rem" height="4rem"/>
      </svg>
    `;
  }

  static renderCar(id: number | undefined, name: string, color: string): string {
    return `<div class="car" id="${id}">
              <p class="car-name">${name}</p>
              <button class="select-car btn">Select</button>
              <button class="remove-car btn">Remove</button>
              <button class="start-car btn">Start</button>
              <button class="stop-car btn">Stop</button>
              <div class="car-image">${GarageView.getCarImage(color)}</div>
              <div class="road"></div>
              <div class="finish""></div>
            </div>`;
  }

  static renderGarage(): string {
    return `<div class="title-wrapper">
              <h1 class="title garage__title">Garage (${currentState.carsCount})</h1>
              <h2 class="subtitle garage__subtitle">Page #${currentState.page}</h2>
            </div>
            <div class="cars-wrapper">${currentState.cars.map((car) =>
    this.renderCar(car.id, car.name, car.color)).join('')}</div>`;
  }

  render(): HTMLDivElement {
    this.wrapper.classList.add('garage-wrapper');
    this.wrapper.innerHTML = GarageView.renderGarage();

    return this.wrapper;
  }
}