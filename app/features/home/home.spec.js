import React from 'react';
import { shallow } from 'enzyme';

import Home, { negativeBalanceCheck } from 'features/home/home';

describe('features.home', () => {
  describe('Home', () => {
    it('should export something', () => {
      expect(Home).toBeDefined();
    });

    it('should render without crashing', () => {
      const wrapper = shallow(<Home />);

      expect(wrapper).toMatchSnapshot();
    });

    describe('negativeBalanceCheck()', () => {
      window.alert = jest.fn();

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should give warning when entering negative balance', () => {
        negativeBalanceCheck(0, -1);

        expect(window.alert).toHaveBeenCalled();
      });

      it('should not give warning when remaining in negative balance', () => {
        negativeBalanceCheck(-1, -2);

        expect(window.alert).not.toHaveBeenCalled();
      });

      it('should not give warning when entering non-negative balance', () => {
        negativeBalanceCheck(-1, 0);

        expect(window.alert).not.toHaveBeenCalled();        
      });

      it('should not give warning when entering positive balance', () => {
        negativeBalanceCheck(0, 1);

        expect(window.alert).not.toHaveBeenCalled();        
      });

      it('should not give warning when remaining in positive balance', () => {
        negativeBalanceCheck(1, 2);

        expect(window.alert).not.toHaveBeenCalled();        
      });
    });

    describe('balance button click functions', () => {
      it('should call decreaseBalance when the minus button is clicked', () => {
        const spiedFunction = jest.spyOn(Home.prototype, 'decreaseBalance');
        const wrapper = shallow(<Home />);
        wrapper.find('.balance-buttons').childAt(0).simulate('click');

        expect(spiedFunction).toHaveBeenCalled();
      });

      it('should decrease state balance when decreaseBalance() is called', () => {
        const wrapper = shallow(<Home />);
        wrapper.find('.balance-buttons').childAt(0).simulate('click');

        expect(wrapper.state('balance')).toBe(11);
      });

      it('should call increaseBalance when the plus button is clicked', () => {
        const spiedFunction = jest.spyOn(Home.prototype, 'increaseBalance');
        const wrapper = shallow(<Home />);
        wrapper.find('.balance-buttons').childAt(1).simulate('click');

        expect(spiedFunction).toHaveBeenCalled();
      });

      it('should increase state balance when increaseBalance() is called', () => {
        const wrapper = shallow(<Home />);
        wrapper.find('.balance-buttons').childAt(1).simulate('click');

        expect(wrapper.state('balance')).toBe(13);
      });
    });
  });
});
