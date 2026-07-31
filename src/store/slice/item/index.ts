/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_ITEM_DATA, GET_ITEM_END, GET_ITEM_START, GET_ITEM_TYPE}
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}

type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL

export const getItems = (Pagination: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_ITEM_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Product/GetAll?search=${Pagination.search}&pageNumber=${Pagination.pageNumber}&pageSize=${Pagination.pageSizes}`, {
          method: "GET",
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_ITEM_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_ITEM_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_ITEM_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};

export const getType = (): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_ITEM_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/Product/Types/GetAll`, {
          method: "GET",
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_ITEM_TYPE, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_ITEM_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_ITEM_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};


export const AddItem = (Pagination: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_ITEM_START, loading: true });

      const response = await fetch(`${API_BASE_URL}/api/Product/Add`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(Pagination)
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_ITEM_DATA, payload: res, loading: false });
          return { success: true, ...res };
      } else {
          dispatch({ type: GET_ITEM_END, payload: res.message, loading: false });
          return { success: false, ...res };
      }
  } catch (error: any) {
      dispatch({ type: GET_ITEM_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};

export const updateItem = (formData: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_ITEM_START, loading: true });

      const response = await fetch(`${API_BASE_URL}/api/Product/Update`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_ITEM_START, loading: false });
          return { success: true, ...res };
      } else {
          dispatch({ type: GET_ITEM_END, payload: res.message, loading: false });
          return { success: false, ...res };
      }
  } catch (error: any) {
      dispatch({ type: GET_ITEM_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};