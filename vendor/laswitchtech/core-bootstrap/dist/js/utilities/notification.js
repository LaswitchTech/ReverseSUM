$(document).ready(function(){

    // Builder
    const sampleBuilder = new Builder();

    // Utility
    $('#create').click(function(){
        builder.Notification.add(
            {
                label: "{{A new monthly report is ready to download!}}",
            },
            function(notification){},
        );
    });

    // Javascript Code
    let scriptCode = '';
    scriptCode += '// Builder' + "\n";
    scriptCode += 'const sampleBuilder = new Builder();' + "\n";
    scriptCode += '' + "\n";
    scriptCode += '// Utility' + "\n";
    scriptCode += 'sampleBuilder.Notification.appendTo(\'#notificationArea\');' + "\n";
    scriptCode += '$(\'#create\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Notification.add(' + "\n";
    scriptCode += '        {' + "\n";
    scriptCode += '            label: "A new monthly report is ready to download!",' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        function(notification){},' + "\n";
    scriptCode += '    );' + "\n";
    scriptCode += '});';

    // Code
    const code = sampleBuilder.Component(
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
        let pretty = prettier.format(sampleBuilder.Notification.outerHTML(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
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
