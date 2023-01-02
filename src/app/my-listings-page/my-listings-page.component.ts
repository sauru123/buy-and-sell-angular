import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingService } from '../listing.service';


@Component({
  selector: 'app-my-listings-page',
  templateUrl: './my-listings-page.component.html',
  styleUrls: ['./my-listings-page.component.css']
})
export class MyListingsPageComponent implements OnInit {
  listings: Listing[] = [];
  constructor(
    private listingsService: ListingService
  ) { }

  ngOnInit(): void {
    this.listingsService.getListingsForUser()
      .subscribe(listing => this.listings = listing);
  }

  onDeleteClicked(listingId: string): void {

    // this.listings = this.listings.filter(
    //   listing => listing.id !== listingId
    // )
    // console.log("delete",this.listings, listingId )
    this.listingsService.deleteListing(listingId)
      .subscribe(() => {
        this.listings = this.listings.filter(
          listing => listing.id != listingId
        )
      });
  }
}
