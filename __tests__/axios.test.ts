import axios from 'axios';
import instance from '../src/api/axios';

export const fetchUser = async () => {
  try {
    const response = await instance.get('/user/1');
    const user = await response.data;
    console.log('user', user);
    return user;
  } catch (error) {
    return null;
  }
};

jest.mock('axios');

describe('Axios Instance', () => {
  it('should be created with the correct base URL', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://dummyjson.com/',
    });
  });

  it('fetches data successfully from an API', async () => {
    const mockData = { id: 1, lastName: 'user 1' };
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
});
