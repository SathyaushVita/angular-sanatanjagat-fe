import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '../services/organizations.service';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-getby-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './getby-training.component.html',
  styleUrl: './getby-training.component.css'
})
export class GetbyTrainingComponent {



  organizationId: any;
  organization: any;
  errorMessage: string | null = null;




  constructor(private route: ActivatedRoute, private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.gettraining();
  }

  gettraining(): void {
    this.trainingService.getTrainingById(this.organizationId).subscribe(
      (data: any) => {
        this.organization = data;
        this.errorMessage = null;
        console.log(this.organization, "Organization Details");
      },
      (error) => {
        console.error('Error fetching organization details:', error);
        this.organization = null;
  
        // Custom error handling for specific 404 message
        if (error.status === 404 && error.error?.message === 'Item not found or status is not SUCCESS.') {
          this.errorMessage = 'Your added training program is currently under review and marked as pending. Our team will process and review it shortly before it becomes visible.';
        } else {
          this.errorMessage = error.error?.message || 'Please Login to View Details.';
        }
      }
    );
  }
  


  getVideoUrl(): string {
    if (this.organization && this.organization.video) {
      return `${this.organization.video}`;
    }
    return '';
  }


  


  // getbytraining(temple: any) {
  //   if (!temple || !temple._id) {
  //     console.error('Invalid temple data provided.');
  //     return;
  //   }

  //   const shareUrl = `${window.location.origin}/getbytraining/${temple._id}`;
  //   console.log('Share URL:', shareUrl);

  //   if (navigator.share) {
  //     navigator.share({
  //       title: temple.name,
  //       text: temple.desc || 'Check out this temple!',
  //       url: shareUrl
  //     }).then(() => {
  //       console.log('Sharing successful');
  //     }).catch((error) => {
  //       console.error('Error sharing:', error);
  //     });
  //   } else {
  //     alert(`Share URL: ${shareUrl}`);
  //   }
  // }

  getbytraining(temple: any) {
  if (!temple || !temple._id) {
    console.error('Invalid temple data provided.');
    return;
  }

  // Create the URL (plain text)
  const shareUrl = `${window.location.origin}/getbytraining/${temple._id}`;

  // Prepare the text (name, description, and URL)
  const shareText = `${temple.name}\n\n${temple.desc || 'Check out this temple!'}\n\n${shareUrl}`;

  // Check if `navigator.share` is supported
  if (navigator.share) {
    navigator.share({
      title: temple.name,   // The title is optional, here it can be the temple name
      text: shareText,      // Share the name, description, and the URL as plain text
    }).then(() => {
      console.log('Sharing successful');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    // Fallback for unsupported browsers
    this.shareViaClipboardOrFallback(shareText);
  }
}

shareViaClipboardOrFallback(shareText: string) {
  if (navigator.clipboard) {
    // Copy the share text (name, description, and URL) to the clipboard
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Share details copied to clipboard! You can now paste it to share.');
      console.log('Share details copied to clipboard:', shareText);
    }).catch((err) => {
      console.error('Error copying to clipboard:', err);
      alert(`Share manually:\n\n${shareText}`);
    });
  } else {
    // Fallback to manual sharing if clipboard is not available
    alert(`Share manually:\n\n${shareText}`);
  }
}
}

