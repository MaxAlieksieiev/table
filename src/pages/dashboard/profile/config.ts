import { IProfile } from 'core/interfaces/user';

export type ProfileKeys = Array<keyof IProfile>;

export const otherInfoFields: ProfileKeys = [
  'username',
  'password',
  'hourRate',
  'percentage',
];

export const mainInfoFields: ProfileKeys = [
  'profileName',
  'profileStatus',
  'creationDate',
  'image',
  'progress',
];

export const addressFields: ProfileKeys = [
  'address',
  'city',
  'state',
  'postalCode',
];
