// Builder
const sampleBuilder = new Builder();

// Sample
let sampleCode = "";
sampleCode += "// Placeholder JavaScript code" + "\n";
sampleCode += "function doSomething() {" + "\n";
sampleCode += "    // TODO: Implement functionality" + "\n";
sampleCode += "    console.log('Placeholder code');" + "\n";
sampleCode += "}" + "\n";
sampleCode += "" + "\n";
sampleCode += "// Sample usage" + "\n";
sampleCode += "doSomething();";

// Component
const sampleComponent = sampleBuilder.Component(
    "code", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            component: "w-100", //Component Element
        },
        language: "javascript", //Set Language
        title: "Example", //Set Title
        clipboard:true, //Enable/Disable Clipboard
        fullscreen:true, //Enable/Disable Fullscreen
        code:sampleCode, //Set Code
    },
    function(code,component){ //Callback
    },
);
