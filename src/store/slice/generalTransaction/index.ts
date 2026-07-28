/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
    GENERAL_TRANSACTION_DATA,
    GENERAL_TRANSACTION_START,
    GENERAL_TRANSACTION_END
    }
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}


type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL

export const GeneralTransaction = (formData: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GENERAL_TRANSACTION_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/transation/reports/GeneralTransaction`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
      });
      const res = await response.json();

      if (res.code === 200){

          dispatch({ type: GENERAL_TRANSACTION_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GENERAL_TRANSACTION_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GENERAL_TRANSACTION_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};