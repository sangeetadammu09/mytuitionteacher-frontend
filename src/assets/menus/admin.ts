export const AdminList = {

    statusCode: 200,

    data: [
        {
            id: 0,
            parentMenu: 'Teachers',
            icon : 'fa-chalkboard',
            isActive: true,
            url: 'teachers',
            submenuList: [
                {
                    id: 0,
                    menu: 'Teachers-List',
                    url: 'listofteachers',
                    isActive: true, 
                },    
            ]
          },
          {
            id: 0,
            parentMenu: 'Parents',
            icon : 'fa-user',
            isActive: true,
            url: 'parents',
            submenuList: [
                {
                    id: 0,
                    menu: 'List of Tuitions',
                    url: 'listoftuitions',
                    isActive: true, 
                }, 
            ]
          },
          {
            id: 2,
            parentMenu: 'Sub-Admins',
            icon : 'fa-user',
            isActive: true,
            url: 'subadmins',
            submenuList: [
                {
                    id: 0,
                    menu: 'List of SubAdmins',
                    url: 'listofsubadmins',
                    isActive: true, 
                }, 
            ]
          }

        //   {
        //     id: 2,
        //     parentMenu: 'Products',
        //     icon : 'fa-list',
        //     isActive: true, 
        //     url: 'products',
        //     submenuList: []
        // },

    ],
    message: null,
};