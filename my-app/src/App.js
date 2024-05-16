import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueValid, setIsValueValid] = useState(false);

	const onInputButtonClick = () => {
		let promptValue = prompt();

		if (promptValue && promptValue.length >= 3) {
			setError('');
			setValue(promptValue);
			setIsValueValid(true);
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueValid(false);
		}
	};

	const onAddButtonClick = () => {
		const updatedList = [...list, { id: Date.now(), value: value }];
		setList(updatedList);
	};

	const errorBLock = <div className={styles.error}>{error}</div>;
	const listBlock = (
		<ul className={styles.list}>
			{[...list].map(({ id, value }) => (
				<li className={styles['list-item']} key={id}>
					{value}
				</li>
			))}
		</ul>
	);
	const listNullBlock = (
		<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
	);

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles['page-heading']}>Ввод значения</h1>
				<p className={styles['no-margin-text']}>
					Текущее значение <code>value</code>: "
					<output className={styles['current-value']}>{value}</output>"
				</p>
				{error !== '' && errorBLock}
				<div className={styles['buttons-container']}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						onClick={onAddButtonClick}
						disabled={!isValueValid}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles['list-container']}>
					<h2 className={styles['list-heading']}>Список:</h2>

					{list.length === 0 ? listNullBlock : listBlock}
				</div>
			</div>
		</>
	);
};
