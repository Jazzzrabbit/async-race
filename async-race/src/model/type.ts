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
  winners: {
    car: Car,
    id: number | null,
    wins: number,
    time: number,
  }[],
  winnersCount: string | null,
};

export type Winner = [
  {
    id: number | null,
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
  currentWinner: {
    id: number | null,
    wins: number,
    time: number,
  },
  winners: {
    car: Car,
    id: number | null,
    wins: number,
    time: number,
  }[],
  winnersCount: string | null,
  winnersPage: number,
};

export type Success = {
  success: boolean, 
  id?: number | undefined,
};