import axios from 'axios';

const getTrsansactions = (phone) => {
	return {
		type: 'GET_TRANSACTIONS',
		payload: axios.post('http://192.168.100.3:3000/transactions', {phone})
	}
}

const getTransactionDetail = (id) => {
	return {
		type: 'GET_TRANSACTION_DETAIL',
		payload: axios.get('http://192.168.100.3:3000/transactions/detail/'+id)
	}
}

export {
	getTransactionDetail,
	getTrsansactions
}