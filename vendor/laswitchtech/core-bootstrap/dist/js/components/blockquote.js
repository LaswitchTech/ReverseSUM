// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "blockquote", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            figure: null, //Figure Element
            blockquote: null, //Blockquote Element
            figcaption: null, //Figcaption Element
            cite: null, //Cite Element
        },
        quote: "A well-known quote, contained in a blockquote element.", //Set Quote
        author: "Someone famous", //Set Author
        source: "Source Title", //Set Source
    },
    function(blockquote,component){ //Callback
    },
);
