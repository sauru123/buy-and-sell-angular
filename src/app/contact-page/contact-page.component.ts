import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { fakeListings } from '../fake-data';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  email: string = '';
  message: string = '';
  listing: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id)
    .subscribe(listing => {
      this.listing = listing;
      this.message = `Hi Intrested in your ${this.listing.name.toLowerCase()}!`
     // this.isLoading = false;
    });
    
    //this.listing = fakeListings.find(listing => listing.id === id);
    
  }

  sendMessage(): void {
    alert('Your Message has been sent!');
    this.router.navigateByUrl('/listings');
  }

}
