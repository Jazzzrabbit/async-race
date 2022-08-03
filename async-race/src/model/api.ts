const baseLink = 'http://127.0.0.1:3000';
const garage = `${baseLink}/garage`;

export const getCars = async (page = 1, limit = 7) => {
  const response = await fetch(`${garage}/?_page=${page}&_limit=${limit}`);

  return {
    cars: await response.json(),
    carsCount: response.headers.get('X-Total-Count'),
  };
};