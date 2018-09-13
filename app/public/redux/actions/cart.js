import axios from 'axios';

const addOrder = (order) => {
	return {
		type: 'ADD_ORDER',
		payload: order
	}
}

const addQty = (data) => {
	return {
		type: 'ADD_QTY',
		payload: data
	}
}

const changeQty = (data) => {
	return {
		type: 'CHANGE_QTY',
		payload: data
	}
}

const cartProducts = (list) => {
	return {
		type: 'CART_PRODUCTS',
		payload: axios.post('http://192.168.100.3:3000/products/cart', list)
	}

}

const addProductDetail = (data) => {
	return {
		type: 'ADD_PRODUCT_DETAIL',
		payload: data
	}
}

const clearCart = () => {
	return {
		type: 'CLEAR_CART',
		payload: []
	}
}

const updatePhone = (data) => {
	return {
		type: 'UPDATE_PHONE',
		payload: data
	}
}

const submitOrder = (data) => {
	return {
		type: 'SUBMIT_ORDER',
		payload: axios.post('http://192.168.100.3:3000/transactions/create', data)
	}
}

const paymentDone = () => {
	return {
		type: 'PAYMENT_DONE'
	}
}

export {
	addOrder,
	addQty,
	changeQty,
	cartProducts,
	addProductDetail,
	clearCart,
	updatePhone,
	submitOrder,
	paymentDone
}