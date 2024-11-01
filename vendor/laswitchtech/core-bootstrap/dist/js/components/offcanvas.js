// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "offcanvas", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: null, //Offcanvas Object
        },
        icon: 'layout-sidebar-inset-reverse', //Add Icon
        title: 'Offcanvas', //Add Title
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', //Add Body
        dismissible: true, //Set Dismissible
        backdrop: true, //Set Backdrop
        scroll: false, //Set Scroll
        color: null, //Add Color
        side: null, //Set Side
    },
    function(offcanvas,component){ //Callback
    },
);
