import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-new-listing-page',
  templateUrl: './new-listing-page.component.html',
  styleUrls: ['./new-listing-page.component.css']
})
export class NewListingPageComponent implements OnInit {

  constructor(
    private listinsService: ListingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit({name,description,price}:any):void{
    this.listinsService.createListing(name,description,price)
    .subscribe(()=>{
      this.router.navigateByUrl('/my-listings');
    })
    
    
  }
}
