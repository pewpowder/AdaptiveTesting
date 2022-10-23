import { ListGroupItem } from 'reactstrap';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import React from 'react';

export function ListItemInput(props) {
	const {type, title, placeholder, width, register, errors} = props;
	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="ms-1">{title}</span>
			<div className="p-1">
				<input {...register}
							 type={type}
							 className={`form-control bg-transparent border-1 border-secondary ms-3 w-${width}`}
							 placeholder={placeholder}/>
				<p className="text-danger p-0 m-0 ms-4">
					{errors && errors.message}
				</p>
			</div>
		</ListGroupItem>);
}