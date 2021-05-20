import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(private userService: UserService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;
    }, error => {
      this.toastr.error('Could not load user profile information');
    });
  }

}
