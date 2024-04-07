import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  TableContainer,
  TableBody,
  SxProps,
  Theme,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { startWithUpperCaseLetter } from 'utils/string';
import { VaultService } from '../services/vaultService';

export type Order = 'asc' | 'desc';

interface Columns {
  label: string;
  render?: (item: any) => ReactNode;
  sx?: SxProps<Theme>;
}

interface Props<TItem = any> {
  columns: Columns[];
  order: Order;
  orderBy: string;
  items: TItem[];
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function Table(props: Props) {
  const {
    order: defaultOrder,
    orderBy: defaultOrderBy,
    columns,
    items,
  } = props;

  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  const createSortHandler =
    (property: string) => (_event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === property && order === 'asc';
      const currentOrder = isAsc ? 'desc' : 'asc';
      setOrder(currentOrder);
      setOrderBy(property);
      VaultService.setItem('sort', { [property]: currentOrder });
    };

  const sortedItems = useMemo(
    () => stableSort(items, getComparator(order, orderBy)),
    [order, orderBy],
  );

  useEffect(() => {
    const savedSort: Record<string, Order> = VaultService.getItem('sort');
    if (Object.keys(savedSort).length !== 0) {
      setOrder(Object.values(savedSort)[0]);
      setOrderBy(Object.keys(savedSort)[0]);
    }
  }, []);

  return (
    <TableContainer
      sx={{
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: 4,
        width: 'fit-content',
      }}
    >
      <TableHead>
        <TableRow>
          {columns.map((headCell) => (
            <TableCell
              key={headCell.label}
              align="left"
              padding="normal"
              sortDirection={orderBy === headCell.label ? order : false}
              sx={headCell.sx}
            >
              <TableSortLabel
                active={orderBy === headCell.label}
                direction={orderBy === headCell.label ? order : 'asc'}
                onClick={createSortHandler(headCell.label)}
              >
                {startWithUpperCaseLetter(headCell.label)}
                {orderBy === headCell.label ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <Rows items={sortedItems} columns={columns} />
      </TableBody>
    </TableContainer>
  );
}

function Rows({ items, columns }: { items: any[]; columns: Columns[] }) {
  if (items.length === 0) return null;
  return (
    <>
      {items.map((item: any, index: number) => (
        <TableRow key={index}>
          {columns.map((column, columnIndex) => (
            <TableCell key={`${index}}.${columnIndex}`} sx={column.sx}>
              {typeof column.render === 'function'
                ? column.render(item)
                : item[column.label]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
