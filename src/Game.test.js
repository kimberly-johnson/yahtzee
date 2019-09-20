import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Game from './Game';


it('renders without crashing', function () {
  shallow(<Game />);
});

it('renders as expected', function() {
  let wrapper = mount(<Game />);

  let dieBtn = wrapper.find('button').first();
  dieBtn.simulate('click');

  expect(wrapper.state().locked[0]).toEqual(true);
});

it('only allows three rolls per score', function() {
  let wrapper = mount(<Game />);

  wrapper.find('button').at(5).simulate('click');
  wrapper.find('button').at(5).simulate('click');
  wrapper.find('button').at(5).simulate('click');
  wrapper.find('button').at(1).simulate('click');
  wrapper.find('button').at(5).simulate('click');

  expect(wrapper.html()).toContain("0 Rerolls Left");
});

it('should not allow re-using score line', function() {
  let wrapper = mount(<Game />);

  wrapper.find('button').at(5).simulate('click');
  wrapper.find('button').at(5).simulate('click');
  wrapper.find('button').at(5).simulate('click');
  wrapper.find('tr').at(12).simulate('click');

  let firstChance = wrapper.find('td').at(25);

  wrapper.find('button').at(5).simulate('click');
  wrapper.find('button').at(5).simulate('click');
  wrapper.find('button').at(5).simulate('click');
  wrapper.find('tr').at(12).simulate('click');

  let secondChance = wrapper.find('td').at(25);

  expect(firstChance).toEqual(secondChance);
});