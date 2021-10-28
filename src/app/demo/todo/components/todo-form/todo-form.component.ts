import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Todo } from '../../model/interface';
import { TodoService } from '../../services/todo.service';
import {map} from 'rxjs/operators'
import { AlertMessage } from 'src/app/shared/models/alert-message-interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    // this.setFormValue()
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map((params: Params)=>{
        return params.id ? +params.id :null;
      })
    ).subscribe((id)=>{
      const todo = this.todoService.getTodoById(id as number)
      this.todo = todo
      this.setFormValue()
    })
  }

  constructor(private readonly todoService: TodoService, private readonly activatedRoute: ActivatedRoute, private readonly router:Router) {}
  todo?: Todo;
  message?: AlertMessage;
  // @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>();

  todoForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    isDone: new FormControl(false),
    subTodos: new FormArray([]),
  });

 
  

  onSubmitTodo(): void {
    const todo: Todo = this.todoForm.value;
    // this.todoChange.emit(this.todoForm.value);
    
    this.todoService.saveTodo(todo);
    this.message = {
      status:'success',
      text: `Success adding ${todo.name}`
    }
    this.todoForm.reset();
    setTimeout(()=>{
      this.message = undefined
    },2000)
    this.router.navigateByUrl('/demo/todos')
    // this.todoForm.get('isDone')?.setValue(false);
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

    // control.valid;
    // control.invalid;
    // control.dirty;
    // control.touched;

    // if(control && control.touched && control.invalid){
    //   return 'is-invalid';
    // }else if(control && control.valid){
    //   return 'is-valid'
    // }else {
    //   return '';
    // }
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

  getSubTodos(): any {
    const subTodos: FormArray = this.todoForm.get('subTodos') as FormArray;

    return subTodos.controls;
  }

  addTodo(): void {
    const subs: FormArray = this.todoForm.get('subTodos') as FormArray;

    subs.push(
      new FormGroup({
        id: new FormControl(),
        name: new FormControl(null, [
          Validators.minLength(4),
          Validators.required,
        ]),
        isDone: new FormControl(false),
      })
    );
  }
  setFormValue(){
    if (this.todo) {
      this.todoForm?.setValue(this.todo);
    }
  }
}
