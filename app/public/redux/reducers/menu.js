const initialState = {
	data: [],
	category_products: [],
	titlePage: '',
	isLoading: false,
	isSuccess: false,
	isError: false
}

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_CATEGORY_PENDING':
			return {
				...state,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'GET_CATEGORY_FULFILLED':
			return {
				...state,
				data: [
					...action.payload.data
				],
				isLoading: false,
				isSuccess: true
			};

		case 'GET_CATEGORY_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			};

		case 'GET_PRODUCTS_PENDING':
			return {
				...state,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'GET_PRODUCTS_FULFILLED':
			return {
				...state,
				category_products: [
					...action.payload.data
				],
				titlePage: action.payload.data[0].title,
				isLoading: false,
				isSuccess: true
			};

		case 'GET_PRODUCTS_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			};

		default:
			return state;
	}
}

export default menuReducer;