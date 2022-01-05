import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @Input() sidebarstatus: boolean;
  user: any;

  constructor(private accountService: AccountService, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
    })
  }

  ngOnInit(): void {
    
  }

  gotoProducts(product: string)
  {
    if(this.user.userRole == 'Buyer')
    {
      this.router.navigate(['/products/display', product]);
    }

    if(this.user.userRole == 'Supplier')
    {
      this.router.navigate(['/products/upload', product]);
    }
    
  }

}