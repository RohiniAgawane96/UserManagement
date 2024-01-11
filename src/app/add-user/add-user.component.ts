import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private fb:FormBuilder, 
    private userservice:UserService,
    private router:Router,
    private _dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.userForm.patchValue(this.data);
  }

userForm = this.fb.group({
  name:["",Validators.required,Validators.min(5)],
  email:["",Validators.required,Validators.email,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
  role:["",Validators.required]
})

addUser(){  
      this.userservice.addUser(this.userForm.value).subscribe({
        next: (val: any) => {
          // this._coreService.openSnackBar('Employee added successfully');
          // this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }



