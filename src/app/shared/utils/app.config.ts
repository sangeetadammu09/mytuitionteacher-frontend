import { NgModule } from '@angular/core';


export const APP_DI_CONFIG: any = {
  // For api calls
  parentDomain: 'http://localhost:8080/',
  endPoints: {
    Admin:{
      login : "admin/login",
      register : "admin/register", 
      adminbyid : "admin/",
      update : "admin/update/",
      delete : "admin/delete/",
      search : "admin/search",
    },
    Common:{
      login : "login",
      register : "register", 
      userbyid : "user/",
      update : "user/update/",
      search : "user/search",
    },
    Feedback:{
      create : "feedback/add", 
      list: "feedback/listoffeedbacks",
      listbyparentid : "feedback/listoffeedbacksbyparentid/",
      update : "feedback/update",
      delete : "feedback/delete",
    },
    Parent:{
      form : "parent/form",
      listoftuitions : "parent/listoftuitions",
      listoftuitionsById : "parent/listoftuitionsbyid/",
      parentbyid : "parent/",
      search : "parent/search",
      checkphoneemail : "parent/check/",
      parentupdate : "parent/update/",
      parentdelete : "parent/delete/"
    },
    Teacher:{
        login : "teacher/login",
        register : "teacher/register",
        form : "teacher/form",
        listofteachers : "teacher/listofteachers",
        teacherbyid : "teacher/",
        checkphoneemail : "teacher/check/",
        teacherupdate : "teacher/update",
        teacherdelete : "teacher/delete",
        jobapply : "teacher/applyjob",
      },
    Mail:{
        contact : "mail/contact",
        parent : "mail/parent",
        teacher : "mail/teacher",
        appliedteacher : "mail/appliedteacher",
    },
    Contact: {
        form : "contact/form"
    }


    
  }
  
};

@NgModule({
})
export class AppConfigModules {}