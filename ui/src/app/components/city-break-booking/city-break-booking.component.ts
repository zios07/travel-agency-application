import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-city-break-booking',
  templateUrl: './city-break-booking.component.html',
  styleUrls: ['./city-break-booking.component.scss']
})
export class CityBreakBookingComponent implements OnInit {


  city: string;
  cityBreaks;
  searchForm: FormGroup;

  constructor(private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      date: ['', Validators.required],
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
      .set('city', this.searchForm.value.city);
    this.http.get(environment.API_URL + '/agency-services/city-breaks', {params}).subscribe(resp => {
      this.cityBreaks = resp;
    }, error => {
      this.toastr.error('Could not load city breaks for this city');
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

  addBooking(cityBreak) {
    const booking = {
      product: cityBreak,
      startDate: this.searchForm.value.date
    };
    this.http.post(environment.API_URL + '/bookings/city-break', booking).subscribe(() => {
      this.toastr.info('Booking added with success');
      this.search();
    }, error => {
      this.toastr.error('Could not add the booking');
    });
  }

}
