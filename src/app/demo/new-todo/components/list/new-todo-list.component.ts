import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Todo } from '../../model/interface';
import { NewTodoService } from '../../services/new-todo.service';
import {delay, switchMap} from 'rxjs/operators'
import { Observer } from 'rxjs';
import { AlertMessage } from 'src/app/shared/models/alert-message-interface';

@Component({
  selector: 'app-new-todo-list',
  templateUrl: './new-todo-list.component.html',
  styleUrls: ['./new-todo-list.component.scss']
})
export class NewTodoListComponent implements OnInit, OnChanges {

  todos: Todo[] = []
  loading: boolean = false
  subscriber!: Observer<any>;
  message!: AlertMessage
  constructor(private readonly todoService: NewTodoService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.todoService.getAll()
  }

  ngOnInit(): void {
    this.getAll();

    this.todoService.listUpdated()
    .subscribe((updated:boolean)=>{
      if(updated){
        this.getAll()
      }
    })
    
    /* .subscribe((todos)=>{
      this.todos =todos
    }, (error)=>{
      console.log(error);
    },()=>{
      this.loading = false
    }) */
  }

  getAll():void{
    this.subscriber = {
      next:(todos) =>{
        this.todos = todos
      },error: console.error,
      complete:()=>{this.loading = false}
    }

    this.loading = true;
    this.todoService.getAll().subscribe(this.subscriber)
  }

  onCheckTodo(todo:Todo):void{
    this.subscriber ={
      next:(todo:Todo)=>{
        console.log('todo updated');
      },
      error:console.error,
      complete:()=>{
        this.loading = false
      }
      
    }
    todo.isDone = !todo.isDone;
    this.loading = true
    this.todoService.save(todo)
    .pipe(
      delay(2000)
    ).subscribe(this.subscriber)
  };


  onDeleteTodo(id:number):void{
    this.subscriber = {
      next:(todos:Todo[])=>{
        console.log('todo deleted');
        this.todos = todos
      },
      error:console.error,
      complete:()=>{this.loading = false}
    }

    this.loading = true;
    this.todoService.delete(id)
    .pipe(
      delay(1500),
      switchMap(()=> this.todoService.getAll())
    )
    .subscribe(this.subscriber);
  };


  // onSelectTodo(id: number):void{

  //   this.subscriber = {
  //     next:(todos:Todo[])=>{

  //     },
  //     error:console.error,
  //     complete:()=>{this.loading = false}
  //   }

  //   this.loading = true;
  //   this.todoService.getTodoById(id)
  //   .pipe(
  //     delay(1500)
  //   )
  //   .subscribe(this.subscriber);


  // //  this.todoService.listUpdated()
  // //   .subscribe((updated:boolean)=>{
  // //     if(updated){
  // //       this.getAll()
  // //     }
  // //   })
    
  // }

}
