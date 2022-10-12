import { ListGroupItem } from 'reactstrap';
import SvgIcons from '../svg-icons/SvgIcons';
import React from 'react';

export function ListItems({list}) {
	if (!Array.isArray(list)) {
		//throw new Error(`List: ${list} is not array`)
		return;
	}
	return list.map(el => {
		// Theme list include name. Question list include question. Competence list include competence
		const {pk, name, question, competence, level} = el;
		return (
			<ListGroupItem id={pk} key={pk} className="ps-2 rounded-0">
				<SvgIcons id={`${level}-star`} size="72" color="dark"/>
				<span style={{verticalAlign: 'middle'}}>
					{name ?? question ?? competence}
				</span>
			</ListGroupItem>);
	});
}