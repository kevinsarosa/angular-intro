import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {delay, map, switchMap} from 'rxjs/operators'
import { EMPTY, Observer } from 'rxjs';
import { AlertMessage } from 'src/app/shared/models/alert-message-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTodoService } from '../../services/new-todo.service';
import { Todo } from '../../model/interface';

@Component({
  selector: 'app-new-todo-form',
  templateUrl: './new-todo-form.component.html',
  styleUrls: ['./new-todo-form.component.scss']
})
export class NewTodoFormComponent implements OnInit, OnChanges {

  message? :AlertMessage;
  loading = false;
  todoForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    isDone: new FormControl(false),
    photo: new FormControl()
  });

  photo?:File;


  constructor(private readonly activatedRoute:ActivatedRoute, private readonly todoService:NewTodoService, private readonly router:Router) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.getParam()   
  }


  setFormValue(todo:Todo):void{
    this.todoForm.get('id')?.setValue(todo.id);
    this.todoForm.get('name')?.setValue(todo.name);
    this.todoForm.get('isDone')?.setValue(todo.isDone);
    this.todoForm.get('photo')?.setValue(todo.photo)

  //   // if(Array.isArray(todo.subTodos)&& todo.subTodos.length>0){
  //   //   todo.subTodos.forEach((subTodo)=>{
  //   //     this.addTodo(subTodo);
  //   //   })
  //   // }
    
  }


  handleFileUpload(event: any): void{
    const files: FileList = event.target.files;
    console.log(event.target.files);

    if(files){
      this.photo = files.item(0) as File;
      this.todoForm.get('photo')?.setValue(this.photo)
    }
    
  }

  getParam(){
    this.activatedRoute.params.pipe(
      map((params)=>  params.id),
      switchMap((id:string)=>{if(!id) return EMPTY;
      else return this.todoService.getTodoById(+id)})      
    ).subscribe((todo:Todo)=>{
      if(todo){
        this.setFormValue(todo)
      }else{
        this.onReset();
      }
    }, console.error,
    ()=>this.loading = false )
  }
  onSubmitTodo(): void {
    // const todo: Todo = this.todoForm.value;
    // // this.todoChange.emit(this.todoForm.value);
    
    // this.todoService.save(todo);
    // this.message = {
    //   status:'success',
    //   text: `Success adding ${todo.name}`
    // }
    // this.todoForm.reset();
    // setTimeout(()=>{
    //   this.message = undefined
    // },2000)
    // this.router.navigateByUrl('/demo/todos')
    // // this.todoForm.get('isDone')?.setValue(false);

    
    const todo: Todo = this.todoForm.value;
    this.todoService
      .save(todo, this.photo)
      .subscribe(
        () => {
          this.router.navigateByUrl('/demo/new-todos')
          console.log('todo berhasil ditambah');
        },
        (error: any) => {
          console.error(error.message);
        },
        () => {
          console.log('selesai');
        }
      );

    console.log(todo);
    this.onReset()
    this.router.navigateByUrl('/demo/new-todos');

    this.message = {
      status: 'success',
      text: `Todo ${todo.name} berhasil ditambahkan`,
    };
    setTimeout(() => {
      this.message = undefined;
    }, 2000);
  }

  isValid(): boolean {
    return !this.todoForm.get('name')?.value;
  }

  isFieldValid(
    fieldName: string,
    parent?: AbstractControl
  ): { [key: string]: boolean } {
    let control: AbstractControl = this.todoForm.get(
      fieldName
    ) as AbstractControl;

    const classes = {
      'is-invalid': false,
      'is-valid': false,
    };
    if (parent) {
      control = parent;
    }

   
    if (control && control.touched && control.invalid) {
      classes['is-invalid'] = true;
    } else if (control && control.valid) {
      classes['is-valid'] = true;
    }

    return classes;
  }

  displayError(fieldName: string): string {
    const control: AbstractControl = this.todoForm.get(
      fieldName
    ) as AbstractControl;
    const messages: any = {
      required: 'Field harus di isi',
      minlength: 'Field minimal harus lebih panjang dari {minlength}',
    };

    if (control && control.errors) {
      const error = Object.values(control.errors).pop();
      const key: string = Object.keys(control.errors).pop() as string;
      let message = messages[key];

      console.log(message);

      if (key === 'minlength') {
        console.log(error);
        message = message.replace('{minlength}', error.requiredLength);
      }
      return message;
    } else {
      return '';
    }
  }

  getControl(name: string): AbstractControl {
    return this.todoForm.get(name) as AbstractControl;
  }

  // getSubTodos(): any {
  //   const subTodos: FormArray = this.todoForm.get('subTodos') as FormArray;

  //   return subTodos.controls;
  // } 

  addTodo(todo?: Todo): void {
    const subs: FormArray = this.todoForm.get('subTodos') as FormArray;

    subs.push(
      new FormGroup({
        id: new FormControl(todo ? todo.id : null),
        name: new FormControl(todo ? todo.name :null, [
          Validators.minLength(4),
          Validators.required,
        ]),
        isDone: new FormControl(todo? todo.isDone:false),
      })
    );
  }

  onReset():void{
    this.todoForm.reset();
    this.todoForm.get('isDone')?.setValue(false)
  }
  // setFormValue(){
  //   if (this.todo) {
  //     this.todoForm?.setValue(this.todo);
  //   }
  // }


}
