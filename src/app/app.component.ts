import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  submitDatas: FormGroup;


  ngOnInit() {
      this.submitDatas = new FormGroup({
        'projectname' : new FormControl(null,[Validators.required, this.forbiddenProjectName], this.asyncInvalidProjectName),
        'email' : new FormControl(null,[Validators.required, Validators.email]),
        'projectStatus' : new FormControl('critical')
      });
  }

  forbiddenProjectName(control: FormControl): {[s: string]: boolean}{
    if(control.value === 'Test'){
      return{"projectForbidden": true};
    }
    return null;
  }
  onSubmit(){
    console.log(this.submitDatas.value)
  }
  asyncInvalidProjectName(control: FormControl) : Promise<any> | Observable <any>{
    const promise = new Promise((resolve, reject) =>{
      setTimeout(() => {
        if(control.value === 'Testproject'){
          resolve({"projectForbidden": true});

        }
        else{
          resolve(null);
        }
      }, 2000);
    })
    return promise;
  }

}
