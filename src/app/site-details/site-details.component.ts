import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-site-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent {

  private apiUrl = environment.apiUrl;  // Use environment-based URL
  siteDetails = {
    CompanyName: '',  // Holds the company name
  };

  selectedTracker: string = '';  // This will hold the selected tracker ("Interactive" or "Silent")
  selectedVersion: string = '';  // This will hold the selected version
  versions: string[] = [];  // Array to store versions based on the selected tracker
  errorMessage: string = '';  // Error message to show if something goes wrong

  constructor(private router: Router) { }

  // Method to handle form submission
  onSubmit(): void {
    if (!this.selectedTracker || !this.selectedVersion) {
      this.errorMessage = 'Both Tracker and Version are required!';
      console.error(this.errorMessage);
      return;  // Prevent submission if tracker or version is not selected
    }

    // Log the submitted data to the console
    console.log('Form Submitted:', {
      companyName: this.siteDetails.CompanyName,
      tracker: this.selectedTracker,
      version: this.selectedVersion,
    });

    // Prepare request data for the script execution
    const requestData = {
      companyName: this.siteDetails.CompanyName,
      tracker: this.selectedTracker,
      version: this.selectedVersion,
    };

    // Navigate to the "inputs" component and pass the state
    setTimeout(() => {
      this.router.navigate(['/inputs'], {
        state: {
          companyName: this.siteDetails.CompanyName,
          tracker: this.selectedTracker,
          version: this.selectedVersion,
        }
      });
    }, 2000);
  }

  // Method to fetch versions based on selected tracker
  fetchVersions(): void {
    if (this.selectedTracker) {
      axios.get(`${this.apiUrl}/api/get-versions/${this.selectedTracker}`)
        .then(response => {
          this.versions = response.data.versions || [];  // Assume the API returns a list of versions
          if (this.versions.length === 0) {
            this.errorMessage = 'No versions found for the selected tracker.';
            console.warn(this.errorMessage);
          }
        })
        .catch(error => {
          this.errorMessage = `Error fetching versions: ${error.message}`;
          console.error(this.errorMessage);
        });
    }
  }

  // Method to handle tracker change (if needed for additional logic)
  onTrackerChange(): void {
    console.log('Tracker changed:', this.selectedTracker);
    this.fetchVersions();
    this.selectedVersion = '';  // Reset the selected version when the tracker changes
  }
}
