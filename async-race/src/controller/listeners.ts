import App from '../app/app';
import { createCar, deleteCar, deleteWinner, updateCar } from '../model/api';
import { carBrand, carModel } from '../model/randomCars';
import { currentState } from '../model/state';
import { Car } from '../model/type';
import GarageView from '../view/garage/garageView';
import WinnersView from '../view/winners/winnersView';
import { updateCurrentState } from './updateCurrentState';

export async function createNewCar(event: Event): Promise<void> {
  event.preventDefault();

  const form = document.getElementById('createForm') as HTMLFormElement;
  const name = form.querySelector('[name="cname"]') as HTMLInputElement;
  const color = form.querySelector('[name="ccolor"]') as HTMLInputElement;
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const garageView: GarageView = new GarageView();

  const obj: Car = {
    name: name.value,
    color: color.value,
  };
  
  await createCar(obj);
  await updateCurrentState();
  
  garage.innerHTML = garageView.renderGarage();

  App.addRemoveCarListener();
  App.addEditCarListener();
}

export async function editCar(event: Event): Promise<void> {
  event.preventDefault();
  
  const form = document.getElementById('editForm') as HTMLFormElement;
  const name = form.querySelector('[name="ename"]') as HTMLInputElement;
  const color = form.querySelector('[name="ecolor"]') as HTMLInputElement;
  const id = form.querySelector('[name="eid"]') as HTMLInputElement;
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const garageView: GarageView = new GarageView();

  const obj: Car = {
    name: name.value,
    color: color.value,
    id: +id.value,
  };

  await updateCar(obj);
  await updateCurrentState();
  garage.innerHTML = garageView.renderGarage();

  App.addRemoveCarListener();
  App.addEditCarListener();
}

export function getSelectCarId(event: Event): void {
  const editForm = document.getElementById('editForm') as HTMLFormElement;
  const inputId = editForm.querySelector('[name="eid"]') as HTMLInputElement;

  inputId.value = ((event.target as HTMLElement).getAttribute('id') as string);
}

export async function removeCar(event: Event): Promise<void> {
  const id = (event.target as HTMLElement).getAttribute('id') as string;
  const garageView: GarageView = new GarageView();
  const winnersView: WinnersView = new WinnersView();
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const winners = document.querySelector('.table-wrapper') as HTMLElement;

  await deleteCar(+id);
  await deleteWinner(+id);
  await updateCurrentState();

  garage.innerHTML = garageView.renderGarage(); //после перерисовки слетает лиснер
  winners.innerHTML = winnersView.renderWinnersTable();

  App.addRemoveCarListener();
  App.addEditCarListener();
}

function generateRandomColor(): string {
  const loop = 6;
  const colors = '0123456789ABCDEF';
  let output = '#';

  for (let i = 0; i < loop; i++) {
    const index: number = Math.floor(Math.random() * colors.length);
    output += colors.charAt(index);
  }

  return output;
}

function generateRandomName(): string {
  const numberOfCars = 57;
  const index: number = Math.floor(Math.random() * numberOfCars);

  return carBrand[index] + ' ' + carModel[index];
}

function generateCarsArray(): Car[] {
  const output: Car[] = new Array(100);

  for (let i = 0; i < output.length; i++) {
    output[i] = { name: generateRandomName(), color: generateRandomColor() };
  }

  return output;
}

export async function generateCars(): Promise<void> {
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const garageView: GarageView = new GarageView();
  const cars: Car[] = generateCarsArray();

  await Promise.all(cars.map(car => createCar(car)));
  await updateCurrentState();
  
  garage.innerHTML = garageView.renderGarage();

  App.addRemoveCarListener(); //убрать в отдельную функцию
  App.addEditCarListener();
}

export async function nextPage(): Promise<void> {
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const winners = document.querySelector('.table-wrapper') as HTMLElement;
  const garageView: GarageView = new GarageView();
  const winnersView: WinnersView = new WinnersView();
  const carsCount = currentState.carsCount as string;
  const currentPage: number = currentState.page; 

  if (currentState.isGarage) {
    if (7 * currentPage < +carsCount) {
      currentState.page++;
      await updateCurrentState();
      garage.innerHTML = garageView.renderGarage(); //надо делать кнопку неактивной
    }   
  }

  if (7 * currentPage < +carsCount) {
    currentState.page++;
    await updateCurrentState();
    winners.innerHTML = winnersView.renderWinnersTable();
  } 

  App.addRemoveCarListener();
  App.addEditCarListener();
}

export async function prevPage(): Promise<void> {
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const garageView: GarageView = new GarageView();

  if (currentState.page > 1) currentState.page--;
  
  await updateCurrentState();
  garage.innerHTML = garageView.renderGarage(); 

  App.addRemoveCarListener();
  App.addEditCarListener();
}