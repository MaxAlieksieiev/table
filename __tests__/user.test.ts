import { mockUser } from '../src/mocks/user';
import { transformUser, transformedUserToProfile } from '../src/utils/user';

describe('transformUser', () => {
  it('should correctly transform user data', () => {
    const transformed = transformUser(mockUser);
    expect(transformed).toEqual(mockUser);
  });
});

describe('transformedUserToProfile', () => {
  it('should transform IUser to IProfile and assign active status for age < 30', () => {
    const profile = transformedUserToProfile(mockUser);
    expect(profile.profileStatus).toBe('active');
    expect(profile.profileName).toBe(
      `${mockUser.firstName} ${mockUser.lastName}`,
    );
  });

  it('should assign paused status for age between 30 and 45', () => {
    const olderUser = { ...mockUser, age: 35 };
    const profile = transformedUserToProfile(olderUser);
    expect(profile.profileStatus).toBe('paused');
  });

  it('should assign deleted status for age > 45', () => {
    const olderUser = { ...mockUser, age: 50 };
    const profile = transformedUserToProfile(olderUser);
    expect(profile.profileStatus).toBe('deleted');
  });
});
