// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "dropdown", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            object: null, //Object Element
            button: null, //Button Element
            menu: null, //Menu Element
        },
        icon: "three-dots-vertical", //Icon
        label: "My Dropdown", //Label
    },
    function(dropdown){ //Callback
        dropdown.item( //Add an item to the dropdown //Note: This function can be called multiple times to add multiple items. It can also called outside of the callback function.
            {
                class: { //Add Classes
                    item: "text-bg-primary", //Item Element
                    button: null, //Button Element
                    label: null, //Label Element
                },
                link: "?p=profile", //Link
                icon: null, //Icon
                label: "Profile", //Label
                visible: null, //Condition for visibility // This can be a function or a boolean
                click: null, //Click Event
            },
            function(item){}, //Callback
        );
        dropdown.seperator(); //Add a seperator to the dropdown //Note: This function can be called multiple times to add multiple seperators. It can also called outside of the callback function.
        dropdown.item( //Add an item to the dropdown //Note: This function can be called multiple times to add multiple items. It can also called outside of the callback function.
            {
                class: { //Add Classes
                    item: null, //Item Element
                    button: null, //Button Element
                    label: null, //Label Element
                },
                link: null, //Link
                icon: "gear", //Icon
                label: null, //Label
                visible: null, //Condition for visibility // This can be a function or a boolean
                click: null, //Click Event
            },
            function(item){}, //Callback
        );
    },
);
