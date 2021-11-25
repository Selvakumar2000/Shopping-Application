import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Products } from 'src/app/_models/products';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-display-goods',
  templateUrl: './display-goods.component.html',
  styleUrls: ['./display-goods.component.css']
})
export class DisplayGoodsComponent implements OnInit {

  @Input() products: Products[] = [];
  userRole: string;

  constructor(private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.userRole = response.userRole;
    })
  }

  ngOnInit(): void {
  }

}
