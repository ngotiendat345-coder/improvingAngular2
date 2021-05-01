import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customers.modal';
import * as customerActions from '../state/customer.action';
import { select, Store } from '@ngrx/store';
import * as fromCustomer from '../state/customere.reducer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  error$: Observable<string>;
  constructor(private store: Store<fromCustomer.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.select(fromCustomer.getCustomers);
    this.error$ = this.store.select(fromCustomer.getCustomerError);
  }
  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }
  deleteCustomer(customer: Customer) {
    if (confirm('Are You Sure You want to Delete the User?')) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }
}
