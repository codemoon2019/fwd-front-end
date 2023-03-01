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


export const getBopDataForDropdown = () => {
    axios
    .get(`${apiBaseUrl}/bop/list-dropdown`)
    .then((response) => {
      const initData = response.data;
      const data = initData.data;
      localStorage.removeItem('bopListDropdown');

      let newArray = [];
      if(data.length > 0){
        for(let i = 0; i <data.length; i++){
          const item = data[i];
          newArray.push(item.name)
        }
      }
      
      localStorage.setItem('bopListDropdown', JSON.stringify(newArray));
      return data;
    })
    .catch((error) => {
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
        })
    });
} 