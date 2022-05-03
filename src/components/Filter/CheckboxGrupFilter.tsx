import { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { GetColorName } from 'hex-color-to-color-name';
export type CheckboxData = {
	label: string;
	checked: boolean;
};

export const CheckboxGroupFilter = ({
	title,
	data,
	setData,
	isColor,
}: {
	title: string;
	data: any[];
	setData: any;
	isColor?: boolean;
}) => {
	const [renderKey, setRenderKey] = useState(0);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let index = data.findIndex((el) => el.label === event.target.name);
		setData((pS: CheckboxData[]) => {
			pS[index].checked = event.target.checked;
			return pS;
		});
		setRenderKey((pS) => pS + 1);
	};

	return (
		<>
			<Typography style={{ padding: 15 }}>{title}</Typography>
			<Divider />
			<FormGroup
				sx={{
					maxHeight: 150,
					paddingLeft: 2.5,
					display: 'flex',
					flexDirection: 'column',
					overflowX: 'auto',
				}}
			>
				<Grid container>
					{data.map((el) => (
						<Grid
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
							key={el.label + el.checked + renderKey}
							item
							sm={12}
						>
							<FormControlLabel
								control={
									<Checkbox
										name={el.label}
										checked={el.checked}
										onChange={handleChange}
									/>
								}
								label={isColor ? GetColorName(el.label) : el.label}
							/>
							{isColor && (
								<Grid
									style={{
										height: 20,
										width: 20,
										backgroundColor: el.label,
										borderRadius: 20,
										marginLeft: 'auto',
										marginRight: 10,
									}}
								/>
							)}
						</Grid>
					))}
				</Grid>
			</FormGroup>
			<Divider />
		</>
	);
};
