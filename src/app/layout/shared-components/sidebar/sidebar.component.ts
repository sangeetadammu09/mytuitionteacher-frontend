import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../../app/shared/services/master.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    menuList = JSON.parse(localStorage.getItem("menu"));
    staticMenuList = [];
    adminMenuList: any[] = [];

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router, private toastrService: ToastrService,
        private masterService: MasterService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
       // this.getMenusAfterLogin();
    }

    getMenusAfterLogin() {
        let temp = this.masterService.getMenu();
        this.menuList = temp.data;
        console.log(this.menuList)
            if (this.menuList.length > 0) {
                this.menuList.forEach((e: any) => {
                    this.staticMenuList.forEach((f: any) => {
                        if (e.id == f.id) {
                            this.adminMenuList.push(f)
                        }
                    })
                });
            } else {
                this.toastrService.error("No menus Found")
            }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }

    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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
    }
}
