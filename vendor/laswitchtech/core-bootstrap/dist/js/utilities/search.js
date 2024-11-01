$(document).ready(function(){

    // Builder
    const sampleBuilder = new Builder();

    // Javascript Code
    let scriptCode = '';
    scriptCode += '// Builder' + "\n";
    scriptCode += 'const sampleBuilder = new Builder();' + "\n";
    scriptCode += '' + "\n";
    scriptCode += '// Live Search Utility' + "\n";
    scriptCode += 'sampleBuilder.Search.scan(selector); // Scan DOM to find search input(s) // selector being the JQuery selector find the search input(s)' + "\n";
    scriptCode += 'sampleBuilder.Search.add(container); // Add JQuery object to live search // container being the JQuery object that contains the search results' + "\n";
    scriptCode += 'sampleBuilder.Search.set(object); // Add Search attributes to JQuery object for live search // object being the JQuery object of a search result' + "\n";
    scriptCode += 'sampleBuilder.Search.get(); // Get Search field(s) // Note: Search inputs require the class "search" to be added to the input' + "\n";

    // Code
    const code = sampleBuilder.Component(
        "code", //Component Name
        "#code", //Selector or JQuery Object to appendTo
        {
            language: 'javascript',
            title: 'Code',
            clipboard:true,
            fullscreen:true,
            collapsed:false,
            code:scriptCode,
        },
    );
});