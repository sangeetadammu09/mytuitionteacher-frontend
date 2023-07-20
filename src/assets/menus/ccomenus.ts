export const CcoMenuList = {

    statusCode: 200,

    data: [
        {
            id: 2,
            parentMenu: 'Call Center',
            icon : 'fa-phone',
            isActive: true, 
            url: 'callcenter',
            submenuList: []
        },
        {
            id: 1,
            parentMenu: 'Forms & Flow',
            icon : 'fa-pencil',
            isActive: true,
            url: 'formsandflow',
            submenuList: [
                {
                    id: 1,
                    menu: 'Complaint list',
                    url: 'complaint-list',
                    isActive: true, 
                },
            ]
        },
        {
            id: 8,
            parentMenu: 'FAQs',
            icon : 'fa-bell',
            isActive: true, 
            url: 'faqs',
            submenuList: [
                {
                    id: 0,
                    menu: 'FAQs List',
                    url: 'faqs-list',
                    isActive: true, 
                }, 
            ]
        },
        {
            id: 2,
            parentMenu: 'Notifications',
            icon : 'fa-bell',
            isActive: true, 
            url: 'notification',
            submenuList: [
                {
                    id: 0,
                    menu: 'Notification-list',
                    url: 'notifications',
                    isActive: true, 
                }, 
            ]
        },
        {
            id: 0,
            parentMenu: 'Property',
            isActive: true,
            url: 'property',
            icon : 'fa-building',
            submenuList: [
                {
                    id: 0,
                    menu: 'FO Assigned',
                    url: 'foasigned',
                    isActive: true, 
                }, 
                
                {
                    id: 1,
                    menu: 'Property Unverified ',
                    url: 'propertyunverified',
                    isActive: true, 
                }, 
                {
                    id: 2,
                    menu: 'Property Verified',
                    url: 'propertylist',
                    isActive: true, 
                }, 
                {
                    id: 3,
                    menu: 'Slot Verified',
                    url: 'slotverified',
                    isActive: true, 
                },
                // {
                //     id: 3,
                //     menu: 'Available Property ',
                //     url: 'avialableproperty',
                //     isActive: true, 
                // },
                // {
                //     id: 4,
                //     menu: 'Slot Timerunning',
                //     url: 'timerunning',
                //     isActive: true, 
                // },
                
                
                
            ]
        },
        
          {
            id: 0,
            parentMenu: 'Subscription',
            isActive: true,
            url: 'subscription',
            icon : 'fa-building',
            submenuList: [
                {
                    id: 3,
                    menu: 'Subscription with rate',
                    url: 'subscriptionrate',
                    isActive: true, 
                }, 
                {
                    id: 0,
                    menu: 'TP associated to subscription',
                    url: 'associatedsubscription',
                    isActive: true, 
                }, 
                // {
                //     id: 1,
                //     menu: 'Subscription Invoice ',
                //     url: 'subscriptioninvoice',
                //     isActive: true, 
                // }, 
                // {
                //     id: 2,
                //     menu: 'Subscription Payment',
                //     url: 'subscriptionpayment',
                //     isActive: true, 
                // },
                
                
                 
            ]
        },
        {
            id: 1,
            parentMenu: 'TP',
            icon : 'fa-user',
            isActive: true,
            url: 'tp',
            submenuList: [
                {
                    id: 0,
                    menu: 'Booking',
                    url: 'bookinglist',
                    isActive: true, 
                },  
                
                // {
                //     id: 1,
                //     menu: 'Search',
                //     url: 'search',
                //     isActive: true, 
                // },  
                
                {
                    id: 2,
                    menu: 'Check-In-Out',
                    url: 'checkinout',
                    isActive: true, 
                }, 
               
                {
                    id: 4,
                    menu: 'Vehicle-Listing',
                    url: 'vehiclelisting',
                    isActive: true, 
                }, 
                {
                    id: 5,
                    menu: 'Invoice-List',
                    url: 'invoicelist',
                    isActive: true, 
                }, 
                {
                    id: 6,
                    menu: 'Payment-Status',
                    url: 'paymentstatus',
                    isActive: true, 
                }, 
                // {
                //     id: 1,
                //     menu: 'TOW',
                //     url: 'tow',
                //     isActive: true, 
                // }, 
            ]
          },

          
        


    ],
    message: "CCO menus created",
}; 
