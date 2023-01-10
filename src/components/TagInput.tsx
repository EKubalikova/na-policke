import { Autocomplete, Chip, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import useData from '../hooks/useData';
import useLoggedInUser from '../hooks/useLoggedInUser';
import formStyles from '../styles/formStyles';

const TagInput = ({
	onChangeTags
}: {
	onChangeTags: (tags: string[]) => void;
}) => {
	const user = useLoggedInUser();
	const [chips, setChips] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const tags = useData()?.tags ?? [];
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = inputValue;
		}
	}, [inputValue]);

	const handleAddTag = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' && inputRef.current && inputRef.current.value) {
			event.preventDefault();
			setChips([...chips, inputRef.current.value]);
			onChangeTags([...chips, inputRef.current.value]);
			inputRef.current.value = '';
			setInputValue('');
		}
	};

	const handleDeleteTag = (tag: string) => {
		setChips(chips.filter(t => t !== tag));
	};

	const handleInputChange = (value: string) => {
		setInputValue(value);

		const newSuggestions = Array.from(
			new Set(
				tags
					.filter(
						t =>
							t.email === user?.email &&
							t.tag.toLowerCase().indexOf(value.toLowerCase()) !== -1
					)
					.map(t => t.tag)
			)
		);
		setSuggestions(newSuggestions);
	};

	return (
		<Autocomplete
			multiple
			value={chips}
			onChange={(_, value) => setChips(value)}
			inputValue={inputValue}
			onInputChange={(_, value) => handleInputChange(value)}
			renderInput={params => (
				<TextField
					{...params}
					variant="standard"
					label="Tagy"
					ref={inputRef}
					onKeyPress={handleAddTag}
					placeholder="Zadajte tag a stlačte Enter"
					sx={{
						...formStyles.textField,
						height: 'auto',
						padding: '0 10px 10px 10px'
					}}
					InputLabelProps={{ style: { marginLeft: '8px' } }}
				/>
			)}
			renderTags={(tagValue, getTagProps) =>
				tagValue.map((tag, index) => (
					<Chip
						{...getTagProps({ index })}
						key={index}
						label={tag}
						onDelete={() => handleDeleteTag(tag)}
					/>
				))
			}
			options={suggestions}
		/>
	);
};

export default TagInput;
