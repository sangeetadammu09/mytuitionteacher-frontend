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
    Feedback:{
      create : "feedback/add", 
      list: "feedback/listoffeedbacks",
      listbyparentid : "feedback/listoffeedbacksbyparentid/",
      update : "feedback/update",
      delete : "feedback/delete",
    },
    SubAdmin:{
      register : "subadmin/form", 
      list: "subadmin/listofsubAdmin",
      update : "subadmin/update",
      delete : "subadmin/delete",
    },
    Parent:{
      form : "parent/form",
      listofteachingjobs : "parent/listoftuitions",
      listoftuitionsById : "parent/listoftuitionsbyid/",
      parentbyid : "parent/",
      search : "parent/search",
      checkphoneemail : "parent/check/",
      parentupdate : "parent/update/",
      parentdelete : "parent/delete"
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