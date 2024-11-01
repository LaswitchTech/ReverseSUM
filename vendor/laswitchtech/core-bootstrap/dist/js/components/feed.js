// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "feed", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            feed: "card card-body", //Feed Element
            post: null, //Post Element
        },
        properties: { //Default for individual Post Values
            username: null, //Username
            content: null, //Content
            datetime: null, //Datetime
            class: { //Add Classes
                post: null, //Post Element
            },
        },
        controls:{ //Controls
            like:{ //Like Control
                icon:"hand-thumbs-up", //Icon
                label:"Like", //Label
                callback:function(control,post,feed){}, //Executed when the control is created
            },
            share:{ //Share Control
                icon:"share", //Icon
                label:"Share", //Label
                callback:function(control,post,feed){}, //Executed when the control is created
            },
            note:{ //Note Control
                icon:"sticky", //Icon
                label:"Note", //Label
                callback:function(control,post,feed){}, //Executed when the control is created
            },
            comment:{ //Comment Control
                icon:"chat-text", //Icon
                label:"Commments", //Label
                callback:function(control,post,feed){}, //Executed when the control is created
            },
            edit:{ //Edit Control
                icon:"pencil-square", //Icon
                color:"warning", //Color
                label:"Edit", //Label
                callback:function(control,post,feed){}, //Executed when the control is created
            },
            delete:{ //Delete Control
                icon:"trash", //Icon
                color:"danger", //Color
                label:"Delete", //Label
                callback:function(control,post,feed){}, //Executed when the control is created
            },
        },
    },
    function(feed,component){ //Callback
        feed.add(
            {
                class: { //Add Classes
                    post: null, //Post Element
                },
                datetime: null, //Datetime
                username: "john.doe@domain.com", //Username
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", //Content
            },
            function(post,feed){}, //Callback
        );
        feed.add(
            {
                class: { //Add Classes
                    post: null, //Post Element
                },
                datetime: null, //Datetime
                username: "john.doe@domain.com", //Username
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", //Content
            },
            function(post,feed){}, //Callback
        );
        feed.add(
            {
                class: { //Add Classes
                    post: null, //Post Element
                },
                datetime: null, //Datetime
                username: "john.doe@domain.com", //Username
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", //Content
            },
            function(post,feed){}, //Callback
        );
    },
);
