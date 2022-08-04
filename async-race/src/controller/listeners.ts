import { Car, createCar, deleteCar, deleteWinner, updateCar } from '../model/api';
import GarageView from '../view/garage/garageView';
import WinnersView from '../view/winners/winnersView';

export function createNewCar(event: Event): void {
  event.preventDefault();

  const form = document.getElementById('createForm') as HTMLFormElement;
  const name = form?.querySelector('[name="cname"]') as HTMLInputElement;
  const color = form?.querySelector('[name="ccolor"]') as HTMLInputElement;

  const obj: Car = {
    name: name.value,
    color: color.value,
  };
  
  createCar(obj);
  const view: GarageView = new GarageView();
  view.render();
  document.location.reload();
}

export function editCar(event: Event): void {
  event.preventDefault();

  const form = document.getElementById('editForm') as HTMLFormElement;
  const name = form.querySelector('[name="ename"]') as HTMLInputElement;
  const color = form.querySelector('[name="ecolor"]') as HTMLInputElement;
  const id = form.querySelector('[name="eid"]') as HTMLInputElement;

  const obj: Car = {
    name: name.value,
    color: color.value,
    id: +id.value,
  };
  
  updateCar(obj);
  const view: GarageView = new GarageView();
  view.render();
  document.location.reload();
}

export function getSelectCarId(event: Event): void {
  const editForm = document.getElementById('editForm') as HTMLFormElement;
  const inputId = editForm.querySelector('[name="eid"]') as HTMLInputElement;

  inputId.value = ((event.target as HTMLElement).getAttribute('id') as string);
}

export async function removeCar(event: Event) {
  const id = (event.target as HTMLElement).getAttribute('id') as string;
  const garage: GarageView = new GarageView();
  const winners: WinnersView = new WinnersView();
  await deleteCar(+id);
  await deleteWinner(+id);
  garage.render();
  winners.render();
  document.location.reload();
}