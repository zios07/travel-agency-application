import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get(environment.API_URL + '/orders').subscribe((orders: any) => {
      this.orders = orders;
    }, error => {
      this.toastr.error('Could not load orders');
    });
  }

}
