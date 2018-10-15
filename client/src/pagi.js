import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Pagi = (props) => {
	const { count, page, psize, onPageChange } = props;
	const totalpages = Math.floor(count/psize) + 1;
	return(
		<Pagination defaultActivePage={page} totalPages={totalpages} onPageChange={onPageChange} />
	)
}

export default Pagi