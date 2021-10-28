import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../model/interface';

@Injectable()
export class NewTodoService {
  private readonly storage: Storage = sessionStorage;
  private todoSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<Todo[]> {
    /* return new Observable((observer: Observer<Todo[]>) => {
      const todoValue: string = this.storage.getItem('todos') as string;

      try {
        if (!todoValue) {
          const todos = this.createTodos();
          observer.next(todos);
        } else {
          observer.next(JSON.parse(todoValue));
        }
      } catch (error: any) {
        observer.error(error.message);
      }
      observer.complete();
    }); */
    

    return this.http.get<Todo[]>('/api/todos');
  }
  public getTodoById(id: number): Observable<Todo> {
    /* return new Observable((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem('todos') as string;

      try {
        const todos: Todo[] = JSON.parse(todoValue);

        observer.next(todos.find((todo) => todo.id === id) as Todo);
      } catch (error: any) {
        observer.error(error.message);
      }

      observer.complete();
    }); */


    return this.http.get<Todo>(`/api/todos/${id}`);
  }
  public save(todo: Todo, image?:File): Observable<any> {
    /* return new Observable((observer: Observer<Todo>) => {
      const todoValue = this.storage.getItem('todos') as string;

      try {
        const todos: Todo[] = JSON.parse(todoValue);
        if (!todo.id) {
          todo.id = todos.length < 1 ? 1 : todos[todos.length - 1].id + 1;
          todos.push(todo);
          this.storage.setItem('todos', JSON.stringify(todos));
          observer.next(todo);
          this.todoSubject.next(true);
        } else {
          const index: number = todos.findIndex((item) => item.id === todo.id);
          todos.splice(index, 1, todo);
          this.storage.setItem('todos', JSON.stringify(todos));
          observer.next(todo);
          this.todoSubject.next(true);
        }
      } catch (error: any) {
        observer.error(error.message);
      }
      observer.complete();
    }); */
    const formData:FormData = new FormData();
    formData.append('name', todo.name);
    formData.append('isDone', `${todo.isDone}`)

    if(image){
      formData.append('image', image, image.name)
     
    }
    if(todo.id){
      formData.append('id', `${todo.id}`)
      console.log(formData);
      
      return this.http.put<Todo>('/api/todos', formData).pipe(
        map(()=>this.todoSubject.next(true))
      )
    }else return this.http.post<Todo>('/api/todos', formData).pipe(
      map(()=>this.todoSubject.next(true))
    );
  }


  public delete(id: number): Observable<void> {
    // return new Observable((observer: Observer<void>) => {
    //   const todoValue = this.storage.getItem('todos') as string;

    //   try {
    //     const todos: Todo[] = JSON.parse(todoValue);
    //     const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    //     this.storage.setItem('todos', JSON.stringify(newTodos));
    //     observer.next();
    //     this.todoSubject.next(true);
    //   } catch (error: any) {
    //     observer.error(error.message);
    //   }
    //   observer.complete();
    // });
   

    return this.http.delete<void>(`/api/todos/${id}`);
  }

  // public checkTodo():Observable<void>{
  //   return new Observable((observer:Observer<void>)=>{
  //     const todoValue = this.storage.getItem('todos') as string;

  //     try {
  //       const todos: Todo[] = JSON.parse(todoValue)

  //     } catch (error) {

  //     }
  //   })
  // }

  private createTodos(): Todo[] {
    const todos: Todo[] = [];

    todos.push({
      id: 1,
      name: 'Makan',
      isDone: false,
    });

    todos.push({
      id: 2,
      name: 'Minum',
      isDone: false,
    });

    this.storage.setItem('todos', JSON.stringify(todos));
    return todos;
  }

  listUpdated(): Observable<boolean> {
    return this.todoSubject.asObservable();
  }
}
