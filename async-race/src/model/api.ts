import { Cars, Car, Winners, Winner, Success } from './type';

const baseLink = 'http://127.0.0.1:3000';
const garage = `${baseLink}/garage`;
const winners = `${baseLink}/winners`;
const engine = `${baseLink}/engine`;

export const getCars = async (page: number, limit = 7): Promise<Cars> => {
  return fetch(`${garage}/?_page=${page}&_limit=${limit}`).then(async res => 
    ({ cars: await res.json(), carsCount: res.headers.get('X-Total-Count') }));
};

export const getCar = async (id: number): Promise<Car> => {
  const response: Response = await fetch(`${garage}/${id}`);

  return response.json();
};

export const getWinners = async (page: number, limit = 10, sort?: string[], order?: string[]): Promise<Winners> => {
  const response: Response = await fetch(`${winners}/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const data: Winner = await response.json();

  const obj: Winners = {
    winners: await Promise.all(data.map(async item => ({ ...item, car: await getCar(item.id as number) }))),
    winnersCount: response.headers.get('X-Total-Count'),
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

export const startEngine = async (id: number, status: string): Promise<Response> => {
  const response: Response = await fetch(`${engine}?id=${id}&status=${status}`, { method: 'PATCH' });

  return response.json();
};

export const stopEngine = async (id: number, status: string): Promise<Response> => {
  const response: Response = await fetch(`${engine}?id=${id}&status=${status}`, { method: 'PATCH' });

  return response.json();
};

export const driveMode = async (id: number, status: string): Promise<Success> => {
  const response: Response = await fetch(`${engine}?id=${id}&status=${status}`, { method: 'PATCH' });
  
  switch (response.status) {
    case (400): {
      break;
    }
    case (404): {
      break;
    }
    case (429): {
      break;
    }
    case (500): {
      return { success: false };
    }
  }
  
  return { success: true, id: id };
};

export const createWinner = async (data: { id: number | null, wins: number, time: number }): Promise<Response> => {
  const response: Response = await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  
  return response.status !== 500 ? response.json() : null;
};

export const updateWinner = 
  async (id: number, data: { id: number | null, wins: number, time: number }): Promise<Response> => {
    const response: Response = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const updated: Response = await response.json();
    
    return updated;
  };

