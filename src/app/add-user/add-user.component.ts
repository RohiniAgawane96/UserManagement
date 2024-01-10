import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private fb:FormBuilder, 
    private userservice:UserService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

userForm = this.fb.group({
  name:["",Validators.required,Validators.min(5)],
  email:["",Validators.required,Validators.email,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
  role:["",Validators.required]
})

addUser(){
this.userservice.addUser(this.userForm.value).subscribe(
  response => {
    console.log(response);
    this.userForm.reset();
  }
);
this.router.navigate(['/user']);
}

cancel(){
this.userForm.reset();
this.router.navigate(['/user']);
}

}
