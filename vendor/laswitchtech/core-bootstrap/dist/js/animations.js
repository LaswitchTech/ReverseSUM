$(document).ready(function() {

    // Builder
    const sampleBuilder = new Builder();

    // Pretty
    let pretty = prettier.format($('#example').html(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
    
    // Code
    const html = sampleBuilder.Component(
        "code",
        "#markup",
        {
            language: 'markup',
            title: 'Code',
            clipboard:true,
            fullscreen:true,
            collapsed:true,
            code:pretty,
        },
        function(code,component){},
    );
});