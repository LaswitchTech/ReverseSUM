$(document).ready(function(){

    const ListContainer = $('#list');

    // List
    const ListCard = new Card(
        ListContainer,
        {
            class: {
                container: "w-100",
                body: "p-0",
            },
            icon: "list-check",
            title: "Ticket List",
        },
        function(card){
            const ListTable = new Table(
                card.body,
                {
                    class: {
                        buttons: "px-4 pt-4",
                        table: "border-top",
                        footer: "px-4 pt-2 pb-4",
                    },
                    showButtonsLabel: false,
                    selectTools:false,
                    columnsVisibility:false,
                    actions:{
                      details:{
                        label:'Details',
                        icon:'eye',
                        action:function(event, table, node, row, data){
                            window.location.href = "?p=dispatchDetails";
                        },
                      },
                    },
                    dblclick:function(event, table, node, data){
                        window.location.href = "?p=dispatchDetails";
                    },
                    datatable:{
                        buttons:[
                            {
                                extend: 'collection',
                                text: 'Assigned To: <i class="me-1 bi bi-person-fill"></i>Me',
                                buttons: [
                                    {
                                        text: '<i class="me-1 bi bi-person-fill"></i>Me',
                                        className: 'active',
                                        action: function ( e, dt, node, config ) {

                                            // Filter logic
                                            dt.columns(5).search( AssignedTo ).draw();

                                            // Hide column
                                            dt.column(5).visible(false);

                                            // Update button label
                                            $(node).closest('.btn-group').children('.dropdown-toggle').html('Assigned To: <i class="me-1 bi bi-person-fill"></i>Me');

                                            // Set active state
                                            $(node).addClass('active').siblings().removeClass('active');
                                        },
                                        attr:  {
                                            'data-assign': 'Me'
                                        }
                                    },
                                    {
                                        text: '<i class="me-1 bi bi-people-fill"></i>All',
                                        action: function ( e, dt, node, config ) {

                                            // Filter logic
                                            dt.columns(5).search( '' ).draw();

                                            // Show column
                                            dt.column(5).visible(true);

                                            // Update button label
                                            $(node).closest('.btn-group').children('.dropdown-toggle').html('Assigned To: <i class="me-1 bi bi-people-fill"></i>All');

                                            // Set active state
                                            $(node).addClass('active').siblings().removeClass('active');
                                        },
                                        attr:  {
                                            'data-assign': 'All'
                                        }
                                    }
                                ]
                            },
                            {
                                extend: 'collection',
                                text: 'Created By: <i class="me-1 bi bi-person-fill"></i>Me',
                                buttons: [
                                    {
                                        text: '<i class="me-1 bi bi-person-fill"></i>Me',
                                        className: 'active',
                                        action: function ( e, dt, node, config ) {

                                            // Filter logic
                                            dt.columns(2).search( Owner ).draw();

                                            // Hide column
                                            dt.column(2).visible(false);

                                            // Update button label
                                            $(node).closest('.btn-group').children('.dropdown-toggle').html('Created By: <i class="me-1 bi bi-person-fill"></i>Me');

                                            // Set active state
                                            $(node).addClass('active').siblings().removeClass('active');
                                        },
                                        attr:  {
                                            'data-owner': 'Me'
                                        }
                                    },
                                    {
                                        text: '<i class="me-1 bi bi-people-fill"></i>All',
                                        action: function ( e, dt, node, config ) {

                                            // Filter logic
                                            dt.columns(2).search( '' ).draw();

                                            // Show column
                                            dt.column(2).visible(true);

                                            // Update button label
                                            $(node).closest('.btn-group').children('.dropdown-toggle').html('Created By: <i class="me-1 bi bi-people-fill"></i>All');

                                            // Set active state
                                            $(node).addClass('active').siblings().removeClass('active');
                                        },
                                        attr:  {
                                            'data-owner': 'All'
                                        }
                                    }
                                ]
                            }
                        ],
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
                                    // Get Gravatar
                                    var gravatar = new Gravatar(data, {size: '32px'});

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
                                        .attr('src',gravatar.url())
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
                                    var badge = Statuses[data];
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
                                    var badge = Priorities[data];
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
                                    // Get Gravatar
                                    var gravatar = new Gravatar(data, {size: '32px'});

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
                                        .attr('src',gravatar.url())
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
                },
                function(table,datatable){
                    if(typeof Owner !== 'undefined' && Owner !== null){
                        datatable.columns(2).search(Owner).draw();
                        datatable.column(2).visible(false);
                    }
                    if(typeof AssignedTo !== 'undefined' && AssignedTo !== null){
                        datatable.columns(5).search(AssignedTo).draw();
                        datatable.column(5).visible(false);
                    }
                    if(typeof Records !== 'undefined' && Records !== null){
                        for(const [key, record] of Object.entries(Records)){
                            if(record.status >= 9){
                                table.add(record);
                            }
                        }
                    }
                }, 
            );
        },
    );
});