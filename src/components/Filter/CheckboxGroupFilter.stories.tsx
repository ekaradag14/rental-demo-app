import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckboxGroupFilter } from './CheckboxGroupFilter';

export default {
	title: 'Filters/CheckboxGroupFilter',
	component: CheckboxGroupFilter,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CheckboxGroupFilter>;

const Template: ComponentStory<typeof CheckboxGroupFilter> = (args) => {
	const [modelData, setModelData] = useState([
		{ label: 'Istanbul', checked: false },
		{ label: 'Izmir', checked: false },
		{ label: 'Ankara', checked: false },
	]);
	return (
		<CheckboxGroupFilter
			data={modelData}
			title="Model"
			setData={setModelData}
			{...args}
		/>
	);
};

export const Primary = Template.bind({});
