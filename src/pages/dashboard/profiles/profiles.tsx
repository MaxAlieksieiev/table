import { CircularProgress, Stack, Typography } from '@mui/material';
import { Button } from 'components/button/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import instance from 'api/axios';
import { Table } from 'components/table/table';
import { columns, DEFAULT_COLUMNS } from './config';
import { IProfile, IUser } from 'core/interfaces/user';
import { transformedUserToProfile } from 'utils/user';
import { ColumnModal } from './columnModal/columnModal';
import { VaultService } from 'services/vaultService';

export function Profiles() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedColumns, setSavedColumns] = useState(DEFAULT_COLUMNS);

  const fetchAllUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await instance.get('/users');
      const profiles = response.data.users.map((item: IUser) =>
        transformedUserToProfile(item),
      );
      setUsers(profiles);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const columns: string[] = VaultService.getItem('columns');
    if (columns.length !== 0) {
      setSavedColumns(columns);
    }
  }, []);

  useEffect(() => {
    fetchAllUsers().catch((error) => console.warn(error));
  }, [fetchAllUsers]);

  const defaultColumns = useMemo(() => {
    const res = columns.filter((item) => savedColumns.includes(item.label));
    return res;
  }, [savedColumns]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!loading && users.length === 0) {
    return <Typography>Users not found</Typography>;
  }

  return (
    <Stack padding="10px" gap="8px">
      <Button
        title="Select columns"
        onClick={() => setOpen(true)}
        size="small"
        sx={{ marginRight: 'auto' }}
      />
      {Boolean(defaultColumns.length) && (
        <Table
          items={users}
          columns={defaultColumns}
          order="asc"
          orderBy="id"
        />
      )}
      <ColumnModal
        open={open}
        onClose={() => setOpen(false)}
        handleApply={setSavedColumns}
        defaultColumns={savedColumns}
      />
    </Stack>
  );
}
