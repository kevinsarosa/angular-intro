import { Component, OnInit } from '@angular/core';
import { Todo } from './model/interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos?:Todo[]
  todo?:Todo

  ngOnInit(): void {
    const sessionTodos:string = sessionStorage.getItem('todos') as string;

    if(!sessionTodos){
      const todos:Todo[] = [
        {
          id:1,
          name:'Makan',
          isDone:true
        },
        {
          id:2,
          name:'Minum',
          isDone:false
        }
      ]

      sessionStorage.setItem('todos', JSON.stringify(todos))
      this.todos = todos
    }else{
      this.todos =JSON.parse(sessionTodos)
    }
  }

  

  onEditTodo(todo:Todo):void{

  }

  onToggleTodo(todo:Todo):void{

  }

  onSaveTodo(todo:Todo):void{
    
  }


}
