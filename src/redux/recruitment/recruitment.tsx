import { SUBMIT_APPLICATION } from 'actions/recruitment/actions';
import { RecruitmentFormData } from 'interface/Recruitment/RecruitmentApplication';

interface Action {
    type: string,
    payload: RecruitmentFormData | null
}

const initialStateRecruits = {
    recruitLists: [] as RecruitmentFormData[],
}

export function recruitmentReducer(state = initialStateRecruits, action: Action) {
    switch (action.type) {
        case SUBMIT_APPLICATION:
            return {
                recruitLists: [...state.recruitLists, action.payload]
            }
        default:
            return state
    }
}