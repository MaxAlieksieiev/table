import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../src/components/dialog/dialog';

describe('Modal', () => {
  const mainAction = <button>Test Action</button>;
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  test('renders correctly with a title and content', () => {
    const title = 'Test Title';
    render(
      <Modal
        title={title}
        mainAction={mainAction}
        onClose={onClose}
        open={true}
      >
        <div>Test Content</div>
      </Modal>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Action')).toBeInTheDocument();
  });

  test('calls onClose when the close icon is clicked', () => {
    render(
      <Modal mainAction={mainAction} onClose={onClose} open={true}>
        <div>Test Content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByLabelText('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when the cancel button is clicked', () => {
    render(<Modal mainAction={mainAction} onClose={onClose} open={true} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
