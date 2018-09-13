const initialState = {
	orders: [],
	products: [],
	transaction_id: '',
	phone: '',
	transactionNow: null,
	isLoading: false,
	isSuccess: false,
	isError: false
}

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_ORDER':
			return {
				...state,
				orders: [
					...state.orders,
					action.payload
				],
				transaction_id: action.payload.transaction_id
			};

		case 'ADD_QTY':
			return {
				...state,
				orders: [
					...action.payload
				],
				transaction_id: action.payload[0].transaction_id
			};

		case 'CHANGE_QTY':
			return {
				...state,
				orders: [
					...action.payload
				],
				transaction_id: action.payload[0].transaction_id
			}

		case 'CART_PRODUCTS_PENDING':
			return {
				...state,
				products: [],
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'CART_PRODUCTS_FULFILLED':
			return {
				...state,
				products: action.payload.data,
				isLoading: false,
				isSuccess: true
			};

		case 'CART_PRODUCTS_REJECTED':
			return {
				...state,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'ADD_PRODUCT_DETAIL':
			return {
				...state,
				products: [
					...state.products,
					action.payload
				]
			};

		case 'CLEAR_CART':
			return {
				...state,
				orders: action.payload,
				products: action.payload,
				transaction_id: ''
			};

		case 'PAYMENT_DONE':
			return {
				...state,
				transactionNow: null
			}

		case 'UPDATE_PHONE':
			return {
				...state,
				phone: action.payload
			};

		case 'SUBMIT_ORDER_PENDING':
			return {
				...state,
				transactionNow: null,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'SUBMIT_ORDER_FULFILLED':
			return {
				...state,
				orders: [],
				products: [],
				transaction_id: '',
				transactionNow: action.payload.data,
				isLoading: false,
				isError: false,
				isSuccess: true
			};

		case 'SUBMIT_ORDER_REJECTED':
			return {
				...state,
				transactionNow: null,
				isLoading: false,
				isError: true,
				isSuccess: false
			};

		default:
			return state;
	}
}

export default cartReducer;