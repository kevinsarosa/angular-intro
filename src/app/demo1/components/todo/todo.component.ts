import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  ngOnInit(): void {
    const sessionTodos: string = sessionStorage.getItem('todos') as string;
    console.log('session: ', sessionTodos);

    if (sessionTodos) {
      this.todos = JSON.parse(sessionTodos);
    } else {
      this.todos = [
        {
          id: 1,
          isDone: false,
          name: 'Makan',
        },
        {
          id: 2,
          isDone: false,
          name: 'Minum',
        },
      ];
      sessionStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  onCheckedTodo(todo: Todo) {
    console.log(todo);
    sessionStorage.setItem('todos', JSON.stringify(this.todos))
  }

  onViewTodo(text: string) {
    console.log(text);
  }

  pageTitle: string = 'todo Component';

  person = ['Budi', 'Tono'];

  greeting() {
    return this.pageTitle;
  }

  person2 = [
    {
      name: 'Budi',
      age: '20',
      skill: [
        {
          skillname: 'Git',
          level: 'Advance',
        },
        {
          skillname: 'Angular',
          level: 'Advance',
        },
      ],
    },
    {
      name: 'Ani',
      age: 19,
      skill: [
        {
          skillname: 'Git',
          level: 'Advance',
        },
        {
          skillname: 'Angular',
          level: 'Advance',
        },
      ],
    },
  ];
}
