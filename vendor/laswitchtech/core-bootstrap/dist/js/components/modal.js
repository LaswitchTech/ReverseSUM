// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "modal", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            modal: null, //Modal Element
            dialog: null, //Dialog Element
            content: null, //Content Element
            header: null, //Header Element
            body: null, //Body Element
            footer: null, //Footer Element
        },
        callback: { //Add Callbacks
            submit: function(element,modal){ //On Submit
                console.log("Submit", element,modal);
            },
            cancel: function(element,modal){ //On Cancel
                console.log("Cancel", element,modal);
            },
            fullscreen: function(element,modal){ //On Fullscreen Toggle
                console.log("Fullscreen", element,modal);
            },
            close: function(element,modal){ //On Close
                console.log("Close", element,modal);
            },
            onShow: function(element,modal){ //On Show
                console.log("Show", element,modal);
            },
            onHide: function(element,modal){ //On Hide
                console.log("Hide", element,modal);
            },
        },
        onEnter: true, //Enable/Disable Submit on Enter
        close:true, //Enable/Disable Close Button
        fullscreen:true, //Enable/Disable Fullscreen Button
        destroy:false, //Enable/Disable Destroy on Hide
        icon: "info-circle", //Set Icon
        title: "Lorem Ipsum", //Set Title
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", //Set Body
        static: false, //Enable/Disable Static Backdrop
        cancel: true, //Enable/Disable Cancel
        submit: true, //Enable/Disable Submit
        center: false, //Enable/Disable Centered Modal
        size: "none", //Set Size
    },
    function(modal,component){ //Callback
        modal.add( //Add an action to the modal //Note: This function can be called multiple times to add multiple action. It can also called outside of the callback function.
            {
                icon: null, //Set Icon
                label: "action", //Set Label
                color: null, //Set Color
            },
            function(action,element,modal){}, //Executed when this action is clicked
        );
    },
);
