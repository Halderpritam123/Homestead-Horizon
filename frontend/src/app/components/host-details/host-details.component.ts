import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostService } from '../../host.service';
import { Host } from '../../models/host.model';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.css']
})
export class HostDetailsComponent implements OnInit {
  host: Host = { // Initialize the host object with empty values
    id: '',
    name: '',
    email: '',
    location: '',
    property_type: '',
    hosting_since: ''
  };
  error: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hostService: HostService
  ) { }

  ngOnInit(): void {
    this.getHostDetails();
  }

  getHostDetails(): void {
    const hostId = this.route.snapshot.paramMap.get('id');
    if (hostId) {
      this.hostService.getHostById(hostId).subscribe(
        (host: Host) => { // Explicitly define the type of 'host'
          this.host = host;
        },
        (error) => {
          console.error('Error fetching host details:', error);
          this.error = error;
        }
      );
    }
  }
  editHost(): void {
    // Navigate to the host edit page, passing the host ID as a route parameter
    this.router.navigate(['/hosts', this.host.id, 'edit']);
  }

  confirmDeleteHost(): void {
    const isConfirmed = confirm('Are you sure you want to delete this host?');
    if (isConfirmed) {
      this.deleteHost();
    }
  }

  deleteHost(): void {
    const hostId = this.host.id;
    this.hostService.deleteHost(hostId).subscribe(
      () => {
        // Host deleted successfully, navigate back to the host list
        this.router.navigate(['/hosts']);
      },
      (error) => {
        console.error('Error deleting host:', error);
        this.error = error;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/hosts']);
  }
}
