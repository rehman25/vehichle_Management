/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRANSFER_VEHICLE, TRANSFER_VEHICLE_START, TRANSFER_VEHICLE_END}
from '../type'

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}

type Dispatch = (action: Action) => any;

const API_BASE_URL = import.meta.env.VITE_API_URL

export const transferVehicle = (formData:any): any => async (dispatch: Dispatch): Promise<any> =>{
  try {
      dispatch({ type: TRANSFER_VEHICLE_START, loading: true });
    
      const response = await fetch(`${API_BASE_URL}/api/CustomerVehicles/Transfer`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'cors':'no-cors'
          },
          body: JSON.stringify(formData) 
      });
      const res = await response.json();
      if (res.code === 200){

          dispatch({ type: TRANSFER_VEHICLE, payload: res, loading: false });
          return { success: true, ...res }; 
      } else {
          dispatch({ type: TRANSFER_VEHICLE_END, payload: res.message, loading: false });
          return { success: false, ...res }; 
      }
  } catch (error: any) {
      dispatch({ type: TRANSFER_VEHICLE_END, payload: error.message, loading: false });
      return { success: false, message: error.message };
  }
};



