import React from 'react';

import { render } from '../../../test-utils';

import LocationAutocomplete from '../LocationAutocomplete';

test('Location Autocomlete can render', () => {
  const { getByRole } = render(<LocationAutocomplete />);
  getByRole('textbox');
});
