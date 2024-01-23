import React from 'react';
import globals from '../../styles/Global.module.css';

// eslint-disable-next-line react/prop-types
const Button = ({ type, btnText }) => {
	return (
		<button type={type} className={globals.Button + ' bg-purple-700'}>
			{btnText}
		</button>
	);
};

export default Button;
