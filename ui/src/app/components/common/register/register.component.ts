import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {delay} from 'rxjs/operators';
import {User} from 'src/app/models/User';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title = 'Sign up';
  form: FormGroup;
  submitted = false;
  user: User = new User();

  returnUrl: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.submitted = true;
    const user = this.form.value;
    this.authService.register(user).pipe(delay(1500)).subscribe(resp => {
      this.authService.setConnectedUser(resp);
      this.router.navigate(['/']);
      this.toastr.success('Registered successfully');
    }, error => {
      this.submitted = false;
      const message = error.error ? error.error.message ? error.error.message : 'Error occured' : 'Error occured';
      this.toastr.error(message);
    });
  }

}
