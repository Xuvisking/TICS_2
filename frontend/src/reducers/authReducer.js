import { types } from '../types/types';

const initialState = {
    logeado: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                logeado: true
            };
        case types.authLogout:
            return {
                logeado: false
            };
        default:
            return state;
    }
};