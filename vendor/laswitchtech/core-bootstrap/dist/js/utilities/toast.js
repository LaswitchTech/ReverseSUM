$(document).ready(function(){

    // Builder
    const sampleBuilder = new Builder();

    // Utility
    $('#create').click(function(){
        builder.Toast.add(
            {
                icon: "bell",
                title: "Bootstrap 5 Toast",
                body: "See? Just like this.",
            },
            function(toast){},
        );
    });
    $('#top-start').click(function(){
        builder.Toast.position('top-start');
    });
    $('#top-center').click(function(){
        builder.Toast.position('top-center');
    });
    $('#top-end').click(function(){
        builder.Toast.position('top-end');
    });
    $('#bottom-start').click(function(){
        builder.Toast.position('bottom-start');
    });
    $('#bottom-center').click(function(){
        builder.Toast.position('bottom-center');
    });
    $('#bottom-end').click(function(){
        builder.Toast.position('bottom-end');
    });

    // Javascript Code
    let scriptCode = '';
    scriptCode += '// Builder' + "\n";
    scriptCode += 'const sampleBuilder = new Builder();' + "\n";
    scriptCode += '' + "\n";
    scriptCode += '// Utility' + "\n";
    scriptCode += '$(\'#create\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Toast.add(' + "\n";
    scriptCode += '        {' + "\n";
    scriptCode += '            icon: "bell",' + "\n";
    scriptCode += '            title: "Bootstrap 5 Toast",' + "\n";
    scriptCode += '            body: "See? Just like this.",' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        function(toast){},' + "\n";
    scriptCode += '    );' + "\n";
    scriptCode += '});' + "\n";
    scriptCode += '$(\'#top-start\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Toast.position(\'top-start\');' + "\n";
    scriptCode += '});' + "\n";
    scriptCode += '$(\'#top-center\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Toast.position(\'top-center\');' + "\n";
    scriptCode += '});' + "\n";
    scriptCode += '$(\'#top-end\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Toast.position(\'top-end\');' + "\n";
    scriptCode += '});' + "\n";
    scriptCode += '$(\'#bottom-start\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Toast.position(\'bottom-start\');' + "\n";
    scriptCode += '});' + "\n";
    scriptCode += '$(\'#bottom-center\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Toast.position(\'bottom-center\');' + "\n";
    scriptCode += '});' + "\n";
    scriptCode += '$(\'#bottom-end\').click(function(){' + "\n";
    scriptCode += '    sampleBuilder.Toast.position(\'bottom-end\');' + "\n";
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
        let pretty = prettier.format(sampleBuilder.Toast.outerHTML(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
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