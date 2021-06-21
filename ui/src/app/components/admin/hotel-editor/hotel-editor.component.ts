import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-hotel-editor',
  templateUrl: './hotel-editor.component.html',
  styleUrls: ['./hotel-editor.component.scss']
})
export class HotelEditorComponent implements OnInit {

  title = 'Hotel editor';
  hotelForm: FormGroup;
  submitted = false;
  photo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.hotelForm = this.formBuilder.group({
      city: ['', Validators.required],
      name: ['', Validators.required],
      totalRooms: ['', Validators.required],
      roomPrice: ['', Validators.required],
      photos: []
    });
  }

  photoChanged(event) {
    this.photo = event.target.files[0];
  }

  onSubmit() {

    const formData: FormData = new FormData();

    formData.append('hotel',
      new Blob([JSON.stringify(this.hotelForm.value)], {
        type: 'application/json'
      }));
    const blob = new Blob([this.photo], {type: 'application/json'});
    formData.append('photo', blob, this.photo.name);

    this.submitted = true;
    this.http.post(environment.API_URL + '/agency-services/hotels', formData).subscribe(resp => {
      this.toastr.success('Hotel created');
      this.submitted = false;
      this.router.navigate(['/admin/dashboard']);
    }, error => {
      this.submitted = false;
      const message = error.error ? error.error.message ? error.error.message : 'Error occurred' : 'Error occurred';
      this.toastr.error(message);
    });
  }

}
