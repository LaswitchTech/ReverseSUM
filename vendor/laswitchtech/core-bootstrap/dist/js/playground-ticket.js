class UtilityClass  {
    
    _builder = null;
    _id = null;

    constructor(){

        // Set Builder
        this._builder = builder;

        // Generate Incremental ID
        this._id = this._builder.count();
    }
}

class ComponentClass extends UtilityClass {

    _bootstrap = null;
    _selector = null;
    _options = {};
    _callback = null;
    _component = null;
    _properties = {};
    _counter = 0;

    constructor(builder, param1 = null, param2 = null, param3 = null){
        
        // Call Parent
        super(builder);

        // Set Self
        const self = this;

        // Set selector, options, and callback
        [param1, param2, param3].forEach(param => {
            if(param !== null){
                if (typeof param === 'string' || param instanceof jQuery) {
                    if(typeof param === 'string'){
                        param = $(param);
                    }
                    self._selector = param;
                } else if (typeof param === 'object') {
                    self._options = param;
                } else if (typeof param === 'function') {
                    self._callback = param;
                }
            }
        });

        // Init Component
        this._init();

        // Configure Options
        this.config(this._options);

        // Create Component
        this._create();
        
        // Execute Callback
        if(typeof this._callback === 'function'){
            setTimeout(() => this._callback(this, this._component), 0);
        }

        // Timeout
        setTimeout(() => this._timeout(), 0);

        // Insert Component
        this._insert();
    }

    _create(){}

    _init(){}

    _timeout(){}

    _config(name,options){
        if(typeof this._properties[name] !== 'undefined'){
            switch(name){
                default:
                    this._properties[name] = options;
                    break;
            }
        }
    }

    _insert(){
        // Check if Selector is Set
        if(this._component && this._selector){

            // Append to Selector
            this.appendTo(this._selector);
        }
    }

    _count(){
        this._counter++;
        return this._counter;
    }

    config(options = null){

        // Check if Options is Set
        if(options == null){
            options = this._options;
        }

        // Configure Options
        for(const [key, value] of Object.entries(options)){
            if(typeof this._properties[key] !== 'undefined'){
                switch(key){
                    case"callback":
                    case"properties":
                        for(const [k, v] of Object.entries(value)){
                            if(typeof this._properties[key][k] !== 'undefined'){
                                this._properties[key][k] = v;
                            }
                        }
                        break;
                    case"class":
                        for(const [section, classes] of Object.entries(value)){
                            if(this._properties[key][section] != null){
                                this._properties[key][section] += ' ' + classes;
                            } else {
                                this._properties[key][section] = classes;
                            }
                        }
                        break;
                    default:
                        if(typeof value === 'object'){
                            this._config(key,value);
                        } else {
                            this._properties[key] = value;
                        }
                        break;
                }
            }
        }

        // Return Object
        return this;
    }

    appendTo(object){
        
        // Append Object To
        this._component.appendTo(object);

        // Return Object
        return this;
    }

    prependTo(object){
        
        // Prepend Object To
        this._component.prependTo(object);

        // Return Object
        return this;
    }

    append(object){
        
        // Append Object
        this._component.append(object);

        // Return Object
        return this;
    }

    prepend(object){
        
        // Prepend Object
        this._component.prepend(object);

        // Return Object
        return this;
    }

    text(){

        // Return Object
        return this._component.text();
    }

    html(){

        // Return Object
        return this._component.html();
    }

    outerHTML(){

        // Return Object
        return this._component[0].outerHTML;
    }

    show(){

        // Show Object
        this._component.show();

        // Return Object
        return this;
    }

    hide(){

        // Hide Object
        this._component.hide();

        // Return Object
        return this;
    }
}

class Layout extends ComponentClass {

    #references = {};

    _init(){
        this._properties = {
            class: {
                component: null,
            },
            callback: {
                status: function(element,layout){ console.log(element,layout); },
                priority: function(element,layout){ console.log(element,layout); },
                post: function(post,feed,layout){ console.log(post,feed,layout); },
                share: function(values){ console.log(values); },
                reply: function(values){ return values; },
                edit: function(values){ return values; },
                delete: function(post){ console.log(post); },
                close: function(layout){},
                archive: function(layout){},
                assign: function(value,layout){ console.log(value,layout); },
                submit: function(layout){},
                clear: function(layout){},
                reset: function(layout){},
                category: function(layout){},
                subCategory: function(layout){},
                item: function(layout){},
                accept: function(layout){},
                decline: function(layout){},
                val: function(values){ return values; },
                addReference: function(values){ console.log(values); },
                removeReference: function(type, reference){ console.log(type, reference); },
            },
            title: null,
            icon: null,
            status: null,
            statuses: {},
            priority: null,
            priorities: {},
            subject: null,
            description: null,
            owner: null,
            assignedTo: null,
            assignedToTitle: null,
            remoteID: null,
            remotePassword: null,
            openedOn: null,
            closedOn: null,
            start: null,
            end: null,
            ui: {
                reply: true,
                share: true,
                close: true,
                archive: true,
                edit: true,
                delete: true,
                accept: true,
                decline: true,
                calendar: true,
                remote: true,
                references: true,
                files: true,
            },
            references: {},
            referencesTypes: [],
            referencesTypesDefault: null,
            files: {},
        };
    }
            
    _config(name,options){
        if(typeof this._properties[name] !== 'undefined'){
            switch(name){
                case"ui":
                    for(const [key, value] of Object.entries(options)){
                        if(typeof this._properties[name][key] !== 'undefined'){
                            this._properties[name][key] = value;
                        }
                    }
                    break;
                default:
                    this._properties[name] = options;
                    break;
            }
        }
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'layout' + this._id,
            'class': 'row',
        });
        this._component.id = this._component.attr('id');

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }

        // Create Column
        this._component.col = $(document.createElement('div')).addClass('col-12').appendTo(this._component);

        // Create Card
        this._component.card = this._builder.Component(
            'card',
            this._component.col,
            {
                class: {
                    container: "w-100",
                    body: "p-0",
                },
                icon: this._properties.icon,
                title: this._properties.title,
            },
            function(card,component){

                // Create Grid
                var grid = $(document.createElement('div')).addClass('row').appendTo(component.body);
                grid.col1 = $(document.createElement('div')).addClass('col-6 col-xxl-7').appendTo(grid);
                grid.col2 = $(document.createElement('div')).addClass('col-6 col-xxl-5').appendTo(grid);
                grid.col2.row1 = $(document.createElement('div')).addClass('row p-3').appendTo(grid.col2);
                grid.col2.row1.col1 = $(document.createElement('div')).addClass('col-12').appendTo(grid.col2.row1);
                grid.col1.row1 = $(document.createElement('div')).addClass('row p-3').appendTo(grid.col1);
                grid.col1.row1.col1 = $(document.createElement('div')).addClass('col-6').appendTo(grid.col1.row1);
                grid.col1.row1.col2 = $(document.createElement('div')).addClass('col-6').appendTo(grid.col1.row1);
                grid.col1.row1.col3 = $(document.createElement('div')).addClass('col-12').appendTo(grid.col1.row1);
                grid.col1.row2 = $(document.createElement('div')).addClass('row p-3 pb-0').appendTo(grid.col1);
                grid.col1.row2.col1 = $(document.createElement('div')).addClass('col-12 border-bottom').appendTo(grid.col1.row2);
                grid.col1.row3 = $(document.createElement('div')).addClass('row p-3').appendTo(grid.col1);
                grid.col1.row3.col1 = $(document.createElement('div')).addClass('col-12').appendTo(grid.col1.row3);

                // Save Grid
                self._component.grid = grid;

                // Create Status Box
                self._component.status = self._builder.Component(
                    'badge',
                    grid.col1.row1.col1,
                    {
                        class: {
                            component: 'h-100 text-bg-' + self._properties.statuses[self._properties.status].color,
                        },
                        icon:self._properties.statuses[self._properties.status].icon,
                        color:self._properties.statuses[self._properties.status].color,
                        type: "small",
                    },
                    function(badge,component){
                        
                        // Set Content
                        self.status(self._properties.status);

                        // Add Event
                        if(Object.entries(self._properties.statuses).length > 1){
                            // Change Status
                            self._component.status.modal = self._builder.Component(
                                'modal',
                                component,
                                {
                                    callback: {
                                        submit: function(element,modal){
                                            self._component.status.modal.form.submit();
                                        },
                                    },
                                    icon: "question-circle",
                                    title: "Change status to",
                                },
                                function(modal,component){
                                    self._component.status.modal.form = self._builder.Component(
                                        'form',
                                        component.body,
                                        {
                                            callback: {
                                                submit: function(form){
                                                    self.status(form.val().status);
                                                    modal.hide();
                                                },
                                            },
                                        },
                                        function(form,component){
                                            form.add(
                                                {
                                                    name: 'status',
                                                    label: 'Status',
                                                    icon: 'patch-exclamation',
                                                    type: 'select',
                                                },
                                                function(input,form){
                                                    for(const [key, status] of Object.entries(self._properties.statuses)){
                                                        input.add(status.level,status.label + ' - ' + status.description);
                                                    }
                                                    input.val(self._properties.status);
                                                },
                                            );
                                        },
                                    );
                                },
                            );
                        }
                    },
                );

                // Create Priority Box
                self._component.priority = self._builder.Component(
                    'badge',
                    grid.col1.row1.col2,
                    {
                        class: {
                            component: 'h-100 text-bg-' + self._properties.priorities[self._properties.priority].color,
                        },
                        icon:self._properties.priorities[self._properties.priority].icon,
                        color:self._properties.priorities[self._properties.priority].color,
                        type: "small",
                    },
                    function(badge,component){
                        
                        // Set Content
                        self.priority(self._properties.priority);

                        // Add Event
                        if(Object.entries(self._properties.priorities).length > 1){
                            // Change Priority
                            self._component.priority.modal = self._builder.Component(
                                'modal',
                                component,
                                {
                                    callback: {
                                        submit: function(element,modal){
                                            self._component.priority.modal.form.submit();
                                        },
                                    },
                                    icon: "question-circle",
                                    title: "Change priority to",
                                },
                                function(modal,component){
                                    self._component.priority.modal.form = self._builder.Component(
                                        'form',
                                        component.body,
                                        {
                                            callback: {
                                                submit: function(form){
                                                    self.priority(form.val().priority);
                                                    modal.hide();
                                                },
                                            },
                                        },
                                        function(form,component){
                                            form.add(
                                                {
                                                    name: 'priority',
                                                    label: 'Priority',
                                                    icon: 'exclamation-octagon',
                                                    type: 'select',
                                                },
                                                function(input,form){
                                                    for(const [key, priority] of Object.entries(self._properties.priorities)){
                                                        input.add(priority.level,priority.label + ' - ' + priority.description);
                                                    }
                                                    input.val(self._properties.priority);
                                                },
                                            );
                                        },
                                    );
                                },
                            );
                        }
                    },
                );

                // Create Subject
                self._component.subject = $(document.createElement("h2")).html(self._properties.subject).appendTo(grid.col1.row2.col1);

                // Create Datetime
                self._component.datetime = {};

                // Add Opened On Datetime
                self._component.datetime.openedOn = new Date(self._properties.openedOn);
                self._component.datetime.closedOn = new Date(self._properties.ui.closedOn);

                // Create Datetimes
                self._component.datetimes = $(document.createElement('div')).addClass('mt-1 mb-2 d-flex justify-content-between').appendTo(grid.col1.row2.col1);
                
                // Create Opened On Datetime
                if(self._properties.openedOn){
                    self._component.openedOn = $(document.createElement('div')).appendTo(self._component.datetimes);
                    self._component.openedOn.Label = $(document.createElement('span')).addClass('me-2').text('Opened On:').appendTo(self._component.openedOn);
                    self._component.openedOn.icon = $(document.createElement('i')).addClass('bi-clock me-1').appendTo(self._component.openedOn);
                    self._component.openedOn.timeago = $(document.createElement('time')).attr({
                        'class': 'timeago',
                        'title': self._component.datetime.openedOn.toLocaleString(),
                        'datetime': self._component.datetime.openedOn.toLocaleString(),
                        'data-bs-toggle': 'tooltip',
                        'data-bs-placement': 'top',
                        'data-bs-title': self._component.datetime.openedOn.toLocaleString(),
                    }).text(self._component.datetime.openedOn.toLocaleString()).appendTo(self._component.openedOn);
                    self._component.openedOn.timeago.bootstrap = new bootstrap.Tooltip(self._component.openedOn.timeago);
                    setTimeout(function(){ self._component.openedOn.timeago.timeago(); },0);
                }

                // Create Closed On Datetime
                if(self._properties.ui.closedOn){
                    self._component.closedOn = $(document.createElement('div')).appendTo(self._component.datetimes);
                    self._component.closedOn.Label = $(document.createElement('span')).addClass('me-2').text('Closed On:').appendTo(self._component.closedOn);
                    self._component.closedOn.icon = $(document.createElement('i')).addClass('bi-clock me-1').appendTo(self._component.closedOn);
                    self._component.closedOn.timeago = $(document.createElement('time')).attr({
                        'class': 'timeago',
                        'title': self._component.datetime.closedOn.toLocaleString(),
                        'datetime': self._component.datetime.closedOn.toLocaleString(),
                        'data-bs-toggle': 'tooltip',
                        'data-bs-placement': 'top',
                        'data-bs-title': self._component.datetime.closedOn.toLocaleString(),
                    }).text(self._component.datetime.closedOn.toLocaleString()).appendTo(self._component.closedOn);
                    self._component.closedOn.timeago.bootstrap = new bootstrap.Tooltip(self._component.closedOn.timeago);
                    setTimeout(function(){ self._component.closedOn.timeago.timeago(); },0);
                }
                
                // Create Description
                self._component.description = $(document.createElement("p")).html(self._properties.description).appendTo(grid.col1.row2.col1);

                // Configure Feed Controls
                self._properties.controls = {};

                // Add Reply Feed Control
                if(self._properties.ui.reply){
                    self._properties.controls.reply = {
                        icon:"reply",
                        label:"Reply",
                        color:"primary",
                        callback:function(control,post,feed){
                            self.reply(control,post.content.html(),post.user.link.text());
                        },
                    };
                }

                // Add Share Feed Control
                if(self._properties.ui.share){
                    self._properties.controls.share = {
                        icon:"share",
                        label:"Share",
                        color:"info",
                        callback:function(control,post,feed){
                            self.share(control,post.id);
                        },
                    };
                }

                // Add Edit Feed Control
                if(self._properties.ui.edit){
                    self._properties.controls.edit = {
                        icon:"pencil-square",
                        label:"Edit",
                        color:"warning",
                        callback:function(control,post,feed){
                            self.edit(control,post);
                        },
                    };
                }

                // Add Delete Feed Control
                if(self._properties.ui.delete){
                    self._properties.controls.delete = {
                        icon:"trash",
                        label:"Delete",
                        color:"danger",
                        callback:function(control,post,feed){
                            self.delete(control,post,feed);
                        },
                    };
                }

                // Create Feed
                self._component.feed = self._builder.Component(
                    "feed",
                    grid.col1.row3.col1,
                    {
                        controls: self._properties.controls,
                    },
                    function(feed,component){},
                );

                // Create Controls
                self._component.controls = $(document.createElement("div")).addClass('btn-group w-100 mb-3').appendTo(grid.col2.row1.col1);

                // Add Reply Control
                if(self._properties.ui.reply){
                    self.control(
                        {
                            label: 'Reply',
                            icon: 'reply',
                            color: 'primary',
                            click: function(control,layout){},
                        },
                        function(control,layout){
                            self.reply(control);
                        },
                    );
                }
    
                // Add Control Share
                if(self._properties.ui.share){
                    self.control(
                        {
                            label: 'Share',
                            icon: 'share',
                            color: 'info',
                            click: function(control,layout){},
                        },
                        function(control,layout){
                            self.share(control);
                        },
                    );
                }
    
                // Add Control Close
                if(self._properties.ui.close){
                    self.control(
                        {
                            label: 'Close',
                            icon: 'x-circle',
                            color: 'dark',
                            click: function(control,layout){
                                self.close();
                            },
                        },
                        function(control,layout){},
                    );
                }
    
                // Add Control Archive
                if(self._properties.ui.archive){
                    self.control(
                        {
                            label: 'Archive',
                            icon: 'archive',
                            color: 'light',
                            click: function(control,layout){
                                self.archive();
                            },
                        },
                        function(control,layout){},
                    );
                }

                // Create Owner
                self._component.owner = $(document.createElement("h4")).html('Owner').appendTo(grid.col2.row1.col1);
                self._component.owner.container = $(document.createElement("div")).addClass('d-flex justify-content-start align-items-center ms-2 user-select-none').appendTo(grid.col2.row1.col1);
                self._component.owner.container.avatar = self._builder.Component(
                    "avatar",
                    self._component.owner.container,
                    {
                        class: {
                            component: "rounded-circle",
                        },
                        email: self._properties.owner,
                        extension: false,
                        size: "48px",
                    },
                    function(avatar,component){
                    },
                );
                self._component.owner.container.contactInfo = $(document.createElement("div")).addClass('ms-2 d-flex flex-column justify-content-center align-items-start').appendTo(self._component.owner.container);
                self._component.owner.container.contactInfo.contact = $(document.createElement("strong")).text(self._properties.owner).appendTo(self._component.owner.container.contactInfo);

                // Create Assigned
                self._component.assigned = $(document.createElement("h4")).html('Assigned To').addClass('mt-3').appendTo(grid.col2.row1.col1);
                self._component.assigned.container = $(document.createElement("div")).addClass('d-flex justify-content-start align-items-center ms-2 user-select-none cursor-pointer').appendTo(grid.col2.row1.col1);
                self._component.owner.container.avatar = self._builder.Component(
                    "avatar",
                    self._component.assigned.container,
                    {
                        class: {
                            component: "rounded-circle",
                        },
                        email: self._properties.assignedTo,
                        extension: false,
                        size: "48px",
                    },
                    function(avatar,component){
                    },
                );
                self._component.assigned.container.contactInfo = $(document.createElement("div")).addClass('ms-2 d-flex flex-column justify-content-center align-items-start').appendTo(self._component.assigned.container);
                self._component.assigned.container.contactInfo.contact = $(document.createElement("strong")).text(self._properties.assignedTo).appendTo(self._component.assigned.container.contactInfo);
                self._component.assigned.container.contactInfo.title = $(document.createElement("span")).text(self._properties.assignedToTitle).appendTo(self._component.assigned.container.contactInfo);
                self._component.assigned.modal = self._builder.Component(
                    'modal',
                    self._component.assigned.container,
                    {
                        callback: {
                            submit: function(element,modal){
                                self._component.assigned.form.submit();
                            },
                        },
                        icon: "question-circle",
                        title: "Assign ticket to",
                    },
                    function(modal,element){
                        self._component.assigned.form = self._builder.Component(
                            "form",
                            element.body,
                            {
                                callback:{
                                    submit: function(form){
                                        self._component.assigned.modal.hide();

                                        // Assign Value
                                        self.assign(form.val().assignedTo);
                                    },
                                },
                            },
                            function(form,element){

                                // Create AssignedTo
                                self._component.category = form.add(
                                    {
                                        name: 'assignedTo',
                                        label: 'Assign',
                                        icon: 'person-check',
                                        type: 'select',
                                        value: 'administrator',
                                        options: [
                                            {id:'michael.smith@domain.com',text:'Micheal Smith - Team Lead Support'},
                                            {id:'john.doe@domain.com',text:'John Doe - Team Member Support'},
                                            {id:'jane.doe@domain.com',text:'Jane Doe - Human Ressource Representative'},
                                        ],
                                    },
                                    function(input,form){
                                        
                                        // Set Value
                                        input.val(self._properties.assignedTo);
                                    },
                                );
                            },
                        );
                    },
                );

                // Create Form
                self._component.details = self._builder.Component(
                    "form",
                    grid.col2.row1.col1,
                    {
                        class:{
                            component: 'mt-3',
                            input: null,
                            label: null,
                            field: 'mb-2',
                        },
                        callback:{
                            submit: function(form){},
                            val: function(values){},
                            reset: function(form){},
                            clear: function(form){},
                        },
                    },
                    function(form,component){

                        // Create Header
                        self._component.details.header = $(document.createElement("h4")).html('Details').appendTo(component);

                        // Create Category
                        self._component.category = form.add(
                            {
                                name: 'category',
                                label: 'Category',
                                icon: 'diagram-2',
                                type: 'select',
                                value: 'administrator',
                                options: [
                                    {id:'administrator',text:'Administrator'},
                                    {id:'moderator',text:'Moderator'},
                                    {id:'user',text:'User'},
                                ],
                            },
                            function(input,form){},
                        );

                        // Create Sub-Category
                        self._component.subCategory = form.add(
                            {
                                name: 'subCategory',
                                label: 'Sub-Category',
                                icon: 'diagram-3',
                                type: 'select',
                                value: 'administrator',
                                options: [
                                    {id:'administrator',text:'Administrator'},
                                    {id:'moderator',text:'Moderator'},
                                    {id:'user',text:'User'},
                                ],
                            },
                            function(input,form){
                            },
                        );

                        // Create Item
                        self._component.item = form.add(
                            {
                                name: 'item',
                                label: 'Item',
                                icon: 'node-plus',
                                type: 'select',
                                value: 'administrator',
                                options: [
                                    {id:'administrator',text:'Administrator'},
                                    {id:'moderator',text:'Moderator'},
                                    {id:'user',text:'User'},
                                ],
                            },
                            function(input,form){},
                        );

                        // Create Submit
                        self._component.submit = form.add(
                            {
                                name: 'submit',
                                label: 'Save changes',
                                icon: 'save',
                                type: 'submit',
                                class: {
                                    label: 'w-100',
                                },
                            },
                            function(input,form){},
                        );

                        // Create Calendar
                        if(self._properties.ui.calendar){
                            self._component.calendar = $(document.createElement("div")).addClass('mb-2').appendTo(component);
                            self._component.calendar.component = self._builder.Component(
                                "calendar",
                                self._component.calendar,
                                {
                                    class: {
                                        header: 'p-0',
                                    },
                                    headerToolbar: {
                                        left: 'prev,next',
                                        center: '',
                                        right: 'title'
                                    },
                                    initialView: 'dayGridMonth',
                                    initialDate: self._properties.start,
                                    events: [
                                        {
                                            title: self._properties.subject,
                                            description: self._properties.description,
                                            icon: 'question',
                                            start: self._properties.start,
                                            end: self._properties.end,
                                            allDay: true,
                                            color: 'info',
                                        },
                                    ],
                                },
                                function(calendar,component){
                                },
                            );
                        }

                        // Create Accept
                        if(self._properties.ui.accept){
                            self._component.accept = form.add(
                                {
                                    name: 'accept',
                                    label: 'Accept',
                                    icon: 'check-lg',
                                    type: 'submit',
                                    class: {
                                        label: 'w-100',
                                    },
                                },
                                function(input,form){},
                            );
                        }

                        // Create Decline
                        if(self._properties.ui.decline){
                            self._component.decline = form.add(
                                {
                                    name: 'decline',
                                    label: 'Decline',
                                    icon: 'x-lg',
                                    type: 'submit',
                                    color: 'danger',
                                    class: {
                                        label: 'w-100',
                                    },
                                },
                                function(input,form){},
                            );
                        }

                        // Create Remote Access
                        if(self._properties.ui.remote){
                            self._component.remote = $(document.createElement("div")).addClass('mb-2 d-flex flex-column justify-content-center align-items-start').appendTo(component);
                            self._component.remote.header = $(document.createElement("h4")).html('Remote Access').appendTo(self._component.remote);
                            self._component.remote.list = self._builder.Component(
                                'list',
                                self._component.remote,
                                {
                                    class: {
                                        component: "bg-transparent rounded w-100 border-0",
                                    },
                                },
                                function(list, component){
                                    list.add(
                                        {
                                            icon: 'hash',
                                            field: self._properties.ui.remoteID,
                                            click: function(item){
                                                self._builder.Helper.copyToClipboard(self._properties.ui.remoteID);
                                            }
                                        },
                                        function(item){},
                                    );
                                    list.add(
                                        {
                                            icon: 'key-fill',
                                            field: self._properties.ui.remotePassword,
                                            click: function(item){
                                                self._builder.Helper.copyToClipboard(self._properties.ui.remotePassword);
                                            }
                                        },
                                        function(item){},
                                    );
                                }, 
                            );
                        }

                        // Continue
                    },
                );

                // Create References
                if(self._properties.ui.references){

                    // Create References Form
                    self._component.referencesForm = self._builder.Component(
                        "form",
                        grid.col2.row1.col1,
                        {
                            class:{
                                component: 'mb-2 d-flex flex-column justify-content-center align-items-start',
                                input: null,
                                label: null,
                                field: 'mb-2',
                            },
                            callback:{
                                submit: function(form){

                                    // Retrieve Values
                                    var values = form.val();

                                    // Add Reference
                                    self.reference(values.type,values.reference);
                                    
                                    // Execute Callback
                                    if(typeof self._properties.callback.addReference === 'function'){
                                        self._properties.callback.addReference(values);
                                    }

                                    // Reset Form
                                    form.reset();
                                },
                                val: function(values){ return values; },
                                reset: function(form){},
                                clear: function(form){},
                            },
                        },
                        function(form,component){
                            component.header = $(document.createElement("h4")).html('References').appendTo(component);
                            self._component.references = self._builder.Component(
                                'list',
                                component,
                                {
                                    class: {
                                        component: "bg-transparent rounded w-100 border-0",
                                    },
                                },
                                function(list, component){
                                    self._component.referencesComponent = component;
                                    list.add(
                                        {
                                            actions: false,
                                        },
                                        function(item,list){
                                            item.prependTo(component);
                                            item.actions = $(document.createElement('div')).addClass('flex-shrink-1 mx-1 btn-group').appendTo(item.container);
                                            form.add(
                                                {
                                                    name: 'submit',
                                                    icon: 'plus-lg',
                                                    type: 'submit',
                                                    class: {
                                                        input: 'btn-sm',
                                                    },
                                                },
                                                function(submit,form){
                                                    submit.input.appendTo(item.actions);
                                                    submit.remove();
                                                },
                                            );
                                            item.type = form.add(
                                                {
                                                    name: 'type',
                                                    type: 'select',
                                                    options: self._properties.referencesTypes,
                                                    value: self._properties.referencesTypesDefault,
                                                },
                                                function(type,form){
                                                    type.label.remove();
                                                    type.input.addClass('form-select-sm');
                                                    type.removeClass('mb-2').appendTo(item.field);
                                                    item.reference = form.add(
                                                        {
                                                            name: 'reference',
                                                            type: 'text',
                                                        },
                                                        function(reference,form){
                                                            reference.input.attr('placeholder','Reference').addClass('border-start form-control-sm').appendTo(type);
                                                            reference.remove();
                                                        },
                                                    );
                                                },
                                            );
                                        },
                                    );

                                    // Import References
                                    for(const [type, references] of Object.entries(self._properties.references)){
                                        for(const [key, reference] of Object.entries(references)){
                                            self.reference(type,reference);
                                        }
                                    }
                                },
                            );
                        },
                    );
                }

                // Create Files
                if(self._properties.ui.files){
                    self._component.files = $(document.createElement("div")).addClass('mb-2 d-flex flex-column justify-content-center align-items-start').appendTo(grid.col2.row1.col1);
                    self._component.files.header = $(document.createElement("h4")).html('Files').appendTo(self._component.files);
                    self._component.files.list = self._builder.Component(
                        'list',
                        self._component.files,
                        {
                            class: {
                                component: "bg-transparent rounded w-100 border-0",
                            },
                        },
                        function(list, component){},
                    );
                }

                // Continue
            },
        );
    }

    reference(type,reference){

        // Set Self
        const self = this;

        // Check if Type and Reference are provided
        if(type == null || reference == null || typeof reference !== 'string' || reference.length <= 0){
            return self;
        }

        // Check if Reference Type is listed in References Types Array
        for(const [key, value] of Object.entries(self._properties.referencesTypes)){
            if(value.id === type){

                // Check if Reference List Exists
                if(typeof self.#references[type] === 'undefined'){

                    // Create Reference Object
                    self.#references[type] = {};

                    // Create Reference List Object and Element
                    self.#references[type].object = self._component.references.add(
                        {
                            icon: "tag",
                            field: type + ":",
                        },
                        function(item,list){

                            // Add Class
                            item.field.addClass('text-uppercase');

                            // Save Reference Type Element
                            self.#references[type].element = item;
                        },
                    );

                    // Create Reference List References Badges
                    self.#references[type].references = {};
                }

                // Check if References Object Exists
                if(typeof self.#references[type].references[reference] === 'undefined'){

                    // Create Reference
                    self.#references[type].references[reference] = {};

                    // Create Reference Badge
                    self.#references[type].references[reference].reference = $(document.createElement('span'))
                        .addClass('badge text-bg-primary rounded-0 rounded-start ms-1 cursor-pointer')
                        .text(reference)
                        .click(function(){
                            self._builder.Helper.copyToClipboard(reference);
                        })
                        .appendTo(self.#references[type].element.field);

                    // Create Delete Badge
                    self.#references[type].references[reference].delete = $(document.createElement('span'))
                        .addClass('badge text-bg-danger rounded-0 rounded-end cursor-pointer')
                        .html('<i class="bi bi-x-lg"></i>')
                        .click(function(){

                            // Remove Reference
                            self.#references[type].references[reference].reference.remove();

                            // Remove Delete
                            self.#references[type].references[reference].delete.remove();

                            // Delete Reference
                            delete self.#references[type].references[reference];

                            // Check for Empty References Type
                            if(Object.entries(self.#references[type].references).length <= 0){
                                    
                                    // Remove Reference Type
                                    self.#references[type].element.remove();
    
                                    // Delete Reference Type
                                    delete self.#references[type];
                            }
                            
                            // Check for Callback
                            if(typeof self._properties.callback.removeReference === 'function'){
                                self._properties.callback.removeReference(type,reference);
                            }
                        })
                        .appendTo(self.#references[type].element.field);
                }
                
                // Return
                return self;
            }
        }

        console.log('Reference Type "' + type + '" is not listed in References Types');
        return self;
    }

    status(value = null){

        // Set Self
        const self = this;

        // Retrieve Component
        let component = self._component.status.component();

        // Check if value is provided
        if(value && typeof self._properties.statuses[parseInt(value)] !== 'undefined'){
            self._properties.status = parseInt(value);

            // Remove Color
            var classes = component[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].startsWith('text-bg-')) {
                    component.removeClass(classes[i]);
                }
            }
            classes = component.iconFrame[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].startsWith('text-bg-')) {
                    component.iconFrame.removeClass(classes[i]);
                }
            }

            // Set Color
            component.addClass('text-bg-' + self._properties.statuses[self._properties.status].color);
            component.iconFrame.addClass('text-bg-' + self._properties.statuses[self._properties.status].color);

            // Remove Icon
            classes = component.icon[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].startsWith('bi-')) {
                    component.icon.removeClass(classes[i]);
                }
            }

            // Set Icon
            component.icon.addClass('bi-' + self._properties.statuses[self._properties.status].icon);

            // Check for Header
            component.header = component.find('h4');
            if(component.header.length <= 0){
                component.header = $(document.createElement("h4")).appendTo(component.content);
            }
            
            // Set Header
            component.header.html(self._properties.statuses[self._properties.status].label);

            // Check for Paragraph
            component.paragraph = component.find('p');
            if(component.paragraph.length <= 0){
                component.paragraph = $(document.createElement("p")).appendTo(component.content);
            }
            
            // Set Paragraph
            component.paragraph.html("Status");
        }

        // Execute Callback
        if(typeof self._properties.callback.status === 'function'){
            self._properties.callback.status(component, self);
        }

        // Return
        return self._properties.status;
    }

    priority(value = null){

        // Set Self
        const self = this;

        // Retrieve Component
        let component = self._component.priority.component();

        // Check if value is provided
        if(value && typeof self._properties.priorities[parseInt(value)] !== 'undefined'){
            self._properties.priority = parseInt(value);

            // Remove Color
            var classes = component[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].startsWith('text-bg-')) {
                    component.removeClass(classes[i]);
                }
            }
            classes = component.iconFrame[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].startsWith('text-bg-')) {
                    component.iconFrame.removeClass(classes[i]);
                }
            }

            // Set Color
            component.addClass('text-bg-' + self._properties.priorities[self._properties.priority].color);
            component.iconFrame.addClass('text-bg-' + self._properties.priorities[self._properties.priority].color);

            // Remove Icon
            classes = component.icon[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].startsWith('bi-')) {
                    component.icon.removeClass(classes[i]);
                }
            }

            // Set Icon
            component.icon.addClass('bi-' + self._properties.priorities[self._properties.priority].icon);

            // Check for Header
            component.header = component.find('h4');
            if(component.header.length <= 0){
                component.header = $(document.createElement("h4")).appendTo(component.content);
            }
            
            // Set Header
            component.header.html(self._properties.priorities[self._properties.priority].label);

            // Check for Paragraph
            component.paragraph = component.find('p');
            if(component.paragraph.length <= 0){
                component.paragraph = $(document.createElement("p")).appendTo(component.content);
            }
            
            // Set Paragraph
            component.paragraph.html("Priority");
        }

        // Execute Callback
        if(typeof self._properties.callback.priority === 'function'){
            self._properties.callback.priority(component, self);
        }

        // Return
        return self._properties.priority;
    }

    post(object){

        // Set Self
        const self = this;

        // Add post to feed
        self._component.feed.add(
            object,
            function(post,feed){
                if(typeof self._properties.callback.post === 'function'){
                    self._properties.callback.post(post, feed, self);
                }
            }
        );

        // Return
        return this;
    }

    reply(element, quote = null, author = null){

        // Set Self
        const self = this;

        // Set Quote
        if(quote){
            let parser = new DOMParser();
            let doc = parser.parseFromString(quote, 'text/html');
            let elementsToRemove = doc.getElementsByClassName('reply-quote');
            for (let el of Array.from(elementsToRemove)) {
                el.parentNode.removeChild(el);
            }
            quote = doc.documentElement.innerHTML;
            let alert = this._builder.Component(
                "alert",
                {
                    class: {
                        alert: "ms-3 reply-quote",
                    },
                    color: "info",
                    dismissible: false,
                    icon: "chat-quote",
                    title: author,
                    content: quote,
                },
            );
            quote = alert.outerHTML();
        }

        let reply = this._builder.Component(
            'modal',
            element,
            {
                icon: "reply",
                title: "Reply to ticket",
                size: "lg",
                callback: {
                    submit: function(element,modal){
                        reply.form.submit();
                    },
                },
            },
            function(modal, component){
                component.body.addClass('p-0');
                component.dialog.content.footer.submit.text("Post");
                reply.form = self._builder.Component(
                    'form',
                    component.body,
                    {
                        callback: {
                            submit: function(form){
                                let values = form.val();
                                if(quote){
                                    values.reply = values.reply + quote;
                                }

                                // Execute Callback
                                if(typeof self._properties.callback.reply === 'function'){
                                    values = self._properties.callback.reply(values);
                                }

                                // Post
                                self.post({
                                    username: self._properties.owner,
                                    content: values.reply,
                                });

                                // Clear Form
                                form.clear();

                                // Close Modal
                                modal.hide();
                            },
                        },
                    },
                    function(form,component){
                        form.add(
                            {
                                name: 'reply',
                                label: 'Reply',
                                type: 'mce',
                                class: 'rounded-0',
                            },
                            function(input,form){
                                input.label.remove();
                            },
                        );
                    },
                );
            },
        );

        // Return
        return this;
    }

    share(element, id = null){

        // Set Self
        const self = this;

        // Set URL
        let url = window.location.href;

        // Add ID
        if(id){
            url += '#' + id;
        }

        // Ask for an email address
        let share = this._builder.Component(
            'modal',
            element,
            {
                icon: "share",
                title: "Share this ticket",
                callback: {
                    submit: function(element,modal){
                        share.form.submit();
                    },
                },
            },
            function(modal, component){
                component.dialog.content.footer.submit.text("Share");
                share.form = self._builder.Component(
                    'form',
                    component.body,
                    {
                        callback: {
                            submit: function(form){
                                let values = form.val();
                                values.url = url;

                                // Execute Callback
                                if(typeof self._properties.callback.share === 'function'){
                                    values = self._properties.callback.share(values);
                                }

                                // Clear Form
                                form.clear();

                                // Close Modal
                                modal.hide();
                            },
                        },
                    },
                    function(form,component){
                        form.add(
                            {
                                name: 'email',
                                label: 'Email',
                                type: 'text',
                                icon: 'envelope-at',
                            },
                            function(input,form){},
                        );
                    },
                );
            },
        );

        // Return
        return this;
    }

    edit(element, post){

        // Set Self
        const self = this;

        // Retrieve content
        let content = $(document.createElement('div')).html(post.content.html());

        // Retrieve quote
        let quote = null;
        if(content.find('.reply-quote').length > 0){
            quote = content.find('.reply-quote').prop('outerHTML');
            content.find('.reply-quote').remove();
        }

        // Sanitize Content
        content = content.html();

        // Modal
        let edit = this._builder.Component(
            'modal',
            element,
            {
                icon: "pencil-square",
                title: "Edit post",
                size: "lg",
                callback: {
                    submit: function(element,modal){
                        edit.form.submit();
                    },
                },
            },
            function(modal, component){
                component.body.addClass('p-0');
                component.dialog.content.footer.submit.text("Save");
                edit.form = self._builder.Component(
                    'form',
                    component.body,
                    {
                        callback: {
                            submit: function(form){
                                let values = form.val();

                                // Add original and quote
                                values.original = content;
                                values.quote = quote;

                                // Execute Callback
                                if(typeof self._properties.callback.edit === 'function'){
                                    values = self._properties.callback.edit(values);
                                }

                                // Sanitize Content and Quote
                                content = values.content;
                                if(values.quote){
                                    content += values.quote;
                                }

                                // Edit Post Content
                                post.content.html(content);

                                // Clear Form
                                form.clear();

                                // Close Modal
                                modal.hide();
                            },
                        },
                    },
                    function(form,component){
                        form.add(
                            {
                                name: 'content',
                                label: 'Edit',
                                type: 'mce',
                                class: 'rounded-0',
                            },
                            function(input,form){
                                input.label.remove();
                                input.val(content);
                            },
                        );
                    },
                );
            },
        );

        // Return
        return this;
    }

    delete(element,post){

        // Set Self
        const self = this;

        // Modal
        let mod = this._builder.Component(
            'modal',
            element,
            {
                icon: "question-octagon",
                title: "Are you sure?",
                body: "Are you sure you want to remove this post?",
                callback: {
                    submit: function(element,modal){
                                
                        // Delete Post
                        post.remove();

                        // Execute Callback
                        if(typeof self._properties.callback.delete === 'function'){
                            self._properties.callback.delete(post);
                        }

                        // Close Modal
                        modal.hide();
                    },
                },
            },
            function(modal, component){
                component.dialog.content.footer.submit.text("Delete");
            },
        );

        // Return
        return this;
    }

    assign(value = null){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.assign === 'function'){
            self._properties.callback.assign(value,self);
        }

        // Return
        return this;
    }

    close(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.close === 'function'){
            self._properties.callback.close(self);
        }

        // Return
        return this;
    }

    archive(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.archive === 'function'){
            self._properties.callback.archive(self);
        }

        // Return
        return this;
    }

    submit(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.submit === 'function'){
            self._properties.callback.submit(self);
        }

        // Return
        return this;
    }

    category(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.category === 'function'){
            self._properties.callback.category(self);
        }

        // Return
        return this;
    }

    subCategory(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.subCategory === 'function'){
            self._properties.callback.subCategory(self);
        }

        // Return
        return this;
    }

    item(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.item === 'function'){
            self._properties.callback.item(self);
        }

        // Return
        return this;
    }

    accept(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.accept === 'function'){
            self._properties.callback.accept(self);
        }

        // Return
        return this;
    }

    decline(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.decline === 'function'){
            self._properties.callback.decline(self);
        }

        // Return
        return this;
    }

    clear(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.clear === 'function'){
            self._properties.callback.clear(self);
        }

        // Return
        return this;
    }

    reset(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.reset === 'function'){
            self._properties.callback.reset(self);
        }

        // Return
        return this;
    }

    val(){

        // Set Self
        const self = this;

        // Execute Callback
        if(typeof self._properties.callback.val === 'function'){
            self._properties.callback.val(self);
        }

        // Return
        return this;
    }
                
    control(param1 =null, param2 =null){
        
        const self = this;

        let options = {};
        let callback = null;
        
        let properties = {
            label: null,
            icon: null,
            color: null,
            click: function(control,layout){},
            condition: function(control,layout){ return true; },
        };

        // Set selector, options, and callback
        [param1, param2].forEach(param => {
            if(param !== null){
                if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        // Configure Options
        for(const [key, value] of Object.entries(options)){
            if(typeof properties[key] !== 'undefined'){
                switch(key){
                    case"class":
                        for(const [section, classes] of Object.entries(value)){
                            if(properties[key][section] != null){
                                properties[key][section] += ' ' + classes;
                            } else {
                                properties[key][section] = classes;
                            }
                        }
                        break;
                    default:
                        properties[key] = value;
                        break;
                }
            }
        }

        // Set ID
        let id = this._count();
        properties.id = id;

        // Create Control
        let control = $(document.createElement("button")).attr({
            'id': this._component.id + 'control' + id,
            'class': 'btn d-flex flex-column justify-content-center align-items-center',
            'type': 'button',
        }).appendTo(self._component.controls);
        control.id = control.attr('id');
        control.properties = properties;

        // Create Icon
        control.icon = $(document.createElement("i")).addClass('fs-3 bi bi-' + properties.icon).appendTo(control);

        // Create Label
        control.label = $(document.createElement("span")).addClass('d-md-block').html(properties.label).appendTo(control);

        // Set Color
        if(properties.color){
            control.addClass('text-bg-' + properties.color);
        }

        // Add Event
        control.click(function(){
            if(typeof properties.click === 'function'){
                properties.click(control,self);
            }
        });

        // Execute Callback
        if(typeof callback === 'function'){
            callback(control,self);
        }

        // Return
        return this;
    }
                
    set(param1 =null, param2 =null, param3 =null){
        
        const self = this;

        let type = 'status';
        let options = {};
        let callback = null;

        // Set selector, options, and callback
        [param1, param2, param3].forEach(param => {
            if(param !== null){
                if (typeof param === 'string') {
                    type = param;
                } else if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        setTimeout(function(){
            switch(type){
                case"priority":
                    self.priority(options.value, callback);
                    break;
                case"status":
                    self.status(options.value, callback);
                    break;
                default:
                    break;
            }
        },0);

        // Return
        return this;
    }
                
    add(param1 =null, param2 =null, param3 =null){
        
        const self = this;

        let type = 'post';
        let options = {};
        let callback = null;

        // Set selector, options, and callback
        [param1, param2, param3].forEach(param => {
            if(param !== null){
                if (typeof param === 'string') {
                    type = param;
                } else if (typeof param === 'object') {
                    options = param;
                } else if (typeof param === 'function') {
                    callback = param;
                }
            }
        });

        setTimeout(function(){
            switch(type){
                case"reference":
                    self.reference(options.type, options.reference, callback);
                    break;
                case"topic":
                case"post":
                    self.post(options,callback);
                    break;
                default:
                    break;
            }
        },0);

        // Return
        return this;
    }
}

$(document).ready(function(){

    // Create Layout
    layoutClass = new Layout(
        builder, 
        '#playground',
        {
            callback: {
                status: function(element,layout){},
                priority: function(element,layout){},
                post: function(post,feed,layout){},
                share: function(values){},
                reply: function(values){ return values; },
                edit: function(values){ return values; },
                delete: function(post){},
                close: function(layout){},
                archive: function(layout){},
                assign: function(value,layout){},
                submit: function(layout){},
                clear: function(layout){},
                reset: function(layout){},
                category: function(layout){},
                subCategory: function(layout){},
                item: function(layout){},
                accept: function(layout){},
                decline: function(layout){},
                val: function(values){ return values; },
                addReference: function(values){ console.log(values); },
                removeReference: function(type, reference){ console.log(type, reference); },
            },
            title: 'Ticket# ' + sampleRecords.tickets[0].id,
            icon: 'ticket-perforated',
            status: sampleRecords.tickets[0].status,
            statuses: sampleStatuses.tickets,
            priority: sampleRecords.tickets[0].priority,
            priorities: samplePriorities.tickets,
            subject: sampleRecords.tickets[0].subject,
            description: sampleRecords.tickets[0].description,
            openedOn: sampleRecords.tickets[0].openedOn,
            closedOn: sampleRecords.tickets[0].closedOn,
            start: sampleRecords.tickets[0].start,
            end: sampleRecords.tickets[0].end,
            owner: sampleRecords.tickets[0].owner,
            assignedTo: sampleRecords.tickets[0].assignedTo,
            assignedToTitle: 'Team Lead Customer Support',
            remoteID: sampleRecords.tickets[0].remoteID,
            remotePassword: sampleRecords.tickets[0].remotePassword,
            ui:{
                reply: true,
                share: true,
                close: true,
                archive: true,
                edit: true,
                delete: true,
                accept: true,
                decline: true,
                calendar: true,
                remote: true,
                references: true,
                files: true,
            },
            referencesTypes: sampleReferencesTypes,
            referencesTypesDefault: "other",
            files: {},
        },
        function(layout, component){
            for(const [type, references] of Object.entries(sampleReferences)){
                for(const [key, reference] of Object.entries(references)){
                    layout.add(
                        'reference',
                        {
                            type: type,
                            reference: reference,
                        },
                    );
                }
            }
            for(const [key, value] of Object.entries(sampleRecords.tickets[0].posts)){
                layout.add(
                    'post',
                    {
                        datetime: value.created,
                        username: value.owner,
                        content: value.content,
                    },
                );
            }
        },
    );
});