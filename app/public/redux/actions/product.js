import axios from 'axios';

const getProduct = (id) => {
	return {
		type: 'GET_PRODUCT',
		payload: axios.get('http://192.168.100.3:3000/products/detail/'+id)
	}
}

export {
	getProduct
}