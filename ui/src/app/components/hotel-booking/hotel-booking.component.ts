import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.scss']
})
export class HotelBookingComponent implements OnInit {

  city: string;
  hotels;
  searchForm: FormGroup;

  constructor(private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      maxPrice: [''],
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
      .set('endDate', this.formatDate(this.searchForm.value.endDate))
      .set('maxPrice', this.searchForm.value.maxPrice);
    this.http.get(environment.API_URL + '/agency-services/hotels/' + this.searchForm.value.city, {params}).subscribe(resp => {
      this.hotels = resp;
    }, error => {
      this.toastr.error('Could not load hotels for this city');
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


  addBooking(hotel) {
    const booking = {
      product: hotel,
      startDate: this.searchForm.value.startDate,
      endDate: this.searchForm.value.endDate
    };
    this.http.post(environment.API_URL + '/bookings/hotel', booking).subscribe(booking => {
      this.toastr.info('Booking added with success');
      this.search();
    }, error => {
      this.toastr.error('Could not add the booking');
    });
  }
}
