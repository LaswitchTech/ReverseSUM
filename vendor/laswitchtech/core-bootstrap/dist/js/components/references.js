// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "references", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: {
            component: null,
            list: null,
            form: null,
        },
        callback: {
            add: function(values){ console.log("adding");console.log(values); },
            remove: function(type, reference){ console.log("removing");console.log(type, reference); },
        },
        types: [
            {"id": "ccn","text": "Cargo Control Number"},
            {"id": "cn","text": "Container"},
            {"id": "tr","text": "Transaction"},
            {"id": "po","text": "Purchase Order"},
            {"id": "inv","text": "Invoice"},
            {"id": "other","text": "Other"}
        ],
        default: "other",
    },
    function(references,component){ //Callback
        references.add("ccn","1234ABCD123456789");
        references.add("cn","ABCD123456");
        references.add("cn","ABCD123457");
        references.add("tr","12345123456789");
        references.add("po","ABCD");
        references.add("inv","INV-1234");
    },
);
