import { RouteObject, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>Hello</div>,
  },
];

function App() {
  const element = useRoutes(routes);

  return element;
}

export default App;
