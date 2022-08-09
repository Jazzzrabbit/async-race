export type Cars = {
  cars: Car[],
  carsCount: string | null,
};

export type Car = {
  name: string,
  color: string,
  id?: number,
};

export type Winners = {
  cars: {
    car: Car,
    id: number,
    wins: number,
    time: number,
  }[],
  carsCount: string | null,
};

export type Winner = [
  {
    id: number,
    wins: number,
    time: number
  },
];

export type State = {
  page: number,
  cars: Car[],
  carsCount: string | null,
  isGarage: boolean,
  isWinners: boolean,
  animationId: number,
  currentWinner: number | null, 
};

export type Success = {
  success: boolean, 
  id?: number | undefined,
};