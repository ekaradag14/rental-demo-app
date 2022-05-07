import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { bikesData } from '../../data/bikes';
import { BikeCard } from './BikeCard';

export default {
	title: 'Cards/BikeCard',
	component: BikeCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof BikeCard>;

const Template: ComponentStory<typeof BikeCard> = (args) => (
	<div style={{ width: 300 }}>
		<BikeCard {...args} />
	</div>
);

export const Primary = Template.bind({});

Primary.args = {
	...bikesData[0],
};
