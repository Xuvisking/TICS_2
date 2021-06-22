import swal from "sweetalert";
import { fetchSinToken } from "../helpers/fetch";
import { types } from '../types/types';

export const startLogin = (id, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('api/auth', { id, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-comienzo', new Date().getTime());
            dispatch(login({
                id: body.id
            }));
        }
        else {
            swal("Error", body.msg, "error");
        }
    };
};

const login = (id) => ({
    type: types.authLogin,
    payload: id
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    };
};

const logout = () => ({type: types.authLogout});