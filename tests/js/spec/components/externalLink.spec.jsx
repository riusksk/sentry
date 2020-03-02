import React from 'react';

import {shallow} from 'sentry-test/enzyme';
import Link from 'app/components/links/link';

describe('Link', function() {
  it('renders', function() {
    const wrapper = shallow(<Link to="https://www.sentry.io/" external />);
    expect(wrapper).toMatchSnapshot();
  });
});
