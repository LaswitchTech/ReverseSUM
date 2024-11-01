// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "card", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: "w-100", //Collapse Element
        },
        icon: "card-text", //Set Icon
        title: "What is Lorem Ipsum?", //Set Title
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", //Set Body
        footer: null, //Set Footer
        strech: false, //Enable/Disable Strech
        hideHeader: false, //Enable/Disable Hide Header
        hideFooter: true, //Enable/Disable Hide Footer
        close:true, //Enable/Disable Close Button
        fullscreen: true, //Enable/Disable Fullscreen Button
        collapse: true, //Enable/Disable Collapse Button
        collapsed: false, //Enable/Disable Collapse
    },
    function(card,component){ //Callback
    },
);
