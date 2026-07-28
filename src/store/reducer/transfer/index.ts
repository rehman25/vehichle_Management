import {
    TRANSFER_VEHICLE,
    TRANSFER_VEHICLE_END,
    TRANSFER_VEHICLE_START
   
} from '../../slice/type';

interface InitState {
    data: any[]; 
    dataSingle: any[]; 
    loading: boolean;
}

const initState: InitState = {
    data: [],
    dataSingle: [],
    loading: false,
};

interface Action {
    type: string;
    payload?: any; 
    loading?: boolean;
}

const transfer_red = (state = initState, action: Action): InitState => {
    switch (action.type) {
        case TRANSFER_VEHICLE_START:
            return {
                ...state,
                loading: action.loading ?? false, 
            };
        case   TRANSFER_VEHICLE:
            return {
                ...state,
                data: action.payload ?? [],
                loading: action.loading ?? false,
            };
          
        case TRANSFER_VEHICLE_END:
            return {
                ...state,
                dataSingle: action.payload ?? [],
                loading: action.loading ?? false,
            };
        default:
            return state;
    }
};

export default transfer_red;