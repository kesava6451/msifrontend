import axios from 'axios';  // Import Axios
import { environment } from '../environments/environment';
import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-msidownload',
  templateUrl: './download-msi.component.html',
  styleUrls: ['./download-msi.component.css']
})
export class DownloadMsiComponent implements OnInit, OnDestroy {
  companyName: string = '';
  tracker: string = '';
  version: string = '';
  downloadMessage: string = '';  // To show user message
  messageType: string = '';  // To track message type: 'success' or 'error'
  isDownloadDisabled: boolean = true; // Initially disable the download button
  isLoading: boolean = true; // Show loading state until the file check completes
  private fileCheckInterval: any;  // Store interval for checking file availability
  private apiUrl = environment.apiUrl;  // Use environment-based URL
  files: any[] = [];  // Store fetched files
  errorMessage: string = '';  // Store error messages

  ngOnInit(): void {
    // Retrieve the data passed from WebConfigInputsComponent using router state
    const state = history.state as { companyName: string; tracker: string; version: string };
    this.isLoading = true; // Start loading

    if (state && state.companyName && state.tracker && state.version) {
      // Assign values to the class properties
      this.companyName = state.companyName;
      this.tracker = state.tracker;
      this.version = state.version;

      // Log for debugging
      console.log('Company Name:', this.companyName);
      console.log('Tracker:', this.tracker);
      console.log('Version:', this.version);

      // Start checking the file availability immediately
      this.checkFileAvailability();

      // Start checking the file availability every 10 seconds
      this.startFileCheck();
    } else {
      console.error('No state data found!');
      this.downloadMessage = 'Missing required information for the download.';
      this.messageType = 'error';  // Set message type to 'error'
    }
  }

  // Method to check the file availability using Axios
  fetchFiles(): void {
    if (this.tracker && this.companyName && this.version) {
      const url = `${this.apiUrl}/api/file-check/${this.companyName}/${this.tracker}/${this.version}`;
      axios.get(url)
        .then(response => {
          if (response.data.files && response.data.files.length > 0) {
            this.files = response.data.files;
            this.downloadMessage = 'Your file is ready. Click on download';
            this.isLoading = false;
            this.isDownloadDisabled = false;
          } else {
            this.files = [];
            this.errorMessage = 'No files found for the selected tracker/version.';
            this.isDownloadDisabled = true;
          }
        })
        .catch(error => {
          this.files = [];
          this.errorMessage = `Error fetching files: ${error.message}`;
          this.isDownloadDisabled = true;
          this.isLoading = true;
        })
    } else {
      this.errorMessage = 'Please ensure that all fields (tracker, company name, version) are selected.';
      this.isDownloadDisabled = true;
    }
  }

  // Method to stop the file check once the file is available
  stopFileCheck(): void {
    if (this.fileCheckInterval) {
      clearInterval(this.fileCheckInterval);  // Stop the interval
      this.fileCheckInterval = null;  // Clear the interval reference
    }
  }
  // Method to start checking the file every 10 seconds after the first check
  startFileCheck(): void {
    this.fileCheckInterval = setInterval(() => {
      this.checkFileAvailability();
      this.isLoading = true;
    }, 10000); // Check every 10 seconds
  }



  // Method to check if the file is available for download
  checkFileAvailability(): void {
    this.fetchFiles();  // Check for file availability
  }

  // Method to initiate the MSI download
  downloadMSI(): void {
    if (!this.companyName || !this.tracker || !this.version) {
      console.error('Missing required fields for download');
      this.downloadMessage = 'Unable to start the download. Missing necessary information.';
      this.messageType = 'error';  // Set message type to 'error'
      return; // Don't proceed with download if essential data is missing
    }

    // Construct the MSI URL dynamically
    const baseUrl = `https://msi.snovasys.com/tracker`;
    const companySegment = this.companyName;
    const trackerSegment = this.tracker;
    const versionSegment = this.version;
    const msiUrl = `${baseUrl}/${companySegment}/${trackerSegment}/${versionSegment}/TimeChamp.msi`;

    // Log the generated URL for debugging
    console.log('Generated MSI URL:', msiUrl);

    // Trigger the download by setting window.location.href
    window.location.href = msiUrl;

    // Optionally, notify the user
    this.downloadMessage = 'Your file is downloading.';
    this.messageType = 'success'; // Set message type to 'success'

    setTimeout(() => {
      this.downloadMessage = 'File was downloaded'; // Show completion message
    }, 10000); // Timeout after 10 seconds (adjust if needed)
  }

  // Cleanup method to clear the interval (optional, in case the component gets destroyed)
  ngOnDestroy(): void {
    this.stopFileCheck();
  }
}
