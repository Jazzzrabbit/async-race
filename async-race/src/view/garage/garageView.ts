import sprite from '../../assets/img/sprite.svg';
import { getCars } from '../../model/api';

const { cars, carsCount } = await getCars();

export default class GarageView {
  wrapper: HTMLDivElement;

  constructor() {
    this.wrapper = document.createElement('div');
  }

  static getCarImage(color: string) {
    return `
      <svg class="car-svg" fill=${color}>
        <use href=${sprite}#car width="4rem" height="4rem"/>
      </svg>
    `;
  }

  renderTitle() {
    const titleWrapper = document.createElement('div');
    const title = document.createElement('h1');
    const subtitle = document.createElement('h2');

    titleWrapper.classList.add('title-wrapper');
    title.classList.add('title', 'garage__title');
    subtitle.classList.add('subtitle', 'garage__subtitle');

    title.textContent = `Garage (${carsCount})`;
    subtitle.textContent = 'Page #1';
    titleWrapper.append(title);
    titleWrapper.append(subtitle);
    this.wrapper.append(titleWrapper);
  }

  renderCar(id: number, model: string, color: string) {
    const car: HTMLDivElement = document.createElement('div');
    const selectCarBtn: HTMLButtonElement = document.createElement('button');
    const removeCarBtn: HTMLButtonElement = document.createElement('button');
    const startCarBtn: HTMLButtonElement = document.createElement('button');
    const stopCarBtn: HTMLButtonElement = document.createElement('button');
    const carName: HTMLParagraphElement = document.createElement('p');
    const road: HTMLElement = document.createElement('div');
    const carImage: HTMLDivElement = document.createElement('div');
    const finish: HTMLDivElement = document.createElement('div');

    car.classList.add('car');
    selectCarBtn.classList.add('select-car', 'btn');
    removeCarBtn.classList.add('remove-car', 'btn');
    startCarBtn.classList.add('start-car', 'btn');
    stopCarBtn.classList.add('stop-car', 'btn');
    carName.classList.add('car-name');
    road.classList.add('road');
    carImage.classList.add('car-image');
    finish.classList.add('finish');

    car.id = `${id}`;
    selectCarBtn.id = `${id}`;
    removeCarBtn.id = `${id}`;
    startCarBtn.id = `${id}`;
    stopCarBtn.id = `${id}`;
    carName.id = `${id}`;
    carImage.id = `${id}`;
    finish.id = `${id}`;

    selectCarBtn.textContent = 'Select';
    removeCarBtn.textContent = 'Remove';
    startCarBtn.textContent = 'Start';
    stopCarBtn.textContent = 'Stop';
    carName.textContent = model;
    carImage.innerHTML = GarageView.getCarImage(color);

    car.append(selectCarBtn, removeCarBtn, carName, startCarBtn, stopCarBtn, carImage, road, finish);
    this.wrapper.append(car);
  }

  render(): HTMLElement {
    this.wrapper.classList.add('garage-wrapper');
    this.renderTitle();
    cars.map((el) => this.renderCar(el.id, el.name, el.color));
    return this.wrapper;
  }
}