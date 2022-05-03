import { useState, useEffect } from 'react';

import {
	Button,
	Checkbox,
	Grid,
	TextField,
	RadioGroup,
	Select,
} from '@mui/material';
import { Cover } from '../../components/Cover/Cover';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import AppBar from '../../components/AppBar/AppBar';
import bikeImage from '../../assets/bikes/bike1.jpg';
import overrideTheme from './uploadImageTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { useForm, Form } from '../../common/hooks/useForm';
import {
	DropzoneArea,
	FileObject,
	PreviewIconProps,
} from 'material-ui-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const genderItems = [
	{ id: 'male', title: 'Male' },
	{ id: 'female', title: 'Female' },
	{ id: 'other', title: 'Other' },
];

const initialFValues = {
	model: '',
	color: '',
	location: '',
	description: '',
};
let maxFileSize = 10000000;
let maxFileSizeInMB = maxFileSize / 1000000;
const hexRegex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
export const CreateBikePage = (props: any) => {
	// const classes = useStyles();
	const [imageToBeUploaded, setImageToBeUploaded] = useState<File[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dropzoneKey, setDropzoneKey] = useState(0);
	//@ts-ignore
	const theme = createTheme(overrideTheme);
	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ('model' in fieldValues)
			temp.model = fieldValues.model ? '' : 'Model is required.';
		if ('color' in fieldValues) {
			temp.color = hexRegex.test(fieldValues.color)
				? ''
				: 'Please insert a HEX value';
		}

		if ('location' in fieldValues)
			temp.location = fieldValues.location ? '' : 'Location is required.';
		if ('description' in fieldValues)
			temp.description = fieldValues.description
				? ''
				: 'Description is required.';
		setErrors({
			...temp,
		});

		if (fieldValues == values) return Object.values(temp).every((x) => x == '');
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialFValues, true, validate);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (validate()) {
			resetForm();
		}
	};
	const getFileRemovedMessage = (file: string) => {
		return `File ${file} was removed.`;
	};
	const getFileAddedMessage = (file: string) => {
		return `File ${file} successfully added.`;
	};
	const getDropRejectMessage = (file: File) => {
		return `Only JPEG or PNG allowed under ${maxFileSizeInMB} Mb.`;
	};
	const previewIconFunction = (file: FileObject, classes: PreviewIconProps) => {
		if (file.file.type.split('/')[0] === 'image')
			return (
				<img
					// @ts-ignore
					style={{
						maxWidth: 400,
						borderRadius: 10,
						maxHeight: 400,
						marginTop: -30,
					}}
					role="presentation"
					// @ts-ignore
					src={file.data}
					alt="preview"
				/>
			);
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Grid container style={{ padding: 10 }}>
				<Grid
					container
					item
					sm={6}
					spacing={3}
					style={{ padding: 10, display: 'flex', flexDirection: 'row' }}
				>
					{formFields.map((el) => (
						<Grid item sm={12} key={el.label}>
							<TextField
								fullWidth
								name={el.name}
								label={el.label}
								variant="outlined"
								value={values[el.name]}
								onChange={handleInputChange}
								helperText={errors[el.name]}
								error={!!errors[el.name]}
							/>
						</Grid>
					))}
				</Grid>
				<Grid
					container
					item
					sm={5}
					spacing={3}
					style={{
						padding: 10,
						marginLeft: 'auto',
						display: 'flex',
						flexDirection: 'row',
						maxHeight: 350,
					}}
				>
					<MuiThemeProvider theme={theme}>
						<DropzoneArea
							style={{ height: 350 }}
							key={dropzoneKey}
							acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
							onChange={setImageToBeUploaded}
							filesLimit={1}
							maxFileSize={maxFileSize}
							showPreviewsInDropzone={true}
							clearOnUnmount={true}
							getFileRemovedMessage={getFileRemovedMessage}
							getFileAddedMessage={getFileAddedMessage}
							getDropRejectMessage={getDropRejectMessage}
							dropzoneText={
								imageToBeUploaded.length === 0 ? 'Drag & Drop For Images' : ''
							}
							// @ts-ignore
							Icon={AddPhotoAlternateIcon}
							// @ts-ignore
							getPreviewIcon={previewIconFunction}
						/>
					</MuiThemeProvider>
				</Grid>
			</Grid>
			<Grid
				container
				item
				xs={12}
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<Grid item sm={6} style={{ display: 'flex', alignItems: 'center' }}>
					<Button style={{ width: '50%' }} variant="contained" type="submit">
						Submit
					</Button>
				</Grid>
				<Grid item sm={6} style={{ display: 'flex', alignItems: 'center' }}>
					<Button
						style={{ width: '50%' }}
						variant="contained"
						color="secondary"
						onClick={resetForm}
					>
						Reset
					</Button>
				</Grid>
			</Grid>
		</Form>
	);
};

const formFields = [
	{ label: 'Model', name: 'model' },
	{ label: 'Color', name: 'color' },
	{ label: 'Location', name: 'location' },
	{ label: 'Description', name: 'description' },
];