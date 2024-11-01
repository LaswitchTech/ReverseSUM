// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "alert", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            alert: null, //Alert Element
        },
        color: "danger", //Set Color
        dismissible: true, //Set Dismissible
        icon: "slash-circle", //Set Icon
        title: "Alert!", //Set Title
        content: "Danger alert preview. This alert is dismissable. A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.", //Set Content
    },
    function(alert,component){ //Callback
    },
);
