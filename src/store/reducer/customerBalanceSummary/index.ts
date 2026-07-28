import {
  CUSTOMER_BALANCE_SUMMARY_DATA,
  CUSTOMER_BALANCE_SUMMARY_END,
  CUSTOMER_BALANCE_SUMMARY_START,
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

const costumerBalance_Red = (state = initState, action: Action): InitState => {
  switch (action.type) {
    case CUSTOMER_BALANCE_SUMMARY_START:
      return {
        ...state,
        loading: action.loading ?? false,
      };
    case CUSTOMER_BALANCE_SUMMARY_DATA:
      return {
        ...state,
        data: action.payload ?? [],
        loading: action.loading ?? false,
      };
    case CUSTOMER_BALANCE_SUMMARY_END:
      return {
        ...state,
        dataSingle: action.payload ?? [],
        loading: action.loading ?? false,
      };

    default:
      return state;
  }
};

export default costumerBalance_Red;
