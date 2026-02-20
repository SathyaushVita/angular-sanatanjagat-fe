import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrganizationsService } from '../services/organizations.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-organizationdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizationdetail.component.html',
  styleUrl: './organizationdetail.component.css'
})
export class OrganizationdetailComponent {

  organizationData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['data']) {
      this.organizationData = navigation.extras.state['data'];
      console.log('Received Organization Data:', this.organizationData);
    } else {
      console.error('No organization data passed');
      // Optionally, redirect back or fetch data via a service
    }
  }

}





