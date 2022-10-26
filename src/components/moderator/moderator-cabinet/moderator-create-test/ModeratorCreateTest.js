import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ListGroup, Row } from 'reactstrap';
import { ListItemInput } from './ListItemInput';
import { ListItemSelect } from './ListItemSelect';
import TestingApi from '../../../../services/testingApi';
import {
	getHandleFormSettings,
} from './moderatorCreateTest.services';
import { convertToCorrectTime } from '../../../../services/services';

export default function ModeratorCreateTest() {

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitSuccessful },
		reset
	} = useForm({
		reValidateMode: 'onBlur',
		defaultValues: {
			competence: '',
			level: '',
			testName: '',
			testTime: 0,
			questionsCount: 0,
			thresholdScore: 0,
		}
	});

	const [competencies, setCompetencies] = useState([]);
	const [levels, setLevels] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const competencies = await api.getCompetencies();
			const levels = await api.getLevels();
			return {
				competencies: competencies.results,
				levels: levels.results,
			};
		};
		fetchData().then(({ competencies, levels }) => {
			setCompetencies(competencies);
			setLevels(levels);
		});
	}, []);

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);

	const postTestSettings = (data) => {
		const api = new TestingApi();
		const testTime = convertToCorrectTime(data.testTime * 60);
		const requestData = {...data, testTime };
		api.postTestSettings(requestData);
	}

	const handleForm = getHandleFormSettings(register);

	return (
		<Row>
			<form onSubmit={handleSubmit(postTestSettings)}
						className="d-flex flex-column mt-3">
				<ListGroup>
					<ListItemSelect title="Выбор компетенции"
													options={competencies}
													register={handleForm.competence}
													errors={errors?.competence}/>
					<ListItemSelect title="Выбор начального уровня"
													options={levels}
													register={handleForm.level}
													errors={errors?.level}/>
					<ListItemInput type="text"
												 title="Название теста"
												 placeholder="Введите название"
												 width="100"
												 register={handleForm.testName}
												 errors={errors?.testName}/>
					<ListItemInput type="number"
												 title="Длительность теста в минутах"
												 placeholder="180"
												 width="25"
												 register={handleForm.testTime}
												 errors={errors?.testTime}/>
					<ListItemInput type="number"
												 title="Количество вопросов"
												 placeholder="150"
												 width="25"
												 register={handleForm.questionsCount}
												 errors={errors?.questionsCount}/>
					<ListItemInput type="number"
												 title="Пороговый балл"
												 placeholder="40"
												 width="25"
												 register={handleForm.thresholdScore}
												 errors={errors?.thresholdScore}/>
				</ListGroup>
				<Button color="light"
								type="submit"
								className="bg-transparent border border-2 w-75 mx-auto mt-4">
					Добавить тест
				</Button>
			</form>
		</Row>);
}