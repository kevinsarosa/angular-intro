import { Component, DoCheck, OnInit } from '@angular/core';
import { printLog } from 'src/environments/environment';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, DoCheck {

  title:string = 'Parent Component'
  isChild: boolean = false
  haloText: string = `Hello from ${this.title}`
  constructor() { 
    printLog(`Constructor ${this.title}`)
  }
  ngDoCheck(): void {
    printLog(`ngOnDoCheck ${this.title}`)
  }

  ngOnInit(): void {
    printLog(`ngOnInit ${this.title}`)
  }

  toggleChild(){
    this.isChild = !this.isChild
  }

}
