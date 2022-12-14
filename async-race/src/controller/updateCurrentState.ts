import { getCars, getWinners } from '../model/api';
import { currentState } from '../model/state';

export async function updateCurrentState(): Promise<void> {
  const { cars, carsCount } = await getCars(currentState.page);
  const { winners, winnersCount } = await getWinners(currentState.winnersPage, 10,
    currentState.sortBy, currentState.sortOrder);

  currentState.cars = cars;
  currentState.carsCount = carsCount;

  currentState.winners = winners;
  currentState.winnersCount = winnersCount;
}