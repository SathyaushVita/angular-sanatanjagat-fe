import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '../services/organizations.service';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../services/training.service';
import { EventService } from '../services/event.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberProfileComponent } from '../member-profile/member-profile.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-getby-events',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './getby-events.component.html',
  styleUrl: './getby-events.component.css'
})
export class GetbyEventsComponent {


//   organizationId: any;
//   organization: any;

//   constructor(private route: ActivatedRoute, private eventService: EventService) {}

//   ngOnInit(): void {
//     this.organizationId = this.route.snapshot.paramMap.get('id');
//     this.gettraining();
//   }

//   gettraining(): void {
//     this.eventService.geteventsById(this.organizationId).subscribe(
//       (data: any) => {
//         this.organization = data;
//         console.log(this.organization, "Organization Details");
//       },
//       (error) => {
//         console.error('Error fetching organization details:', error);
//       }
//     );
//   }


//   getVideoUrl(): string {
//     if (this.organization && this.organization.video) {
//       return `data:video/mp4;base64,${this.organization.video}`;
//     }
//     return '';
//   }



// }



commentform!:FormGroup;
commentText: string = '';
EventId:any;
eventdata:any;
errorMessage: string | null = null;


constructor(private commonservice:CommonService,
  private fb:FormBuilder,
  private route:ActivatedRoute,
  private eventservice:EventService,
  private dialog:MatDialog
){}



ngOnInit(): void {

  this.geteventdata();

  this.commentform= this.fb.group({

    body:['',Validators.required],
    event:[this.EventId],
    // temple:null,
    user:localStorage.getItem('user')

})

}


geteventdata(): void {
  this.EventId = this.route.snapshot.paramMap.get("id");
  this.eventservice.getbyevent(this.EventId).subscribe(
    data => {
      this.eventdata = data;
      this.errorMessage = null; 
    },
    (error) => {
      console.error('Error fetching event details:', error);
      this.eventdata = null;
      if (error.status === 404 && error.error?.message === "Data not found") {
        this.errorMessage = "Your added Event is currently under review and marked as pending. Our team will process and review it shortly before it becomes visible..";
      }
       else if (error.error?.message === 'An error occurred.') {
        this.errorMessage =
          "Your added Event program is currently under review and marked as pending. Our team will process and review it shortly before it becomes visible.";
      } else {
        this.errorMessage = error.error?.message || "Please Login to View Details.";
      }
    }
  );
}


// onSubmit() {

//   const commentdata  = this.commentform.value;

//   this.commonservice.addcomment(commentdata).subscribe(
//     response => {

//       this.geteventdata();
//       this.commentform.reset();

//       // Clear the comment text box or any other UI updates
//       this.commentText = '';
//     },
//     error => {
//       console.error('Error posting comment:', error);
//       // Handle error as needed
//     }
//   );
// }/



onSubmit() {
  const ismemberin = localStorage.getItem("is_member") === "true";
  const commentdata  = this.commentform.value;
if(ismemberin){
const comment = {
  body: commentdata.body,
  event: this.route.snapshot.paramMap.get("id"),
  user:localStorage.getItem('user')
};
  this.commonservice.addcomment(comment).subscribe(
    response => {
      this.geteventdata();
      this.commentform.reset();
      console.log(response,"11111111111111")
      // Clear the comment text box or any other UI updates
      // this.commentText = '';
    },
    error => {
      console.error('Error posting comment:', error);
      // Handle error as needed
    }
  );
}else {
  this.openmemberDialog();
}
}

openmemberDialog(): void {
  console.log('sssssssssss');
  const dialogRef = this.dialog.open(MemberProfileComponent, {
    data: { displayName: 'signup' },
    autoFocus: false,
    backdropClass: 'dialog-backdrop',
  });
  dialogRef.afterClosed().subscribe(() => {
    // Handle after dialog close actions here
  });
}


handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/images/noImageDataImage.jpg';
}

openMap(url: string): void {
  window.open(url, '_blank');
}



// sharegetbytemple(temple: any) {
//   if (!temple || !temple._id) {
//     console.error('Invalid temple data provided.');
//     return;
//   }

//   const shareUrl = `${window.location.origin}/getbyevents/${temple._id}`;
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


  sharegetbytemple(temple: any) {
  if (!temple || !temple._id) {
    console.error('Invalid temple data provided.');
    return;
  }

  // Create the URL (plain text)
  const shareUrl = `${window.location.origin}/getbyevents/${temple._id}`;

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

