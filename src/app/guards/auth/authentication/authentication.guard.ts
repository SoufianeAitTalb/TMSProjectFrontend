import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {StaffService} from "../../../demo/service/staff.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private staffService: StaffService, private router: Router) {}

  canActivate(): boolean {
    if (this.staffService.isLoggedIn()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
