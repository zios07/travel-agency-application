import {Component, OnInit} from '@angular/core';
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
      departure: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }
    const params = new HttpParams()
      .set('date', this.formatDate(this.searchForm.value.date))
      .set('hour', this.searchForm.value.hour)
      .set('departure', this.searchForm.value.departure)
      .set('destination', this.searchForm.value.destination);
    this.http.get(environment.API_URL + '/agency-services/tickets', {params}).subscribe(resp => {
      this.tickets = resp;
    }, error => {
      this.toastr.error('Could not load tickets for this city');
    });
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

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
    this.http.post(environment.API_URL + '/bookings/ticket', booking).subscribe(() => {
      this.toastr.info('Booking added with success');
      this.search();
    }, error => {
      this.toastr.error('Could not add the booking');
    });
  }
}
