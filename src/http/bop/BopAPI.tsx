import axios from 'axios';
import { BOP } from 'interface/BOP/BOP';
import Swal from 'sweetalert2'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const createBop = (bopData: BOP) => {
    axios
    .post(`${apiBaseUrl}/bop`, bopData)
    .then((response) => {
        const data = response.data;
        return data.data
    })
    .catch((error) => {
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
        })
    });
}

export const getBops = () => {
    axios
    .get(`${apiBaseUrl}/bop/list`)
    .then((response) => {
      const data = response.data;
      localStorage.removeItem('bopList');
      localStorage.setItem('bopList', JSON.stringify(data.data));
      console.log(data.data)
      return data.data;
    })
    .catch((error) => {
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
        })
    });
} 