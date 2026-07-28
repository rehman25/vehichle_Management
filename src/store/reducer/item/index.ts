import {
    GET_ITEM_DATA,
    GET_ITEM_START,
    GET_ITEM_END,
    GET_ITEM_TYPE
   
} from '../../slice/type';

interface InitState {
    data: any[]; 
    dataSingle: any[];
    dataType : any[] 
    loading: boolean;
}

const initState: InitState = {
    data: [],
    dataSingle: [],
    dataType:[],
    loading: false,
};

interface Action {
    type: string;
    payload?: any; 
    loading?: boolean;
}

const Item_Red = (state = initState, action: Action): InitState => {
    switch (action.type) {
        case GET_ITEM_START:
            return {
                ...state,
                loading: action.loading ?? false, 
            };
        case   GET_ITEM_DATA:
            return {
                ...state,
                data: action.payload ?? [],
                loading: action.loading ?? false,
            };
          case   GET_ITEM_TYPE:
            return {
                ...state,
                dataType: action.payload ?? [],
                loading: action.loading ?? false,
            };    
          
        case GET_ITEM_END:
            return {
                ...state,
                dataSingle: action.payload ?? [],
                loading: action.loading ?? false,
            };
        default:
            return state;
    }
};

export default Item_Red;