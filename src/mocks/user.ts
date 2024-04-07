import { IUser } from 'core/interfaces/user';

export const mockUser: IUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  birthDate: '1990-01-01',
  image: 'image-url',
  height: 180,
  weight: 75,
  address: {
    postalCode: '12345',
    state: 'State',
    city: 'City',
    address: '1234 Street',
  },
  username: 'johndoe',
  password: 'password',
  age: 25,
};
