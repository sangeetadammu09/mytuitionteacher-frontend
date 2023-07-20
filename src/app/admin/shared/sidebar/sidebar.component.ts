import { Component, Input, OnInit } from '@angular/core';
import { AdminList } from 'src/assets/menus/admin';

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    @Input() sidenavstatus : boolean = false;
    public menuItems: any;

    // sidenav : boolean = false;
    
    ngOnInit() {
       // this.menuItems = ROUTES.filter(menuItem => menuItem);
       this.getMenuList();

    
    }

    getMenuList() {
        // this.menuItems =  MenuList.data;
        this.menuItems =  AdminList.data;
        
    }


    

    
}
