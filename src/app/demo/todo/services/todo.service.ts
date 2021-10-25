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
      const todos: Todo[] = todoValue ?JSON.parse(todoValue): []
      return(this.todos = todos)
    } catch (error) {
      console.log(error);
      
    }
    return []
  }
}
