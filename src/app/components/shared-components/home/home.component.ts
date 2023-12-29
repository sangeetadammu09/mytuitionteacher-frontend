import { Component, OnInit } from '@angular/core';
import { ParentReview } from '../../../../app/shared/mockdata/parentreview';
import { HomeSlide } from '../../../../app/shared/mockdata/homecarousel';
// import * as $ from 'jquery';

declare var $: any;
var owl = $('.owl-carousel');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }
  slides = HomeSlide;
  reviewCarousel : any[]=ParentReview;

  ngOnInit(): void {}

  ngAfterViewInit(){
  //   $(document).ready(function() {
  //     setTimeout(function(){
      
  //     },
  //     2000);
  // });
  $('.owl-carousel').owlCarousel({
    loop:true,
    items:5,
    margin:10,
    nav:true,
    dots:false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
    }) 
   
    $('.play').on('click',function(){
      owl.trigger('play.owl.autoplay',[2000])
    })
    $('.stop').on('click',function(){
      owl.trigger('stop.owl.autoplay')
    })
  }


}
