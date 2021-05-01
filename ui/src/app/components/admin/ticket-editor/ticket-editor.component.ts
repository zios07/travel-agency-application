import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-ticket-editor',
  templateUrl: './ticket-editor.component.html',
  styleUrls: ['./ticket-editor.component.scss']
})
export class TicketEditorComponent implements OnInit {


  title = 'Ticket editor';
  ticketForm: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.ticketForm = this.formBuilder.group({
      city: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.http.post(environment.API_URL + '/agency-services/tickets', this.ticketForm.value).subscribe(resp => {
      this.toastr.success('Ticket created');
      this.submitted = false;
      this.router.navigate(['/admin/dashboard']);
    }, error => {
      this.submitted = false;
      const message = error.error ? error.error.message ? error.error.message : 'Error occurred' : 'Error occurred';
      this.toastr.error(message);
    });
  }
}
