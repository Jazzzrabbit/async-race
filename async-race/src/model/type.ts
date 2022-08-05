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