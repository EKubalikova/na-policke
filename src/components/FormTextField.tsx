import { TextField } from '@mui/material';

import formStyles from '../styles/formStyles';

type Props = {
	label: string;
	type: string;
};

const FormTextField = ({ label, type, ...otherProps }: Props) => (
	<TextField
		InputLabelProps={{
			style: formStyles.inputLabel
		}}
		InputProps={{
			style: formStyles.textField
		}}
		label={label}
		type={type}
		{...otherProps}
	/>
);

export default FormTextField;
