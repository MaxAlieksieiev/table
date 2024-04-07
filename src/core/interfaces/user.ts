export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  image: string;
  height: number;
  weight: number;
  address: IAddress;
  username: string;
  password: string;
  age: number;
}

export interface IAddress {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

export interface IProfile {
  id: number;
  profileName: string;
  profileStatus: ProfileStatus;
  creationDate: string;
  image: string;
  progress: number;
  hourRate: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  username: string;
  password: string;
  percentage: string;
}

export type ProfileStatus = 'active' | 'deleted' | 'paused';
