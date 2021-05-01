import * as customerActions from './customer.action';
import { Customer } from '../customers.modal';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}
export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  loaded: false,
  loading: false,
  error: '',
  selectedCustomerId: null,
};
export const initialState = customerAdapter.getInitialState(defaultCustomer);
export function customerReducer(
  state = initialState,
  action: customerActions.ActionTypes
): CustomerState {
  switch (action.type) {
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS:
      return {
        ...state,
        loading: true,
      };
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS:
      return customerAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL:
      return {
        ...state,
        entities: {},
        error: action.payload,
        loading: false,
        loaded: false,
      };
    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS:
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id,
      });
    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state);
    }
    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state);
    }
    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
    }
    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  'customers'
);

export const getCustomers = createSelector(
  getCustomerFeatureState,
  customerAdapter.getSelectors().selectAll
);

export const getCustomerLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
);

export const getCustomerLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
);

export const getCustomerError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
);
export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);
export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  (state) => state.entities[state.selectedCustomerId]
);
