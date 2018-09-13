const initialState = {
	bank_transfer: [],
	digital_payment: [],
	bankDetail: null,
	digitalDetail: null,
	isLoading: false,
	isError: false,
	isSuccess: false
}

const paymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PAYMENT_LIST_PENDING':
			return {
				...state,
				bank_transfer: [],
				digital_payment: [],
				bankDetail: null,
				digitalDetail: null,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'PAYMENT_LIST_FULFILLED':
			return {
				...state,
				bank_transfer: action.payload.data.bank,
				digital_payment: action.payload.data.digital,
				isLoading: false,
				isError: false,
				isSuccess: true
			};

		case 'PAYMENT_LIST_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false
			};

		case 'GET_BANK_PENDING':
			return {
				...state,
				bankDetail: null,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'GET_BANK_REJECTED':
			return {
				...state,
				bankDetail: null,
				isLoading: false,
				isError: true,
				isSuccess: false
			};

		case 'GET_DIGITAL_PENDING':
			return {
				...state,
				digitalDetail: null,
				isLoading: true,
				isError: false,
				isSuccess: false
			};

		case 'GET_DIGITAL_REJECTED':
			return {
				...state,
				digitalDetail: null,
				isLoading: false,
				isError: true,
				isSuccess: false
			};

		case 'GET_BANK_FULFILLED':
			return {
				...state,
				bankDetail: action.payload.data,
				isLoading: false,
				isError: false,
				isSuccess: true
			};

		case 'GET_DIGITAL_FULFILLED':
			return {
				...state,
				digitalDetail: action.payload.data,
				isLoading: false,
				isError: false,
				isSuccess: true
			};

		default:
			return state;
	}
}

export default paymentReducer;