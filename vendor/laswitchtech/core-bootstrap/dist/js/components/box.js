// Builder
const sampleBuilder = new Builder();

// Components
// Badge 1
const sampleComponentBadge1 = sampleBuilder.Component(
    "badge", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: null, //Component Element
            badge: "my-2", //Info Element
            icon: null, //Icon Frame Element
            content: null, //Content Element
        },
        icon:"currency-dollar", //Set Icon
        color:"success", //Set Color
    },
    function(badge,component){ //Callback

        // Set Content
        var header = $(document.createElement("h5")).addClass("m-0").html("Objective").appendTo(component.content);
        var paragraph = $(document.createElement("p")).addClass("m-0").html("+ 1,352 $").appendTo(component.content);
    },
);
// Badge 2
const sampleComponentBadge2 = sampleBuilder.Component(
    "badge", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: null, //Component Element
            badge: "my-2 text-bg-success", //Info Element
            icon: null, //Icon Frame Element
            content: null, //Content Element
        },
        icon:"currency-dollar", //Set Icon
        color: null, //Set Color
    },
    function(badge,component){ //Callback

        // Set Content
        var header = $(document.createElement("h5")).addClass("").html("Objective").appendTo(component.content);
        var value = $(document.createElement("p")).addClass("fw-bold").html("+ 1,352 $").appendTo(component.content);
        var progress = sampleBuilder.Component(
            "progress", //Component Name
            component.content, //Selector or JQuery Object to appendTo
            {
                class: { //Classes
                    component: "w-100", //Progress Element
                    label: "d-none", //Label Element
                },
                size: "2px", //Set Size
                color: "secondary", //Set Color
                striped: true, //Set Striped
                animated: true, //Set Animated
                scale: 100, //Set Scale
            },
            function(progress,component){ //Callback
                progress.set(50); //Set Progress //Note: This function can be called multiple times. It can also called outside of the callback function.
            },
        );
        var paragraph = $(document.createElement("p")).addClass("m-0").html("70% Increase in 30 Days").appendTo(component.content);
    },
);
// Info
const sampleComponentInfo = sampleBuilder.Component(
    "info", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: null, //Component Element
            info: "my-2", //Info Element
            icon: null, //Icon Frame Element
            content: null, //Content Element
            link: null, //Link Element
        },
        icon:"currency-dollar", //Set Icon
        color:"success", //Set Color
        link: "?p=box", //Set Link
    },
    function(info,component){ //Callback

        // Set Content
        var header = $(document.createElement("h1")).addClass("fw-bold").html("+ 1,352 $").appendTo(component.content);
        var paragraph = $(document.createElement("p")).addClass().html("Objective").appendTo(component.content);
    },
);
