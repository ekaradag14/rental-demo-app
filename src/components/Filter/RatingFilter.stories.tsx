import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RatingFilter } from './RatingFilter';

export default {
	title: 'Filters/RatingFilter',
	component: RatingFilter,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof RatingFilter>;

const Template: ComponentStory<typeof RatingFilter> = (args) => {
	const [ratingData, setRatingData] = useState([1, 3]);
	return (
		<RatingFilter
			ratingData={ratingData}
			onChangeCommitted={() => {}}
			setRatingData={setRatingData}
			{...args}
		/>
	);
};

export const Primary = Template.bind({});
