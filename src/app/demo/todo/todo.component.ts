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
    console.log(sessionTodos);
    

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
    this.todo = todo
    console.log(this.todo)
  }

  onToggleTodo():void{
    sessionStorage.setItem('todos', JSON.stringify(this.todos))
    console.log(this.todos);
  }

  onSaveTodo(todo:Todo):void{
    const found = this.todos?.find((e)=>e.id == todo.id)

    if(!todo.id){
      todo.id =this.todos!.length+1;
      this.todos?.push(todo)
      sessionStorage.setItem('todos', JSON.stringify(this.todos))
    }
    else if(found){
      todo.id = this.todos!.length+1
      found.name = todo.name
      sessionStorage.setItem('todos', JSON.stringify(this.todos))
    }
    else{
      console.log('tidak ada data')
    }
  }


}
