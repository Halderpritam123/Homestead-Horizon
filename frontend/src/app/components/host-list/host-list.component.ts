import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostService } from '../../host.service';
import { Host } from '../../models/host.model';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.css']
})
export class HostListComponent implements OnInit {
  hosts: Host[] = [];
  error: any;

  constructor(private router: Router, private hostService: HostService) { }

  ngOnInit(): void {
    this.getHosts();
  }

  getHosts(): void {
    this.hostService.getAllHosts().subscribe(
      (hosts) => {
        this.hosts = hosts;
      },
      (error) => {
        console.error('Error fetching hosts:', error);
        this.error = error;
      }
    );
  }

  viewHostDetails(hostId: string): void {
    this.router.navigate(['/hosts', hostId]);
  }
}
