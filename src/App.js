import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocalStorage = () => {
	let list = localStorage.getItem('list')
	if (list) {
		return JSON.parse(localStorage.getItem('list'))
	} else {
		return []
	}
}

function App() {
	const [value, setValue] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [list, setList] = useState(getLocalStorage())
	const [editID, setEditID] = useState(null)
	const [alert, setAlert] = useState({ show: false, message: '', type: '' })

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!value) {
			// show alert
			showAlert(true, 'Input is Empty', 'danger')
		} else if (value && isEditing) {
			// editing
			setList(
				list.map((i) => {
					if (i.id === editID) {
						return { ...i, item: value }
					}
				})
			)
			setValue('')
			setIsEditing(false)
			setEditID(null)
			showAlert(true, 'item Edited', 'success')
		} else {
			showAlert(true, 'item added', 'success')
			const newItem = { id: new Date().getTime().toString(), item: value }
			setList([...list, newItem])
			setValue('')
		}
	}

	const handleChange = (e) => {
		setValue(e.target.value)
	}

	const showAlert = (show = false, message = '', type = '') => {
		setAlert({ show, message, type })
	}

	const clearList = () => {
		showAlert(true, 'list cleared', 'danger')
		setList([])
	}

	const removeItem = (id) => {
		showAlert(true, 'item removed', 'danger')
		setList(list.filter((item) => item.id !== id))
	}

	const editItem = (id) => {
		setIsEditing(true)
		const specificItem = list.find((item) => item.id === id)
		setEditID(id)
		setValue(specificItem.item)
	}

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list))
	}, [list])

	return (
		<>
			<section className='section-center'>
				<form className='grocery-form' onSubmit={handleSubmit}>
					{alert.show && (
						<Alert {...alert} removeAlert={showAlert} list={list} />
					)}
					<h3>Grocery List</h3>
					<div className='form-control'>
						<input
							type='text'
							className='grocery'
							placeholder='eg. eggs'
							value={value}
							onChange={handleChange}
						/>
						<button type='submit' className='submit-btn'>
							{isEditing ? 'Edit' : 'Submit'}
						</button>
					</div>
				</form>
				{list.length > 0 && (
					<div className='grocery-container'>
						<List items={list} removeItem={removeItem} editItem={editItem} />
						<button className='clear-btn' onClick={clearList}>
							Clear All
						</button>
					</div>
				)}
			</section>
		</>
	)
}

export default App
