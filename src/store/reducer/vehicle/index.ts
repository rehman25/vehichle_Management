/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    GET_VEHICLE_DATA,
    GET_VEHICLE_START,
    GET_VEHICLE_END,
    VEHICLE,
    GET_VEHICLE_CUSTOMER_DATA, 
    GET_VEHICLE_DATA_BYID
   
} from '../../slice/type';

interface InitState {
    data: any[]; 
    dataSingle: any[];
    datagetbyid:any[];
    cusData: any[];
    addVehicle:any[]; 
    loading: boolean;
}

const initState: InitState = {
    data: [],
    dataSingle: [],
    datagetbyid:[],
    cusData: [],  
    addVehicle: [],  
    loading: false,
};

interface Action {
    type: string;
    payload?: any; 
    loading?: boolean;
}

const vehicle_Red = (state = initState, action: Action): InitState => {
    switch (action.type) {
        case GET_VEHICLE_START:
            return {
                ...state,
                loading: action.loading ?? false, 
            };
        case GET_VEHICLE_DATA:
            return {
                ...state,
                data: action.payload ?? [],
                loading: action.loading ?? false,
            };
          case GET_VEHICLE_DATA_BYID:
            return {
                ...state,
                datagetbyid: action.payload ?? [],
                loading: action.loading ?? false,
            };    
            case GET_VEHICLE_CUSTOMER_DATA:
                return {
                    ...state,
                    cusData: action.payload ?? [],
                    loading: action.loading ?? false,
                };
            case VEHICLE:
                return {
                    ...state,
                    addVehicle: action.payload ?? [],
                    loading: action.loading ?? false,
                };
          
        case GET_VEHICLE_END:
            return {
                ...state,
                dataSingle: action.payload ?? [],
                loading: action.loading ?? false,
            };
        default:
            return state;
    }
};

export default vehicle_Red;