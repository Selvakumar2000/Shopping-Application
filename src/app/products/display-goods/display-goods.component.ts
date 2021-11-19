import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/_models/products';

@Component({
  selector: 'app-display-goods',
  templateUrl: './display-goods.component.html',
  styleUrls: ['./display-goods.component.css']
})
export class DisplayGoodsComponent implements OnInit {

  @Input() products: Products[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
