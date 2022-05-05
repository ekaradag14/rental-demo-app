import { useState, useContext, useEffect } from 'react';

import {
	Button,
	Checkbox,
	Grid,
	TextField,
	RadioGroup,
	Typography,
	FormControlLabel,
} from '@mui/material';

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
import BikesContext from '../../contexts/bikes/context';
import {
	addBikeToContext,
	updateBikeInContext,
} from '../../contexts/bikes/dispatchController';

export const generateRandomID = () => Math.random().toString(36).slice(2);

const initialFValues = {
	model: '',
	color: '',
	location: '',
	description: '',
	available: false,
};
let maxFileSize = 10000000;
let maxFileSizeInMB = maxFileSize / 1000000;
const hexRegex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
export const CreateBike = ({
	close,
	initialBike,
}: {
	close: any;
	initialBike?: any;
}) => {
	// const classes = useStyles();
	const [imageToBeUploaded, setImageToBeUploaded] = useState<File[]>([]);
	const [dropzoneKey, setDropzoneKey] = useState(0);
	const [generalError, setGeneralError] = useState('');

	//@ts-ignore
	const theme = createTheme(overrideTheme);
	//@ts-ignore
	const { bikes, bikesDispatch } = useContext(BikesContext);
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
			if (!imageToBeUploaded.length) {
				setGeneralError('Please provide an image');
				return;
			} else {
				setGeneralError('');
			}
			if (initialBike) {
				//@ts-ignore
				if (imageToBeUploaded[0]?.path) {
					var fileReader = new FileReader();
					fileReader.onload = function (fileLoadedEvent) {
						var srcData = fileLoadedEvent.target.result;
						bikesDispatch(
							updateBikeInContext({
								...values,
								img: srcData,
							})
						);

						close();
					};
					fileReader.readAsDataURL(imageToBeUploaded[0]);
				} else {
					bikesDispatch(
						updateBikeInContext({
							...values,
						})
					);
					close();
				}
			} else {
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var srcData = fileLoadedEvent.target.result;
					bikesDispatch(
						addBikeToContext({
							...values,
							id: generateRandomID(),
							reservations: [],
							img: srcData,
							rating: 1,
						})
					);
					close();
				};
				fileReader.readAsDataURL(imageToBeUploaded[0]);
			}
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
		if (file.file.type.split('/')[0] === 'image') {
			return (
				<img
					// @ts-ignore
					style={{
						maxWidth: 300,
						borderRadius: 10,
						maxHeight: 300,
						marginTop: -30,
					}}
					role="presentation"
					// @ts-ignore
					src={file.data}
					alt="preview"
				/>
			);
		}
	};

	useEffect(() => {
		if (initialBike) {
			setValues(initialBike);
		}
		setDropzoneKey((pS) => pS + 1);
	}, []);

	return (
		<Grid>
			<Form onSubmit={handleSubmit}>
				<Grid container style={{ padding: 10 }}>
					<Grid
						container
						item
						sm={5}
						spacing={3}
						style={{ padding: 10, display: 'flex', flexDirection: 'row' }}
					>
						{formFields.map((el) => (
							<Grid item sm={12} key={el.label}>
								<TextField
									fullWidth
									multiline={el.name === 'description'}
									minRows={3}
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
						<Grid item sm={12}>
							<FormControlLabel
								label="Available"
								control={
									<Checkbox
										name="available"
										checked={JSON.parse(values.available)}
										onChange={(e) => {
											//@ts-ignore
											e.target.value = e.target.checked;
											handleInputChange(e);
										}}
									/>
								}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						item
						sm={6}
						spacing={1}
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
								style={{ height: 450 }}
								key={dropzoneKey}
								acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
								onChange={setImageToBeUploaded}
								filesLimit={1}
								initialFiles={initialBike ? [initialBike.img] : null}
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
				<Typography style={{ color: 'red', margin: 10, marginLeft: 22 }}>
					{generalError}
				</Typography>
				<Grid
					container
					item
					xs={12}
					style={{ display: 'flex', alignItems: 'center', paddingBottom: 20 }}
				>
					<Grid
						item
						sm={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							margin: 'auto',
						}}
					>
						<Button
							style={{ width: '50%', margin: 'auto' }}
							variant="contained"
							type="submit"
						>
							Submit
						</Button>
					</Grid>
					<Grid item sm={6} style={{ display: 'flex', alignItems: 'center' }}>
						<Button
							style={{ width: '50%', margin: 'auto' }}
							variant="contained"
							color="secondary"
							onClick={resetForm}
						>
							Reset
						</Button>
					</Grid>
				</Grid>
			</Form>
		</Grid>
	);
};

const formFields = [
	{ label: 'Model', name: 'model' },
	{ label: 'Color', name: 'color' },
	{ label: 'Location', name: 'location' },
	{ label: 'Description', name: 'description' },
];
