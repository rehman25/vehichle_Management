import {
  GENERAL_TRANSACTION_DATA,
  GENERAL_TRANSACTION_START,
  GENERAL_TRANSACTION_END,
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

const generalTransaction_Red = (state = initState, action: Action): InitState => {
  switch (action.type) {
    case GENERAL_TRANSACTION_START:
      return {
        ...state,
        loading: action.loading ?? false,
      };
    case GENERAL_TRANSACTION_DATA:
      return {
        ...state,
        data: action.payload ?? [],
        loading: action.loading ?? false,
      };
    case GENERAL_TRANSACTION_END:
      return {
        ...state,
        dataSingle: action.payload ?? [],
        loading: action.loading ?? false,
      };

    default:
      return state;
  }
};

export default generalTransaction_Red;
