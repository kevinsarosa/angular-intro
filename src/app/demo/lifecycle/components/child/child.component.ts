import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { printLog } from 'src/environments/environment';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck, OnDestroy {

  title:string = 'Child Component'
  @Input() haloText: string = ''
  interval: any;
  count: number = 0;

  constructor() { 
    printLog(`Constructor ${this.title}`)
  }
  ngOnDestroy(): void {
    printLog(`ngOnDestroy ${this.title}`)
    clearInterval(this.interval )
  }
  ngDoCheck(): void {
    printLog(`ngDoCheck ${this.title}`)
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.haloText = `Hello from ${this.title}`
    printLog(`ngOnChanges ${this.title}`)
  }

  ngOnInit(): void {
    printLog(`ngOnInit ${this.title}`)
    // this.interval = setInterval(()=>{
    //   this.count++
    // },1000)
  }

  toggleChild(){
  }


}
