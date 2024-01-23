import React from 'react';
import globals from '../../styles/Global.module.css';

// eslint-disable-next-line react/prop-types
const Input = ({ type, id, onchange, value, placeholder }) => {
	return (
		<input
			type={type}
			id={id}
			className={globals.Input}
			placeholder={placeholder}
			onChange={onchange}
			value={value}
		/>
	);
};

export default Input;
