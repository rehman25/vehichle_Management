/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GET_SERVICES_END,
  GET_SERVICES_START,
  GET_SERVICES_DATA,
  GET_SERVICES_CUSTOMER_DATA,
  SERVICES,
  GET_SERVICES_PRODUCT_DATA,
  GET_SERVICES_PRINT_DATA,
  GET_PRINT_DATA,
} from "../../slice/type";

interface InitState {
  data: any[];
  dataSingle: any[];
  vehData: any[];
  cusData: any[];
  PrintDataById: any[];
  proData: any[];
  printData: any[];
  loading: boolean;
}

const initState: InitState = {
  data: [],
  dataSingle: [],
  vehData: [],
  cusData: [],
  PrintDataById: [],
  proData: [],
  printData: [],
  loading: false,
};

interface Action {
  type: string;
  payload?: any;
  loading?: boolean;
}

const services_Red = (state = initState, action: Action): InitState => {
  switch (action.type) {
    case GET_SERVICES_START:
      return {
        ...state,
        loading: action.loading ?? false,
      };
    case GET_SERVICES_DATA:
      return {
        ...state,
        data: action.payload ?? [],
        loading: action.loading ?? false,
      };
    case GET_SERVICES_CUSTOMER_DATA:
      return {
        ...state,
        cusData: action.payload ?? [],
        loading: action.loading ?? false,
      };
    case SERVICES:
      return {
        ...state,
        vehData: action.payload ?? [],
        loading: action.loading ?? false,
      };
    case GET_SERVICES_PRODUCT_DATA:
      return {
        ...state,
        proData: action.payload ?? [],
        loading: action.loading ?? false,
      };
    case GET_SERVICES_PRINT_DATA:
      return {
        ...state,
        printData: action.payload ?? [],
        loading: action.loading ?? false,
      };
    case GET_PRINT_DATA:
      return {
        ...state,
        printData: action.payload ?? [],
        loading: action.loading ?? false,
      };

    case GET_SERVICES_END:
      return {
        ...state,
        dataSingle: action.payload ?? [],
        loading: action.loading ?? false,
      };
    default:
      return state;
  }
};

export default services_Red;
