import { render, screen } from '@testing-library/react';
import { Button, IconButton } from '../src/components/button/button';

describe('Button', () => {
  test('renders with the correct title', () => {
    render(<Button title="Click Me" />);
    const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with child content', () => {
    render(
      <IconButton>
        <span>Icon</span>
      </IconButton>,
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  // Test styles
  test('applies correct styles', () => {
    render(<IconButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle({
      minWidth: '20px',
      height: '20px',
      borderRadius: '50%',
      padding: 0,
    });
  });
});
