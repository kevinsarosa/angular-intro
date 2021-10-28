import { Injectable } from '@angular/core';
import { Todo } from '../model/interface';

const TODO_LIST = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos!:Todo[]
  private storage:Storage = sessionStorage;

  constructor() { }

  getAll():Todo[]{
    const todoValue:string = this.storage.getItem(TODO_LIST) as string

    try {
      const todos: Todo[] = todoValue ?JSON.parse(todoValue): [];

      this.todos = todos
      this.updateSessionStorage();
      return todos

    } catch (error) {
      console.log(error);
      
    }
    return []
  }

  private updateSessionStorage():void{
    this.storage.setItem(TODO_LIST, JSON.stringify(this.todos))
  }

  saveTodo(todo: Todo){
    try {
      if(!todo.id){
        todo.id = this.todos.length < 1 ? 1: this.todos[this.todos.length-1].id+1;
        this.todos.push(todo);
      }else{
        const findId = this.todos?.find((e)=>e.id == todo.id)
        const index = this.todos.indexOf(findId!)
        this.todos.splice(index,1,todo)
      }
      this.updateSessionStorage()
     
    } catch (error) {
      console.log(error);
      
    }
  }

  deleteTodo(todoId:number){
    const findId = this.todos?.find((e)=>e.id == todoId)

    if(findId){
      const index= this.todos?.indexOf(findId)
      this.todos?.splice(index!, 1)
      this.updateSessionStorage()
    }
  }

  checkedTodo(todo:Todo){

    // if(findId){
    //   findId.isDone = !findId.isDone
      
    // }
    this.todos.map((item)=>{
      if(item.id == todo.id){
        item.isDone = !item.isDone
        this.updateSessionStorage()
      }
    })
  }

  getTodoById(todoId: number): Todo| undefined{
    let todo;

    try {
      todo = this.todos.find((item)=> item.id == todoId);
      return todo;
    } catch (error) {
      
    }

    return todo
  }


}