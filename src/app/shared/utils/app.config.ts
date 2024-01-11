import { NgModule } from '@angular/core';


export const APP_DI_CONFIG: any = {
  // For api calls
  parentDomain: 'http://localhost:8080/',
  endPoints: {
    Common:{
      login : "login",
      register : "register", 
      userbyid : "user/",
      update : "user/update/",
    },
    SubAdmin:{
      login : "subadmin/login",
      register : "subadmin/form", 
      listofsubAdmin: "subadmin/listofsubAdmin",
      update : "subadmin/update",
      delete : "subadmin/delete",
    },
    Parent:{
      login : "parent/login",
      register : "parent/register",
      form : "parent/form",
      listofteachingjobs : "parent/listofteachingjobsbypage",
      parentbyid : "parent/",
      checkphoneemail : "parent/check/",
      parentupdate : "parent/update",
      parentdelete : "parent/delete"
    },
    Teacher:{
        login : "teacher/login",
        register : "teacher/register",
        form : "teacher/form",
        listofteachersbypage : "teacher/listofteachersbypage",
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