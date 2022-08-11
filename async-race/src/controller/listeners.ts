import App from '../app/app';
import { createCar, createWinner, deleteCar, deleteWinner, driveMode, 
  startEngine, stopEngine, updateCar, updateWinner } from '../model/api';
import { carBrand, carModel } from '../model/randomCars';
import { currentState } from '../model/state';
import { Car, Success } from '../model/type';
import GarageView from '../view/garage/garageView';
import WinnersView from '../view/winners/winnersView';
import { updateCurrentState } from './updateCurrentState';

export function addListeners(): void {
  App.addRemoveCarListener();
  App.addEditCarListener();
  App.addStartCarListener();
  App.addStopCarListener();
  App.addSortByTimeListener();
  App.addSortByWinsListener();
}

export async function createNewCar(event: Event): Promise<void> {
  event.preventDefault();

  const form = document.getElementById('createForm') as HTMLFormElement;
  const name = form.querySelector('[name="cname"]') as HTMLInputElement;
  const color = form.querySelector('[name="ccolor"]') as HTMLInputElement;
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;

  const obj: Car = {
    name: name.value,
    color: color.value,
  };
  
  await createCar(obj);
  await updateCurrentState();
  
  garage.innerHTML = GarageView.renderGarage();

  addListeners();
}

export async function editCar(event: Event): Promise<void> {
  event.preventDefault();
  
  const form = document.getElementById('editForm') as HTMLFormElement;
  const name = form.querySelector('[name="ename"]') as HTMLInputElement;
  const color = form.querySelector('[name="ecolor"]') as HTMLInputElement;
  const id = form.querySelector('[name="eid"]') as HTMLInputElement;
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;

  const obj: Car = {
    name: name.value,
    color: color.value,
    id: +id.value,
  };

  await updateCar(obj);
  await updateCurrentState();
  garage.innerHTML = GarageView.renderGarage();

  addListeners();
}

export function getSelectCarId(event: Event): void {
  const editForm = document.getElementById('editForm') as HTMLFormElement;
  const inputId = editForm.querySelector('[name="eid"]') as HTMLInputElement;

  inputId.value = ((event.target as HTMLElement).parentNode as HTMLElement).id;
}

export async function removeCar(event: Event): Promise<void> {
  const id = ((event.target as HTMLElement).parentNode as HTMLElement).id;
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const winners = document.querySelector('.table-wrapper') as HTMLElement;

  await deleteCar(+id);
  await deleteWinner(+id);
  await updateCurrentState();

  garage.innerHTML = GarageView.renderGarage(); 
  winners.innerHTML = WinnersView.renderWinnersTable();

  addListeners();
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
  const cars: Car[] = generateCarsArray();

  await Promise.all(cars.map(car => createCar(car)));
  await updateCurrentState();
  
  garage.innerHTML = GarageView.renderGarage();

  addListeners();
}

export async function nextPage(): Promise<void> {
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const winners = document.querySelector('.table-wrapper') as HTMLElement;
  const carsCount = currentState.carsCount as string;
  const winnersCount = currentState.winnersCount as string;
  const currentPage: number = currentState.page; 
  const currentWinnersPage: number = currentState.winnersPage;

  if (currentState.isGarage) {
    if (7 * currentPage < +carsCount) {
      currentState.page++;
      await updateCurrentState();
      garage.innerHTML = GarageView.renderGarage(); 
    }   
  } else {
    if (10 * currentWinnersPage < +winnersCount) {
      currentState.winnersPage++;
      await updateCurrentState();
      winners.innerHTML = WinnersView.renderWinnersTable();
    } 
  }

  addListeners();
}

export async function prevPage(): Promise<void> {
  const garage = document.querySelector('.garage-wrapper') as HTMLElement;
  const winners = document.querySelector('.table-wrapper') as HTMLElement;

  if (currentState.isGarage) {
    if (currentState.page > 1) currentState.page--;
  } else {
    if (currentState.winnersPage > 1) currentState.winnersPage--;
  }
  
  await updateCurrentState();
  garage.innerHTML = GarageView.renderGarage(); 
  winners.innerHTML = WinnersView.renderWinnersTable();

  addListeners();
}

export async function startCar(event: Event): Promise<void> {
  let start = 0;
  const id: string = (((event as Event).target as HTMLElement).parentNode as HTMLElement).id;
  const data: number[] = Object.values(await startEngine(+id, 'started'));
  const time: number = +data[1] / +data[0];

  function move(): void {
    const car = document.getElementById(id)?.querySelector('.car-svg') as SVGAElement;

    start += time / 1000;
    const end: number = document.body.clientWidth - 100;
    car.style.transform = `translateX(${start}px)`;
    
    if (start < end) {
      currentState.animationId = window.requestAnimationFrame(move);
    }
  }

  window.requestAnimationFrame(move);
}

export function stopCar(): void {
  const animationId: number = currentState.animationId;

  window.cancelAnimationFrame(animationId);
}

async function updateWinnersTable(): Promise<void> {
  currentState.winners.map(async winner => {
    if (winner.id === currentState.currentWinner.id) {
      await updateWinner(winner.id as number, {
        id: currentState.currentWinner.id,
        wins: currentState.currentWinner.wins + 1,
        time: currentState.currentWinner.time < winner.time ? currentState.currentWinner.time : winner.time,
      });
    } else await createWinner(currentState.currentWinner);
  });

  await updateCurrentState();
  const winners = document.querySelector('.table-wrapper') as HTMLElement;
  winners.innerHTML = WinnersView.renderWinnersTable();
}

async function innerStart(car: Element): Promise<void> { 
  currentState.currentWinner = { id: null, wins: 0, time: 0  };
  let start = 0;
  const id = car.getAttribute('id') as string;
  const data: number[] = Object.values(await startEngine(+id, 'started'));
  const time: number = +data[1] / +data[0];
  
  function innerMove(): void {
    const innerCar = document.getElementById(id)?.querySelector('.car-svg') as SVGAElement;
    start += time / 1000;
    const end: number = document.body.clientWidth - 100;
    innerCar.style.transform = `translateX(${start}px)`;
    
    if (start < end) {
      currentState.animationId = window.requestAnimationFrame(innerMove);
    }
  }      

  const response: Success = await driveMode(+id, 'drive');
  
  window.requestAnimationFrame(innerMove);

  if (!response.success) {
    await stopEngine(+id, 'stopped');
    window.cancelAnimationFrame(currentState.animationId);
  } else {
    if (currentState.currentWinner.id === null) {
      currentState.currentWinner = { 
        id: response.id as number, 
        wins: 1, 
        time: +(time / 1000).toFixed(2), 
      };
      await updateWinnersTable();
    }  
  }
}

export async function startRace(): Promise<void> {
  const cars: NodeListOf<Element> = document.querySelectorAll('.car');

  await Promise.all([...cars].map(async car => innerStart(car)));
  
  setTimeout(() => {
    if (currentState.currentWinner.id !== null) {
      const winner = document.getElementById(currentState.currentWinner.id.toString()) as HTMLElement;
      alert('And the winner is ' + winner.querySelector('.car-name')?.textContent + '!');
    }
  }, 300);
} 

export function reset(): void {
  currentState.currentWinner = { id: null, wins: 0, time: 0  };
  const cars: NodeListOf<Element> = document.querySelectorAll('.car');

  [...cars].forEach(async car => {
    const carImage = car.querySelector('.car-svg') as HTMLElement;
    const id = car.getAttribute('id') as string;
    await stopEngine(+id, 'stopped');

    carImage.style.transform = 'translateX(0px)';
  });
}

export async function sortByTime(): Promise<void> {
  const winners = document.querySelector('.table-wrapper') as HTMLElement;

  currentState.sortBy = 'time';
  currentState.sortOrder = currentState.sortOrder === 'ASC' ? 'DESC' : 'ASC';

  await updateCurrentState();

  winners.innerHTML = WinnersView.renderWinnersTable();
  addListeners();
}

export async function sortByWins(): Promise<void> {
  const winners = document.querySelector('.table-wrapper') as HTMLElement;

  currentState.sortBy = 'wins';
  currentState.sortOrder = currentState.sortOrder === 'ASC' ? 'DESC' : 'ASC';
  
  await updateCurrentState();

  winners.innerHTML = WinnersView.renderWinnersTable();
  addListeners();
}