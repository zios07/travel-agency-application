import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  bookings = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.http.get(environment.API_URL + '/bookings').subscribe((bookings: any) => {
      this.bookings = bookings;
    }, error => {
      this.toastr.error('Could not load bookings');
    });
  }

  confirmOrder() {
    this.http.post(environment.API_URL + '/orders', null).subscribe((order: any) => {
      this.toastr.info('Order was confirmed successfully!');
      this.loadBookings();
    }, error => {
      this.toastr.error('Could confirm order');
    });
  }

  getDaysBetween(start, end) {
    start = new Date(start);
    end = new Date(end);
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  }

  deleteItem(booking) {
    const index = this.bookings.indexOf(booking);
    this.bookings.splice(index, 1);
  }
}
