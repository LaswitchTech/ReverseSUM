$(document).ready(function(){

    // Layout
    const sampleLayout = builder.Layout(
        "faq", //Layout Name
        "#layout", //Selector or JQuery Object to appendTo
        {
            title: 'Frequently Asked Questions',
            contact: '?t=layouts&p=contact',
        },
        function(layout,component){ //Callback
            for(const [key, record] of Object.entries(sampleRecords.faqs)){
                layout.add(
                    {
                        title: record.title,
                        content: record.content,
                    },
                );
            }
        },
    );

    // Javascript Code
    let scriptCode = '';
    scriptCode += '// Builder' + "\n";
    scriptCode += 'const sampleBuilder = new Builder();' + "\n";
    scriptCode += '' + "\n";
    scriptCode += '// Layout' + "\n";

    // Code
    const code = builder.Component(
        "code", //Component Name
        "#code", //Selector or JQuery Object to appendTo
        {
            language: 'javascript',
            title: 'Code',
            clipboard:true,
            fullscreen:true,
            collapsed:true,
            code:scriptCode,
        },
    );

    // HTML Code
    setTimeout(function(){
        let pretty = prettier.format(sampleLayout.outerHTML(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
        const html = builder.Component(
            "code", //Component Name
            "#htmlcode", //Selector or JQuery Object to appendTo
            {
                language: 'markup',
                title: 'Code',
                clipboard:true,
                fullscreen:true,
                collapsed:true,
                code:pretty,
            },
        );
    }, 0);
});