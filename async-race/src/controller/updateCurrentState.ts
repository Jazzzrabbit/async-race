import { getCars } from '../model/api';
import { currentState } from '../model/state';

export async function updateCurrentState(): Promise<void> {
  const { cars, carsCount } = await getCars(currentState.page);

  currentState.cars = cars;
  currentState.carsCount = carsCount;
}