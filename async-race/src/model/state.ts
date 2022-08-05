import { getCars } from './api';
import { Car } from './type';


const { cars, carsCount } = await getCars(1);

type State = {
  page: number,
  cars: Car[],
  carsCount: string | null,
};

export const currentState: State = {
  page: 1,
  cars: cars,
  carsCount: carsCount,
}; 