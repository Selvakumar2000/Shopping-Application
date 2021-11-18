import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit{

  user: User;
  userRole: string;

  constructor(private accountService: AccountService, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
      this.userRole = this.user.userRole;
    })
  }

  ngOnInit(): void {
    
  }

  dashboard: string = "Dashboard";
  paneluser: string = "User";
  orders: string = "Orders";
  productsUp: string = "Products Uploaded";
  cart: string = "Cart";
  transactions: string = "Transactions";
  gifts: string = "Gifts & Vouchers";
  help: string = "Help";
  feedback: string = "Feedback";
  position: string = "left"
  hasvalue: boolean =false;

  showPanel()
  {
    console.log('show');
    this.hasvalue = !this.hasvalue 

    if(this.hasvalue)
    {
      this.dashboard = "";
      this.userRole = "";
      this.paneluser = "";
      this.orders = "";
      this.productsUp = "";
      this.cart = "";
      this.transactions = "";
      this.gifts = "";
      this.help = "";
      this.feedback = "";
      this.position = "top";
    }
    else
    {
      this.dashboard = "Dashboard";
      this.paneluser = "User";
      this.orders = "Orders";
      this.productsUp = "Products Uploaded";
      this.cart = "Cart";
      this.transactions = "Transactions";
      this.gifts = "Gifts & Vouchers";
      this.help = "Help";
      this.feedback = "Feedback";
      this.userRole = this.user.userRole;
    }
  }

  dashboardPanel: boolean = true;
  showDashboard()
  {
    this.dashboardPanel = true;
    this.userPanel = false;
    this.ordersPanel = false;
    this.uploads = false;
    this.carts = false;
    this.transaction = false;
    this.giftsPanel = false;
    this.helps = false;
    this.feedbacks = false;
  }

  userPanel: boolean = false;
  showUserPanel()
  {
    this.userPanel = true;
    this.dashboardPanel = false;
    this.ordersPanel = false;
    this.uploads = false;
    this.carts = false;
    this.transaction = false;
    this.giftsPanel = false;
    this.helps = false;
    this.feedbacks = false;
  }

  ordersPanel: boolean = false;
  uploads: boolean = false;
  showOrdersProducts()
  {
    this.ordersPanel = true;
    this.userPanel = false;
    this.dashboardPanel = false;
    this.uploads = true;
    this.carts = false;
    this.transaction = false;
    this.giftsPanel = false;
    this.helps = false;
    this.feedbacks = false;
  }

  carts: boolean = false;
  transaction: boolean = false;
  showCartsTransactions()
  {
    this.carts = true;
    this.uploads = false;
    this.ordersPanel = false;
    this.userPanel = false;
    this.dashboardPanel = false;
    this.transaction = true;
    this.giftsPanel = false;
    this.helps = false;
    this.feedbacks = false;
  } 

  giftsPanel: boolean = false;
  showGifts()
  {
    this.giftsPanel = true;
    this.transaction = false;
    this.carts = false;
    this.uploads = false;
    this.ordersPanel = false;
    this.userPanel = false;
    this.dashboardPanel = false;
    this.helps = false;
    this.feedbacks = false;
  }
  
  helps: boolean = false;
  showHelp()
  {
    this.helps = true;
    this.giftsPanel = false;
    this.transaction = false;
    this.carts = false;
    this.uploads = false;
    this.ordersPanel = false;
    this.userPanel = false;
    this.dashboardPanel = false;
    this.feedbacks = false;
  }

  feedbacks: boolean = false;
  showFeedback()
  {
    this.feedbacks = true;
    this.helps = false;
    this.giftsPanel = false;
    this.transaction = false;
    this.carts = false;
    this.uploads = false;
    this.ordersPanel = false;
    this.userPanel = false;
    this.dashboardPanel = false;
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }
}
