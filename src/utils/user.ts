import { IAddress, IProfile, IUser, ProfileStatus } from 'core/interfaces/user';

export function transformUser(user: IUser): IUser {
  const transformedUser = {};
  const requiredFields: Array<keyof IUser> = [
    'id',
    'firstName',
    'lastName',
    'birthDate',
    'image',
    'height',
    'weight',
    'address',
    'username',
    'password',
    'age',
  ];

  for (const field of requiredFields) {
    (transformedUser as Record<keyof IUser, string | number | IAddress>)[
      field
    ] = user[field];
  }

  return transformedUser as IUser;
}

export function transformedUserToProfile(user: IUser): IProfile {
  const status: ProfileStatus =
    user.age > 0 && user.age < 30
      ? 'active'
      : user.age >= 30 && user.age <= 45
      ? 'paused'
      : 'deleted';
  const {
    address: { postalCode, state, city, address },
  } = user;
  return {
    id: user.id,
    profileName: `${user.firstName} ${user.lastName}`,
    creationDate: user.birthDate,
    image: user.image,
    progress: user.height - 100,
    hourRate: `${user.weight} $`,
    postalCode,
    state,
    city,
    address,
    username: user.username,
    password: user.password,
    percentage: `${user.age} %`,
    profileStatus: status,
  };
}
