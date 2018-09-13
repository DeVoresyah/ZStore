import axios from 'axios';

const getPaymentList = () => {
	return {
		type: 'PAYMENT_LIST',
		payload: axios.get('http://192.168.100.3:3000/payment')
	}
}

const getPaymentBank = (id) => {
	return {
		type: 'GET_BANK',
		payload: axios.get('http://192.168.100.3:3000/payment/bank/'+id)
	}
}

const getPaymentDigital = (id) => {
	return {
		type: 'GET_DIGITAL',
		payload: axios.get('http://192.168.100.3:3000/payment/digital/'+id)
	}
}

export {
	getPaymentList,
	getPaymentBank,
	getPaymentDigital
}