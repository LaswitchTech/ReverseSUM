$(document).ready(function(){

    // Layout
    const sampleLayout = builder.Layout(
        "profile", //Layout Name
        "#layout", //Selector or JQuery Object to appendTo
        {
            class: { //Add Classes
                component: null, //Component Element
            },
            status: 7, //Status
            isActive: true, //Active
            isDeleted: false, //Deleted
            isBanned: false, //Banned
            callback: { //Callbacks
                isActive: function(value, button,layout){ //isActive Callback
                    console.log('isActive',value,button,layout);
                },
                isDeleted: function(value,button,layout){ //isDeleted Callback
                    console.log('isDeleted',value,button,layout);
                },
                isBanned: function(value,button,layout){ //isBanned Callback
                    console.log('isBanned',value,button,layout);
                },
            },
        },
        function(layout,component){ //Callback

            // Details
            layout.detail(
                function(item){
                    item.field.addClass('d-flex flex-column justify-content-center align-items-center py-3');
                    item.field.avatar = builder.Component(
                        "avatar",
                        item.field,
                        {
                            class: {
                                component: "rounded-circle",
                            },
                            email: sampleRecords.profile.username,
                            size: "128px",
                        },
                    );
                    item.field.name = $(document.createElement('h5')).addClass('my-0 mt-2').text(sampleRecords.profile.name).appendTo(item.field);
                },
            );
            if(sampleRecords.profile.username){
                layout.detail(
                    {
                        icon: 'at',
                    },
                    function(item){
                        item.field.addClass('d-flex justify-content-between align-items-center');
                        item.field.header = $(document.createElement('div')).addClass('fw-bold text-capitalize text-nowrap me-2').text('Username:').appendTo(item.field);
                        item.field.value = $(document.createElement('div')).addClass('text-end').appendTo(item.field);
                        item.field.value.link = $(document.createElement('a')).attr('href','mailto:' + sampleRecords.profile.username).text(sampleRecords.profile.username).appendTo(item.field.value);
                    },
                );
            }
            if(sampleRecords.profile.created){
                layout.detail(
                    {
                        icon: 'calendar-event',
                    },
                    function(item){
                        item.field.addClass('d-flex justify-content-between align-items-center');
                        item.field.header = $(document.createElement('div')).addClass('fw-bold text-capitalize text-nowrap me-2').text('Joined:').appendTo(item.field);
                        item.field.value = $(document.createElement('div')).addClass('text-end').appendTo(item.field);

                        // Configure Datetime
                        let datetime = null;
                        if(sampleRecords.profile.created !== null){
                            datetime = new Date(sampleRecords.profile.created);
                        } else {
                            datetime = new Date();
                        }
        
                        // Create Time
                        item.field.value.time = $(document.createElement('time')).attr({
                            'class': 'timeago',
                            'title': datetime.toLocaleString(),
                            'datetime': datetime.toLocaleString(),
                            'data-bs-title': datetime.toLocaleString(),
                            'data-bs-toggle': 'tooltip',
                            'data-bs-placement': 'top',
                        }).text(datetime.toLocaleString()).appendTo(item.field.value);
        
                        // Initialize Tooltip
                        item.field.value.time.bootstrap = new bootstrap.Tooltip(item.field.value.time);
        
                        // Initialize Timeago
                        setTimeout(function(){ item.field.value.time.timeago(); }, 0);
                    },
                );
            }

            // About
            if(sampleRecords.profile.username){
                layout.about(
                    {
                        icon: 'envelope',
                    },
                    function(item){
                        item.field.addClass('d-flex justify-content-between align-items-center');
                        item.field.header = $(document.createElement('div')).addClass('fw-bold text-capitalize text-nowrap me-2').text('Email:').appendTo(item.field);
                        item.field.value = $(document.createElement('div')).addClass('text-end').appendTo(item.field);
                        item.field.value.link = $(document.createElement('a')).attr('href','mailto:' + sampleRecords.profile.username).text(sampleRecords.profile.username).appendTo(item.field.value);
                    },
                );
            }
            if(sampleRecords.profile.phone){
                layout.about(
                    {
                        icon: 'telephone',
                    },
                    function(item){
                        item.field.addClass('d-flex justify-content-between align-items-center');
                        item.field.header = $(document.createElement('div')).addClass('fw-bold text-capitalize text-nowrap me-2').text('Phone:').appendTo(item.field);
                        item.field.value = $(document.createElement('div')).addClass('text-end').appendTo(item.field);
                        item.field.value.link = $(document.createElement('a')).attr('href','tel:' + sampleRecords.profile.phone).text(builder.Helper.formatPhoneNumber(sampleRecords.profile.phone)).appendTo(item.field.value);
                    },
                );
            }
            if(sampleRecords.profile.mobile){
                layout.about(
                    {
                        icon: 'phone',
                    },
                    function(item){
                        item.field.addClass('d-flex justify-content-between align-items-center');
                        item.field.header = $(document.createElement('div')).addClass('fw-bold text-capitalize text-nowrap me-2').text('Mobile:').appendTo(item.field);
                        item.field.value = $(document.createElement('div')).addClass('text-end').appendTo(item.field);
                        item.field.value.link = $(document.createElement('a')).attr('href','tel:' + sampleRecords.profile.mobile).text(builder.Helper.formatPhoneNumber(sampleRecords.profile.mobile)).appendTo(item.field.value);
                    },
                );
            }
            if(sampleRecords.profile.address){
                layout.about(
                    {
                        icon: 'geo-alt',
                    },
                    function(item){
                        var address = sampleRecords.profile.address;
                        for(const [key, value] of Object.entries(['city','state','country','zipcode'])){
                            if(sampleRecords.profile[value]){
                                address += ', ' + sampleRecords.profile[value];
                            }
                        }
                        item.field.addClass('d-flex justify-content-between align-items-center');
                        item.field.header = $(document.createElement('div')).addClass('fw-bold text-capitalize text-nowrap me-2').text('Address:').appendTo(item.field);
                        item.field.value = $(document.createElement('div')).addClass('text-end').text(address).appendTo(item.field);
                    },
                );
            }

            // Tabs
            layout.tab('activity',{icon: 'activity'},
                function(tab,nav){

                    // Create Timeline
                    tab.timeline = builder.Component(
                        'timeline',
                        tab,
                        {
                            class: {
                                item: "border rounded",
                            },
                            order: "DESC",
                            showNow: true,
                            showStart: true,
                            defaults: {
                                icon: "circle",
                                color: "secondary",
                            },
                        },
                        function(timeline, component){
                            timeline.add(
                                {
                                    icon: "balloon",
                                    color: "success",
                                    type: "event",
                                    datetime: sampleRecords.profile.created,
                                },
                                function(object){
                            
                                    // Set Content
                                    var header = $(document.createElement("div")).addClass("card-header border-0").appendTo(object.item);
                                    header.h5 = $(document.createElement("h5")).addClass("card-title").text(sampleRecords.profile.username + " has joined!").appendTo(header);
                                }
                            );
                            timeline.add(
                                {
                                    icon: "person-check",
                                    color: "primary",
                                    type: "event",
                                    datetime: sampleRecords.profile.verifiedOn,
                                },
                                function(object){
                            
                                    // Set Content
                                    var header = $(document.createElement("div")).addClass("card-header border-0").appendTo(object.item);
                                    header.h5 = $(document.createElement("h5")).addClass("card-title").text(sampleRecords.profile.username + " has been verified!").appendTo(header);
                                }
                            );
                        },
                    );
                },
            );
            layout.tab('settings',{icon: 'gear'},
                function(tab,nav){

                    // Create Form
                    tab.form = builder.Component(
                        'form',
                        tab,
                        {
                            class:{
                                field: 'mb-3',
                            },
                            callback:{
                                submit: function(form){
                                    console.log(form.val());
                                },
                                val: function(form){
                                    console.log(form.val());
                                },
                                reset: function(form){
                                    console.log(form.val());
                                },
                                clear: function(form){
                                    console.log(form.val());
                                },
                            },
                        },
                        function(form, component){

                            // Adding Fields
                            for(const [key, value] of Object.entries(["name","address","city","state","country","zipcode","phone","mobile"])){

                                // Add Field
                                form.add(
                                    {
                                        name: value,
                                        label: value,
                                        type: 'text',
                                        value: null,
                                        class: {
                                            label: 'text-capitalize',
                                        },
                                    },
                                    function(input,form){

                                        // Set Value
                                        if(sampleRecords.profile[value]){
                                            input.val(sampleRecords.profile[value]);
                                        }
                                    },
                                );
                            }

                            // Save Button
                            form.add(
                                {
                                    name: 'submit',
                                    label: 'Submit',
                                    icon: 'save',
                                    type: 'submit',
                                    class: {
                                        label: 'w-100',
                                    },
                                },
                                function(input,form){
                                    input.removeClass('mb-3');
                                },
                            );
                        },
                    );
                },
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
    scriptCode += '    "profile", //Layout Name' + "\n";
    scriptCode += '    "#layout", //Selector or JQuery Object to appendTo' + "\n";

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