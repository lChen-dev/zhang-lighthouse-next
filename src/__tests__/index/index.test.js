import React from 'react';

import { render } from '../../test-utils';

import Index from '../../pages/index';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Index page', () => {
  it('Renders and mentions Lighthouse', () => {
    const { getAllByText } = render(<Index />);
    getAllByText(/Lighthouse/);
  });
});
