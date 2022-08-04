const baseLink = 'http://127.0.0.1:3000';
const garage = `${baseLink}/garage`;
const winners = `${baseLink}/winners`;

type Cars = {
  cars: [
    Car,
  ],
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

type Winner = [
  {
    id: number,
    wins: number,
    time: number
  },
];


export const getCars = async (page = 1, limit = 7): Promise<Cars> => {
  return fetch(`${garage}/?_page=${page}&_limit=${limit}`).then(async res => 
    ({ cars: await res.json(), carsCount: res.headers.get('X-Total-Count') }));
};

export const getCar = async (id: number): Promise<Car> => {
  const response: Response = await fetch(`${garage}/${id}`);
  return response.json();
};

export const getWinners = async (page = 1, limit = 7, sort?: string[], order?: string[]): Promise<Winners> => {
  const response: Response = await fetch(`${winners}/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const data: Winner = await response.json();

  const obj: Winners = {
    cars: await Promise.all(data.map(async item => ({ ...item, car: await getCar(item.id) }))),
    carsCount: response.headers.get('X-Total-Count'),
  };
  return obj;
};

export const createCar = async (data: Car): Promise<Car> => {
  const response: Response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  });
  const car: Promise<Car> = await response.json();
  return car;
};

export const updateCar = async (data: Car): Promise<Car> => {
  const response: Response = await fetch(`${garage}/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  const updated: Promise<Car> = await response.json();
  return updated;
};

export const deleteCar = async (id: number): Promise<Response> => {
  const response: Response = await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const deleteWinner = async (id: number): Promise<Response> => {
  const response: Response = await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

