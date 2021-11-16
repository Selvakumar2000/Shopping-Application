import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/_models/login';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hide: boolean = true; //password show/hidden icon
  reghide: boolean = true;
  model: Login = new Login();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(public modalService: BsModalService, public fb: FormBuilder,
              private accountService: AccountService, private toastr: ToastrService,
              private router: Router) {

      this.bsConfig =
      {
        containerClass: 'theme-default',
        dateInputFormat: 'DD MMMM YYYY'    
      }
  }

  ngOnInit(): void {
    this.initializeForm();    
  }

  myFunction()
  {
    this.hide = !this.hide;
  }

  regEye()
  {
    this.reghide = !this.reghide;
  }
  
  initializeForm()
  {
    this.registerForm = this.fb.group(
    {
        userRole: ['Buyer', Validators.required],
        fullname: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        gender:['Male', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        username: ['', Validators.required],
        password:['', [ Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(12),
                        Validators.pattern(/(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,13}/),
                      ]
                 ],
        confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  //check password and confirmpassword fields are match
  matchValues(matchTo:string):ValidatorFn
  { //all form control are derived from abstract control
    return (control:AbstractControl) =>
    {
      return control?.value == control?.parent?.controls[matchTo].value ? 
                            null : {misMatching: true};
    }
  }

  register()
  {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.modalRef.hide();
      this.toastr.success('Registeration Successful');
      this.router.navigateByUrl('/products');
    });
  }

  login()
  {
    this.accountService.login(this.model).subscribe(response => {
      this.toastr.success('Logged in Successfully');
      this.router.navigateByUrl('/products');
    });
  }  

  loginTrouble()
  {

  }

  //filter modal
  config: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-lg' 
  };

  modalRef: BsModalRef;
  showSignInModal(signInModal: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(signInModal, this.config);
  }

}