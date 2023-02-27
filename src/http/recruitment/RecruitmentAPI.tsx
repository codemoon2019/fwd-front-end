import axios from 'axios';
import { RecruitmentFormData } from 'interface/Recruitment/RecruitmentApplication';
import Swal from 'sweetalert2'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const postApplication = (recruitData: RecruitmentFormData) => {
    Swal.fire({
        text: 'Please wait while processing your request...',
        didOpen: () => {
            Swal.showLoading()
        }
    })

    axios
        .post(`${apiBaseUrl}/recruitment`, recruitData)
        .then((response) => {
            const data = response.data;
            recruitData["id"] = data
            Swal.fire({
                text: 'Registered sucessfully',
                icon: 'success',
            })
            return response
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });
} 

export const assignAgent = (id: number, agent: string) => {
    axios
        .put(`${apiBaseUrl}/recruitment/assign-agent/${id}`, {recruiter: agent})
        .then((response) => {
            const data = response.data;
            return response
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });
} 

export const getRecruits = () => {
    axios
    .get(`${apiBaseUrl}/recruitment/list`)
    .then((response) => {
      const data = response.data;
      localStorage.removeItem('recruitList');
      localStorage.setItem('recruitList', JSON.stringify(data.data));
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

export const getAssignedRecruits = () => {
    axios
    .get(`${apiBaseUrl}/recruitment/assigned-list`)
    .then((response) => {
      const data = response.data;
      localStorage.removeItem('recruitAssignedList');
      localStorage.setItem('recruitAssignedList', JSON.stringify(data.data));
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