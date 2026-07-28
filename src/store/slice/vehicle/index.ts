/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_VEHICLE_DATA, GET_VEHICLE_END, GET_VEHICLE_START, VEHICLE, GET_VEHICLE_CUSTOMER_DATA, GET_VEHICLE_DATA_BYID}
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}

type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL


export const getVehicle = (Pagination: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_VEHICLE_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/CustomerVehicles/GetAll`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(Pagination) 
      });
      const res = await response.json();
      
      if (res.code === 200) {

          dispatch({ type: GET_VEHICLE_DATA, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_VEHICLE_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_VEHICLE_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};



export const getVehiclebyId = (id: any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: GET_VEHICLE_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/CustomerVehicles/GetByID/${id}`, {
          method: "GET",
      });
      const res = await response.json();
      
      if (res.code === 200) {

          dispatch({ type: GET_VEHICLE_DATA_BYID, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: GET_VEHICLE_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: GET_VEHICLE_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};

export const getCustomer = (customer: any): any => async (dispatch: Dispatch): Promise<any> =>{
try {
    dispatch({ type: GET_VEHICLE_START, loading: true });
  
    const response = await fetch(`${API_BASE_URL}/api/Customer/dropdowndata?search=${customer.search}&pageNumber=${customer.pageNumber}&pageSize=${customer.pageSize}`, {
        method: "GET",
      });
    const res = await response.json();
    
    if (res.code === 200) {

        dispatch({ type: GET_VEHICLE_CUSTOMER_DATA, payload: res, loading: false });
        return { success: true, ...res }; 
    } else {
        dispatch({ type: GET_VEHICLE_END, payload: res.message, loading: false });
        return { success: false, ...res }; 
    }
} catch (error: any) {
    dispatch({ type: GET_VEHICLE_END, payload: error.message, loading: false });
    return { success: false, message: error.message };
}
};



export const AddVehicle = (formData: any): any => async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({ type: GET_VEHICLE_START, loading: true });
      
      const response = await fetch(`${API_BASE_URL}/api/CustomerVehicles/Add`, {
        method: "POST",
        headers: {
          "accept": "application/json",
        }, 
        body:formData  
      });
      
      const res = await response.json();
      
      if (res.code === 200) {
        dispatch({ type: VEHICLE, payload: res, loading: false });
        return { success: true, ...res };
      } else {
        dispatch({ type: GET_VEHICLE_END, payload: res.message, loading: false });
        return { success: false, ...res };
      }
    } catch (error: any) {
      dispatch({ type: GET_VEHICLE_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
    }
  };

  export const updateVehicle = (formData: any): any => async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({ type: GET_VEHICLE_START, loading: true });

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
      
      const response = await fetch(`${API_BASE_URL}/api/CustomerVehicles/Update`, {
        method: "POST",
        // headers: {
        //   "accept": "application/json",
        // }, 
        body:formData  
      });
      
      const res = await response.json();
      
      if (res.code === 200) {
        dispatch({ type: VEHICLE, payload: res, loading: false });
        return { success: true, ...res };
      } else {
        dispatch({ type: GET_VEHICLE_END, payload: res.message, loading: false });
        return { success: false, ...res };
      }
    } catch (error: any) {
      dispatch({ type: GET_VEHICLE_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
    }
  };