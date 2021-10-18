import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pageTitle:string = 'todo Component';

  person = ['Budi', 'Tono'];

  greeting(){
    return this.pageTitle
  }


  person2=[{
    name: 'Budi',
    age: '20'
  },
  {
    name: 'Ani',
    age: 19
  }

]

}
