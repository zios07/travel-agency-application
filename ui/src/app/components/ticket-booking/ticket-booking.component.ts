import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss']
})
export class TicketBookingComponent implements OnInit {

  city: string;
  tickets;
  searchForm: FormGroup;

  constructor(private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }
    const params = new HttpParams().set('startDate', this.formatDate(this.searchForm.value.startDate))
      .set('endDate', this.formatDate(this.searchForm.value.endDate));
    this.http.get(environment.API_URL + '/agency-services/tickets/' + this.searchForm.value.city, {params}).subscribe(resp => {
      this.tickets = resp;
    }, error => {
      this.toastr.error('Could not load tickets for this city');
    });
  }

  private formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }


  addBooking(ticket) {
    const booking = {
      product: ticket,
      startDate: this.searchForm.value.startDate,
      endDate: this.searchForm.value.endDate
    };
    this.http.post(environment.API_URL + '/bookings/ticket', booking).subscribe(booking => {
      this.toastr.info('Booking added with success');
      this.search();
    }, error => {
      this.toastr.error('Could not add the booking');
    });
  }
}
