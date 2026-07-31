/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
    SERVICES,
    GET_SERVICES_DATA,
    GET_SERVICES_END,
    GET_SERVICES_START,
    GET_SERVICES_CUSTOMER_DATA,
    GET_SERVICES_PRODUCT_DATA,
    GET_SERVICES_PRINT_DATA,
    GET_PRINT_DATA
    }
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}


type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL


export const getSERVICES = (Pagination: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_SERVICES_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/CustomerServices/GetAll`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(Pagination) 
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: GET_SERVICES_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};


export const getCustomer = (customer: any): any => async (dispatch: Dispatch): Promise<any> =>{
try {
    dispatch({ type: GET_SERVICES_START, loading: true });
  
    const response = await fetch(`${API_BASE_URL}/api/Customer/dropdowndata?search=${customer.search}&pageNumber=${customer.pageNumber}&pageSize=${customer.pageSize}`, {
        method: "GET",
      });
    const res = await response.json();
    
    if (res.code === 200) {

        dispatch({ type: GET_SERVICES_CUSTOMER_DATA, payload: res, loading: false });
        return { success: true, ...res }; 
    } else {
        dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
        return { success: false, ...res }; 
    }
} catch (error: any) {
    dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
    return { success: false, message: error.message };
}
};



export const AddSERVICES = (formData: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_SERVICES_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/CustomerServices/Add`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
      });
      const res = await response.json();

      if (res.code === 200){

          dispatch({ type: GET_SERVICES_PRINT_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};

export const getVehicleByID = (requestid: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_SERVICES_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/CustomerVehicle/GetByCustomerId`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             "requestid":requestid,
          }) 
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: SERVICES, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};


export const getProduct = (customer:any): any => async (dispatch: Dispatch): Promise<any> =>{
    try {
        dispatch({ type: GET_SERVICES_START, loading: true });
      
        const response = await fetch(`${API_BASE_URL}/api/Product/GetAll?search=${customer.search}&pageNumber=${customer.pageNumber}&pageSize=${customer.pageSize}`, {
            method: "GET",
          });
        const res = await response.json();
        if (res.code === 200) {
    
            dispatch({ type: GET_SERVICES_PRODUCT_DATA, payload: res, loading: false });
            return { success: true, ...res }; 
        } else {
            dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
            return { success: false, ...res }; 
        }
    } catch (error: any) {
        dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
        return { success: false, message: error.message };
    }
  };

  export const getPrint = (customer:any): any => async (dispatch: Dispatch): Promise<any> =>{
    console.log(customer, 'chi');
    try {
        dispatch({ type: GET_SERVICES_START, loading: true });

        const response = await fetch(`${API_BASE_URL}/api/CustomerServices/Get?Id=${customer}`, {
            method: "GET",
          });
        const res = await response.json();
        if (res.code === 200) {

            dispatch({ type: GET_PRINT_DATA, payload: res, loading: false });
            return { success: true, ...res };
        } else {
            dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
            return { success: false, ...res };
        }
    } catch (error: any) {
        dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
        return { success: false, message: error.message };
    }
  };

  export const getServiceById = (id: any): any => async (dispatch: Dispatch): Promise<any> =>{
    try {
        dispatch({ type: GET_SERVICES_START, loading: true });

        const response = await fetch(`${API_BASE_URL}/api/CustomerServices/Get?Id=${id}`, {
            method: "GET",
          });
        const res = await response.json();
        if (res.code === 200) {
            dispatch({ type: GET_SERVICES_START, loading: false });
            return { success: true, ...res };
        } else {
            dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
            return { success: false, ...res };
        }
    } catch (error: any) {
        dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
        return { success: false, message: error.message };
    }
  };

  export const updateSERVICES = (formData: any): any => async (dispatch: Dispatch): Promise<any> =>{
    try {
        dispatch({ type: GET_SERVICES_START, loading: true });

        const response = await fetch(`${API_BASE_URL}/api/CustomerServices/Update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const res = await response.json();

        if (res.code === 200){
            dispatch({ type: GET_SERVICES_START, loading: false });
            return { success: true, ...res };
        } else {
            dispatch({ type: GET_SERVICES_END, payload: res.message, loading: false });
            return { success: false, ...res };
        }
    } catch (error: any) {
        dispatch({ type: GET_SERVICES_END, payload: error.message, loading: false });
        return { success: false, message: error.message };
    }
  };