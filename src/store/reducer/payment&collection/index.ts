/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PAYMENT_COLLECTION,
  PAYMENT_COLLECTION_END,
  PAYMENT_COLLECTION_START,
  PAYMENT_COLLECTION_INVOICES
} from "../../slice/type";

interface InitState {
  data: any[];
  invoiceData:any[];
  dataSingle: any[];
  loading: boolean;
}

const initState: InitState = {
  data: [],
  dataSingle: [],
  invoiceData:[],
  loading: false,
};

interface Action {
  type: string;
  payload?: any;
  loading?: boolean;
}

const payment_red = (state = initState, action: Action): InitState => {
  switch (action.type) {
    case PAYMENT_COLLECTION_START:
      return {
        ...state,
        loading: action.loading ?? false,
      };
    case PAYMENT_COLLECTION:
      return {
        ...state,
        data: action.payload ?? [],
        loading: action.loading ?? false,
      };
      case PAYMENT_COLLECTION_INVOICES:
        return {
          ...state,
          invoiceData: action.payload ?? [],
          loading: action.loading ?? false,
        };

    case PAYMENT_COLLECTION_END:
      return {
        ...state,
        dataSingle: action.payload ?? [],
        loading: action.loading ?? false,
      };
    default:
      return state;
  }
};

export default payment_red;
