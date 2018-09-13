import axios from 'axios';

const getMenu = () => {
	return {
		type: 'GET_CATEGORY',
		payload: axios.get('http://192.168.100.3:3000/category')
	}
}

const getProducts = (id) => {
	return {
		type: 'GET_PRODUCTS',
		payload: axios.get('http://192.168.100.3:3000/products/'+id)
	}
}

export {
	getMenu,
	getProducts
}