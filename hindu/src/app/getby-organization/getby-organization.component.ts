import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '../services/organizations.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-getby-organization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './getby-organization.component.html',
  styleUrl: './getby-organization.component.css'
})
export class GetbyOrganizationComponent {

  private subscription: Subscription = new Subscription();
  errorMessage: string | null = null;
  organizationId: any;
  organization: any;
  allFieldsEmpty: boolean = false;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationsService,private sharedService:SharedService) {}

  ngOnInit(): void {

    this.subscription.add(
      this.sharedService.triggerFetchVillageData$.subscribe(() => {
        this.getOrganizationDetails();
      })
    );
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.getOrganizationDetails();
  }

  // getOrganizationDetails(): void {
  //   this.organizationService.getOrganizationById(this.organizationId).subscribe(
  //     (data: any) => {
  //       this.organization = data;
  //       this.errorMessage = null; // Clear any previous error messages

  //       console.log(this.organization, "Organization Details");
  //     },
  //     (error) => {
  //       console.error('Error fetching organization details:', error);
  //       this.organization = null;
  //       // this.errorMessage =
  //       // error.error?.message === 'An error occurred.'
  //       //   ? 'Your added training program is currently under review and marked as pending. Our team will process and review it shortly before it becomes visible.'
  //       //   : error.error?.message || 'An unknown error occurred.';

  //       if (error.status === 404 && error.error?.message === "Data not found") {
  //         this.errorMessage = "Your added Event is currently under review and marked as pending. Our team will process and review it shortly before it becomes visible..";
  //       }
  //        else if (error.error?.message === 'An error occurred.') {
  //         this.errorMessage =
  //           "Your added training program is currently under review and marked as pending. Our team will process and review it shortly before it becomes visible.";
  //       } else {
  //         this.errorMessage = error.error?.message || "An unknown error occurred.";
  //       }
  //     }
  //   );
  // }


  getOrganizationDetails(): void {
    this.organizationService.getOrganizationById(this.organizationId).subscribe(
      (data: any) => {
        this.organization = data;

        console.log(this.organization, "Organization Details");
      },
      (error) => {
        console.error('Error fetching organization details:', error);
        this.allFieldsEmpty = true; // Set the flag to true on error


       
      }
    );
  }

  checkIfAllFieldsEmpty(org: any): boolean {
    const fields = [
      org.organization_name,
      org.chairman,
      org.reg_id,
      org.est_by,
      org.location,
      org.organization_members,
      org.web_url,
      org.mission,
      org.org_detail
    ];
  
    return fields.every(field => !field || field === 'data not found');
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/noImageDataImage.jpg';
  }





//   shareGoshala(temple: any) {
//   if (!temple || !temple._id) {
//     console.error('Invalid organization data provided.');
//     return;
//   }

//   const shareUrl = `${window.location.origin}/getbyorganization/${temple._id}`;

//   // Combine mission + link (best compatibility)
//   const missionText = temple.mission || "Check out this organization!";
//   const fullText = `${missionText}\n\n👉 View Details:\n${shareUrl}`;

//   if (navigator.share) {
//     navigator.share({
//       title: temple.organization_name,
//       text: fullText,   // <--- Add mission + URL here
//       url: shareUrl     // Optional: Some apps use it, some ignore it
//     })
//     .then(() => console.log("Shared Successfully"))
//     .catch(err => console.error("Share Error:", err));
//   } else {
//     alert(fullText); // fallback
//   }
// }




shareGoshala(temple: any) {
  if (!temple || !temple._id) {
    console.error('Invalid temple data provided.');
    return;
  }

  // Create the URL (plain text)
  const shareUrl = `${window.location.origin}/getbyorganization/${temple._id}`;

  // Prepare the text (name, description, and URL)
  const shareText = `${temple.organization_name}\n\n${temple.mission || 'Check out this temple!'}\n\n${shareUrl}`;

  // Check if `navigator.share` is supported
  if (navigator.share) {
    navigator.share({
      title: temple.organization_name,   // The title is optional, here it can be the temple name
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
