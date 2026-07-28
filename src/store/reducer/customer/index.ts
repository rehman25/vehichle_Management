import {
    GET_CUSTOMER_END,
    GET_CUSTOMER_START,
    GET_CUSTOMER_DATA,
    GET_CUSTOMER_Byid_DATA
   
} from '../../slice/type';

interface InitState {
    data: any[]; 
    dataSingle: any[]; 
    dataById: any[];
    loading: boolean;
}

const initState: InitState = {
    dataById:[],
    data: [],
    dataSingle: [],
    loading: false,
};

interface Action {
    type: string;
    payload?: any; 
    loading?: boolean;
}

const customer_Red = (state = initState, action: Action): InitState => {
    switch (action.type) {
        case GET_CUSTOMER_START:
            return {
                ...state,
                loading: action.loading ?? false, 
            };
        case   GET_CUSTOMER_DATA:
            return {
                ...state,
                data: action.payload ?? [],
                loading: action.loading ?? false,
            };
            case   GET_CUSTOMER_Byid_DATA:
            return {
                ...state,
                dataById: action.payload ?? [],
                loading: action.loading ?? false,
            };
          
        case GET_CUSTOMER_END:
            return {
                ...state,
                dataSingle: action.payload ?? [],
                loading: action.loading ?? false,
            };
        default:
            return state;
    }
};

export default customer_Red;