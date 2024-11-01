$(document).ready(function(){

    // Layout
    const sampleLayout = builder.Layout(
        "quiz", //Layout Name
        "#layout", //Selector or JQuery Object to appendTo
        {
            title: 'Employee Performance Review',
            callback: {
                val: function(values){
                    console.log(values);
                    return values;
                },
                reset: function(form){
                    console.log(form);
                },
                clear: function(form){
                    console.log(form);
                },
                submit: function(form){
                    console.log(form);
                },
            },
            clear: true,
            reset: true,
            submit: true,
        },
        function(layout, component){
            for(const [key, record] of Object.entries(sampleRecords.quiz.review.employee.english)){
                layout.add(record);
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
    }, 100);
});