import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { UserService } from 'src/app/_core/Services/user.service'
import { Subscription } from 'rxjs';
import { User, UserTypes } from 'src/app/_core/Models/User';
import swal from "sweetalert2";

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit, OnDestroy {
  //props here
  subService: Subscription;
  userTypes: UserTypes[] = [];
  subServiceRegister: Subscription;
  subServiceUpdate: Subscription;
  @Input() userEditInput: User; 
  @Input() isEditing: boolean = false;
  @Input() displayInput: string; //default Variable
  displayModal: string;

  //sys methods
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserTypes();
    console.log('user need to edit modal', this.userEditInput)
    console.log('status of edit', this.isEditing)
    console.log('user need to edit modal', this.userEditInput)
  }
  ngOnDestroy() {
    if (this.subService) {
      this.subService.unsubscribe();
    }
    if (this.subServiceRegister) {
      this.subServiceRegister.unsubscribe();
    }
  }

  //other methods
  getUserTypes():void {
    this.subService = this.userService.getUserTypes().subscribe(
      (result: UserTypes[]) => {
        this.userTypes = result;
        console.log('usertype',this.userTypes)
      }, error => {
        console.log(error.error);
      })
  }
  register(frmUser:User) {
    //console.log("layuserregister", frmValue);
    // this.userModal = { ...frmUser, maNhom: 'GP01' };
    // console.log('form value',frmUser)
    // console.log('rgt new user admin', this.userModal)
    

     // this.subServiceRegister = this.userService.register(newUser).subscribe(
     //  (result: User) => {
     //    swal.fire({
     //      icon: "success",
     //      title: "Successful register new account",
     //      text: 'Wait for 4 us to navigate!',
     //      showConfirmButton: false,
     //      timer: 1000
     //    });
        
     //    //setTimeout(() => { location.reload(); }, 1200)
     //  }, error => {
     //    console.log(error.error);
     //    swal.fire("Thông báo", error.error, "error");
     // });
  }
  
  UpdateUser(frmUpdateValue:User) {
    console.log('status of edit in modal', this.isEditing)
    let userUpdate = { ...frmUpdateValue, maNhom: 'GP01' };
    console.log('user new info', userUpdate)
    this.subServiceUpdate = this.userService.updateUser(userUpdate).subscribe((result: any) => {
      swal.fire({
        icon: "success",
        title: 'Successfully update this user',
        //text: 'Wait for 4 us to navigate!',
        showConfirmButton: false,
        timer: 1000
      });
      console.log('thong bao sau khi sua',result)
    })

    this.isEditing = false; 
    
  }

  CloseModal() {
    this.displayModal = 'none';
  }
 


}