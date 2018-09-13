const initialState = {
	history: [],
	list: [],
	detail: {
		total: 0
	},
	isLoading: false,
	isError: false,
	isSuccess: false
}

const transactionReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'GET_TRANSACTIONS_PENDING':
			return {
				...state,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'GET_TRANSACTIONS_FULFILLED':
			return {
				...state,
				history: [
					...action.payload.data
				],
				isLoading: false,
				isError: false,
				isSuccess: true
			};

		case 'GET_TRANSACTIONS_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false
			};

		case 'GET_TRANSACTION_DETAIL_PENDING':
			return {
				...state,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'GET_TRANSACTION_DETAIL_FULFILLED':
			return {
				...state,
				detail: {
					id: action.payload.data.id,
					status: action.payload.data.status,
					date: action.payload.data.date,
					total: action.payload.data.total
				},
				list: [
					...action.payload.data.orders
				],
				isLoading: false,
				isError: false,
				isSuccess: true
			};

		case 'GET_TRANSACTION_DETAIL_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false
			};

		default:
			return state;
	}
}

export default transactionReducer;