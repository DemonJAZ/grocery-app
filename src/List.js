import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, removeItem, editItem }) => {
	return (
		<div className='grocery-list'>
			{items.map((i) => {
				const { id, item } = i
				return (
					<article key={id} className='grocery-item'>
						<p>{item}</p>
						<div className='btn-container'>
							<button className='edit-btn' onClick={() => editItem(id)}>
								<FaEdit />
							</button>
							<button className='delete-btn' onClick={() => removeItem(id)}>
								<FaTrash />
							</button>
						</div>
					</article>
				)
			})}
		</div>
	)
}

export default List
