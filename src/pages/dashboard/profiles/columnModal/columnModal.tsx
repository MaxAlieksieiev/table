import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { Modal } from 'components/dialog/dialog';
import { useMemo, useState } from 'react';
import { Button } from 'components/button/button';
import { columnOptions } from '../config';
import { useDebounce } from 'hooks/useDebounce';
import { VaultService } from 'services/vaultService';

interface Props {
  open: boolean;
  onClose: () => void;
  handleApply: (columns: string[]) => void;
  defaultColumns: string[];
}

export function ColumnModal({
  open,
  onClose,
  handleApply,
  defaultColumns,
}: Props) {
  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(defaultColumns);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  const applyColumns = () => {
    VaultService.setItem('columns', selectedColumns);
    handleApply(selectedColumns);
    onClose();
  };

  const options = useMemo(() => {
    if (debouncedSearch !== null) {
      return columnOptions.filter((option) =>
        option.value.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    return columnOptions;
  }, [debouncedSearch]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select columns"
      mainAction={
        <Button
          title="Apply"
          onClick={applyColumns}
          disabled={selectedColumns.length === 0}
        />
      }
    >
      <Stack gap="8px">
        <TextField
          type="search"
          placeholder="Search columns"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Stack
          sx={{
            maxHeight: '200px',
            overflowY: 'scroll',
          }}
        >
          {options.map((option) => {
            const checked = Boolean(
              selectedColumns.find((item) => item === option.value),
            );
            return (
              <FormControlLabel
                key={option.value}
                label={option.label}
                checked={Boolean(checked)}
                control={
                  <Checkbox
                    value={option.value}
                    onChange={() => {
                      if (checked) {
                        const filteredColumns = selectedColumns.filter(
                          (item) => item !== option.value,
                        );
                        setSelectedColumns(filteredColumns);
                      } else {
                        setSelectedColumns([...selectedColumns, option.value]);
                      }
                    }}
                  />
                }
              />
            );
          })}
        </Stack>
      </Stack>
    </Modal>
  );
}
