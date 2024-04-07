import { LinearProgress, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { startWithUpperCaseLetter } from 'utils/string';
import { format, parse } from 'date-fns';
import { IProfile } from 'core/interfaces/user';

export const columns = [
  {
    label: 'profileName',
    render: (item: IProfile) => (
      <Link to={`${item.id}`}>{item.profileName}</Link>
    ),
  },
  {
    label: 'profileStatus',
    render: (item: IProfile) => (
      <Typography
        fontStyle="italic"
        color={
          item.profileStatus === 'active'
            ? 'green'
            : item.profileStatus === 'paused'
            ? 'orange'
            : 'red'
        }
      >
        {startWithUpperCaseLetter(item.profileStatus)}
      </Typography>
    ),
  },
  {
    label: 'creationDate',
    render: (item: IProfile) => (
      <Typography fontStyle="italic">
        {format(
          parse(item.creationDate, 'yyyy-mm-dd', new Date()),
          'dd/mm/yyyy',
        )}
      </Typography>
    ),
  },
  {
    label: 'image',
    render: (item: IProfile) => (
      <Tooltip title={item.profileName}>
        <img
          src={item.image}
          width="100px"
          height="100px"
          style={{ objectFit: 'contain' }}
        />
      </Tooltip>
    ),
  },
  {
    label: 'progress',
    render: (item: IProfile) => (
      <LinearProgress value={item.progress} variant="determinate" />
    ),
  },
  {
    label: 'hourRate',
  },
  {
    label: 'username',
  },
  {
    label: 'password',
  },
  {
    label: 'percentage',
  },
  {
    label: 'address',
  },
  {
    label: 'city',
  },
  {
    label: 'postalCode',
  },
  {
    label: 'state',
  },
];

export const titlesOfColumns = [
  'profileName',
  'profileStatus',
  'creationDate',
  'image',
  'progress',
  'hourRate',
  'address',
  'city',
  'postalCode',
  'state',
  'username',
  'password',
  'percentage',
];
export const columnOptions = titlesOfColumns.map((item) => ({
  value: item,
  label: startWithUpperCaseLetter(item),
}));

export const DEFAULT_COLUMNS = ['profileName', 'profileStatus', 'creationDate'];
