/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CUSTOMER_LEGDER_DATA,
  CUSTOMER_LEGDER_END,
  CUSTOMER_LEGDER_START
} from "../../slice/type";

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

const customerledger_Red = (state = initState, action: Action): InitState => {
  switch (action.type) {
    case CUSTOMER_LEGDER_START:
      return {
        ...state,
        loading: action.loading ?? false,
      };
    case CUSTOMER_LEGDER_DATA:
      return {
        ...state,
        data: action.payload ?? [],
        loading: action.loading ?? false,
      };

    case CUSTOMER_LEGDER_END:
      return {
        ...state,
        dataSingle: action.payload ?? [],
        loading: action.loading ?? false,
      };
    default:
      return state;
  }
};

export default customerledger_Red;
