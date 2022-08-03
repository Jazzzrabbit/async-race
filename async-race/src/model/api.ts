const baseLink = 'http://127.0.0.1:3000';
const garage = `${baseLink}/garage`;
const winners = `${baseLink}/winners`;

type Car = {
  cars: [
    {
      name: string,
      color: string,
      id: number,
    },
  ],
  carsCount: string | null,
};

type Winners = {
  cars: {
    car: {
      color: string,
      name: string,
      id: number,
    },
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


export const getCars = async (page = 1, limit = 7): Promise<Car> => {
  return fetch(`${garage}/?_page=${page}&_limit=${limit}`).then(async res => 
    ({ cars: await res.json(), carsCount: res.headers.get('X-Total-Count') }));
};

export const getCar = async (id: number): Promise<{ color: string, name: string, id: number }> => {
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

