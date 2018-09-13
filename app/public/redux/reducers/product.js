const initialState = {
	data: {},
	isLoading: false,
	isSuccess: false,
	isError: false
}

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_PRODUCT_PENDING':
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				isError: false
			};

		case 'GET_PRODUCT_FULFILLED':
			return {
				...state,
				data: action.payload.data,
				isLoading: false,
				isSuccess: true
			};

		case 'GET_PRODUCT_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			};

		default:
			return state;
	}
}

export default productReducer;