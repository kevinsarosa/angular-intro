import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { validationMessage } from 'src/environments/environment';

@Component({
  selector: 'app-validation-message, [validation-message]',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() label :any;
  @Input() control!: AbstractControl;
  @Input() fieldLabel!: string;

  messages:{[key:string]:string} = validationMessage
  ngOnInit(): void {
  }

  isFieldValid():boolean{
    return this.control.invalid && this.control.touched
  }

  displayErrors():string{

    let message = '';

    
    // const errors: ValidationErrors = this.control.errors as ValidationErrors;
    // const errorValues = Object.values(errors).pop();
    // const key:string = Object.keys(errors).pop() as string;

    // message = this.messages[key];

    // console.log(message);
    
    // return message ? message.replace(/%s/g, errorValues.requiredLength): '-';



    const errors = this.control.errors;

    for(let key in errors){
      const error: any[] = errors[key] ? Object.values(errors[key]):[];
      const params: any[] = [this.label].concat(error);
      const valMessage: string = this.messages[key];

      message+= `<p class= "m-0">${this.formatString(valMessage,params)}</p>`;
    }
    return message;
  }


  private formatString(text:string, parmas:any[]):string{
    let i = 0;

    return(text? text.replace(/%s/g, ()=> parmas.slice(i, ++i) as any): '')
  }

}
