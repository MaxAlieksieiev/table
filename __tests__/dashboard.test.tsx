import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/pages/dashboard/dashboard';

const mockNavigate = jest.fn().mockImplementation(() => 'profiles');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
  useParams: () => ({}),
}));

describe('Dashboard', () => {
  const renderComponent = (initialRoute = '/') => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="profiles" element={<div>Profiles Page</div>} />
            <Route
              path="profiles/:id"
              element={<div>Profile Summary Page</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  };

  it('renders tabs correctly', () => {
    renderComponent();
    expect(screen.getByText('Profiles')).toBeInTheDocument();
    expect(screen.getByText('Profile summary')).toBeInTheDocument();
  });

  it('navigates to the correct tab', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Profiles'));
    const newRoute = mockNavigate();
    expect(newRoute).toEqual('profiles');
  });

  it('disables the Profile summary tab when no params are provided', () => {
    renderComponent();
    expect(screen.getByText('Profile summary')).toBeDisabled();
  });
});
