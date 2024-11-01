$(document).ready(function(){

    // Layout
    const sampleLayout = builder.Layout(
        "help", //Layout Name
        "#layout", //Selector or JQuery Object to appendTo
        {
            class: { //Add Classes
                component: null, //Component Element
            },
            title: 'How can we help?', //Layout Title
            link: {
                articles: null, //Articles Link
                contactus: null, //Contact Us Link
            }
        },
        function(layout,component){ //Callback
            layout.alert({
                color: 'secondary',
                dismissible: false,
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            },function(alert,component){});
            layout.ressource(
                {
                    icon: 'question-circle',
                    title: 'FAQ',
                    content: '<p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>',
                },
                function(ressource){},
            );
            layout.ressource(
                {
                    icon: 'chat-square-dots',
                    title: 'Tickets',
                    content: '<p class="card-text">Review support tickets and check status updates.</p>',
                },
                function(ressource){},
            );
            layout.ressource(
                {
                    icon: 'ticket-perforated',
                    title: 'New Ticket',
                    content: '<p class="card-text">Submit a new ticket to the Support team.</p>',
                },
                function(ressource){},
            );
            layout.article(
                {
                    title: 'How to create a new account?',
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                },
                function(ressource){},
            );
            layout.article(
                {
                    title: 'Lorem Ipsum',
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                },
                function(ressource){},
            );
            layout.article(
                {
                    title: 'Lorem Ipsum',
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                },
                function(ressource){},
            );
            layout.article(
                {
                    title: 'Lorem Ipsum',
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                },
                function(ressource){},
            );
            layout.article(
                {
                    title: 'Lorem Ipsum',
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                },
                function(ressource){},
            );
            layout.article(
                {
                    title: 'Lorem Ipsum',
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                },
                function(ressource){},
            );
        },
    );

    // Javascript Code
    let scriptCode = '';
    scriptCode += '// Builder' + "\n";
    scriptCode += 'const sampleBuilder = new Builder();' + "\n";
    scriptCode += '' + "\n";
    scriptCode += '// Layout' + "\n";
    scriptCode += 'const sampleLayout = sampleBuilder.Layout(' + "\n";
    scriptCode += '    "help", //Layout Name' + "\n";
    scriptCode += '    "#layout", //Selector or JQuery Object to appendTo' + "\n";
    scriptCode += '    {' + "\n";
    scriptCode += '        class: { //Add Classes' + "\n";
    scriptCode += '            component: null, //Component Element' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        title: \'How can we help?\', //Layout Title' + "\n";
    scriptCode += '        link: {' + "\n";
    scriptCode += '            articles: null, //Articles Link' + "\n";
    scriptCode += '            contactus: null, //Contact Us Link' + "\n";
    scriptCode += '        }' + "\n";
    scriptCode += '    },' + "\n";
    scriptCode += '    function(layout,component){ //Callback' + "\n";
    scriptCode += "        layout.alert({" + "\n";
    scriptCode += "                color: 'secondary'," + "\n";
    scriptCode += "                dismissible: false," + "\n";
    scriptCode += "                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'," + "\n";
    scriptCode += "            },function(alert,component){});" + "\n";
    scriptCode += "            layout.ressource(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    icon: 'question-circle'," + "\n";
    scriptCode += "                    title: 'FAQ'," + "\n";
    scriptCode += "                    content: '<p class=\"card-text\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.ressource(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    icon: 'chat-square-dots'," + "\n";
    scriptCode += "                    title: 'Tickets'," + "\n";
    scriptCode += "                    content: '<p class=\"card-text\">Review support tickets and check status updates.</p>'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.ressource(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    icon: 'ticket-perforated'," + "\n";
    scriptCode += "                    title: 'New Ticket'," + "\n";
    scriptCode += "                    content: '<p class=\"card-text\">Submit a new ticket to the Support team.</p>'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.article(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    title: 'How to create a new account?'," + "\n";
    scriptCode += "                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.article(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    title: 'Lorem Ipsum'," + "\n";
    scriptCode += "                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'," + "\n";
    scriptCode += "                 }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.article(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    title: 'Lorem Ipsum'," + "\n";
    scriptCode += "                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.article(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    title: 'Lorem Ipsum'," + "\n";
    scriptCode += "                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.article(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    title: 'Lorem Ipsum'," + "\n";
    scriptCode += "                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
    scriptCode += "            layout.article(" + "\n";
    scriptCode += "                {" + "\n";
    scriptCode += "                    title: 'Lorem Ipsum'," + "\n";
    scriptCode += "                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'," + "\n";
    scriptCode += "                }," + "\n";
    scriptCode += "                function(ressource){}," + "\n";
    scriptCode += "            );" + "\n";
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