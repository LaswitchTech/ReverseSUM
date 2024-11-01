$(document).ready(function(){

    // Layout
    const sampleLayout = builder.Layout(
        "list", //Layout Name
        "#layout", //Selector or JQuery Object to appendTo
        {
            title: 'Tickets',
            icon: 'ticket-perforated',
            dblclick:function(event, table, node, data){
                window.location.href = "?t=layouts&p=details";
            },
            actions:{
                details:{
                  label:'Details',
                  icon:'eye',
                  action:function(event, table, node, row, data){
                      window.location.href = "?t=layouts&p=ticket";
                  },
                },
              },
            buttons:[],
            columnDefs:[
                { target: 0, visible: true, title: 'Ticket#', name: 'id', data: 'id' },
                { target: 1, visible: true, title: 'Subject', name: 'subject', data: 'subject' },
                {
                    target: 2,
                    visible: true,
                    title: 'Owner',
                    name: 'owner',
                    data: 'owner',
                    render: function(data, type, row) {

                        // Create Badge
                        var object = $(document.createElement('span'))
                            .addClass('d-flex align-items-center')
                            .attr('data-bs-toggle','tooltip')
                            .attr('data-bs-placement','top')
                            .attr('title',data)
                            .attr('data-bs-title',data)
                            .text(data);

                        // Create avatar
                        var avatar = $(document.createElement('img'))
                            .addClass('rounded-circle me-1')
                            .attr('alt',data)
                            .css({
                                width: '32px',
                                height: '32px',
                            })
                            .attr('src',builder.Helper.gravatar(data,{size: '32px'}))
                            .prependTo(object);

                        // Return outerHTML
                        return object.prop('outerHTML');
                    },
                },
                {
                    target: 3,
                    visible: true,
                    title: 'Status',
                    name: 'status',
                    data: 'status',
                    render: function(data, type, row) {
                        var badge = sampleStatuses.tickets[data];
                        var object = $(document.createElement('span'))
                            .addClass('badge text-bg-'+ badge.color)
                            .attr('data-bs-toggle','tooltip')
                            .attr('data-bs-placement','top')
                            .attr('title',badge.description)
                            .attr('data-bs-title',badge.description)
                            .text(badge.label);
                        var icon = $(document.createElement('i'))
                            .addClass('me-1 bi bi-'+badge.icon)
                            .prependTo(object);
                        return object.prop('outerHTML');
                    },
                },
                {
                    target: 4,
                    visible: true, 
                    title: 'Priority', 
                    name: 'priority', 
                    data: 'priority',
                    render: function(data, type, row) {
                        var badge = samplePriorities.tickets[data];
                        var object = $(document.createElement('span'))
                            .addClass('badge text-bg-'+ badge.color)
                            .attr('data-bs-toggle','tooltip')
                            .attr('data-bs-placement','top')
                            .attr('title',badge.description)
                            .attr('data-bs-title',badge.description)
                            .text(badge.label);
                        var icon = $(document.createElement('i'))
                            .addClass('me-1 bi bi-'+badge.icon)
                            .prependTo(object);
                        return object.prop('outerHTML');
                    },
                },
                {
                    target: 5, 
                    visible: true, 
                    title: 'Assigned to', 
                    name: 'assignedTo', 
                    data: 'assignedTo',
                    render: function(data, type, row) {
                        // Create Badge
                        var object = $(document.createElement('span'))
                            .addClass('d-flex align-items-center')
                            .attr('data-bs-toggle','tooltip')
                            .attr('data-bs-placement','top')
                            .attr('title',data)
                            .attr('data-bs-title',data)
                            .text(data);

                        // Create avatar
                        var avatar = $(document.createElement('img'))
                            .addClass('rounded-circle me-1')
                            .attr('alt',data)
                            .css({
                                width: '32px',
                                height: '32px',
                            })
                            .attr('src',builder.Helper.gravatar(data,{size: '32px'}))
                            .prependTo(object);

                        // Return outerHTML
                        return object.prop('outerHTML');
                    },
                },
                {
                    target: 6,
                    visible: true,
                    title: 'Since',
                    name: 'openedOn',
                    data: 'openedOn',
                    render: function(data, type, row) {
                        var datetime = new Date(data);
                        var badge = $(document.createElement('time'))
                            .addClass('timeago ')
                            .attr('data-bs-toggle','tooltip')
                            .attr('data-bs-placement','top')
                            .attr('title',datetime.toLocaleString())
                            .attr('data-bs-title',datetime.toLocaleString())
                            .attr('datetime',datetime.toISOString())
                            .text(datetime.toLocaleString());
                        return badge.prop('outerHTML');
                    },
                },
                { target: 7, visible: false, responsivePriority: 7, title: 'Created on', name: 'created', data: 'created' },
                { target: 8, visible: false, responsivePriority: 8, title: 'Modified on', name: 'modified', data: 'modified' },
                { target: 9, visible: false, responsivePriority: 9, title: 'Office', name: 'office', data: 'office' },
                { target: 10, visible: false, responsivePriority: 10, title: 'Team', name: 'team', data: 'team' },
                { target: 11, visible: false, responsivePriority: 11, title: 'Category', name: 'category', data: 'category' },
                { target: 12, visible: false, responsivePriority: 12, title: 'Sub Category', name: 'subCategory', data: 'subCategory' },
                { target: 13, visible: false, responsivePriority: 13, title: 'Item', name: 'item', data: 'item' },
                { target: 14, visible: false, responsivePriority: 14, title: 'Description', name: 'description', data: 'description' },
                { target: 15, visible: false, responsivePriority: 15, title: 'Assigned by', name: 'assignedBy', data: 'assignedBy' },
                { target: 16, visible: false, responsivePriority: 16, title: 'Assigned on', name: 'assignedOn', data: 'assignedOn' },
                { target: 17, visible: false, responsivePriority: 17, title: 'Closed on', name: 'closedOn', data: 'closedOn' },
                { target: 18, visible: false, responsivePriority: 18, title: 'References', name: 'references', data: 'references' },
                { target: 19, visible: false, responsivePriority: 19, title: 'Meta Data', name: 'meta', data: 'meta' },
                { target: 20, visible: false, responsivePriority: 20, title: 'Files', name: 'files', data: 'files' },
            ],
        },
        function(layout, component){
            for(const [key, record] of Object.entries(sampleRecords.tickets)){
                if(record.status < 9){
                    layout.add(record);
                }
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