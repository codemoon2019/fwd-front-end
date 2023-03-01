import axios from 'axios';
import { Auth } from 'interface/Authentication/Authenticate';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const login = (data: Auth) => {

    axios
    .post(`${apiBaseUrl}/login`, data)
    .then((response) => {
        const data = response.data;
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(data.data));
        Cookies.set('token', data.token.token);
        return data.data
    })
    .catch((error) => {
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
        })
    });
}