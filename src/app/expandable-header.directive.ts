import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import {Observable, fromEvent } from 'rxjs';
import {DomController} from '@ionic/angular'; // Important for managing dom events

@Directive({
  selector: '[vanishOnScroll]'
})
export class ExpandableHeaderDirective implements OnInit{

  @Input('vanishOnScroll') scrollArea;

  //To detect what position the header is at so we dont trigger too many events into the DOM
  private hidden: boolean = false;
  private triggerDistance: number = 20;

  constructor(private element: ElementRef, private renderer: Renderer2, private domCtrl: DomController) { }

  ngOnInit(){
    console.log("This scroll area", this.scrollArea);

    //Wait untill 'ion-scroll' element is added to 'ion-content'

    this.initStyles();

    this.scrollArea.ionScroll.subscribe((scrollEvent: CustomEvent) => {

      let delta = scrollEvent.detail.deltaY;
      console.log("Delta", delta);
      if(scrollEvent.detail.currentY === 0 && this.hidden){
        this.show();
      }else if(!this.hidden && delta > this.triggerDistance){
        this.hide();
      }else if(this.hidden && delta < -this.triggerDistance){
        this.show();
      }
    });
  }

  initStyles(){
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.element.nativeElement, 'transition', '0.3s linear');
    });
  }

  hide(){
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.element.nativeElement, 'min-height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.element.nativeElement, 'padding', '0');
    });

    this.hidden = true;
  }

  show(){
    this.renderer.removeStyle(this.element.nativeElement, 'min-height');
    this.renderer.setStyle(this.element.nativeElement, 'height', '55px');
    this.renderer.removeStyle(this.element.nativeElement, 'opacity');
    this.renderer.removeStyle(this.element.nativeElement, 'padding');

    this.hidden = false;
  }

}
