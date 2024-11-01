// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "ribbon", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: null, //Component Element
            wrapper: null, //Ribbon Wrapper Element
            ribbon: "fs-4", //Ribbon Element
        },
        color: "danger", //Set Color
        label: "Ribbon", //Set Label
        icon: "bookmark", //Set Icon
        size: "xl", //Set Size
    },
    function(ribbon,component){ //Callback
    },
);
