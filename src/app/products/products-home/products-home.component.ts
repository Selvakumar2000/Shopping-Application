import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit{

  user: any;
  userRole: string;
  userphotoUrl: string;

  constructor(private accountService: AccountService, private router: Router,
              private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
      this.userRole = this.user.userRole;
    }); 
  }

  ngOnInit(): void {
    this.accountService.CheckUniqueID(this.user.uniqueId).subscribe(response => {
      if(response == 0)
      {
        this.toastr.error(this.user.username+ ', your session is deactivated!');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/');
      }
    });
  }

  dashboard: string = "Dashboard";
  paneluser: string = "User";
  orders: string = "Orders";
  productsUp: string = "Products Uploaded";
  cart: string = "Cart";
  transactions: string = "Transactions";
  gifts: string = "Gifts & Vouchers";
  help: string = "Help";
  hasvalue: boolean =false;

  showPanel()
  {
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
  }

  logout(username: string)
  {
    this.accountService.logout(username);
  }
}