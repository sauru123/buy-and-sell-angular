import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  listings: Listing[] = [];
  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.listingService.getListings().subscribe(listings => this.listings = listings);
  }

}
