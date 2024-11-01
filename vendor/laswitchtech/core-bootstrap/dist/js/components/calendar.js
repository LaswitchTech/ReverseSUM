// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "calendar", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        themeSystem: 'bootstrap5', //bootstrap5, bootstrap4, bootstrap3, standard
        headerToolbar: { //Header Toolbar
            left: 'prev,next today', //prev,next today
            center: 'title', //title
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay' //dayGridMonth,timeGridWeek,timeGridDay
        },
        initialDate: null, //Initial Date
        initialView: 'dayGridMonth', //dayGridMonth,timeGridWeek,timeGridDay
        selectable: false, //Enable Selecting
        editable: false, //Enable Editing
        eventDragMinDistance: 0, //Minimum Distance to Drag Event
        class: { //Add Classes
            component: null, //Calendar Wrapper Element
            header: 'p-4 pb-2', //Header Element
        },
        callback: { //Callback Functions
            dateClick: function(info) {}, //Date Click
            select: function(info) {}, //Date Select
            eventClick: function(info) {}, //Event Click
            eventMouseEnter: function(info) {}, //Event Mouse Enter
            eventMouseLeave: function(info) {}, //Event Mouse Leave
            eventDrop: function(info) {}, //Event Drop
            eventResize: function(info) {}, //Event Resize
            eventDidMount: function(info) {}, //Event Did Mount
        },
        events: [
            {
                title: 'My Event', //Title
                description: 'This is a cool event', //Description
                icon: 'person', //Icon
                start: '2023-08-01', //Start Date
                end: '2023-08-02', //End Date
                allDay: true, //All Day
                color: 'danger', //Color
            },
        ],
        properties: { //Default Event
            start: null, //Start Date
            end: null, //End Date
            allDay: false, //All Day
            isBackground: false, //Is Background Event
            color: null, //Color
            icon: null, //Icon
            title: null, //Title
            description: null, //Description
            popover: true, //Show Popover
            callback: { //Callback Functions
                click: function(info) {}, //Click
                mouseEnter: function(info) {}, //Mouse Enter
                mouseLeave: function(info) {}, //Mouse Leave
                drop: function(info) {}, //Drop
                resize: function(info) {}, //Resize
            },
        },
    },
    function(calendar,component){ //Callback
        calendar.add({ //Add Event
            title: 'My Event', //Title
            description: 'This is a cool event', //Description
            start: '2023-08-07', //Start Date
            end: '2023-08-08', //End Date
            color: 'success', //Color
        });
    },
);
