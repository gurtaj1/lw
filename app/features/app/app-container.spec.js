import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from 'features/app/app-container';

describe('features.app', () => {
  describe('App Container', () => {
    it('should export something', () => {
      expect(AppContainer).toBeDefined();
    });

    it('should render without crashing', () => {
      const wrapper = shallow(<AppContainer />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
