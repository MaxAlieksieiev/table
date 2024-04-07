import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
} from '@mui/material';
import { IconButton, Button } from '../button/button';
import { ReactNode } from 'react';

interface ModalProps extends Omit<DialogProps, 'onClose'> {
  title?: string;
  mainAction: ReactNode;
  onClose: () => void;
}

export function Modal({
  title,
  mainAction,
  onClose,
  open,
  children,
  ...dialogProps
}: ModalProps) {
  const handleClose = () => onClose?.();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" {...dialogProps}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: 1, borderColor: 'divider', padding: '0 10px' }}
      >
        {Boolean(title) && <DialogTitle>{title}</DialogTitle>}
        <IconButton aria-label="close" onClick={handleClose}>
          x
        </IconButton>
      </Stack>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ borderTop: 1, borderColor: 'divider' }}>
        {mainAction}
        <Button title="Cancel" onClick={handleClose} color="error" />
      </DialogActions>
    </Dialog>
  );
}
