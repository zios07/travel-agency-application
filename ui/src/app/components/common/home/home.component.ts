import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  city: string;
  hotels;
  searchForm: FormGroup;

  constructor(private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      city: [Validators.required],
      startDate: [Validators.required],
      endDate: [Validators.required]
    });
  }

  ngOnInit() {
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }
    const params = new HttpParams();
    params.append('startDate', this.searchForm.value.startDate);
    params.append('endDate', this.searchForm.value.endDate);
    this.http.get(environment.API_URL + 'agency-services/hotels/' + this.city).subscribe(resp => {
      this.hotels = resp;
    }, error => {
      this.toastr.error('Could not load hotels for this city');
    });
  }

}
