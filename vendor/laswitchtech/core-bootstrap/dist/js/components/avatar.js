// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "avatar", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            object: "rounded-circle", //Object Element
        },
        email: "louis@laswitchtech.com", //Set Email
        extension: false, //Set Extension
        size: "512px", //Set Size
        default: "mp", //Set Default if not found
        force: false, //Set Force Default
        rating: false, //Set Rating
    },
    function(avatar,component){ //Callback
    },
);
