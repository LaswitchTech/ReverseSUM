$(document).ready(function(){

    // Builder
    const sampleBuilder = new Builder();

    // Utility
    $('#create').click(function(){
        builder.Task.add(
            {
                label: "Monthly Report",
                progress: {
                    scale: 3,
                    color: "success",
                },
            },
            function(task){
                task.set(2);
            },
        );
    });

    // Javascript Code
    let scriptCode = '';
    scriptCode += '// Builder' + "\n";
    scriptCode += 'const sampleBuilder = new Builder();' + "\n";
    scriptCode += '' + "\n";
    scriptCode += '// Utility' + "\n";
    scriptCode += 'sampleBuilder.Task.appendTo(\'#taskArea\');' + "\n";
    scriptCode += '$(\'#create\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Task.add(' + "\n";
    scriptCode += '        {' + "\n";
    scriptCode += '            label: "Monthly Report",' + "\n";
    scriptCode += '            progress: {' + "\n";
    scriptCode += '                scale: 3,' + "\n";
    scriptCode += '                color: "success",' + "\n";
    scriptCode += '            },' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        function(task){' + "\n";
    scriptCode += '            task.set(2);' + "\n";
    scriptCode += '        },' + "\n";
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
        let pretty = prettier.format(sampleBuilder.Task.outerHTML(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
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