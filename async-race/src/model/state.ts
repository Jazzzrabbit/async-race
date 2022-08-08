import { getCars } from './api';
import { State } from './type';


const { cars, carsCount } = await getCars(1);

export const currentState: State = {
  page: 1,
  cars: cars,
  carsCount: carsCount,
  isGarage: true,
  isWinners: false,
  animationId: 0,
}; 