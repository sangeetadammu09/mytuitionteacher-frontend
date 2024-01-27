import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    user = JSON.parse(localStorage.getItem('user'));
    greetingtxt = '';
    greetingicon = '';

    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.greetingMessage();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    greetingMessage(){
        var today = new Date();
        var hourNow = today.getHours();

        if (hourNow < 12){
        this.greetingtxt = "Good Morning";
        this.greetingicon = "fa fa-coffee";
        }
        else if (hourNow < 20){
        this.greetingtxt = 'Good afternoon!';
        this.greetingicon = "fa fa-sun-o";
        }
        else if (hourNow < 24){
        this.greetingtxt = "Good evening"
        this.greetingicon = "fa fa-moon-o";
        }
        else {
        this.greetingtxt = "Welcome";
        }

        console.log(this.greetingtxt);

            }

        
}
