import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CheckboxGroupFilter } from '../components/Filter/CheckboxGroupFilter';

Enzyme.configure({ adapter: new Adapter() });

it('renders component with correct children', () => {
	const labelData = [
		{ label: 'Istanbul', checked: false },
		{ label: 'Izmir', checked: false },
		{ label: 'Ankara', checked: false },
	];
	const checkbox = shallow(
		<CheckboxGroupFilter
			title="Model"
			data={labelData}
			setData={() => {}}
			isColor={false}
		/>
	);

	expect(checkbox.text()).toBe('Model');
	labelData.forEach((el) => {
		const labelBox = checkbox.find(`[label="${el.label}"]`);
		expect(labelBox.exists()).toBe(true);
	});
});
