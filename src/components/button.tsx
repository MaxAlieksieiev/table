import { ButtonProps, Button as MuiButton } from '@mui/material';

interface Props extends ButtonProps {
  title: string;
}

export function Button({ title, ...props }: Props) {
  return (
    <MuiButton variant="contained" {...props}>
      {title}
    </MuiButton>
  );
}

export function IconButton({ children, ...props }: ButtonProps) {
  return (
    <MuiButton
      variant="text"
      sx={{
        minWidth: '20px',
        height: '20px',
        borderRadius: '50%',
        padding: 0,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
