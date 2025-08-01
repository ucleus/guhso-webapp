import { render } from '@testing-library/react';
jest.mock('axios');
const App = require('./App').default;

test('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.App')).toBeInTheDocument();
});
