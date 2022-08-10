import { getCars, getWinners } from './api';
import { State } from './type';


const { cars, carsCount } = await getCars(1);
const { winners, winnersCount } = await getWinners();

export const currentState: State = {
  page: 1,
  cars: cars,
  carsCount: carsCount,
  isGarage: true,
  isWinners: false,
  animationId: 0,
  currentWinner: {
    id: null,
    wins: 0,
    time: 0,
  },
  winners: winners,
  winnersCount: winnersCount,
  winnersPage: 1,
}; 