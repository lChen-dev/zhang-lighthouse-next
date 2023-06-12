import React from 'react';

import { render } from '../../../test-utils';

import Funnel from '../Funnel';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: mockPush,
    };
  },
}));

test('Renders the funnel with price', () => {
  const { getByText } = render(<Funnel />);
  getByText(/Please select your price range/);
  let nextButton = getByText(/Next/);
  nextButton.click();
  getByText(/How many bedrooms?/);
  nextButton = getByText(/Next/);
  nextButton.click();
  expect(mockPush).toHaveBeenCalled();
});
