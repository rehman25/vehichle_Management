/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import customer_Red from "./reducer/customer";
import vehicle_Red from "./reducer/vehicle";
import services_Red from "./reducer/services";
import transfer_red from "./reducer/transfer";
import payment_red from "./reducer/payment&collection";
import customerledger_Red from "./reducer/customerledger"
import costumerBalance_Red from "./reducer/customerBalanceSummary";
import generalTransaction_Red from './reducer/generalTransaction';
import Item_Red from "./reducer/item"


const reducers = combineReducers({
    customer_Red,
    vehicle_Red,
    services_Red,
    transfer_red,
    payment_red,
    customerledger_Red,
    costumerBalance_Red,
    generalTransaction_Red,
    Item_Red
});

const composeEnhancers =
  (window as any)._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

export default store;