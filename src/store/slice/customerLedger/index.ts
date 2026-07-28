/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
    CUSTOMER_LEGDER_DATA,
    CUSTOMER_LEGDER_START,
    CUSTOMER_LEGDER_END
    }
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}


type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL




export const getCustomerReport = (formData: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: CUSTOMER_LEGDER_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/transation/reports/CustomerLedger`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
      });
      const res = await response.json();

      if (res.code === 200){

          dispatch({ type: CUSTOMER_LEGDER_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: CUSTOMER_LEGDER_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: CUSTOMER_LEGDER_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};