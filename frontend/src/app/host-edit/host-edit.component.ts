import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Host } from '../models/host.model';
import { HostService } from '../host.service';

@Component({
  selector: 'app-host-edit',
  templateUrl: './host-edit.component.html',
  styleUrls: ['./host-edit.component.css']
})
export class HostEditComponent {
  host: Host = {
    id: '',
    name: '',
    email: '',
    location: '',
    property_type: '',
    hosting_since: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hostService: HostService
  ) {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (navigationState) {
      this.host = navigationState['hostData'];
    }
  }

  onSubmit(): void {
    // Call the HostService to update the host data
    this.hostService.updateHost(this.host.id, this.host).subscribe(
      () => {
        // Host updated successfully, navigate back to the host details page
        this.router.navigate(['/host-details', this.host.id]);
      },
      (error) => {
        console.error('Error updating host:', error);
        // Handle the error as needed (e.g., show an error message to the user)
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/host-details', this.host.id]);
  }
}
