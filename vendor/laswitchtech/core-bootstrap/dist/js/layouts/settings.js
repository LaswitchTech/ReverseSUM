$(document).ready(function(){

    // Layout
    const sampleLayout = builder.Layout(
        "settings", //Layout Name
        "#layout", //Selector or JQuery Object to appendTo
        {
            class: { //Add Classes
                layout: null, //Layout Element
                content: null, //Content Element
                menu: null, //Menu Element
            },
        },
        function(layout,component){ //Callback
            layout
                .add({label:'General',icon:'gear'},function(category,layout){
                    category.add({label:'About',icon:'journal-richtext',body:true,form:false},function(item,content){
                        var logo = $(document.createElement('div')).addClass('d-flex flex-column justify-content-center align-items-center').appendTo(content.body);
                        logo.icon = $(document.createElement('i')).css({'font-size':'200px'}).addClass('bi bi-bootstrap-fill').appendTo(logo);
                        logo.brand = $(document.createElement('h1')).text('Panel').appendTo(logo);
                        var badges = $(document.createElement('div')).addClass('d-flex flex-wrap justify-content-center align-items-center').appendTo(content.body);
                        for(const [key, version] of Object.entries(sampleVersions)){
                            var badge = $(document.createElement('div')).addClass('badge bg-dark p-0 fs-4 m-1').appendTo(badges);
                            badge.label = $(document.createElement('span')).addClass('badge text-bg-' + version.color).text(version.label).appendTo(badge);
                            badge.label.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + version.icon).prependTo(badge.label);
                            badge.version = $(document.createElement('span')).addClass('badge').text(version.version).appendTo(badge);
                            badges[version.name] = badge;
                        }
                    });
                    category.add({label:'Identity',icon:'sliders',callback:{submit:function(form){
                        console.log(form);
                        console.log(form.val());
                    }}},function(item,content){
                        content.form.add({class: {field: 'mb-3'},name: 'brand',label: 'Brand',icon: 'app-indicator',value: 'Panel'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'logo',label: 'Logo',icon: 'image',type: 'file',value: null},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'theme',label: 'Theme',icon: 'palette',type: 'select',value: 'glass',options: [{id:'glass',text:'Glass'}]},function(field){});
                        content.form.add({name: 'submit',value: 'submit',label: 'Save',icon: 'save',type: 'submit',class: {label: 'w-100'}});
                    });
                    category.add({label:'Database',icon:'database',callback:{submit:function(form){
                        console.log(form);
                        console.log(form.val());
                    }}},function(item,content){
                        content.form.add({class: {field: 'mb-3'},name: 'host',label: 'Host',icon: 'hdd-network',value: 'localhost'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'database',label: 'Database',icon: 'database',value: 'demo'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'username',label: 'Username',icon: 'person',value: 'demo'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'password',label: 'Password',icon: 'lock',type: 'password',value: 'demo'},function(field){});
                        content.form.add({name: 'submit',value: 'submit',label: 'Save',icon: 'save',type: 'submit',class: {label: 'w-100'}});
                    });
                    category.add({label:'SMTP',icon:'send',callback:{submit:function(form){
                        console.log(form);
                        console.log(form.val());
                    }}},function(item,content){
                        content.form.add({class: {field: 'mb-3'},name: 'host',label: 'Host',icon: 'hdd-network',value: 'localhost'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'port',label: 'Port',icon: 'ethernet',type: 'number',value: 465},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'encryption',label: 'Encryption',icon: 'shield',type: 'select',value: 'ssl',options: [
                            {id:'ssl',text:'SSL'},
                            {id:'tls',text:'TLS'},
                            {id:'none',text:'None'},
                        ]},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'username',label: 'Username',icon: 'person',value: 'demo@domain.com'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'password',label: 'Password',icon: 'lock',type: 'password',value: 'demo'},function(field){});
                        content.form.add({name: 'submit',value: 'submit',label: 'Save',icon: 'save',type: 'submit',class: {label: 'w-100'}});
                    });
                    category.add({label:'SMS',icon:'chat-square-text',callback:{submit:function(form){
                        console.log(form);
                        console.log(form.val());
                    }}},function(item,content){
                        content.form.add({class: {field: 'mb-3'},name: 'provider',label: 'Provider',icon: 'reception-4',type: 'select',value: 'twilio',options: [{id:'twilio',text:'Twilio'}]},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'sid',label: 'SID',value: 'ABCDEF1234567890'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'token',label: 'Token',value: 'ABCDEF1234567890'},function(field){});
                        content.form.add({class: {field: 'mb-3'},name: 'phone',label: 'Phone',icon: 'phone',value: '+01234567890'},function(field){});
                        content.form.add({name: 'submit',value: 'submit',label: 'Save',icon: 'save',type: 'submit',class: {label: 'w-100'}});
                    });
                });
        },
    );

    // Javascript Code
    let scriptCode = '';
    scriptCode += '// Builder' + "\n";
    scriptCode += 'const sampleBuilder = new Builder();' + "\n";
    scriptCode += '' + "\n";
    scriptCode += '// Layout' + "\n";
    scriptCode += 'const sampleLayout = sampleBuilder.Layout(' + "\n";
    scriptCode += '    "settings", //Layout Name' + "\n";
    scriptCode += '    "#layout", //Selector or JQuery Object to appendTo' + "\n";
    scriptCode += '    {' + "\n";
    scriptCode += '        class: { //Add Classes' + "\n";
    scriptCode += '            layout: null, //Layout Element' + "\n";
    scriptCode += '            content: null, //Content Element' + "\n";
    scriptCode += '            menu: null, //Menu Element' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '    },' + "\n";
    scriptCode += '    function(layout,component){ //Callback' + "\n";
    scriptCode += '        layout' + "\n";
    scriptCode += '            .add({label:\'General\',icon:\'gear\'},function(category,layout){' + "\n";
    scriptCode += '                category.add({label:\'About\',icon:\'journal-richtext\',body:true,form:false},function(item,content){' + "\n";
    scriptCode += '                    var logo = $(document.createElement(\'div\')).addClass(\'d-flex flex-column justify-content-center align-items-center\').appendTo(content.body);' + "\n";
    scriptCode += '                    logo.icon = $(document.createElement(\'i\')).css({\'font-size\':\'200px\'}).addClass(\'bi bi-bootstrap-fill\').appendTo(logo);' + "\n";
    scriptCode += '                    logo.brand = $(document.createElement(\'h1\')).text(\'Panel\').appendTo(logo);' + "\n";
    scriptCode += '                    var badges = $(document.createElement(\'div\')).addClass(\'d-flex flex-wrap justify-content-center align-items-center\').appendTo(content.body);' + "\n";
    scriptCode += '                    for(const [key, version] of Object.entries(sampleVersions)){' + "\n";
    scriptCode += '                        var badge = $(document.createElement(\'div\')).addClass(\'badge bg-dark p-0 fs-4 m-1\').appendTo(badges);' + "\n";
    scriptCode += '                        badge.label = $(document.createElement(\'span\')).addClass(\'badge text-bg-\' + version.color).text(version.label).appendTo(badge);' + "\n";
    scriptCode += '                        badge.label.icon = $(document.createElement(\'i\')).addClass(\'me-1 bi bi-\' + version.icon).prependTo(badge.label);' + "\n";
    scriptCode += '                        badge.version = $(document.createElement(\'span\')).addClass(\'badge\').text(version.version).appendTo(badge);' + "\n";
    scriptCode += '                        badges[version.name] = badge;' + "\n";
    scriptCode += '                    }' + "\n";
    scriptCode += '                });' + "\n";
    scriptCode += '                category.add({label:\'Identity\',icon:\'sliders\',callback:{submit:function(form){' + "\n";
    scriptCode += '                    console.log(form);' + "\n";
    scriptCode += '                    console.log(form.val());' + "\n";
    scriptCode += '                }}},function(item,content){' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'brand\',label: \'Brand\',icon: \'app-indicator\',value: \'Panel\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'logo\',label: \'Logo\',icon: \'image\',type: \'file\',value: null},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'theme\',label: \'Theme\',icon: \'palette\',type: \'select\',value: \'glass\',options: [{id:\'glass\',text:\'Glass\'}]},function(field){});' + "\n";
    scriptCode += '                    content.form.add({name: \'submit\',value: \'submit\',label: \'Save\',icon: \'save\',type: \'submit\',class: {label: \'w-100\'}});' + "\n";
    scriptCode += '                });' + "\n";
    scriptCode += '                category.add({label:\'Database\',icon:\'database\',callback:{submit:function(form){' + "\n";
    scriptCode += '                    console.log(form);' + "\n";
    scriptCode += '                    console.log(form.val());' + "\n";
    scriptCode += '                }}},function(item,content){' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'host\',label: \'Host\',icon: \'hdd-network\',value: \'localhost\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'database\',label: \'Database\',icon: \'database\',value: \'demo\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'username\',label: \'Username\',icon: \'person\',value: \'demo\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'password\',label: \'Password\',icon: \'lock\',type: \'password\',value: \'demo\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({name: \'submit\',value: \'submit\',label: \'Save\',icon: \'save\',type: \'submit\',class: {label: \'w-100\'}});' + "\n";
    scriptCode += '                });' + "\n";
    scriptCode += '                category.add({label:\'SMTP\',icon:\'send\',callback:{submit:function(form){' + "\n";
    scriptCode += '                    console.log(form);' + "\n";
    scriptCode += '                    console.log(form.val());' + "\n";
    scriptCode += '                }}},function(item,content){' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'host\',label: \'Host\',icon: \'hdd-network\',value: \'localhost\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'port\',label: \'Port\',icon: \'ethernet\',type: \'number\',value: 465},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'encryption\',label: \'Encryption\',icon: \'shield\',type: \'select\',value: \'ssl\',options: [' + "\n";
    scriptCode += '                        {id:\'ssl\',text:\'SSL\'},' + "\n";
    scriptCode += '                        {id:\'tls\',text:\'TLS\'},' + "\n";
    scriptCode += '                        {id:\'none\',text:\'None\'},' + "\n";
    scriptCode += '                    ]},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'username\',label: \'Username\',icon: \'person\',value: \'demo@domain.com\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'password\',label: \'Password\',icon: \'lock\',type: \'password\',value: \'demo\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({name: \'submit\',value: \'submit\',label: \'Save\',icon: \'save\',type: \'submit\',class: {label: \'w-100\'}});' + "\n";
    scriptCode += '                });' + "\n";
    scriptCode += '                category.add({label:\'SMS\',icon:\'chat-square-text\',callback:{submit:function(form){' + "\n";
    scriptCode += '                    console.log(form);' + "\n";
    scriptCode += '                    console.log(form.val());' + "\n";
    scriptCode += '                }}},function(item,content){' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'provider\',label: \'Provider\',icon: \'reception-4\',type: \'select\',value: \'twilio\',options: [{id:\'twilio\',text:\'Twilio\'}]},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'sid\',label: \'SID\',value: \'ABCDEF1234567890\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'token\',label: \'Token\',value: \'ABCDEF1234567890\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({class: {field: \'mb-3\'},name: \'phone\',label: \'Phone\',icon: \'phone\',value: \'+01234567890\'},function(field){});' + "\n";
    scriptCode += '                    content.form.add({name: \'submit\',value: \'submit\',label: \'Save\',icon: \'save\',type: \'submit\',class: {label: \'w-100\'}});' + "\n";
    scriptCode += '                });' + "\n";
    scriptCode += '            });' + "\n";
    scriptCode += '    },' + "\n";
    scriptCode += ');';



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