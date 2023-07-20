import { Component, OnInit } from '@angular/core';

declare let $: any;
var owl = $('.owl-carousel');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  slides: any =[];


  ngOnInit(): void {
    this.slides = [ {
      id: 0,
      src: '/assets/images/hmt-image1.png',
      title: 'Are you finding difficulty with maths and science? Our expert tutors are here to help you.',
      subtitle: 'Before I began to search for the tutor for my son, I had no clue that Helpmetutors existed.  At last founded an experienced teacher and am satisfied. Helpmetutors is decent place to get assistance. Keep doing awesome. - Sumit(Student)'
    }, {
      id: 1,
      src: '/assets/images/hmt-image3.png',
      title: 'We understand that being a parent doesnt get  enough time to help your child with studies ,our private tutor will take care of his studies.',
      subtitle: 'My son has been associated with Helpmetutors for more than two years now. He finished grade 9th cbse under the guidance of the tutor provided. I am happy to have enrolled here.- Tanuja(parent)'
    },{
      id: 2,
      src: '/assets/images/hmt-image4.png',
      title: 'Earn additional income... if you are ready teach part time. We will help you out',
      subtitle: 'So far my involvement in Helpmetutors has been amazing! The client support staff was very affable and accommodating when I posted an inquiry about making my profile.- Aditi(tutor)'
    }]
  }

  ngAfterViewInit(){
    $('.owl-carousel').owlCarousel({
    loop:true,
    items:6,
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
