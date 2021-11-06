import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() label:string;
  @Input() type='text';

  //dependencies injected locally and get the ngControl from somewhere else component
  constructor(@Self() public ngControl:NgControl) { //NgControl -> is a base class that all formControl extends
    this.ngControl.valueAccessor=this;
  }

  //password show/hidden icon
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }
  
  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }
  

  

}