// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "list", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: "card rounded w-100", //List Element
        },
        tools: { //Tools located at the top of the list
            add: {
                icon: "plus-lg", //Icon
                label: null, //Label
                color: "success", //Color
                class: null, //Added Classes
                callback: function(tool,list){}, //Executed when the tool is created
            },
        },
        actions: { //Actions located at the end of each list item
            delete: {
                icon: "trash", //Icon
                label: null, //Label
                color: "danger", //Color
                class: null, //Added Classes
                callback: function(action,item,list){}, //Executed when the action is created
            },
        },
        icon: null, //Default Icon for list items
        callback: { //Callbacks
            tool: null, //Executed when a tool is created
            action: null, //Executed when an action is created
            item: null, //Executed when an item is created
            click: null, //Executed when an item is clicked
            dblclick: null, //Executed when an item is clicked twice
        },
    },
    function(list,component){ //Callback
        list.tool( //Add a tool to the list //Note: This function can be called multiple times to add multiple tools. It can also called outside of the callback function.
            {
                icon: "plus-lg", //Icon
                label: null, //Label
                color: "success", //Color
                class: null, //Added Classes
                name: "add", //Name
                callback: function(tool,list){}, //Executed when this tool is created
            },
        )
        list.action( //Add an action to the list item //Note: This function can be called multiple times to add multiple actions. It can also called outside of the callback function.
            {
                icon: "trash", //Icon
                label: null, //Label
                color: "danger", //Color
                class: null, //Added Classes
                name: "delete", //Name
                callback: function(action,item,list){}, //Executed when this action is created
            },
        );
        list.add( //Add an item to the list //Note: This function can be called multiple times to add multiple items. It can also called outside of the callback function.
            {
                icon: null, //Icon
                field: "Lorem Ipsum", //Add Content to the list item
                click: null, //Executed when this item is clicked
                dblclick: null, //Executed when this item is clicked twice
            },
            function(item,list){}, //Executed when this item is created
        );
        list.get(); //Get the list
    },
);
