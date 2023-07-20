import { Component, OnInit, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { MasterService } from 'src/app/shared-service/master.service';


@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menustatus: boolean = false;

  tab = false;

    private listTitles!: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton:any;
    private sidebarVisible: boolean;
    userName: string;
    userRole: string;
    countlist : any;

    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button:any;

    constructor(location:Location, private renderer : Renderer2, private element : ElementRef,
       private router: Router, private masterService: MasterService) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

        this.masterService.currentuserDetails.subscribe((user:any) => {
          this.userName = user.name;
          this.userRole = user.role;
        })


    }

    ngOnInit(){
     
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });

       if(window.innerWidth<=780){
        this.tab = true;
   }

  
    }

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.substring(1);
      console.log(titlee,'title1')
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
    
      }
     this.listTitles.forEach((title:any) => {
        title.submenuList.forEach((item:any) => {
               if(item.url === titlee){
               console.log(item.title);
             // return this.listTitles[item].title;
          }
        })
     })
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }


      logoutUser(){
        console.log('user logged out')
        localStorage.clear();
        this.router.navigate(['/'])
      }

      sideNavToggle()
      {
        this.menustatus= !this.menustatus;
        this.sideNavToggled.emit(this.menustatus);
      }

      

}
