import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-city-break-editor',
  templateUrl: './city-break-editor.component.html',
  styleUrls: ['./city-break-editor.component.scss']
})
export class CityBreakEditorComponent implements OnInit {

  title = 'City break editor';
  cityBreakForm: FormGroup;
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

  photoChanged(event) {
    this.photo = event.target.files[0];
  }

  ngOnInit() {
    this.cityBreakForm = this.formBuilder.group({
      city: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      availableCount: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    const formData: FormData = new FormData();

    formData.append('cityBreak',
      new Blob([JSON.stringify(this.cityBreakForm.value)], {
        type: 'application/json'
      }));
    const blob = new Blob([this.photo], {type: 'application/json'});
    formData.append('photo', blob, this.photo.name);

    this.submitted = true;
    this.http.post(environment.API_URL + '/agency-services/city-breaks', formData).subscribe(resp => {
      this.toastr.success('City break created');
      this.submitted = false;
      this.router.navigate(['/admin/dashboard']);
    }, error => {
      this.submitted = false;
      const message = error.error ? error.error.message ? error.error.message : 'Error occurred' : 'Error occurred';
      this.toastr.error(message);
    });
  }

}
