import { createCar, deleteCar, deleteWinner, updateCar } from '../model/api';
import { currentState } from '../model/state';
import { Car } from '../model/type';
import GarageView from '../view/garage/garageView';
import WinnersView from '../view/winners/winnersView';
import { updateCurrentState } from './updateCurrentState';

export async function createNewCar(event: Event): Promise<void> {
  event.preventDefault();

  const form = document.getElementById('createForm') as HTMLFormElement;
  const name = form?.querySelector('[name="cname"]') as HTMLInputElement;
  const color = form?.querySelector('[name="ccolor"]') as HTMLInputElement;
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const garageView: GarageView = new GarageView();

  const obj: Car = {
    name: name.value,
    color: color.value,
  };
  
  await createCar(obj);
  await updateCurrentState();
  
  garage.innerHTML = garageView.renderGarage();
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
}

export function getSelectCarId(event: Event): void {
  const editForm = document.getElementById('editForm') as HTMLFormElement;
  const inputId = editForm.querySelector('[name="eid"]') as HTMLInputElement;

  inputId.value = ((event.target as HTMLElement).getAttribute('id') as string);
}

export async function removeCar(event: Event) {
  const id = (event.target as HTMLElement).getAttribute('id') as string;
  const garageView: GarageView = new GarageView();
  const winnersView: WinnersView = new WinnersView();
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const winners = document.querySelector('.table-wrapper') as HTMLElement;
  await deleteCar(+id);
  await deleteWinner(+id);
  await updateCurrentState();
  garage.innerHTML = garageView.renderGarage();
  winners.innerHTML = winnersView.renderWinnersTable();
  document.location.reload();
}

export async function nextPage() {
  const garage: GarageView = new GarageView();
  currentState.page++;
  console.log(currentState.page);
  updateCurrentState();
  console.log(garage.render());
  garage.render();
  // document.location.reload();
}