/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_CUSTOMER_DATA, GET_CUSTOMER_END, GET_CUSTOMER_START, GET_CUSTOMER_Byid_DATA}
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}

type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL

export const getCustomer = (Pagination: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_CUSTOMER_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Customer/GetAll`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'cors':'no-cors'
          },
          body: JSON.stringify(Pagination) 
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_CUSTOMER_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_CUSTOMER_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_CUSTOMER_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};


export const getCustomerById = (id: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_CUSTOMER_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Customer/GetByid/${id}`, {
          method: "GET",
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_CUSTOMER_Byid_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_CUSTOMER_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_CUSTOMER_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};



export const AddCustomer = (Pagination: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_CUSTOMER_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Customer/Add`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(Pagination) 
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_CUSTOMER_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_CUSTOMER_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_CUSTOMER_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};

export const updateCustomer = (data: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_CUSTOMER_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Customer/Update`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data) 
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_CUSTOMER_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_CUSTOMER_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_CUSTOMER_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};

export const DeleteCustomer = (id: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_CUSTOMER_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Customer/Delete/${id}`, {
          method: "GET",
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_CUSTOMER_Byid_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_CUSTOMER_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_CUSTOMER_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};