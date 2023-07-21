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
  host: Host | undefined;
  error: any;
  hostEditModalOpened: boolean = false;

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
        (host: Host) => {
          this.host = host;
        },
        (error) => {
          console.error('Error fetching host details:', error);
          this.error = error;
        }
      );
    }
  }

  navigateToEditPage(): void {
    this.router.navigate(['/hosts_edit', this.host?.id], { state: { hostData: this.host } });
  }

  confirmDeleteHost(): void {
    const isConfirmed = confirm('Are you sure you want to delete this host?');
    if (isConfirmed) {
      this.deleteHost();
    }
  }

  deleteHost(): void {
    const hostId = this.host?.id;
    if (hostId) {
      this.hostService.deleteHost(hostId).subscribe(
        () => {
          this.router.navigate(['/hosts']);
        },
        (error) => {
          console.error('Error deleting host:', error);
          this.error = error;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/hosts']);
  }
}
