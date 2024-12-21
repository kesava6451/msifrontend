import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-web-config-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './web-config-inputs.component.html',
  styleUrls: ['./web-config-inputs.component.css'],
})
export class WebConfigInputsComponent implements OnInit {
  private apiUrl = environment.apiUrl;  // Use environment-based URL

  // State variables (updated default values or dynamically fetched values)
  companyName: string = '';
  selectedTracker: string = '';
  selectedVersion: string = '';

  // Form input fields with default placeholder values
  encryptedRegistryKey: string = '';
  defaultSiteDomain: string = 'customer.sites1.timechamp.io';  // Optional default value
  timeChampApiUrl: string = 'https://corp.timechamp.io/';  // Optional default URL

  // Checkbox state (whether terms are accepted)
  isCheckboxChecked: boolean = false;

  // Error and success messages
  errorMessage: string = '';
  successMessage: string = '';

  // Submitted flag to disable the button after submission
  submitted: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;

    // Validate and assign state data from the navigation state
    if (state && state.companyName && state.tracker && state.version) {
      this.companyName = state.companyName;
      this.selectedTracker = state.tracker;
      this.selectedVersion = state.version;

      // Log for debugging
      console.log('Company Name:', this.companyName);
      console.log('Tracker Type:', this.selectedTracker);
      console.log('Selected Version:', this.selectedVersion);
    } else {
      console.error('State data missing.');
      this.errorMessage = 'Missing required information. Please go back and fill out the form.';
    }
  }

  // Check if the form is valid
  formIsValid(): boolean {
    return (
      this.encryptedRegistryKey.trim() !== '' &&
      this.defaultSiteDomain.trim() !== '' &&
      this.timeChampApiUrl.trim() !== '' &&
      this.isCheckboxChecked  // Checkbox must be checked
    );
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (!this.formIsValid()) {
      this.errorMessage = 'Please complete the form and agree to the terms.';
      return;
    }

    // Set the submitted flag to disable the submit button
    this.submitted = true;

    // Prepare the form data
    const formData = {
      companyName: this.companyName,
      tracker: this.selectedTracker,
      version: this.selectedVersion,
      encryptedRegistryKey: this.encryptedRegistryKey,
      defaultSiteDomain: this.defaultSiteDomain,
      timeChampApiUrl: this.timeChampApiUrl,
    };

    console.log('Form Submitted:', formData);

    try {
      // Send the form data using axios to the server
      const response = await axios.post(`${this.apiUrl}/api/trigger-pipeline`, formData);  // Fixed string interpolation

      // Handle successful response
      console.log('Script executed successfully:', response.data);

      // Set success message
      //this.successMessage = 'Form submitted successfully!';

      // Navigate to the success page with the form data in the state
      setTimeout(() => {
        this.router.navigate(['/download'], {
          state: {
            companyName: this.companyName,
            tracker: this.selectedTracker,
            version: this.selectedVersion
          }
        });
      }, 1000);
    } catch (error) {
      // Handle error during the request
      console.error('Error executing PowerShell script:', error);
      this.errorMessage = 'There was an error executing the script. Please try again.';
    }
  }
}
