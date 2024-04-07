import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from 'api/axios';
import {
  CircularProgress,
  Slider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { IProfile, IUser } from 'core/interfaces/user';
import { transformUser, transformedUserToProfile } from 'utils/user';
import { startWithUpperCaseLetter } from 'utils/string';
import { format, parse } from 'date-fns';
import {
  addressFields,
  mainInfoFields,
  otherInfoFields,
  ProfileKeys,
} from './config';
import { AxiosResponse } from 'axios';

export function Profile() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IProfile | null>(null);

  const fetchUserById = useCallback(async () => {
    if (id === null) return;

    setLoading(true);
    try {
      const response: AxiosResponse<IUser> = await instance.get(`/user/${id}`);
      const transformedUser = transformUser(response.data);
      const profile = transformedUserToProfile(transformedUser);
      setUser(profile);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserById();
  }, [fetchUserById]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!loading && user === null) {
    return <Typography>User not found</Typography>;
  }

  if (user !== null) {
    return (
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px',
          width: 'inherit',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {renderUserInfo('General info', mainInfoFields, user)}
        {renderUserInfo('Other info', otherInfoFields, user)}
      </Stack>
    );
  }
}
function renderUserInfo(title: string, fields: ProfileKeys, user: IProfile) {
  return (
    <Stack
      sx={{
        padding: '10px',
        border: '1px solid grey',
        background: '#eaeaea',
        borderRadius: 4,
        width: fields === mainInfoFields ? '50%' : '40%',
      }}
    >
      <Typography
        variant={fields === mainInfoFields ? 'h4' : 'h5'}
        sx={{ textDecoration: 'underline' }}
      >
        {title}
      </Typography>
      <Stack gap="8px">
        {fields.map((item: keyof IProfile) => (
          <Stack flexDirection="row" gap="4px" alignItems="center" key={item}>
            <Typography fontWeight="bold">{formatLabel(item)}:</Typography>
            {formatValue(item, user)}
          </Stack>
        ))}
        {title === 'Other info' && renderAddress(user)}
      </Stack>
    </Stack>
  );
}

function renderAddress(user: IProfile) {
  return (
    <>
      <Typography variant="h5" sx={{ textDecoration: 'underline' }}>
        Address
      </Typography>
      {addressFields.map((key) => (
        <Stack flexDirection="row" gap="4px" alignItems="center" key={key}>
          <Typography fontWeight="bold">
            {startWithUpperCaseLetter(key)}:
          </Typography>
          <Typography fontStyle="italic">{user[key]}</Typography>
        </Stack>
      ))}
    </>
  );
}

function formatLabel(item: keyof IProfile) {
  if (item === 'percentage') {
    return 'Percentage Of Finished Projects';
  }
  return startWithUpperCaseLetter(item);
}

function formatValue(item: keyof IProfile, user: IProfile) {
  if (item === 'creationDate') {
    return (
      <Typography fontStyle="italic">
        {format(
          parse(user.creationDate, 'yyyy-mm-dd', new Date()),
          'dd/mm/yyyy',
        )}
      </Typography>
    );
  }
  if (item === 'image') {
    return (
      <Tooltip title={user.profileName}>
        <img
          src={user.image}
          alt={user.profileName}
          width="100px"
          height="100px"
          style={{ objectFit: 'cover' }}
        />
      </Tooltip>
    );
  }
  if (item === 'progress') {
    return (
      <Slider value={user.progress} size="small" valueLabelDisplay="auto" />
    );
  }

  if (item === 'profileStatus') {
    return (
      <Typography
        fontStyle="italic"
        color={
          user.profileStatus === 'active'
            ? 'green'
            : user.profileStatus === 'paused'
            ? 'orange'
            : 'red'
        }
      >
        {startWithUpperCaseLetter(user.profileStatus)}
      </Typography>
    );
  }
  return <Typography fontStyle="italic">{user[item]}</Typography>;
}
