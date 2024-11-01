// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "progress", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Classes
            progress: "w-100", //Progress Element
            bar: null, //Bar Element
            label: null, //Label Element
        },
        callback: { //Callbacks
            change: function(progress){}, //On Change
        },
        size: null, //Set Size
        color: null, //Set Color
        striped: true, //Set Striped
        animated: true, //Set Animated
        scale: 100, //Set Scale
        label: "{percent}", //Set Label //Note: Some placeholders are available. {progress} {scale} {percent}
    },
    function(progress,component){ //Callback
        progress.set(50); //Set Progress //Note: This function can be called multiple times. It can also called outside of the callback function.
    },
);
