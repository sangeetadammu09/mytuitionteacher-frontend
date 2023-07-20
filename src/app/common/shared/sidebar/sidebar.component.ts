import { Component, OnInit } from '@angular/core';
import { AdminList } from 'src/assets/menus/admin';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  public menuItems: any;

  constructor() { }

  ngOnInit(): void {
    this.getMenuList();
  }

  getMenuList() {
    // this.menuItems =  MenuList.data;
    this.menuItems =  AdminList.data;
    
}


}
