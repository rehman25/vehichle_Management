/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
    PAYMENT_COLLECTION,
    PAYMENT_COLLECTION_END,
    PAYMENT_COLLECTION_START,
    PAYMENT_COLLECTION_INVOICES
    }
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}


type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL


export const addPayment = (formData: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: PAYMENT_COLLECTION_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Transaction/Add`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
      });
      const res = await response.json();

      if (res.code === 200){

          dispatch({ type: PAYMENT_COLLECTION, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: PAYMENT_COLLECTION_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: PAYMENT_COLLECTION_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};


export const getInvoices = (cusId: any): any => async (dispatch: Dispatch): Promise<any> =>{
    console.log(cusId);
    try {
        dispatch({ type: PAYMENT_COLLECTION_START, loading: true });
      
        const response = await fetch(`${API_BASE_URL}/api/Invoice/GetByCustomerId?CustomerId=${cusId}`, {
            method: "GET",
        });
        const res = await response.json();
  
        if (res.code === 200){
  
            dispatch({ type: PAYMENT_COLLECTION_INVOICES, payload: res, loading: false });
            return { success: true, ...res }; 
        } else {
            dispatch({ type: PAYMENT_COLLECTION_END, payload: res.message, loading: false });
            return { success: false, ...res }; 
        }
    } catch (error: any) {
        dispatch({ type: PAYMENT_COLLECTION_END, payload: error.message, loading: false });
        return { success: false, message: error.message };
    }
  };
  