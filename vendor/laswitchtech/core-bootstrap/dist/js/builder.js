// Autor: Louis Ouellet
// Project: Bootstrap Builder

// Extend Date Object
Date.prototype.today = function () {
	return this.getFullYear() + "-" +(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "-" + ((this.getDate() < 10)?"0":"") + this.getDate();
};
Date.prototype.timeNow = function () {
	return ((this.getHours() < 10)?"0":"") + this.getHours() + ":" + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ":" + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

// Extend jQuery
if (typeof $ !== 'undefined') {
    jQuery.expr[':'].contains = function(a, i, m){
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0
    };
} else {
    alert("jQuery is not loaded");
}

// Configure Select2
if(typeof $.fn.select2 !== 'undefined'){
    $.fn.select2.defaults.set("theme", "bootstrap-5");
    $.fn.select2.defaults.set("width", "100%");
    $.fn.select2.defaults.set("allowClear", true);
}

class Builder {
    Search = null;
    Helper = null;
    Task = null;
    Toast = null;
    Message = null;
    Notification = null;
    #count = 0;

    constructor(){

        // Create Utilities
        this.Locale = this.Utility('locale');
        this.Parser = this.Utility('parser');
        this.Avatar = this.Utility('avatar');
        this.Status = this.Utility('status');
        this.Rating = this.Utility('rating');
        this.Priority = this.Utility('priority');
        this.Option = this.Utility('option');
        this.Search = this.Utility('search');
        this.Helper = this.Utility('helper');
        this.Task = this.Utility('task');
        this.Toast = this.Utility('toast');
        this.Message = this.Utility('message');
        this.Notification = this.Utility('notification');
    }

    count(){
        this.#count++;
        return this.#count;
    }

    UtilityClass = class  {

        _builder = null;
        _id = null;

        constructor(builder){

            // Set Builder
            this._builder = builder;

            // Generate Incremental ID
            this._id = this._builder.count();
        }
    }

    ComponentClass = class extends this.UtilityClass {

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

        component(){
            return this._component;
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

    add(type, name, object){
        const self = this;
        if(typeof type !== 'string' || typeof name !== 'string' || !self.Helper.isClass(object)){
            console.log('Builder.add(String, String, Class)');
            return false;
        }
        switch(type){
            case'utilities':
                if(typeof this.#utilities[name] !== 'undefined'){
                    console.log('Utility Already Exist');
                    return false;
                }
                this.#utilities[name] = object;
                break;
            case'layouts':
                if(typeof this.#layouts[name] !== 'undefined'){
                    console.log('Layout Already Exist');
                    return false;
                }
                this.#layouts[name] = object;
                break;
            case'components':
                if(typeof this.#components[name] !== 'undefined'){
                    console.log('Component Already Exist');
                    return false;
                }
                this.#components[name] = object;
                break;
            case'widgets':
                if(typeof this.#widgets[name] !== 'undefined'){
                    console.log('Widget Already Exist');
                    return false;
                }
                this.#widgets[name] = object;
                break;
            default:
                console.log('Unknown Builder Object');
                break;
        }
        return this;
    }

    Utility(name, param1 = null, param2 = null, param3 = null){
        const self = this;
        if(typeof name !== 'string'){
            console.log('Builder.utility(String)');
            return false;
        }
        if(typeof this.#utilities[name] === 'undefined'){
            console.log('Unknown Utility');
            return false;
        }
        return new this.#utilities[name](self, param1, param2, param3);
    }

    Component(name, param1 = null, param2 = null, param3 = null){
        const self = this;
        if(typeof name !== 'string'){
            console.log('Builder.Component(String)');
            return false;
        }
        if(typeof this.#components[name] === 'undefined'){
            console.log('Unknown Component');
            return false;
        }
        return new this.#components[name](self, param1, param2, param3);
    }

    Widget(name, param1 = null, param2 = null, param3 = null){
        const self = this;
        if(typeof name !== 'string'){
            console.log('Builder.Widget(String)');
            return false;
        }
        if(typeof this.#widgets[name] === 'undefined'){
            console.log('Unknown Widget');
            return false;
        }
        return new this.#widgets[name](self, param1, param2, param3);
    }

    Layout(name, param1 = null, param2 = null, param3 = null){
        const self = this;
        if(typeof name !== 'string'){
            console.log('Builder.layout(String)');
            return false;
        }
        if(typeof this.#layouts[name] === 'undefined'){
            console.log('Unknown Layout');
            return false;
        }
        return new this.#layouts[name](self, param1, param2, param3);
    }

    #utilities = {
        locale: class extends this.UtilityClass {

            #locales = {};
            #locale = 'en-ca';
            #default = 'en-ca';
            _callback = function(key, locale){
                console.log('['+locale+'] Missing String: '+key);
            };

            constructor(builder){

                // Call Parent
                super(builder);

                // Set Self
                const self = this;
            }

            save(locale, data){

                // Set Self
                const self = this;

                // Check if locale is set
                if(typeof locale === 'string'){

                    // Loop through data
                    for(const [key, value] of Object.entries(data)){

                        // Check if locale is set
                        if(typeof self.#locales[locale] === 'undefined'){
                            self.#locales[locale] = {};
                        }

                        // Set Value
                        self.#locales[locale][key] = value;
                    }
                }
            }

            set(locale){

                // Set Self
                const self = this;

                // Check if locale is set
                if(typeof locale === 'string'){
                    self.#locale = locale;
                }
            }

            current(){

                // Set Self
                const self = this;

                // Return Current Locale
                return self.#locale;
            }

            get(key, locale = null){

                // Set Self
                const self = this;

                // Set Locale
                if(locale === null || typeof self.#locales[locale] === 'undefined'){
                    locale = self.#locale;
                }

                // Initialize String
                let string = key;

                // Retrieve Value from Locale
                if(typeof self.#locales[locale] === 'undefined' || typeof self.#locales[locale][key] === 'undefined'){

                    // Check if Callback is Set
                    if(typeof self._callback === 'function'){
                        self._callback(key,locale);
                    }

                    // Check if local is different from default
                    if(locale !== self.#default){

                        // Retrieve Value from Default Locale
                        if(locale !== self.#default && (typeof self.#locales[self.#default] === 'undefined' || typeof self.#locales[self.#default][key] === 'undefined')){

                            // Check if Callback is Set
                            if(typeof self._callback === 'function'){
                                self._callback(key,self.#default);
                            }

                        } else {

                            // Retrieve Value from Default Locale
                            string = self.#locales[self.#default][key];
                        }
                    }
                } else {

                    // Retrieve Value from Locale
                    string = self.#locales[locale][key];
                }

                // Return String
                return string;
            }

            parse(string, locale = null){

                // Set Self
                const self = this;

                // Set Matches
                let matches = string.match(/{{(.*?)}}/g);

                // Check if Matches
                if(matches){

                    // Loop through Matches
                    for(const match of matches){

                        // Set Key
                        let key = match.replace('{{','').replace('}}','');

                        // Replace Match
                        string = string.replace(match,self.get(key));
                    }
                }

                // Return
                return string;
            }
        },
        parser: class extends this.UtilityClass {
            constructor(builder){

                // Call Parent
                super(builder);

                // Set Self
                const self = this;
            }

            parse(string, locale = null){

                // Set Self
                const self = this;

                // Parse through locale
                if(typeof string === 'string'){
                    string = self._builder.Locale.parse(string,locale);
                }

                // Parse through status
                if(typeof string === 'string'){
                    string = self._builder.Status.parse(string,locale);
                }

                // Parse through rating
                if(typeof string === 'string'){
                    string = self._builder.Rating.parse(string,locale);
                }

                // Parse through priority
                if(typeof string === 'string'){
                    string = self._builder.Priority.parse(string,locale);
                }

                // Parse through avatar
                if(typeof string === 'string'){
                    string = self._builder.Avatar.parse(string,locale);
                }

                // Return
                return string;
            }
        },
        avatar: class extends this.UtilityClass {

            constructor(builder){

                // Call Parent
                super(builder);

                // Set Self
                const self = this;
            }

            avatar(email){

                // Set Self
                const self = this;

                // Create avatar
                var avatar = $(document.createElement('span'))
                    .attr({
                        'class': 'cursor-help align-middle avatar',
                    });

                // Set Label
                avatar.text(email);

                // Prepend Icon
                avatar.prepend($(document.createElement('img')).attr({
                    'class': 'me-1 rounded-circle',
                    'width': '48',
                    'height': '48',
                    'src': self._builder.Helper.gravatar(email),
                }));

                avatar.attr({
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                    'title': status.email,
                    'data-bs-title': status.email,
                });

                // Enable Tooltip
                var tooltip = new bootstrap.Tooltip(avatar[0]);

                // Return avatar
                return avatar;
            }

            parse(string, locale = null){

                // Set Self
                const self = this;

                // Set Matches [[utility:type:level]]
                let matches = string.match(/\[\[(.*?)\]\]/g);

                // Check if Matches
                if(matches){

                    // Loop through Matches
                    for(const match of matches){

                        // Set Key
                        let key = match.replace('[[','').replace(']]','');
                        let parts = key.split(':');
                        let utility = parts[0];
                        let email = parts[1];

                        if(utility === 'avatar'){

                            // Get avatar
                            let avatar = self.avatar(email);

                            // Get html
                            let html = avatar[0].outerHTML;

                            // Replace Match
                            string = string.replace(match,html);
                        }
                    }
                }

                // Return
                return string;
            }
        },
        status: class extends this.UtilityClass {

            #statuses = {};
            _callback = function(targetTable, level){
                console.log('Missing Status: '+targetTable+' ['+level+']');
            };

            constructor(builder){

                // Call Parent
                super(builder);

                // Set Self
                const self = this;
            }

            save(status){

                // Set Self
                const self = this;

                // Loop through each required field
                for(const [key, value] of Object.entries(['targetTable','label','description','icon','color','level'])){

                    // Check if field is set
                    if(typeof status[value] === 'undefined'){
                        console.log('Missing Field: '+value);
                        return;
                    }
                }

                // Check if targetTable is set
                if(typeof self.#statuses[status.targetTable] === 'undefined'){
                    self.#statuses[status.targetTable] = {};
                }

                // Set Value
                self.#statuses[status.targetTable][status.level] = {
                    'targetTable': status.targetTable,
                    'label': status.label,
                    'description': status.description,
                    'icon': status.icon,
                    'color': status.color,
                    'level': status.level,
                };
            }

            get(targetTable, level){

                // Set Self
                const self = this;

                // Check if targetTable and level are set
                if(typeof self.#statuses[targetTable] === 'undefined' || typeof self.#statuses[targetTable][level] === 'undefined'){

                    // Check if callback is set
                    if(typeof self._callback === 'function'){
                        self._callback(targetTable, level);
                    }

                    // Return Empty Status
                    return {
                        'targetTable': null,
                        'label': null,
                        'description': null,
                        'icon': null,
                        'color': null,
                        'level': null,
                    };
                } else {

                    // Return Status
                    return self.#statuses[targetTable][level];
                }
            }

            badge(targetTable, level){

                // Set Self
                const self = this;

                // Get Status
                const status = self.get(targetTable, level);

                // Create Badge
                var badge = $(document.createElement('span'))
                    .attr({
                        'class': 'cursor-help badge',
                    });

                // Check if label is set
                if(status.label !== null){

                    // Set Label
                    badge.text(self._builder.Locale.get(status.label));
                }

                // Check if color is set
                if(status.color !== null){

                    // Set Color
                    badge.addClass('text-bg-'+status.color);
                }

                // Check if icon is set
                if(status.icon !== null){

                    // Prepend Icon
                    badge.prepend($(document.createElement('i')).addClass('me-1 bi bi-'+status.icon));
                }

                // Check if description is set
                if(status.description !== null){
                    badge.attr({
                        'data-bs-toggle': 'tooltip',
                        'data-bs-placement': 'top',
                        'title': status.description,
                        'data-bs-title': status.description,
                    });

                    // Enable Tooltip
                    var tooltip = new bootstrap.Tooltip(badge[0]);
                }

                // Check if targetTable is set
                if(status.targetTable !== null){

                    // Set targetTable
                    badge.attr('data-targetTable', status.targetTable);
                }

                // Check if Level is set
                if(status.level !== null){

                    // Set Level
                    badge.attr('data-level', status.level);
                }

                // Return Badge
                return badge;
            }

            parse(string){

                // Set Self
                const self = this;

                // Set Matches [[utility:targetTable:level]]
                let matches = string.match(/\[\[(.*?)\]\]/g);

                // Check if Matches
                if(matches){

                    // Loop through Matches
                    for(const match of matches){

                        // Set Key
                        let key = match.replace('[[','').replace(']]','');
                        let parts = key.split(':');
                        let utility = parts[0];
                        let targetTable = parts[1];
                        let level = parts[2];

                        if(utility === 'status'){

                            // Get Status
                            let status = self.badge(targetTable, level);

                            // Get html
                            let html = status[0].outerHTML;

                            // Replace Match
                            string = string.replace(match,html);
                        }
                    }
                }

                // Return
                return string;
            }
        },
        rating: class extends this.ComponentClass {

            #ratings = {};
            _callback = function(targetTable, level){
                console.log('Missing Rating: '+targetTable+' ['+level+']');
            };

            constructor(builder){

                // Call Parent
                super(builder);

                // Set Self
                const self = this;
            }

            save(rating){

                // Set Self
                const self = this;

                // Loop through each required field
                for(const [key, value] of Object.entries(['targetTable','label','description','icon','color','level'])){

                    // Check if field is set
                    if(typeof rating[value] === 'undefined'){
                        console.log('Missing Field: '+value);
                        return;
                    }
                }

                // Check if targetTable is set
                if(typeof self.#ratings[rating.targetTable] === 'undefined'){
                    self.#ratings[rating.targetTable] = {};
                }

                // Set Value
                self.#ratings[rating.targetTable][rating.level] = {
                    'targetTable': rating.targetTable,
                    'label': rating.label,
                    'description': rating.description,
                    'icon': rating.icon,
                    'color': rating.color,
                    'level': rating.level,
                };
            }

            get(targetTable, level = null){

                // Set Self
                const self = this;

                // Check if level is null
                if(level === null){

                    // Check if targetTable and level are set
                    if(typeof self.#ratings[targetTable] === 'undefined'){

                        // Return Empty Array
                        return [];
                    } else {

                        // Return Rating
                        return self.#ratings[targetTable];
                    }
                } else {

                    // Check if targetTable and level are set
                    if(typeof self.#ratings[targetTable] === 'undefined' || typeof self.#ratings[targetTable][level] === 'undefined'){

                        // Check if callback is set
                        if(typeof self._callback === 'function'){
                            self._callback(targetTable, level);
                        }

                        // Return Empty Rating
                        return {
                            'targetTable': null,
                            'label': null,
                            'description': null,
                            'icon': null,
                            'color': null,
                            'level': null,
                        };
                    } else {

                        // Return Rating
                        return self.#ratings[targetTable][level];
                    }
                }
            }

            badge(targetTable, level){

                // Set Self
                const self = this;

                // Get Rating
                const rating = self.get(targetTable, level);

                // Create Badge
                var badge = $(document.createElement('span'))
                    .attr({
                        'class': 'cursor-help badge',
                    });

                // Check if label is set
                if(rating.label !== null){

                    // Set Label
                    badge.text(self._builder.Locale.get(rating.label));
                }

                // Check if color is set
                if(rating.color !== null){

                    // Set Color
                    badge.addClass('text-bg-'+rating.color);
                }

                // Check if icon is set
                if(rating.icon !== null){

                    // Prepend Icon
                    badge.prepend($(document.createElement('i')).addClass('me-1 bi bi-'+rating.icon));
                }

                // Check if description is set
                if(rating.description !== null){
                    badge.attr({
                        'data-bs-toggle': 'tooltip',
                        'data-bs-placement': 'top',
                        'title': rating.description,
                        'data-bs-title': rating.description,
                    });

                    // Enable Tooltip
                    var tooltip = new bootstrap.Tooltip(badge[0]);
                }

                // Check if targetTable is set
                if(rating.targetTable !== null){

                    // Set targetTable
                    badge.attr('data-targetTable', rating.targetTable);
                }

                // Check if Level is set
                if(rating.level !== null){

                    // Set Level
                    badge.attr('data-level', rating.level);
                }

                // Return Badge
                return badge;
            }

            parse(string){

                // Set Self
                const self = this;

                // Set Matches [[utility:targetTable:level]]
                let matches = string.match(/\[\[(.*?)\]\]/g);

                // Check if Matches
                if(matches){

                    // Loop through Matches
                    for(const match of matches){

                        // Set Key
                        let key = match.replace('[[','').replace(']]','');
                        let parts = key.split(':');
                        let utility = parts[0];
                        let targetTable = parts[1];
                        let level = parts[2];

                        if(utility === 'rating'){

                            // Get rating
                            let rating = self.badge(targetTable, level);

                            // Get html
                            let html = rating[0].outerHTML;

                            // Replace Match
                            string = string.replace(match,html);
                        }
                    }
                }

                // Return
                return string;
            }
        },
        priority: class extends this.ComponentClass {

            #priorities = {};
            _callback = function(targetTable, level){
                console.log('Missing Priority: '+targetTable+' ['+level+']');
            };

            constructor(builder){

                // Call Parent
                super(builder);

                // Set Self
                const self = this;
            }

            save(priority){

                // Set Self
                const self = this;

                // Loop through each required field
                for(const [key, value] of Object.entries(['targetTable','label','description','icon','color','level'])){

                    // Check if field is set
                    if(typeof priority[value] === 'undefined'){
                        console.log('Missing Field: '+value);
                        return;
                    }
                }

                // Check if targetTable is set
                if(typeof self.#priorities[priority.targetTable] === 'undefined'){
                    self.#priorities[priority.targetTable] = {};
                }

                // Set Value
                self.#priorities[priority.targetTable][priority.level] = {
                    'targetTable': priority.targetTable,
                    'label': priority.label,
                    'description': priority.description,
                    'icon': priority.icon,
                    'color': priority.color,
                    'level': priority.level,
                };
            }

            get(targetTable, level){

                // Set Self
                const self = this;

                // Check if targetTable and level are set
                if(typeof self.#priorities[targetTable] === 'undefined' || typeof self.#priorities[targetTable][level] === 'undefined'){

                    // Check if callback is set
                    if(typeof self._callback === 'function'){
                        self._callback(targetTable, level);
                    }

                    // Return Empty Priority
                    return {
                        'targetTable': null,
                        'label': null,
                        'description': null,
                        'icon': null,
                        'color': null,
                        'level': null,
                    };
                } else {

                    // Return Priority
                    return self.#priorities[targetTable][level];
                }
            }

            badge(targetTable, level){

                // Set Self
                const self = this;

                // Get Priority
                const Priority = self.get(targetTable, level);

                // Create Badge
                var badge = $(document.createElement('span'))
                    .attr({
                        'class': 'cursor-help badge',
                    });

                // Check if label is set
                if(priority.label !== null){

                    // Set Label
                    badge.text(self._builder.Locale.get(priority.label));
                }

                // Check if color is set
                if(priority.color !== null){

                    // Set Color
                    badge.addClass('text-bg-'+priority.color);
                }

                // Check if icon is set
                if(priority.icon !== null){

                    // Prepend Icon
                    badge.prepend($(document.createElement('i')).addClass('me-1 bi bi-'+priority.icon));
                }

                // Check if description is set
                if(priority.description !== null){
                    badge.attr({
                        'data-bs-toggle': 'tooltip',
                        'data-bs-placement': 'top',
                        'title': priority.description,
                        'data-bs-title': priority.description,
                    });

                    // Enable Tooltip
                    var tooltip = new bootstrap.Tooltip(badge[0]);
                }

                // Check if targetTable is set
                if(priority.targetTable !== null){

                    // Set targetTable
                    badge.attr('data-targetTable', priority.targetTable);
                }

                // Check if Level is set
                if(priority.level !== null){

                    // Set Level
                    badge.attr('data-level', priority.level);
                }

                // Return Badge
                return badge;
            }

            parse(string){

                // Set Self
                const self = this;

                // Set Matches [[utility:targetTable:level]]
                let matches = string.match(/\[\[(.*?)\]\]/g);

                // Check if Matches
                if(matches){

                    // Loop through Matches
                    for(const match of matches){

                        // Set Key
                        let key = match.replace('[[','').replace(']]','');
                        let parts = key.split(':');
                        let utility = parts[0];
                        let targetTable = parts[1];
                        let level = parts[2];

                        if(utility === 'priority'){

                            // Get priority
                            let priority = self.badge(targetTable, level);

                            // Get html
                            let html = priority[0].outerHTML;

                            // Replace Match
                            string = string.replace(match,html);
                        }
                    }
                }

                // Return
                return string;
            }
        },
        option: class extends this.ComponentClass {

            #options = {};
            _callback = function(targetTable, target = null){
                if(target === null){
                    console.log('Missing Options: '+targetTable);
                } else {
                    console.log('Missing Options: '+targetTable+' ['+target+']');
                }
            };

            constructor(builder){

                // Call Parent
                super(builder);

                // Set Self
                const self = this;
            }

            save(targetTable, options, target = null){

                // Set Self
                const self = this;

                // Check if options array exists for targetTable
                if(typeof self.#options[targetTable] === 'undefined'){
                    self.#options[targetTable] = [];
                }

                // Check if options array exists for targetTable
                if(target !== null && typeof self.#options[targetTable][target] === 'undefined'){
                    self.#options[targetTable][target] = [];
                }

                // Loop through each options
                for(const [key, option] of Object.entries(options)){

                    // Check if option is an object and contains the required fields
                    if(typeof option === 'object' && (option.id || option.id === 0 || option.id === false) && (option.text || option.text === 0 || option.text === false)){
                        if(target !== null){
                            self.#options[targetTable][target].push(option);
                        } else {
                            self.#options[targetTable].push(option);
                        }
                    } else {
                        console.log('Missing Field: id or text',option);
                    }
                }
            }

            get(targetTable, target = null){

                // Set Self
                const self = this;

                // Check if targetTable and level are set
                if(typeof self.#options[targetTable] === 'undefined'){

                    // Check if callback is set
                    if(typeof self._callback === 'function'){
                        self._callback(targetTable, target);
                    }

                    // Return Empty array
                    return [];
                }

                // Check if target is null
                if(target === null){

                    // Return Options
                    return self.#options[targetTable];
                } else {

                    // Check if targetTable and level are set
                    if(typeof self.#options[targetTable][target] === 'undefined'){

                        // Check if callback is set
                        if(typeof self._callback === 'function'){
                            self._callback(targetTable, target);
                        }

                        // Return Empty array
                        return [];
                    }

                    // Return Options
                    return self.#options[targetTable][target];
                }
            }
        },
        search: class extends this.UtilityClass {

            #field = null

            constructor(builder){

                // Call Parent
                super(builder);

                // Scan Search Field
                this.scan('input.search');
            }

            scan(selector = 'input.search'){

                // Set Search Field
                this.#field = $(selector);
            }

            get(){

                // Return Search Field
                return this.#field;
            }

            set(object, data = null){

                // Set object as Object
                if(typeof object === 'string'){
                    object = $(object);
                }

                // Initialize String
                let string = '';

                // Set Search Attribute
                if(typeof object === 'object' && object != null){

                    // Check if the data-search attribute is set
                    if(typeof object.attr('data-search') !== "undefined"){

                        // Set Search Attribute
                        string += object.attr('data-search').toString().toUpperCase();
                    } else {

                        // Check if Text is Set and append the text to the data-search attribute
                        string += object.text().toString().toUpperCase();
                    }

                    // Check if Data is Set and append the data to the data-search attribute
                    if(data !== null){

                        // Check if Data is an Array or Object
                        if(typeof data === 'object'){

                            // Loop through Data
                            for(const [key, value] of Object.entries(data)){

                                // Check if Value is not null
                                if(value !== null){

                                    // Append Data to String
                                    string += ' ' + value.toString().toUpperCase();
                                }
                            }
                        }
                    }

                    // Set Search Attribute
                    object.attr('data-search',string.toString().toUpperCase());
                }
            }

            add(object){

                // Set object as Object
                if(typeof object === 'string'){
                    object = $(object);
                }

                // Add Search Event
                if(typeof object === 'object' && object != null){
                    this.#field.on('input propertychange',function(){
                        if($(this).val() !== ''){
                            object.find('[data-search]').hide();
                            object.find('[data-search*="'+$(this).val().toString().toUpperCase()+'"]').show();
                        } else {
                            object.find('[data-search]').show();
                        }
                    });
                }
            }
        },
        notification: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    callback: {
                        click: null,
                        readAll: null,
                        onRead: null,
                        format: null,
                    },
                    icon: "bell",
                    color: "danger",
                    onReadDelay: 500,
                    properties: {
                        class: {
                            item: null,
                        },
                        click: null,
                        onRead: null,
                        icon: "bell",
                        color: "primary",
                        datetime: null,
                        label: null,
                        isRead: false,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'notifications' + this._id,
                    'class': 'dropdown notificationArea',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Create Button
                this._component.btn = $(document.createElement('button')).attr({
                    'class': 'nav-link text-decoration-none py-2 animate-slide-hover-top-20',
                    'type': 'button',
                    'data-bs-toggle': 'dropdown',
                    'aria-expanded': 'false',
                }).appendTo(this._component);
                this._component.btn.icon = $(document.createElement('i')).attr({
                    'class': 'fs-4 bi bi-' + this._properties.icon,
                    'style': 'height: 2.25rem !important;width: 1.5rem !important',
                }).appendTo(this._component.btn);
                this._component.btn.badge = $(document.createElement('span')).attr({
                    'class': 'position-absolute top-25 start-75 translate-middle border border-light rounded-circle d-none',
                    'style': 'padding: 8px;',
                }).appendTo(this._component.btn);

                // Create Menu
                this._component.menu = $(document.createElement('ul')).attr({
                    'class': 'dropdown-menu dropdown-list dropdown-menu-end pb-0',
                    'style': 'min-width: 400px; max-width: 500px;',
                }).appendTo(this._component);

                // Create Header
                this._component.menu.header = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.header.title = $(document.createElement('h5')).addClass('py-2 px-3 m-0 cursor-default d-flex justify-content-center align-items-center').appendTo(this._component.menu.header);
                this._component.menu.header.title.label = $(document.createElement('span')).text('Notifications').appendTo(this._component.menu.header.title);
                this._component.menu.header.title.count = $(document.createElement('span')).addClass('badge rounded-pill ms-2 d-none').appendTo(this._component.menu.header.title);

                // Create Seperators
                this._component.menu.seperator = {};
                this._component.menu.seperator = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider m-0').appendTo(this._component.menu.seperator);

                // Create Items List
                this._component.menu.list = $(document.createElement('div')).attr({
                    'class': 'overflow-auto',
                    'style': 'max-height: 500px;',
                }).appendTo(this._component.menu);

                // Create Footer
                this._component.menu.footer = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.footer.btn = $(document.createElement('button')).attr({
                    'class': 'dropdown-item text-center py-2 rounded-bottom btn btn-link',
                    'type': 'button',
                }).appendTo(this._component.menu.footer);
                this._component.menu.footer.btn.label = $(document.createElement('small')).text('Mark All as Read').appendTo(this._component.menu.footer.btn);

                // Set Icon
                if(this._properties.icon === null){
                    this._component.btn.icon.remove();
                }

                // Set Color
                if(this._properties.color){
                    this._component.btn.badge.addClass('text-bg-' + this._properties.color);
                    this._component.menu.header.title.count.addClass('text-bg-' + this._properties.color);
                }

                // Add Callback
                self._component.menu.footer.btn.on('click',function(){
                    self.readAll();
                });
            }

            count(){

                // Set Self
                const self = this;

                // Count the number of new notifications
                let count = this._component.find('[data-isRead="false"]').length;

                // Set Count
                this._component.menu.header.title.count.text(count);

                // Show Badge
                if(count > 0){
                    this._component.menu.header.title.count.removeClass('d-none');
                    this._component.btn.badge.removeClass('d-none');
                    this._component.btn.addClass('animate-wobble');
                } else {
                    this._component.menu.header.title.count.addClass('d-none');
                    this._component.btn.badge.addClass('d-none');
                    this._component.btn.removeClass('animate-wobble');
                }

                // Return Count
                return count;
            }

            readAll(){

                // Set Self
                const self = this;

                // Get all unread notifications
                let items = this._component.find('[data-isRead="false"]');

                // Set all notifications as read
                items.attr('data-isRead', 'true').removeClass('blink-primary');
                items.find('span.text-wrap').removeClass('fw-bold');

                // Count the number of new notifications
                this.count();

                // Execute Callback
                if(typeof self._properties.callback.readAll === 'function'){
                    self._properties.callback.readAll(self,self._component);
                }

                // Return Object
                return this;
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

                let properties = {};

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
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"label":
                                properties[key] = self._builder.Locale.parse(value);
                                break;
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

                // Create Item
                let item = $(document.createElement('li')).attr({
                    'id': this._component.id + 'item' + id,
                }).prependTo(this._component.menu.list);

                // Create Button
                item.btn = $(document.createElement('button')).attr({
                    'class': 'dropdown-item d-flex align-items-center py-2',
                    'type': 'button',
                }).appendTo(item);

                // Add Icon
                item.btn.icon = $(document.createElement('div')).addClass('me-3').appendTo(item.btn);
                item.btn.icon.frame = $(document.createElement('div')).attr({
                    'class': 'd-flex align-items-center justify-content-center rounded-circle',
                    'style': 'width: 48px; height: 48px;',
                }).appendTo(item.btn.icon);
                item.btn.icon.frame.icon = $(document.createElement('i')).addClass('bi').appendTo(item.btn.icon.frame);

                // Add Label
                item.btn.label = $(document.createElement('div')).addClass('d-flex flex-column align-items-justify').appendTo(item.btn);
                item.btn.label.time = $(document.createElement('small')).addClass('text-muted').appendTo(item.btn.label);
                item.btn.label.time.timeago = $(document.createElement('time')).attr({
                    'class': 'timeago',
                    'data-bs-toggle': 'tooltip',
                }).appendTo(item.btn.label.time);
                item.btn.label.text = $(document.createElement('span')).addClass('text-wrap').html(properties.label).appendTo(item.btn.label);

                // Add Seperator
                item.seperator = $(document.createElement('li')).insertAfter(item);
                item.seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider m-0').appendTo(item.seperator);

                // Configure Color
                if(properties.color !== null){
                    item.btn.icon.frame.addClass('text-bg-' + properties.color);
                } else {
                    item.btn.icon.frame.addClass('text-bg-primary');
                }

                // Configure Icon
                if(properties.icon !== null){
                    item.btn.icon.frame.icon.addClass('bi-' + properties.icon);
                } else {
                    item.btn.icon.frame.icon.addClass('bi-bell');
                }

                // Configure Date Time
                let datetime = null;
                if(properties.datetime !== null){
                    datetime = new Date(properties.datetime);
                } else {
                    datetime = new Date();
                }
                item.btn.label.time.timeago.attr({
                    'title': datetime.toLocaleString(),
                    'datetime': datetime.toLocaleString(),
                    'data-bs-title': datetime.toLocaleString(),
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                }).text(datetime.toLocaleString());
                setTimeout(function(){ item.btn.label.time.timeago.timeago(); }, 0);
                item.btn.label.time.timeago.bootstrap = new bootstrap.Tooltip(item.btn.label.time.timeago);

                // Configure isRead
                item.attr('data-isRead',properties.isRead);
                if(!properties.isRead){
                    item.addClass('blink-primary');
                    item.btn.label.text.addClass('fw-bold');
                }

                // Set Item Class
                if(properties.class.item){
                    item.addClass(properties.class.item);
                }

                // Add read function
                item.read = function(){
                    item.attr('data-isRead', 'true').removeClass('blink-primary');
                    item.btn.label.text.removeClass('fw-bold');
                    self.count();
                };

                // Add onRead Callback
                if(!properties.isRead){
                    item.timer;
                    item.hover(function() {
                        item.timer = setTimeout(function() {
                            item.read();
                            if(typeof properties.onRead === 'function'){
                                properties.onRead(item,self,self._component);
                            }
                            if(typeof self._properties.callback.onRead === 'function'){
                                self._properties.callback.onRead(item,self,self._component);
                            }
                        }, self._properties.onReadDelay);
                    }, function() {
                        clearTimeout(item.timer);
                    });
                }

                // Add Callback
                item.on('click',function(){
                    if(typeof self._properties.callback.click === 'function'){
                        self._properties.callback.click(item,self,self._component);
                    }
                    if(typeof properties.click === 'function'){
                        properties.click(item,self,self._component);
                    }
                });

                // Execute Callback
                if(typeof self._properties.callback.format === 'function'){
                    self._properties.callback.format(item,this);
                }
                if(typeof callback === 'function'){
                    callback(item,this);
                }

                // Set Count
                this.count();

                // Return Object
                return this;
            }
        },
        message: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    callback: {
                        click: null,
                        viewAll: null,
                        onRead: null,
                    },
                    icon: "envelope",
                    color: "info",
                    onReadDelay: 500,
                    properties: {
                        class: {
                            item: null,
                        },
                        click: null,
                        onRead: null,
                        datetime: null,
                        label: null,
                        email: null,
                        name: null,
                        isRead: false,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'messages' + this._id,
                    'class': 'dropdown messageArea',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Create Button
                this._component.btn = $(document.createElement('button')).attr({
                    'class': 'nav-link text-decoration-none py-2 animate-slide-hover-top-20',
                    'type': 'button',
                    'data-bs-toggle': 'dropdown',
                    'aria-expanded': 'false',
                }).appendTo(this._component);
                this._component.btn.icon = $(document.createElement('i')).attr({
                    'class': 'fs-4 bi bi-' + this._properties.icon,
                    'style': 'height: 2.25rem !important;width: 1.5rem !important;',
                }).appendTo(this._component.btn);
                this._component.btn.badge = $(document.createElement('span')).attr({
                    'class': 'position-absolute top-25 start-75 translate-middle border border-light rounded-circle d-none',
                    'style': 'padding: 8px;',
                }).appendTo(this._component.btn);

                // Create Menu
                this._component.menu = $(document.createElement('ul')).attr({
                    'class': 'dropdown-menu dropdown-list dropdown-menu-end pb-0',
                    'style': 'min-width: 400px;max-width: 500px;',
                }).appendTo(this._component);

                // Create Header
                this._component.menu.header = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.header.title = $(document.createElement('h5')).addClass('py-2 px-3 m-0 cursor-default d-flex justify-content-center align-items-center').appendTo(this._component.menu.header);
                this._component.menu.header.title.label = $(document.createElement('span')).text('Messages').appendTo(this._component.menu.header.title);
                this._component.menu.header.title.count = $(document.createElement('span')).addClass('badge rounded-pill ms-2 d-none').appendTo(this._component.menu.header.title);

                // Create Seperators
                this._component.menu.seperator = {};
                this._component.menu.seperator = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider m-0').appendTo(this._component.menu.seperator);

                // Create Items List
                this._component.menu.list = $(document.createElement('div')).attr({
                    'class': 'overflow-auto',
                    'style': 'max-height: 500px;',
                }).appendTo(this._component.menu);

                // Create Footer
                this._component.menu.footer = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.footer.btn = $(document.createElement('button')).attr({
                    'class': 'dropdown-item text-center py-2 rounded-bottom btn btn-link',
                    'type': 'button',
                }).appendTo(this._component.menu.footer);
                this._component.menu.footer.btn.label = $(document.createElement('small')).text('View All').appendTo(this._component.menu.footer.btn);

                // Set Icon
                if(this._properties.icon === null){
                    this._component.btn.icon.remove();
                }

                // Set Color
                if(this._properties.color){
                    this._component.btn.badge.addClass('text-bg-' + this._properties.color);
                    this._component.menu.header.title.count.addClass('text-bg-' + this._properties.color);
                }

                // Add Callback
                self._component.menu.footer.btn.on('click',function(){
                    if(typeof self._properties.callback.viewAll === 'function'){
                        self._properties.callback.viewAll();
                    }
                });
            }

            count(){

                // Set Self
                const self = this;

                // Count the number of new notifications
                let count = this._component.find('[data-isRead="false"]').length;

                // Set Count
                this._component.menu.header.title.count.text(count);

                // Show Badge
                if(count > 0){
                    this._component.menu.header.title.count.removeClass('d-none');
                    this._component.btn.badge.removeClass('d-none');
                    this._component.btn.addClass('animate-bounce');
                } else {
                    this._component.menu.header.title.count.addClass('d-none');
                    this._component.btn.badge.addClass('d-none');
                    this._component.btn.removeClass('animate-bounce');
                }

                // Return Count
                return count;
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

                let properties = {};

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
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
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

                // Create Item
                let item = $(document.createElement('li')).attr({
                    'id': this._component.id + 'item' + id,
                }).prependTo(this._component.menu.list);
                item.id = item.attr('id');
                item.properties = properties;

                // Create Button
                item.btn = $(document.createElement('button')).attr({}).addClass('dropdown-item d-flex align-items-center py-2').attr('type','button').appendTo(item);

                // Add Icon
                item.btn.icon = $(document.createElement('div')).addClass('me-3').appendTo(item.btn);
                item.btn.icon.frame = $(document.createElement('div')).attr({}).addClass('d-flex align-items-center justify-content-center rounded-circle text-bg-primary').css({"width":"48px","height":"48px"}).appendTo(item.btn.icon);

                // Add Label
                item.btn.label = $(document.createElement('div')).addClass('d-flex flex-column align-items-justify').appendTo(item.btn);
                item.btn.label.text = $(document.createElement('span')).addClass('text-wrap').text(properties.label).appendTo(item.btn.label);
                item.btn.label.meta = $(document.createElement('small')).addClass('text-muted').appendTo(item.btn.label);
                item.btn.label.name = $(document.createElement('span')).text(properties.name).appendTo(item.btn.label.meta);
                item.btn.label.timeago = $(document.createElement('time')).attr({}).addClass('timeago ms-2').attr('data-bs-toggle','tooltip').appendTo(item.btn.label.meta);

                // Add Seperator
                item.seperator = $(document.createElement('li')).insertAfter(item);
                item.seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider m-0').appendTo(item.seperator);

                // Configure Avatar
                item.btn.icon.frame.avatar = this._builder.Component(
                    "avatar",
                    item.btn.icon.frame,
                    {
                        class: {
                            object: "rounded-circle",
                        },
                        email: properties.email,
                        size: "48px",
                    },
                    function(avatar,component){},
                );

                // Configure Date Time
                let datetime = null;
                if(properties.datetime !== null){
                    datetime = new Date(properties.datetime);
                } else {
                    datetime = new Date();
                }
                item.btn.label.timeago.attr({
                    'title': datetime.toLocaleString(),
                    'datetime': datetime.toLocaleString(),
                    'data-bs-title': datetime.toLocaleString(),
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                }).text(datetime.toLocaleString());
                item.btn.label.timeago.bootstrap = new bootstrap.Tooltip(item.btn.label.timeago);
                setTimeout(function(){ item.btn.label.timeago.timeago(); }, 0);

                // Configure isRead
                item.attr('data-isRead',properties.isRead);
                if(!properties.isRead){
                    item.addClass('blink-primary');
                    item.btn.label.text.addClass('fw-bold');
                }

                // Set Item Class
                if(properties.class.item){
                    item.addClass(properties.class.item);
                }

                // Add a read function
                item.read = function(callback = null){
                    if(item.attr('data-isRead') === 'false'){
                        item.attr('data-isRead', 'true').removeClass('blink-primary');
                        item.btn.label.text.removeClass('fw-bold');
                        self.count();
                        if(typeof self._properties.callback.onRead === 'function'){
                            self._properties.callback.onRead(item,self,self._component);
                        }
                        if(typeof properties.onRead === 'function'){
                            properties.onRead(item,self,self._component);
                        }
                    }
                    if(typeof callback === 'function'){
                        callback(item,self,self._component);
                    }
                };

                // Add onRead Callback
                if(!properties.isRead){
                    item.timer;
                    item.hover(function() {
                        item.timer = setTimeout(function() {
                            item.read();
                        }, self._properties.onReadDelay);
                    }, function() {
                        clearTimeout(item.timer);
                    });
                }

                // Add click Callback
                item.click(function(){
                    if(typeof properties.click === 'function'){
                        properties.click(item,self,self._component);
                    }
                });

                // Add View All Click Callback
                this._component.menu.footer.btn.on('click',function(){
                    if(typeof self._properties.callback.click === 'function'){
                        self._properties.callback.click(item,self,self._component);
                    }
                });

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(item,this);
                }

                // Set Count
                this.count();

                // Return Object
                return this;
            }
        },
        task: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    callback: {
                        click: null,
                        viewAll: null,
                    },
                    icon: "list-task",
                    color: "primary",
                    properties: {
                        class: {
                            item: null,
                        },
                        label: null,
                        click: null,
                        progress: {
                            size: null,
                            color: "primary",
                            striped: true,
                            animated: true,
                            scale: 100,
                            label: "",
                        },
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'tasks' + this._id,
                    'class': 'dropdown taskArea',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Create Button
                this._component.btn = $(document.createElement('button')).attr({
                    'class': 'nav-link text-decoration-none py-2 animate-slide-hover-top-20',
                    'type': 'button',
                    'data-bs-toggle': 'dropdown',
                    'aria-expanded': 'false',
                }).appendTo(this._component);
                this._component.btn.icon = $(document.createElement('i')).attr({
                    'class': 'fs-4 bi bi-' + this._properties.icon,
                    'style': 'height: 2.25rem !important;width: 1.5rem !important',
                }).appendTo(this._component.btn);
                this._component.btn.badge = $(document.createElement('span')).attr({
                    'class': 'position-absolute top-25 start-75 translate-middle border border-light rounded-circle d-none',
                    'style': 'padding:8px',
                }).appendTo(this._component.btn);

                // Create Menu
                this._component.menu = $(document.createElement('ul')).attr({
                    'class': 'dropdown-menu dropdown-menu-end pb-0',
                    'style': 'min-width:400px;max-width:500px',
                }).appendTo(this._component);

                // Create Header
                this._component.menu.header = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.header.title = $(document.createElement('h5')).addClass('py-2 px-3 m-0 cursor-default d-flex justify-content-center align-items-center').appendTo(this._component.menu.header);
                this._component.menu.header.title.label = $(document.createElement('span')).text('Tasks').appendTo(this._component.menu.header.title);
                this._component.menu.header.title.count = $(document.createElement('span')).addClass('badge rounded-pill ms-2 d-none').appendTo(this._component.menu.header.title);

                // Create Seperators
                this._component.menu.seperator = {};
                this._component.menu.seperator = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider m-0').appendTo(this._component.menu.seperator);

                // Create Items List
                this._component.menu.list = $(document.createElement('div')).attr({
                    'class': 'overflow-auto',
                    'style': 'max-height:500px',
                }).appendTo(this._component.menu);

                // Create Footer
                this._component.menu.footer = $(document.createElement('li')).appendTo(this._component.menu);
                this._component.menu.footer.btn = $(document.createElement('button')).attr({
                    'class': 'dropdown-item text-center py-2 rounded-bottom btn btn-link',
                    'type': 'button',
                }).appendTo(this._component.menu.footer);
                this._component.menu.footer.btn.label = $(document.createElement('small')).text('View All').appendTo(this._component.menu.footer.btn);

                // Set Icon
                if(this._properties.icon === null){
                    this._component.btn.icon.remove();
                }

                // Set Color
                if(this._properties.color){
                    this._component.btn.badge.addClass('text-bg-' + this._properties.color);
                    this._component.menu.header.title.count.addClass('text-bg-' + this._properties.color);
                }

                // Add Callback
                self._component.menu.footer.btn.on('click',function(){
                    if(typeof self._properties.callback.viewAll === 'function'){
                        self._properties.callback.viewAll();
                    }
                });
            }

            count(){

                // Set Self
                const self = this;

                // Count the number of new notifications
                let count = this._component.find('.dropdown-item.task').length;

                // Set Count
                this._component.menu.header.title.count.text(count);

                // Show Badge
                if(count > 0){
                    this._component.menu.header.title.count.removeClass('d-none');
                    this._component.btn.badge.removeClass('d-none');
                    this._component.btn.addClass('animate-pulse');
                } else {
                    this._component.menu.header.title.count.addClass('d-none');
                    this._component.btn.badge.addClass('d-none');
                    this._component.btn.addClass('animate-pulse');
                }

                // Return Count
                return count;
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

                let properties = {};

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
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"progress":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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

                // Create Item
                let item = $(document.createElement('li')).attr({
                    'id': this._component.id + 'task' + id,
                }).prependTo(this._component.menu.list);
                item.id = item.attr('id');
                item.properties = properties;

                // Create Button
                item.btn = $(document.createElement('button')).attr({
                    'class': 'dropdown-item d-flex flex-column py-2 task',
                    'type': 'button',
                }).appendTo(item);

                // Add Label
                item.btn.label = $(document.createElement('div')).addClass('w-100').appendTo(item.btn);
                item.btn.label.text = $(document.createElement('span')).addClass('text-wrap').text(properties.label).appendTo(item.btn.label);
                item.btn.label.scale = $(document.createElement('small')).addClass('text-muted float-end').appendTo(item.btn.label);

                // Add Progress Bar
                item.btn.progress = $(document.createElement('div')).addClass('w-100').appendTo(item.btn);

                // Add Seperator
                item.seperator = $(document.createElement('li')).insertAfter(item);
                item.seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider m-0').appendTo(item.seperator);

                // Add Change Callback to Progress Properties
                if(typeof properties.progress.callback === 'undefined' || typeof properties.progress.callback !== 'object' || Object.entries(properties.progress.callback).length <= 0){
                    properties.progress.callback = {};
                }
                let change = null;
                if(typeof properties.progress.callback.change === 'function'){
                    change = properties.progress.callback.change;
                }
                properties.progress.callback.change = function(progress){

                    // Set Scale
                    item.btn.label.scale.text(progress.get() + '%');

                    // Execute Change Callback
                    if(typeof change === 'function'){
                        change(progress);
                    }
                };

                // Configure Progress Bar
                item.btn.progress.bar = this._builder.Component(
                    'progress',
                    item.btn.progress,
                    properties.progress,
                    function(progress){},
                );

                // Redirect Set Function
                item.set = function(value){
                    item.btn.progress.bar.set(value);
                };

                // Set Item Class
                if(properties.class.item){
                    item.addClass(properties.class.item);
                }

                // Add Callback
                if(typeof this._properties.callback.click === 'function'){
                    item.on('click',function(){
                        self._properties.callback.click(item,self,self._component);
                    });
                }

                // Add Callback
                if(typeof properties.click === 'function'){
                    item.on('click',function(){
                        properties.click(item,self,self._component);
                    });
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(item,this);
                }

                // Set Count
                this.count();

                // Return Object
                return this;
            }
        },
        toast: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    callback: {
                        click: null,
                    },
                    position: 'bottom-end',
                    properties: {
                        class: {
                            item: null,
                        },
                        callback: {
                            click: null,
                        },
                        color: null,
                        icon: null,
                        title: null,
                        body: null,
                        datetime: null,
                        delay: 5000,
                        autohide: true,
                        animation: true,
                        dismissible: true,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'toasts' + this._id,
                    'class': 'toast-container position-fixed p-3',
                }).prependTo('body');
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Position
                if(this._properties.position){
                    this.position(this._properties.position);
                }
            }

            position(position){

                // Remove existing positions
                this._component.removeClass('top-0 start-0 top-0 start-50 translate-middle-x top-0 end-0 bottom-0 start-0 bottom-0 start-50 translate-middle-x bottom-0 end-0');

                // Set Position
                if(typeof position === 'string'){
                    switch(position){
                        case"top-start":
                            this._component.addClass('top-0 start-0');
                            break;
                        case"top-center":
                            this._component.addClass('top-0 start-50 translate-middle-x');
                            break;
                        case"top-end":
                            this._component.addClass('top-0 end-0');
                            break;
                        case"bottom-start":
                            this._component.addClass('bottom-0 start-0');
                            break;
                        case"bottom-center":
                            this._component.addClass('bottom-0 start-50 translate-middle-x');
                            break;
                        case"bottom-end":
                            this._component.addClass('bottom-0 end-0');
                            break;
                    }
                }
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

                let properties = {};

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
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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

                // Create Toast
                let toast = $(document.createElement('div')).attr({
                    'id': this._component.id + 'toast' + id,
                    'class': 'toast show animate-wobble-once animate-pulse-hover',
                    'role': 'alert',
                    'aria-live': 'assertive',
                    'aria-atomic': 'true',
                }).prependTo(this._component);
                toast.id = toast.attr('id');
                toast.properties = properties;

                // Create Toast Header
                toast.header = $(document.createElement('div')).addClass('toast-header').appendTo(toast);
                toast.header.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + properties.icon).appendTo(toast.header);
                toast.header.title = $(document.createElement('strong')).addClass('me-auto').html(self._builder.Parser.parse(properties.title)).appendTo(toast.header);
                toast.header.time = $(document.createElement('small')).addClass('text-muted').appendTo(toast.header);
                toast.header.time.ago = $(document.createElement('time')).attr({
                    'class': 'timeago',
                    'data-bs-toggle': 'tooltip',
                }).appendTo(toast.header.time);
                toast.header.close = $(document.createElement('button')).attr({
                    'class': 'btn-close',
                    'type': 'button',
                    'data-bs-dismiss': 'toast',
                    'aria-label': 'Close'
                }).appendTo(toast.header);

                // Create Toast Body
                toast.body = $(document.createElement('div')).addClass('toast-body').html(self._builder.Parser.parse(properties.body)).appendTo(toast);

                // Configure Color
                if(properties.color){
                    toast.addClass('text-bg-' + properties.color);
                }

                // Configure Icon
                if(properties.icon === null){
                    toast.header.icon.remove();
                }

                // Configure Title
                if(properties.title === null){
                    toast.header.title.remove();
                }

                // Configure Body
                if(properties.body === null){
                    toast.body.remove();
                }

                // Configure Date Time
                let datetime = null;
                if(properties.datetime !== null){
                    datetime = new Date(properties.datetime);
                } else {
                    datetime = new Date();
                }
                toast.header.time.ago.attr({
                    'title': datetime.toLocaleString(),
                    'datetime': datetime.toLocaleString(),
                    'data-bs-title': datetime.toLocaleString(),
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                }).text(datetime.toLocaleString());
                setTimeout(function(){ toast.header.time.ago.timeago(); }, 0);
                toast.header.time.ago.bootstrap = new bootstrap.Tooltip(toast.header.time.ago);

                // Configure Animation
                if(properties.animation){
                    toast.addClass('fade');
                }

                // Configure Autohide
                if(properties.autohide){
                    toast.timer = setTimeout(function(){
                        toast.addClass('opacity-0').delay(500).queue(function(){
                            toast.removeClass('show opacity-0').addClass('hide').dequeue();
                        });
                    }, properties.delay);
                }

                // Configure Dismissible
                if(!properties.dismissible){
                    toast.header.close.remove();
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(toast,this);
                }

                // Return Object
                return this;
            }
        },
        helper: class extends this.UtilityClass {

            // Log all event names of an element
            logEvents(element){
                // List of common events
                var events = [
                    'abort',
                    'afterprint',
                    'animationend',
                    'animationiteration',
                    'animationstart',
                    'beforeprint',
                    'beforeunload',
                    'blur',
                    'canplay',
                    'canplaythrough',
                    'change',
                    'click',
                    'contextmenu',
                    'copy',
                    'cut',
                    'dblclick',
                    'drag',
                    'dragend',
                    'dragenter',
                    'dragleave',
                    'dragover',
                    'dragstart',
                    'drop',
                    'durationchange',
                    'ended',
                    'error',
                    'focus',
                    'focusin',
                    'focusout',
                    'fullscreenchange',
                    'fullscreenerror',
                    'hashchange',
                    'input',
                    'invalid',
                    'keydown',
                    'keypress',
                    'keyup',
                    'load',
                    'loadeddata',
                    'loadedmetadata',
                    'loadstart',
                    'message',
                    'mousedown',
                    'mouseenter',
                    'mouseleave',
                    'mousemove',
                    'mouseout',
                    'mouseover',
                    'mouseup',
                    'mousewheel',
                    'offline',
                    'online',
                    'open',
                    'pagehide',
                    'pageshow',
                    'paste',
                    'pause',
                    'play',
                    'playing',
                    'popstate',
                    'progress',
                    'ratechange',
                    'resize',
                    'reset',
                    'scroll',
                    'search',
                    'seeked',
                    'seeking',
                    'select',
                    'show',
                    'stalled',
                    'submit',
                    'suspend',
                    'timeupdate',
                    'toggle',
                    'touchcancel',
                    'touchend',
                    'touchmove',
                    'touchstart',
                    'transitionend',
                    'unload',
                    'volumechange',
                    'waiting',
                    'wheel'
                ];

                // Add Listeners
                $.each(events, function(i, eventName) {
                    element.on(eventName, function(e) {
                        console.log('Event type:', e.type);
                    });
                });
            }

            // Convert a string into ASCII
            stringToAscii(string){

                // Set the Base62 character set
                const Base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

                // Convert string into a string
                string = string.toString();

                // Convert each character in the string to its ASCII value and form a large integer
                let numericValue = BigInt(0);

                for (let i = 0; i < string.length; i++) {
                    numericValue = numericValue * BigInt(256) + BigInt(string.charCodeAt(i));
                }

                // Convert the large integer to a Base62 string
                let ascii = '';
                while (numericValue > 0) {
                    let index = Number(numericValue % BigInt(62));
                    ascii = Base62[index] + ascii;
                    numericValue = numericValue / BigInt(62);
                }

                // Return the result
                return ascii;
            }

            // Retrieve the favicon of a domain
            favicon(domain) {

                // Sanitize the domain removing any protocol and any path
                domain = domain.replace('https://', '').replace('http://', '').split('/')[0];

                // DuckDuckGo's API for fetching favicons
                const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

                return faviconUrl;
            }

            // Get the value of a query string from a URL
            getParameterByName(name, url = window.location.href) {
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

            // Check if a string is a valid base64 string
            isBase64(str) {
                try {
                    return btoa(atob(str)) === str;
                } catch (err) {
                    return false;
                }
            }

            // Create Emphasis on element
            emphasis(element = null){

                // If the element is null, remove any existing emphasis
                if(element === null){
                    $('.emphasized-element').removeClass('emphasized-element');
                    $('.emphasized-overlay').remove();
                    return true;
                }

                // If the element is a jQuery object
                if(!element instanceof jQuery){
                    element = $(element);
                }

                // Check if element is in DOM
                if(element.length <= 0){
                    return false;
                }

                // If the overlay already exists, remove it
                if($('.emphasized-overlay').length <= 0){

                    // Append the overlay div
                    $('body').append('<div class="emphasized-overlay"></div>');
                }

                // Clear any previous emphasized elements
                $('.emphasized-element').removeClass('emphasized-element');

                // Add the emphasized class to the target element
                $(element).addClass('emphasized-element');
            }

            // Generate a random number between min and max
            randomNumber(min = -10, max = 10){
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            // Validate an email address
            validateEmail($email) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return ( $email.length > 0 && emailReg.test($email))
            }

            // Check if a value is in an array
            inArray(needle, haystack) {
                var length = haystack.length;
                for(var i = 0; i < length; i++) {
                if(haystack[i] == needle) return true;
                }
                return false;
            }

            // Format a number of bytes into a human readable string
            formatBytes(bytes, decimals = 2) {
                if (!+bytes) return '0 Bytes'
                const k = 1024
                const dm = decimals < 0 ? 0 : decimals
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                const i = Math.floor(Math.log(bytes) / Math.log(k))
                return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
            }

            // Copy a string or object content to the clipboard
            copyToClipboard(object){
                if(typeof object !== 'undefined' && typeof object !== null && typeof object !== 'function'){
                    let string = ''
                    let input = $(document.createElement('textarea')).appendTo('body')
                    if(typeof object === 'object'){ string = object.text(); }
                    if(typeof object === 'number'){ string = object.toString(); }
                    if(typeof object === 'boolean'){ string = object.toString(); }
                    if(typeof object === 'string'){ string = object; }
                    input.val(string).select();
                    document.execCommand("copy");
                    navigator.clipboard.writeText(input.val());
                    input.remove();
                }
            }

            // Format a phone number
            formatPhoneNumber(phoneNumberString) {
                var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
                var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
                if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3]
                }
                return null
            }

            // Convert a string containing HTML entities to regular characters
            htmlEntities(str) {
                return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                   return '&#' + i.charCodeAt(0) + ';';
                });
            }

            // Check if a variable is constant
            isConstant(variable) {
                const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(variable), Object.keys(variable)[0]);
                return descriptor && descriptor.writable === false;
            }

            // Format a string to a slug
            formatSlug (value) {
                return value
                    .toLowerCase()
                    .replace(/-+/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '');
            };

            // Check if the current device is a mobile device
            isMobileDevice() {
                const userAgent = navigator.userAgent;
                var mobileDeviceUserAgents = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
                return mobileDeviceUserAgents.test(userAgent);
            }

            // Function to retrieve the available Bootstrap Icons
            bootstrapIcons() {
                const styleSheets = document.styleSheets;
                var icons = [];

                for (const styleSheet of styleSheets) {
                    const rules = styleSheet.rules || styleSheet.cssRules;

                    for (const rule of rules) {
                        if(typeof rule.selectorText === 'undefined'){ continue; }

                        if (rule.selectorText.startsWith(".bi-")) {

                            // Remove ".bi-" from the icon name
                            const iconName = rule.selectorText.slice(4);

                            // Remove "::before" from the icon name
                            const cleanedIconName = iconName.replace("::before", "");

                            // Check if duplicate
                            if(!icons.includes(cleanedIconName)){
                                icons.push(cleanedIconName);
                            }
                        }
                    }
                }

                return icons;
            }

            // Function to retrieve the available Bootstrap Text Backgrounds
            bootstrapTextBg() {
                const styleSheets = document.styleSheets;
                var colors = [];

                for (const styleSheet of styleSheets) {
                    const rules = styleSheet.rules || styleSheet.cssRules;

                    for (const rule of rules) {
                        if(typeof rule.selectorText === 'undefined'){ continue; }

                        if (rule.selectorText.startsWith(".text-bg-")) {

                            // Remove ".text-bg-" from the color name
                            const colorName = rule.selectorText.slice(9);

                            // Remove "::before" from the icon name
                            const cleanedColorName = colorName.replace("::before", "").replace(" a", "").replace(" .text-muted", "");

                            // Check if duplicate
                            if(!colors.includes(cleanedColorName)){
                                colors.push(cleanedColorName);
                            }
                        }
                    }
                }

                return colors;
            }

            // Convert to Markdown
            htmlToMarkdown(html) {
                const converter = new TurndownService();

                // Use '#' for headers
                converter.addRule('heading', {
                    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    replacement: function(content, node) {
                        var hLevel = node.nodeName.charAt(1);
                        var hPrefix = '';
                        for(var i=0; i<hLevel; i++){
                            hPrefix += '#';
                        }
                        return '\n\n' + hPrefix + ' ' + content + '\n\n';
                    }
                });

                // Use triple backticks for code blocks
                converter.addRule('codeBlock', {
                    filter: 'pre',
                    replacement: function(content) {
                        return '\n\n```' + '\n' + content + '\n' + '```\n\n';
                    }
                });

                return converter.turndown(html);
            }

            // Convert to HTML
            markdownToHTML(markdown) {
                const converter = new showdown.Converter();
                return converter.makeHtml(markdown);
            }

            // Check the OS Type
            detectOperatingSystem() {
                const userAgent = navigator.userAgent;

                if (/iPad|iPhone|iPod/.test(userAgent)) {
                    return 'iOS';
                }
                if (/Android/.test(userAgent)) {
                    return 'Android';
                }
                if (/Mac OS X/.test(userAgent)) {
                    return 'macOS';
                }
                if (/Windows NT/.test(userAgent)) {
                    return 'Windows';
                }
                if (/Linux/.test(userAgent)) {
                    return 'Linux';
                }
                return 'Unknown OS';
            }

            // Convert to MD5
            md5 = (function() {
                var MD5 = function (d) {
                    return M(V(Y(X(d), 8 * d.length)))
                }
                function M (d) {
                    for (var _, m = '0123456789abcdef', f = '', r = 0; r < d.length; r++) {
                        _ = d.charCodeAt(r)
                        f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _)
                    }
                    return f
                }
                function X (d) {
                    for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) {
                        _[m] = 0
                    }
                    for (m = 0; m < 8 * d.length; m += 8) {
                        _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32
                    }
                    return _
                }
                function V (d) {
                    for (var _ = '', m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255)
                    return _
                }
                function Y (d, _) {
                    d[_ >> 5] |= 128 << _ % 32
                    d[14 + (_ + 64 >>> 9 << 4)] = _
                    for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
                        var h = m
                        var t = f
                        var g = r
                        var e = i
                        f = md5ii(f = md5ii(f = md5ii(f = md5ii(f = md5hh(f = md5hh(f = md5hh(f = md5hh(f = md5gg(f = md5gg(f = md5gg(f = md5gg(f = md5ff(f = md5ff(f = md5ff(f = md5ff(f, r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551)
                        m = safeadd(m, h)
                        f = safeadd(f, t)
                        r = safeadd(r, g)
                        i = safeadd(i, e)
                    }
                    return [m, f, r, i]
                }
                function md5cmn (d, _, m, f, r, i) {
                    return safeadd(bitrol(safeadd(safeadd(_, d), safeadd(f, i)), r), m)
                }
                function md5ff (d, _, m, f, r, i, n) {
                    return md5cmn(_ & m | ~_ & f, d, _, r, i, n)
                }
                function md5gg (d, _, m, f, r, i, n) {
                    return md5cmn(_ & f | m & ~f, d, _, r, i, n)
                }
                function md5hh (d, _, m, f, r, i, n) {
                    return md5cmn(_ ^ m ^ f, d, _, r, i, n)
                }
                function md5ii (d, _, m, f, r, i, n) {
                    return md5cmn(m ^ (_ | ~f), d, _, r, i, n)
                }
                function safeadd (d, _) {
                    var m = (65535 & d) + (65535 & _)
                    return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
                }
                function bitrol (d, _) {
                    return d << _ | d >>> 32 - _
                }
                function MD5Unicode(buffer){
                    if (!(buffer instanceof Uint8Array)) {
                        buffer = new TextEncoder().encode(typeof buffer==='string' ? buffer : JSON.stringify(buffer));
                    }
                    var binary = [];
                    var bytes = new Uint8Array(buffer);
                    for (var i = 0, il = bytes.byteLength; i < il; i++) {
                        binary.push(String.fromCharCode(bytes[i]));
                    }
                    return MD5(binary.join(''));
                }

                return MD5Unicode;
            })()

            gravatar(param1 = null, param2 = null){

                const self = this;

                let email = null;
                let options = {};

                // Set email, options, and callback
                [param1, param2].forEach(param => {
                    if(param !== null){
                        if (typeof param === 'string' || param instanceof jQuery) {
                            email = param;
                        } else if (typeof param === 'object') {
                            options = param;
                        }
                    }
                });

                let properties = {
                    extension: false, //in request
                    size: false, //s
                    default: 'mp', //d
                    force: false, //f
                    rating: false, //r
                };

                let extensions = ['jpg','jpeg','png','gif'];
                let defaults = ['404','mp','identicon','monsterid','wavatar','retro','robohash','blank'];
                let ratings = ['g','pg','r','x'];
                let api = 'https://www.gravatar.com/avatar/';

                // Configure Options
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            default:
                                properties[key] = value;
                                break;
                        }
                    }
                }

                // Set URL
                let url = api + self.md5(email);

                // Configure URL
                for(const [key, value] of Object.entries(properties)){
                    if(value){
                        switch(key){
                            case"extension":
                                if(self.inArray(value,extensions)){
                                    url += '.' + value
                                }
                                break;
                            case"size":
                                if(url.toLowerCase().indexOf("?") >= 0){
                                    url +=  '&s=' + parseInt(value)
                                } else {
                                    url +=  '?s=' + parseInt(value)
                                }
                                break;
                            case"default":
                                if(self.inArray(value,defaults)){
                                    if(url.toLowerCase().indexOf("?") >= 0){
                                        url +=  '&d=' + value
                                    } else {
                                        url +=  '?d=' + value
                                    }
                                }
                                break;
                            case"force":
                                if(url.toLowerCase().indexOf("?") >= 0){
                                    url +=  '&f=y'
                                } else {
                                    url +=  '?f=y'
                                }
                                break;
                            case"rating":
                                if(self.inArray(value,ratings)){
                                    if(url.toLowerCase().indexOf("?") >= 0){
                                        url +=  '&r=' + value
                                    } else {
                                        url +=  '?r=' + value
                                    }
                                }
                                break;
                        }
                    }
                }

                // Return URL
                return url
            }

            isClass(input) {
                return typeof input === 'function' && /^class\s/.test(Function.prototype.toString.call(input));
            }
        },
    };

    #layouts = {
        quiz: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    callback:{
                        val: function(values){ return values; },
                        reset: function(form){},
                        clear: function(form){},
                        submit: function(form){},
                    },
                    title: null,
                    clear: true,
                    reset: true,
                    submit: true,
                };
            }

            _config(name,options){
                if(typeof this._properties[name] !== 'undefined'){
                    switch(name){
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

                // Create Title
                this._component.header = $(document.createElement('div')).addClass('col-12 mb-2').appendTo(this._component);
                this._component.header.title = $(document.createElement('h1')).addClass('text-center').text(this._properties.title).appendTo(this._component.header);

                // Create Form
                this._component.form = this._builder.Component(
                    "form",
                    this._component,
                    {
                        callback:{
                            val: function(values){
                                var array = {};
                                for(var [key, value] of Object.entries(values)){
                                    if(key !== 'clear' && key !== 'reset' && key !== 'submit'){
                                        var page = key.split('question')[1];
                                        page = page.split('range')[0];
                                        page = page.split('comment')[0];
                                        var id = key.split(page)[1];
                                        if(typeof array[page] === 'undefined'){
                                            array[page] = {};
                                        }
                                        array[page][id] = value;
                                    }
                                }
                                if(typeof self._properties.callback.val === 'function'){
                                    array = self._properties.callback.val(array);
                                }
                                return array;
                            },
                            reset: this._properties.callback.reset,
                            clear: this._properties.callback.clear,
                            submit: this._properties.callback.submit,
                        },
                    },
                    function(form, component){
                        // Create Stepper
                        self._component.stepper = self._builder.Component(
                            "stepper",
                            component,
                            {
                                class: {
                                    stepper: null,
                                    controls: 'card card-body mb-2',
                                    steps: 'card card-body my-2',
                                    pagination: 'card card-body mt-2',
                                },
                                color: null,
                                properties: {},
                            },
                            function(stepper, component){
                                // Create Form Controls
                                self._component.controls = $(document.createElement('div')).addClass('btn-group').appendTo(component.pagination.list);

                                // Add Clear Control
                                if(self._properties.clear){
                                    form.add(
                                        {
                                            name: 'clear',
                                            label: 'Clear',
                                            icon: 'x-lg',
                                            type: 'clear',
                                        },
                                        function(input){
                                            input.input.appendTo(self._component.controls);
                                        },
                                    );
                                }

                                // Add Reset Control
                                if(self._properties.reset){
                                    form.add(
                                        {
                                            name: 'reset',
                                            label: 'Reset',
                                            icon: 'arrow-clockwise',
                                            type: 'reset',
                                        },
                                        function(input){
                                            input.input.appendTo(self._component.controls);
                                        },
                                    );
                                }

                                // Add Submit Control
                                if(self._properties.submit){
                                    form.add(
                                        {
                                            name: 'submit',
                                            label: 'Submit',
                                            icon: 'save',
                                            type: 'submit',
                                        },
                                        function(input){
                                            input.input.appendTo(self._component.controls);
                                        },
                                    );
                                }
                            },
                        );
                    }
                );
            }

            #addStep(properties){

                const self = this;

                // Add Step
                this._component.stepper.add(
                    function(step){

                        // Save Properties
                        step.properties = properties;

                        // Create Question
                        step.content.question = $(document.createElement('h3')).html(properties.label).appendTo(step.content);

                        // Create Range
                        step.content.range = self._component.form.add( //Add Inputs
                            {
                                name: 'question'+properties.id+'range',
                                label: properties.scaleDescription,
                                icon: null,
                                type: 'range',
                                value: 1,
                                min: 1,
                                max: Object.entries(properties.scale).length,
                                options: properties.scale,
                                class: {
                                    input: null,
                                    label: null,
                                    field: 'my-3',
                                },
                            },
                        ).appendTo(step.content);

                        // Create MCE
                        step.content.comment = self._component.form.add(
                            {
                                name: 'question'+properties.id+'comment',
                                label: 'Comments',
                                icon: null,
                                type: 'mce',
                                class: {
                                    input: null,
                                    label: null,
                                    field: null,
                                },
                            },
                        ).appendTo(step.content);
                    },
                );
            }

            add(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

                let properties = {
                    label: null,
                    range: true,
                    comment: true,
                    scaleDescription: null,
                    scale: null,
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
                            case"scale":
                                var opts = null;
                                if(typeof value === 'object'){
                                    opts = value;
                                    if($.isArray(value)){
                                        opts = {};
                                        for(var [k, v] of Object.entries(value)){
                                            var kv = parseInt(k) + 1;
                                            opts[kv] = v;
                                        }
                                    }
                                }
                                properties[key] = opts;
                                break;
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

                // Add Step
                if(typeof this._component.stepper !== 'undefined'){
                    self.#addStep(properties);
                } else {
                    var interval = setInterval(function() {
                        if(typeof self._component.stepper !== 'undefined'){
                            clearInterval(interval);
                            self.#addStep(properties);
                        }
                    }, 100);
                }

                // Return
                return this;
            }

            val(values = null){
                return this._component.form.val(values);
            }

            reset(){
                return this._component.form.reset();
            }

            clear(){
                return this._component.form.clear();
            }

            submit(){
                return this._component.form.submit();
            }
        },
        faq: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    title: 'Frequently Asked Questions',
                    contact: '?t=layouts&p=contact',
                };
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

                // Create Title
                this._component.header = $(document.createElement('div')).addClass('col-12 mb-2').appendTo(this._component);
                this._component.header.title = $(document.createElement('h1')).addClass('text-center').text(this._properties.title).appendTo(this._component.header);

                // Create Accordion
                this._component.faqs = this._builder.Component(
                    'accordion',
                    this._component,
                    {
                        class: {
                            component: 'col-12 mt-2 bg-transparent',
                            collapse: "mb-2 rounded",
                            button: "rounded",
                        },
                        flush: false,
                        alwaysOpen: true,
                    },
                );

                // Create Footer
                this._component.footer = $(document.createElement('div')).addClass('col-12 mt-2').appendTo(this._component);
                this._component.footer.paragraph = $(document.createElement('p')).addClass('lead text-center').appendTo(this._component.footer);
                this._component.footer.paragraph.link = $(document.createElement('a')).attr({
                    href: this._properties.contact,
                }).text('Contact us').appendTo(this._component.footer.paragraph);
                this._component.footer.paragraph.text = $(document.createElement('span')).text(', if you did not find the right anwser or you have an other question?').appendTo(this._component.footer.paragraph);
            }

            add(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

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

                // Add FAQ
                this._component.faqs.add(options,callback);

                // Return
                return this;
            }
        },
        list: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        object: null,
                        buttons: null,
                        searchBuilder: null,
                        table: null,
                        footer: null,
                    },
                    title: null,
                    icon: null,
                    actions:{},
                    buttons:[],
                    columnDefs:[],
                    dblclick:function(event, table, node, data){},
                    advancedSearch:true,
                    exportTools:true,
                    columnsVisibility:true,
                    selectTools:true,
                };
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

                // Create Card
                this._component.card = this._builder.Component(
                    'card',
                    this._component,
                    {
                        class: {
                            collapse: "w-100",
                        },
                        icon: this._properties.icon,
                        title: this._properties.title,
                    },
                    function(card,component){
                        component.body.addClass('p-0');
                        self._component.table = self._builder.Component(
                            'table',
                            component.body,
                            {
                                class: {
                                    component: self._properties.class.object,
                                    searchBuilder: self._properties.class.searchBuilder,
                                    buttons: "px-4 pt-4 " + self._properties.class.buttons,
                                    table: "border-top " + self._properties.class.table,
                                    footer: "px-4 pt-2 pb-4 " + self._properties.class.footer,
                                },
                                showButtonsLabel: true,
                                selectTools:true,
                                actions:self._properties.actions,
                                datatable:{
                                    columnDefs:self._properties.columnDefs,
                                    buttons:self._properties.buttons,
                                },
                                dblclick:self._properties.dblclick,
                                advancedSearch:self._properties.advancedSearch,
                                exportTools:self._properties.exportTools,
                                columnsVisibility:self._properties.columnsVisibility,
                                selectTools:self._properties.selectTools,
                            },
                        );
                    },
                );
            }

            add(data){

                this._component.table.add(data);
            }

            update(row, data){

                this._component.table.update(row, data);
            }

            delete(row){

                this._component.table.delete(row);
            }
        },
        details: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    title: 'Details',
                    icon: 'person',
                };
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

                // Create Columns
                this._component.col1 = $(document.createElement('div')).attr({
                    class: 'col-4',
                }).appendTo(this._component);
                this._component.col2 = $(document.createElement('div')).attr({
                    class: 'col-8',
                }).appendTo(this._component);

                // Create Profile Details Section
                this._component.detail = this._builder.Component(
                    'card',
                    this._component.col1,
                    {
                        title: self._properties.title,
                        icon: self._properties.icon,
                        class: {
                            card: 'mb-3',
                        },
                    },
                    function(card,component){
                        component.body.addClass('p-0');
                        self._component.detailList = self._builder.Component(
                            'list',
                            component.body,
                            {
                                callback: {
                                    item: function(item){},
                                },
                                class: {
                                    component: 'bg-transparent rounded-bottom',
                                },
                            },
                        );
                        card.hide();
                    },
                );

                // Create Profile Tabs Section
                this._component.tabs = this._builder.Component(
                    'tabs',
                    this._component.col2,
                    {
                        class: {
                            navbar: 'nav-pills'
                        },
                        properties: {
                            class: {
                                tab: 'fade',
                            },
                        },
                    },
                    function(tabs,component){
                        tabs.hide();
                    }
                );
            }

            detail(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

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

                // Show Detail
                this._component.detail.show();

                // Add Detail
                this._component.detailList.add(options,callback);

                // Return
                return this;
            }

            tab(param1 =null, param2 =null, param3 =null){

                const self = this;

                let name = {};
                let options = {};
                let callback = null;

                // Set selector, options, and callback
                [param1, param2, param3].forEach(param => {
                    if(param !== null){
                        if (typeof param === 'string') {
                            name = param;
                        } else if (typeof param === 'object') {
                            options = param;
                        } else if (typeof param === 'function') {
                            callback = param;
                        }
                    }
                });

                // Show Tabs
                this._component.tabs.show();

                // Add Tab
                this._component.tabs.add(name,options,callback);

                // Return
                return this;
            }
        },
        profile: class extends this.ComponentClass {

            modal = null;

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    status: null,
                    isActive: false,
                    isDeleted: false,
                    isBanned: false,
                    statuses: {},
                    callback: {
                        isActive: function(value, button, modal, layout){
                            console.log('isActive',value, button, modal, layout);
                        },
                        isDeleted: function(value, button, modal, layout){
                            console.log('isDeleted',value, button, modal, layout);
                        },
                        isBanned: function(value, button, modal, layout){
                            console.log('isBanned',value, button, modal, layout);
                        },
                    }
                };
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

                // Create Columns
                this._component.col1 = $(document.createElement('div')).attr({
                    class: 'col-4',
                }).appendTo(this._component);
                this._component.col2 = $(document.createElement('div')).attr({
                    class: 'col-8',
                }).appendTo(this._component);

                // Create Profile Details Section
                this._component.detail = this._builder.Component(
                    'card',
                    this._component.col1,
                    {
                        title: 'Details',
                        icon: 'person',
                        class: {
                            card: 'mb-3',
                        },
                    },
                    function(card,component){

                        // Remove Padding
                        component.body.addClass('p-0');

                        // Create List
                        self._component.detailList = self._builder.Component(
                            'list',
                            component.body,
                            {
                                callback: {
                                    item: function(item){},
                                },
                                class: {
                                    component: 'bg-transparent',
                                },
                            },
                        );

                        // Add status icon
                        component.footer.removeClass('d-none').addClass('p-0');
                        component.footer.group = $(document.createElement('div')).addClass('btn-group-vertical rounded-0 rounded-bottom w-100').appendTo(component.footer);
                        component.footer.group.status = $(document.createElement('button')).addClass('btn rounded-0 rounded-bottom').appendTo(component.footer.group);
                        component.footer.group.status.icon = $(document.createElement('i')).addClass('bi me-1').appendTo(component.footer.group.status);
                        component.footer.group.status.label = $(document.createElement('span')).appendTo(component.footer.group.status);
                        self._component.status = component.footer.group.status;

                        // Add Status Button Events
                        let body = $(document.createElement('div'));
                        body.p1 = $(document.createElement('p')).text('This modal allows you to manage various settings for the user\'s profile. By toggling the buttons below, you can control the following aspects:').appendTo(body);
                        body.list = $(document.createElement('ul')).appendTo(body);
                        body.list.item1 = $(document.createElement('li')).text('Delete/Restore: Toggling this button will either delete or restore the user\'s account. Deleting the account will result in permanent removal of their profile and associated data. Restoring the account will reverse this action.').appendTo(body.list);
                        body.list.item2 = $(document.createElement('li')).text('Ban/Unban: Toggling this button will either ban or unban the user. Banning a user will restrict their access and participation on the platform. Unbanning the user will lift the restrictions.').appendTo(body.list);
                        body.list.item3 = $(document.createElement('li')).text('Activate/Deactivate: Toggling this button will either activate or deactivate the user\'s account. Activating the account will enable the user to access and use the platform. Deactivating the account will temporarily disable their access.').appendTo(body.list);
                        body.p2 = $(document.createElement('p')).text('Please note that these actions can have significant consequences, so exercise caution when making changes to a user\'s profile. Always review the situation and ensure the appropriate action is taken.').appendTo(body);
                        self.modal = self._builder.Component(
                            'modal',
                            component.footer.group.status,
                            {
                                onEnter: false,
                                destroy: false,
                                icon: "gear",
                                title: "User Profile Controls",
                                body: body,
                                submit: false,
                                size: "lg",
                            },
                            function(modal,element){
                                element.btn = {
                                    deactivate: modal.add(
                                        {
                                            label: "Deactivate",
                                            color: "danger",
                                        },
                                        function(action,button,modal){
                                            action.click(function(){
                                                if(typeof self._properties.callback.isActive === 'function'){
                                                    self._properties.callback.isActive(0,action,modal,self);
                                                }
                                                modal.hide();
                                            });
                                        },
                                    ),
                                    activate: modal.add(
                                        {
                                            label: "Activate",
                                            color: "info",
                                        },
                                        function(action,button,modal){
                                            action.click(function(){
                                                if(typeof self._properties.callback.isActive === 'function'){
                                                    self._properties.callback.isActive(1,action,modal,self);
                                                }
                                                modal.hide();
                                            });
                                        },
                                    ),
                                    unban: modal.add(
                                        {
                                            label: "Unban",
                                            color: "info",
                                        },
                                        function(action,button,modal){
                                            action.click(function(){
                                                if(typeof self._properties.callback.isBanned === 'function'){
                                                    self._properties.callback.isBanned(1,action,modal,self);
                                                }
                                                modal.hide();
                                            });
                                        },
                                    ),
                                    ban: modal.add(
                                        {
                                            label: "Ban",
                                            color: "danger",
                                        },
                                        function(action,button,modal){
                                            action.click(function(){
                                                if(typeof self._properties.callback.isBanned === 'function'){
                                                    self._properties.callback.isBanned(0,action,modal,self);
                                                }
                                                modal.hide();
                                            });
                                        },
                                    ),
                                    restore: modal.add(
                                        {
                                            label: "Restore",
                                            color: "info",
                                        },
                                        function(action){
                                            action.attr('style','border-bottom-left-radius:var(--bs-border-radius)!important;border-top-left-radius:0!important;');
                                            action.click(function(){
                                                if(typeof self._properties.callback.isDeleted === 'function'){
                                                    self._properties.callback.isDeleted(1,action,modal,self);
                                                }
                                                modal.hide();
                                            });
                                        },
                                    ),
                                    delete: modal.add(
                                        {
                                            label: "Delete",
                                            color: "danger",
                                        },
                                        function(action){
                                            action.attr('style','border-bottom-left-radius:var(--bs-border-radius)!important;border-top-left-radius:0!important;');
                                            action.click(function(){
                                                if(typeof self._properties.callback.isDeleted === 'function'){
                                                    self._properties.callback.isDeleted(0,action,modal,self);
                                                }
                                                modal.hide();
                                            });
                                        },
                                    ),
                                }
                                self.refresh();
                            },
                        );
                        setTimeout(function(){ self.status(); }, 0);
                        card.hide();
                    },
                );

                // Create Profile About Section
                this._component.about = this._builder.Component(
                    'card',
                    this._component.col1,
                    {
                        title: 'About',
                        icon: 'person-vcard',
                        class: {
                            container: 'mb-3',
                        },
                    },
                    function(card,component){
                        component.body.addClass('p-0');
                        self._component.aboutList = self._builder.Component(
                            'list',
                            component.body,
                            {
                                callback: {
                                    item: function(item){},
                                },
                                class: {
                                    component: 'bg-transparent rounded-bottom',
                                },
                            },
                        );
                        card.hide();
                    },
                );

                // Create Profile Tabs Section
                this._component.tabs = this._builder.Component(
                    'tabs',
                    this._component.col2,
                    {
                        class: {
                            navbar: 'nav-pills'
                        },
                        properties: {
                            class: {
                                tab: 'fade',
                            },
                        },
                    },
                    function(tabs,component){
                        tabs.hide();
                    }
                );
            }

            refresh(){
                for(const [name, btn] of Object.entries(this.modal._component.btn)){
                    btn.hide();
                }
                if(this._properties.isActive){
                    this.modal._component.btn.deactivate.show();
                } else {
                    this.modal._component.btn.activate.show();
                }
                if(this._properties.isBanned){
                    this.modal._component.btn.unban.show();
                } else {
                    this.modal._component.btn.ban.show();
                }
                if(this._properties.isDeleted){
                    this.modal._component.btn.restore.show();
                } else {
                    this.modal._component.btn.delete.show();
                }
            }

            status(value = null){

                // Set Self
                const self = this;

                // Check Value
                if(typeof value === 'number'){
                    this._properties.status = value;
                }

                // Reset Status
                this._component.status.removeClass (function (index, className) {
                    return (className.match (/(^|\s)text-bg-\S+/g) || []).join(' ');
                });
                this._component.status.removeClass (function (index, className) {
                    return (className.match (/(^|\s)bg-\S+/g) || []).join(' ');
                });
                this._component.status.removeClass (function (index, className) {
                    return (className.match (/(^|\s)btn-\S+/g) || []).join(' ');
                });
                this._component.status.icon.removeClass (function (index, className) {
                    return (className.match (/(^|\s)bi-\S+/g) || []).join(' ');
                });
                this._component.status.label.text('');

                // Configure Status
                setTimeout(function(){
                    if(typeof self._properties.statuses[value] !== 'undefined'){
                        self._component.status.addClass('text-bg-' + self._properties.statuses[value].color);
                        self._component.status.icon.addClass('bi-' + self._properties.statuses[value].icon);
                        self._component.status.label.text(self._properties.statuses[value].label);
                    }
                }, 0);

                // Return
                return this._properties.status;
            }

            detail(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

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

                // Show Detail
                this._component.detail.show();

                // Add Detail
                this._component.detailList.add(options,callback);

                // Return
                return this;
            }

            about(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

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

                // Show About
                this._component.about.show();

                // Add About
                this._component.aboutList.add(options,callback);

                // Return
                return this;
            }

            tab(param1 =null, param2 =null, param3 =null){

                const self = this;

                let name = {};
                let options = {};
                let callback = null;

                // Set selector, options, and callback
                [param1, param2, param3].forEach(param => {
                    if(param !== null){
                        if (typeof param === 'string') {
                            name = param;
                        } else if (typeof param === 'object') {
                            options = param;
                        } else if (typeof param === 'function') {
                            callback = param;
                        }
                    }
                });

                // Show Tabs
                this._component.tabs.show();

                // Add Tab
                this._component.tabs.add(name,options,callback);

                // Return
                return this;
            }
        },
        help: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    title: null,
                    link: {
                        articles: null,
                        contactus: null,
                    },
                };
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

                // Create Title
                this._component.title = $(document.createElement('h1')).addClass('text-center').text(this._properties.title).appendTo(this._component);

                // Create Search
                this._component.search = $(document.createElement('div')).addClass('col-12 mb-2 d-flex justify-content-center').appendTo(this._component);
                this._component.search.form = $(document.createElement('form')).attr({
                    'class': 'text-center col-6',
                    'method': 'post',
                }).appendTo(this._component.search);
                this._component.search.form.input = $(document.createElement('input')).attr({
                    'class': 'form-control search',
                    'type': 'text',
                    'name': 'search',
                    'placeholder': 'Search...',
                    'value': '',
                }).appendTo(this._component.search.form);

                // Create Announcements
                this._component.announcements = $(document.createElement('div')).addClass('col-12 my-2 d-none').appendTo(this._component);
                this._component.announcements.container = $(document.createElement('div')).addClass('container').appendTo(this._component.announcements);
                this._component.announcements.container.title = $(document.createElement('h1')).addClass('text-center').text('Announcements').appendTo(this._component.announcements.container);
                this._component.announcements.container.announcements = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center').appendTo(this._component.announcements.container);

                // Create Ressources
                this._component.ressources = $(document.createElement('div')).addClass('col-12 my-2 d-none').appendTo(this._component);
                this._component.ressources.container = $(document.createElement('div')).addClass('container').appendTo(this._component.ressources);
                this._component.ressources.container.title = $(document.createElement('h1')).addClass('text-center').text('Ressources').appendTo(this._component.ressources.container);
                this._component.ressources.container.ressources = $(document.createElement('div')).addClass('row row-cols-1 row-cols-md-3').appendTo(this._component.ressources.container);

                // Create Articles
                this._component.articles = $(document.createElement('div')).addClass('col-12 my-2 d-none').appendTo(this._component);
                this._component.articles.container = $(document.createElement('div')).addClass('container').appendTo(this._component.articles);
                this._component.articles.container.title = $(document.createElement('h1')).addClass('text-center').text('Featured Articles').appendTo(this._component.articles.container);
                this._component.articles.container.articles = $(document.createElement('div')).addClass('row row-cols-1 row-cols-md-3').appendTo(this._component.articles.container);
                this._component.articles.more = $(document.createElement('div')).addClass('row my-2').appendTo(this._component.articles);
                this._component.articles.more.container = $(document.createElement('div')).addClass('col-12').appendTo(this._component.articles.more);
                this._component.articles.more.container.quote = $(document.createElement('p')).addClass('lead text-center').text('Browse a broad library of manuals, training materials, articles and more.').appendTo(this._component.articles.more.container);
                this._component.articles.more.container.button = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center').appendTo(this._component.articles.more.container);
                this._component.articles.more.container.button.link = $(document.createElement('a')).attr({
                    class: 'btn btn-secondary',
                    href: this._properties.link.articles,
                }).text('View all articles').appendTo(this._component.articles.more.container.button);

                // Create Contact
                this._component.articles.contact = $(document.createElement('div')).addClass('col-12 my-2').appendTo(this._component);
                this._component.articles.contact.container = $(document.createElement('p')).addClass('lead text-center').appendTo(this._component.articles.contact);
                this._component.articles.contact.container.link = $(document.createElement('a')).attr({href:this._properties.link.contactus}).text('Contact us').appendTo(this._component.articles.contact.container);
                this._component.articles.contact.container.span = $(document.createElement('span')).text(', if you did not find the right anwser or you have an other question?').appendTo(this._component.articles.contact.container);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }
            }

            _config(name,options){
                if(typeof this._properties[name] !== 'undefined'){
                    switch(name){
                        case'link':
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

            alert(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {
                    class: { //Add Classes
                        alert: null, //Alert Element
                    },
                    color: "danger", //Set Color
                    dismissible: true, //Set Dismissible
                    icon: null, //Set Icon
                    title: null, //Set Title
                    content: null, //Set Content
                    datetime: null, //Set Datetime
                };

                // Configure Options
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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

                // Unhide Announcements
                this._component.announcements.removeClass('d-none');

                // Create Alert
                var alert = this._builder.Component(
                    'alert',
                    this._component.announcements.container.announcements,
                    properties,
                    function(alert,component){

                        // Save Properties
                        component.properties = properties;

                        // Add padding
                        component.addClass('p-2 ps-3');

                        // Remove margin
                        component.content.addClass('m-0');

                        // Create Icon
                        component.content.icon = $(document.createElement('i')).addClass('me-1 bi bi-clock').appendTo(component.content);

                        // Configure Datetime
                        let datetime = null;
                        if(properties.datetime !== null){
                            datetime = new Date(properties.datetime);
                        } else {
                            datetime = new Date();
                        }

                        // Create Time
                        component.content.time = $(document.createElement('time')).attr({
                            'class': 'timeago',
                            'title': datetime.toLocaleString(),
                            'datetime': datetime.toLocaleString(),
                            'data-bs-title': datetime.toLocaleString(),
                            'data-bs-toggle': 'tooltip',
                            'data-bs-placement': 'top',
                        }).text(datetime.toLocaleString()).appendTo(component.content);

                        // Initialize Tooltip
                        component.content.time.bootstrap = new bootstrap.Tooltip(component.content.time);

                        // Initialize Timeago
                        setTimeout(function(){ component.content.time.timeago(); }, 0);

                        // Check if callback is a function
                        if(typeof callback === "function"){
                            callback(alert,component);
                        }
                    },
                );

                // Return
                return this;
            }

            ressource(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {
                    class: { //Add Classes
                        ressource: null, //Ressource Element
                    },
                    icon: null, //Set Icon
                    title: null, //Set Title
                    content: null, //Set Content
                };

                // Configure Options
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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

                // Unhide Ressources
                this._component.ressources.removeClass('d-none');

                // Set ID
                let id = this._count();

                // Create Ressource
                var ressource = $(document.createElement('div')).attr({
                    'id': this._component.id + 'ressource' + id,
                    'class': 'col',
                }).appendTo(this._component.ressources.container.ressources);
                ressource.id = ressource.attr('id');
                ressource.properties = properties;

                // Set Ressource Class
                if(properties.class.ressource){
                    ressource.addClass(properties.class.ressource);
                }

                // Create Card
                ressource.card = $(document.createElement('div')).addClass('card').appendTo(ressource);

                // Create Card Header
                ressource.card.header = $(document.createElement('div')).addClass('card-header d-flex flex-column justify-content-center align-items-center').appendTo(ressource.card);

                // Create Card Title
                ressource.card.header.icon = $(document.createElement('i')).addClass('bi bi-' + properties.icon).css('font-size', '4rem').appendTo(ressource.card.header);
                ressource.card.header.title = $(document.createElement('h3')).addClass('card-title').text(properties.title).appendTo(ressource.card.header);

                // Create Card Body
                ressource.card.body = $(document.createElement('div')).addClass('card-body').html(properties.content).appendTo(ressource.card);

                // Check if callback is a function
                if(typeof callback === "function"){
                    callback(ressource);
                }

                // Return
                return this;
            }

            article(param1 =null, param2 =null){

                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {
                    class: { //Add Classes
                        article: null, //Ressource Element
                    },
                    icon: null, //Set Icon
                    title: null, //Set Title
                    content: null, //Set Content
                };

                // Configure Options
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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

                // Unhide Articles
                this._component.articles.removeClass('d-none');

                // Set ID
                let id = this._count();

                // Create Article
                var article = $(document.createElement('div')).attr({
                    'id': this._component.id + 'article' + id,
                    'class': 'col my-2',
                }).appendTo(this._component.articles.container.articles);
                article.id = article.attr('id');
                article.properties = properties;

                // Set Article Class
                if(properties.class.article){
                    article.addClass(properties.class.article);
                }

                // Set Content
                if (properties.content.length > 100) {
                    properties.content = properties.content.slice(0, 100) + '...';
                }

                // Create Card
                article.card = $(document.createElement('div')).addClass('card card-body').appendTo(article);

                // Create Card Header
                article.card.title = $(document.createElement('h4')).addClass('card-title').text(properties.title).appendTo(article.card);

                // Create Card Body
                article.card.body = $(document.createElement('p')).addClass('card-text mt-2').html(properties.content).appendTo(article.card);

                // Check if callback is a function
                if(typeof callback === "function"){
                    callback(article);
                }

                // Return
                return this;
            }
        },
        settings: class extends this.ComponentClass {

            #forms = {};

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        content: null,
                        menu: null,
                    },
                };
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

                // Create side menu
                this._component.menu = $(document.createElement('div')).addClass('col-4 col-lg-3').appendTo(this._component);
                this._component.menu.accordion = $(document.createElement('div')).attr({
                    'id': this._component.id + 'menu',
                    'class': 'accordion',
                }).appendTo(this._component.menu);
                this._component.menu.id = this._component.menu.accordion.attr('id');

                // Create content
                this._component.content = $(document.createElement('div')).addClass('col-8 col-lg-9').appendTo(this._component);
                this._component.content.card = $(document.createElement('div')).addClass('card').appendTo(this._component.content);
                this._component.content.accordion = $(document.createElement('div')).attr({
                    'id': this._component.id + 'content',
                    'class': 'accordion',
                }).appendTo(this._component.content.card);
                this._component.content.id = this._component.content.accordion.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Menu Class
                if(this._properties.class.menu){
                    this._component.menu.addClass(this._properties.class.menu);
                }

                // Set Content Class
                if(this._properties.class.content){
                    this._component.content.addClass(this._properties.class.content);
                }
            }

            add(param1 = null, param2 = null){

                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {
                    icon: 'gear',
                    label: null,
                    class: null,
                };

                // Configure Options
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
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

                // Create Category
                var category = $(document.createElement('div')).attr({
                    'id': this._component.menu.id + 'category' + id,
                    'class': 'accordion-item bg-transparent',
                }).appendTo(this._component.menu.accordion);
                category.id = category.attr('id');
                category.properties = properties;

                // Create Header
                category.header = $(document.createElement('h2')).addClass('accordion-header').appendTo(category);

                // Create Button
                category.button = $(document.createElement('button')).attr({
                    'id': category.id + 'button',
                    'class': 'accordion-button collapsed',
                    'type': 'button',
                    'data-bs-toggle': 'collapse',
                    'aria-expanded': 'false',
                }).text(properties.label).appendTo(category.header);
                category.button.id = category.button.attr('id');
                category.button.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + properties.icon).prependTo(category.button);

                // Create Collapse
                category.collapse = $(document.createElement('div')).attr({
                    'id': category.id + 'collapse',
                    'class': 'accordion-collapse collapse',
                    'data-bs-parent': '#' + this._component.menu.id,
                }).appendTo(category);
                category.collapse.id = category.collapse.attr('id');

                // Configure Button
                category.button.attr({
                    'aria-controls': category.collapse.id,
                    'data-bs-target': '#' + category.collapse.id,
                });

                // Create Menu
                category.menu = $(document.createElement('div')).attr({
                    'id': category.id + 'menu',
                    'class': 'accordion-body p-0',
                    'data-bs-parent': '#' + this._component.menu.id,
                }).appendTo(category.collapse);
                category.menu.id = category.menu.attr('id');

                // Create Menu List
                category.menu.list = $(document.createElement('ul')).attr({
                    'id': category.menu.id + 'list',
                    'class': 'list-group list-group-flush w-100',
                }).appendTo(category.menu);
                category.menu.list.id = category.menu.list.attr('id');

                // Add method to add content
                category.add = function(param1 = null, param2 = null){
                    self.#item(category,param1,param2);
                }

                if(properties.icon == null){
                    category.button.icon.remove();
                }

                if(properties.class){
                    category.addClass(properties.class);
                }

                if(this._count <= 1){
                    category.button.removeClass('collapsed').attr('aria-expanded',true);
                    category.collapse.addClass('show');
                }

                if(typeof callback === "function"){
                    callback(category,self);
                }

                // Return
                return this;
            }

            #item(category, param1 = null, param2 = null){

                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {
                    icon: 'gear',
                    label: null,
                    class: null,
                    body: false,
                    form: true,
                    callback:{
                        submit: function(form){},
                        val: function(values){ return values; },
                        reset: function(form){},
                        clear: function(form){},
                    },
                };

                // Configure Options
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
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

                // Create Content Item
                var content = $(document.createElement('div')).attr({
                    'id': category.id + 'content' + id,
                    'class': 'accordion-collapse collapse',
                    'data-bs-parent': '#' + this._component.content.id,
                }).appendTo(this._component.content.accordion);
                content.id = content.attr('id');
                content.properties = properties;

                // Create Header
                content.header = $(document.createElement('div')).attr({
                    'class': 'accordion-header card-body pb-0',
                }).appendTo(content);
                content.header.title = $(document.createElement('h4')).text(properties.label).appendTo(content.header);
                content.header.title.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + properties.icon).prependTo(content.header.title);

                // Create Form
                content.form = this._builder.Component(
                    'form',
                    content,
                    {
                        class: {
                            component: 'card-body',
                        },
                        callback:{
                            submit: function(form){

                                // Check if Submit Callback is a function
                                if(typeof properties.callback.submit === 'function'){
                                    properties.callback.submit(form);
                                }
                            },
                            val: function(values){

                                // Check if Val Callback is a function
                                if(typeof properties.callback.val === 'function'){
                                    return properties.callback.val(values);
                                } else {
                                    return values;
                                }
                            },
                            reset: function(form){

                                // Check if Reset Callback is a function
                                if(typeof properties.callback.reset === 'function'){
                                    properties.callback.reset(form);
                                }
                            },
                            clear: function(form){

                                // Check if Clear Callback is a function
                                if(typeof properties.callback.clear === 'function'){
                                    properties.callback.clear(form);
                                }
                            },
                        },
                    },
                    function(form,component){},
                );

                // Create Body
                content.body = $(document.createElement('div')).appendTo(content.form._component);

                // Create Menu Item
                var item = $(document.createElement('li')).attr({
                    'id': category.id + 'item' + id,
                    'class': 'list-group-item item user-select-none cursor-pointer',
                    'data-bs-toggle': 'collapse',
                    'data-bs-target': '#' + content.id,
                    'style': 'transition: all 300ms ease 0s;',
                }).appendTo(category.menu.list);
                item.id = item.attr('id');
                item.properties = properties;

                // Create Flex
                item.flex = $(document.createElement('div')).addClass('d-flex align-items-center').appendTo(item);
                item.flex.icon = $(document.createElement('div')).addClass('flex-shrink-1 px-1').appendTo(item.flex);
                item.flex.icon.i = $(document.createElement('i')).addClass('bi bi-' + properties.icon).appendTo(item.flex.icon);
                item.flex.label = $(document.createElement('div')).addClass('flex-grow-1 px-1 text-break').text(properties.label).appendTo(item.flex);

                // Check for an icon
                if(properties.icon == null){
                    content.header.title.icon.remove();
                    item.flex.icon.remove();
                }

                // Check for classes to add
                if(properties.class){
                    content.addClass(properties.class);
                }

                // Add Event Listener
                content.on('show.bs.collapse', function(){
                    // Clear Active
                    self._component.menu.find('.active').removeClass('active');
                    // Set Active
                    self._component.menu.find('[data-bs-target="#'+content.id+'"]').addClass('active');
                });

                // Open first item
                if(this._component.content.accordion.children().length > 0){

                    var firstContent = this._component.content.accordion.children().first();
                    firstContent.addClass('show');

                    var firstItem = this._component.menu.find('[data-bs-target="#'+firstContent.attr('id')+'"]');
                    firstItem.addClass('active');

                    var firstCategory = firstItem.parents('.accordion-item');

                    var firstCategoryCollapse = firstCategory.find('.collapse');
                    firstCategoryCollapse.addClass('show');

                    var firstCategoryBtn = firstCategory.find('[data-bs-target="#'+firstCategoryCollapse.attr('id')+'"]');
                    firstCategoryBtn.removeClass('collapsed');
                }

                if(typeof callback === "function"){
                    callback(item,content,self);
                }

                // Return
                return this;
            }
        },
    }

    #components = {
        code: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    language: null,
                    title: null,
                    code: null,
                    clipboard: false,
                    fullscreen: false,
                    highlight: true,
                    collapse: true,
                    collapsed: false,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'code' + this._id,
                    'class': 'card bg-dark text-bg-dark',
                    'style': 'transition: all 400ms ease',
                });
                this._component.id = this._component.attr('id');

                // Add Header
                this._component.header = $(document.createElement('div')).addClass('card-header user-select-none').appendTo(this._component);
                this._component.header.heading = $(document.createElement('h5')).addClass('card-title d-flex align-items-center my-2').appendTo(this._component.header);
                this._component.header.icon = $(document.createElement('i')).addClass('bi-code-slash me-2').appendTo(this._component.header.heading);
                this._component.header.language = $(document.createElement('samp')).addClass('mx-1 text-uppercase').appendTo(this._component.header.heading);
                this._component.header.title = $(document.createElement('small')).addClass('mx-1').appendTo(this._component.header.heading);

                // Add Controls
                this._component.controls = $(document.createElement('span')).addClass('ms-auto d-flex align-items-center').appendTo(this._component.header.heading);
                this._component.controls.collapse = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.controls);
                this._component.controls.collapse.icon = $(document.createElement('i')).addClass('bi-chevron-bar-contract').appendTo(this._component.controls.collapse);
                this._component.controls.clipboard = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.controls);
                this._component.controls.clipboard.icon = $(document.createElement('i')).addClass('bi-clipboard').appendTo(this._component.controls.clipboard);
                this._component.controls.fullscreen = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.controls);
                this._component.controls.fullscreen.icon = $(document.createElement('i')).addClass('bi-fullscreen').appendTo(this._component.controls.fullscreen);

                // Add Body Collapse
                this._component.collapse = $(document.createElement('div')).addClass('collapse show').attr('id',this._component.id + 'collapse').appendTo(this._component);
                this._component.collapse.id = this._component.collapse.attr('id');

                // Add Body
                this._component.body = $(document.createElement('div')).addClass('card-body p-0').appendTo(this._component.collapse);
                this._component.pre = $(document.createElement('pre')).addClass('m-0 p-3 h-100').appendTo(this._component.body);
                this._component.code = $(document.createElement('code')).addClass('language-*').css('transition','all 400ms ease').appendTo(this._component.pre);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Title
                if(this._properties.title){
                    this._component.header.title.html(this._properties.title);
                }

                // Set Language
                if(this._properties.language){
                    this._properties.language = this._properties.language.toString().toLowerCase();
                    if(typeof Prism.languages[this._properties.language] !== 'undefined'){
                        this._component.header.language.html(this._properties.language);
                        this._component.code.addClass('language-' + this._properties.language);
                    }
                }

                // Set Fullscreen
                if(this._properties.fullscreen){
                    this._component.controls.fullscreen.click(function(){
                        if(self._component.controls.fullscreen.icon.hasClass('bi-fullscreen')){
                            self._component.addClass('position-fixed top-0 start-0 w-100 h-100 rounded-0').css('z-index', 1050);
                            self._component.body.addClass('h-100 overflow-auto');
                            self._component.controls.fullscreen.icon.removeClass('bi-fullscreen').addClass('bi-fullscreen-exit');
                        } else {
                            self._component.removeClass('position-fixed top-0 start-0 w-100 h-100 rounded-0').css('z-index', '');
                            self._component.body.removeClass('h-100 overflow-auto');
                            self._component.controls.fullscreen.icon.removeClass('bi-fullscreen-exit').addClass('bi-fullscreen');
                        }
                    })
                } else {
                    this._component.controls.fullscreen.addClass('d-none');
                }

                // Set Clipboard
                if(this._properties.clipboard){
                    this._component.controls.clipboard.click(function(){
                        self._builder.Helper.copyToClipboard(self._component.code);
                    })
                } else {
                    this._component.controls.clipboard.addClass('d-none');
                }

                // Set Code
                if(this._properties.code){
                    this._component.code.html(this._properties.code);
                    if(this._properties.highlight && this._properties.language && typeof Prism.languages[this._properties.language] !== 'undefined'){
                        this._component.code.html(Prism.highlight(this._component.code.html(),Prism.languages[this._properties.language]))
                    }
                }

                // Set Collapse
                if(this._properties.collapse){
                    this._component.collapse.bs = new bootstrap.Collapse(this._component.collapse,{toggle:false});
                    this._component.controls.collapse.click(function(){
                        if(self._component.controls.collapse.icon.hasClass('bi-chevron-bar-expand')){
                            self._component.collapse.bs.show();
                            self._component.controls.collapse.icon.removeClass('bi-chevron-bar-expand').addClass('bi-chevron-bar-contract');
                            self._component.header.removeClass('rounded border-0');
                        } else {
                            self._component.collapse.bs.hide()
                            self._component.controls.collapse.icon.removeClass('bi-chevron-bar-contract').addClass('bi-chevron-bar-expand');
                            self._component.header.addClass('rounded border-0');
                        }
                    });
                } else {
                    this._component.controls.collapse.addClass('d-none');
                }
                if(this._properties.collapsed){
                    this._component.collapse.removeClass('show');
                    this._component.controls.collapse.icon.removeClass('bi-chevron-bar-contract').addClass('bi-chevron-bar-expand');
                    this._component.header.addClass('rounded border-0');
                }
            }
        },
        card: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        card: null,
                        header: null,
                        body: null,
                        footer: null,
                    },
                    icon: null,
                    title: null,
                    body: null,
                    footer: null,
                    stretch: false,
                    hideHeader: false,
                    hideFooter: true,
                    close:true,
                    fullscreen: true,
                    collapse: true,
                    collapsed: false,
                    callback: {
                        close: null,
                        fullscreen: null,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'card' + this._id,
                    'class': 'collapse show',
                    'style': 'transition: all 400ms ease',
                });
                this._component.id = this._component.attr('id');

                // Create Card
                this._component.card = $(document.createElement('div')).attr({
                    'class': 'card',
                    'style': 'transition: all 400ms ease',
                }).appendTo(this._component);

                // Create Card Header
                this._component.header = $(document.createElement('div')).addClass('card-header user-select-none').appendTo(this._component.card);

                // Create Card Header Title
                this._component.header.heading = $(document.createElement('h5')).addClass('card-title d-flex justify-content-start align-items-center').appendTo(this._component.header);
                this._component.header.icon = $(document.createElement('i')).addClass('me-1 bi bi-'+this._properties.icon).appendTo(this._component.header.heading);
                this._component.header.title = $(document.createElement('span')).appendTo(this._component.header.heading);

                // Create Card Header Tools
                this._component.tools = $(document.createElement('span')).addClass('ms-auto d-flex align-items-center').appendTo(this._component.header.heading);
                this._component.tools.collapse = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.tools);
                this._component.tools.collapse.icon = $(document.createElement('i')).addClass('bi-chevron-bar-contract').appendTo(this._component.tools.collapse);
                this._component.tools.fullscreen = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.tools);
                this._component.tools.fullscreen.icon = $(document.createElement('i')).addClass('bi-fullscreen').appendTo(this._component.tools.fullscreen);
                this._component.tools.close = $(document.createElement('a')).addClass('ms-3 text-decoration-none cursor-pointer').appendTo(this._component.tools);
                this._component.tools.close.icon = $(document.createElement('i')).addClass('bi-x-lg').appendTo(this._component.tools.close);

                // Create Card Collapse
                this._component.collapse = $(document.createElement('div')).attr({
                    'id': this._component.id + 'collapse',
                    'class': 'collapse show',
                    'style': 'transition: all 400ms ease',
                }).appendTo(this._component.card);
                this._component.collapse.id = this._component.collapse.attr('id');

                // Create Card Body
                this._component.body = $(document.createElement('div')).attr({
                    'class': 'card-body',
                    'style': 'transition: all 400ms ease',
                }).html(this._properties.body).appendTo(this._component.collapse);

                // Create Card Footer
                this._component.footer = $(document.createElement('div')).addClass('card-footer').appendTo(this._component.card);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Card Class
                if(this._properties.class.card){
                    this._component.card.addClass(this._properties.class.card);
                }

                // Set Card Header Class
                if(this._properties.class.header){
                    this._component.header.addClass(this._properties.class.header);
                }

                // Set Card Body Class
                if(this._properties.class.body){
                    this._component.body.addClass(this._properties.class.body);
                }

                // Set Card Footer Class
                if(this._properties.class.footer){
                    this._component.footer.addClass(this._properties.class.footer);
                }

                // Configure Card
                if(this._properties.stretch){
                    this._component.addClass('h-100');
                    this._component.card.addClass('h-100');
                    this._component.collapse.addClass('h-100');
                    this._component.body.addClass('d-flex h-100 overflow-auto');
                }

                // Configure Card Header
                if(this._properties.icon == null){
                    this._component.header.icon.remove();
                }
                if(this._properties.title){
                    this._component.header.title.html(this._properties.title);
                }
                if(this._properties.hideHeader){
                    this._component.header.addClass('d-none');
                }

                // Configure Card Tools
                // Close Button
                if(this._properties.close){
                    this._component.bs = new bootstrap.Collapse(this._component,{toggle:false});
                    this._component.tools.close.click(function(){
                        self._component.bs.hide();
                        self._component.on('hidden.bs.collapse',function(){
                            self._component.remove();
                            if(typeof self._properties.callback.close === 'function'){
                                self._properties.callback.close(self,self._component);
                            }
                        });
                    });
                } else {
                    this._component.tools.close.addClass('d-none');
                }
                // FullScreen Button
                if(this._properties.fullscreen){
                    this._component.tools.fullscreen.click(function(){
                        if(self._component.tools.fullscreen.icon.hasClass('bi-fullscreen')){
                            self._component.card.addClass('position-fixed top-0 start-0 w-100 h-100 rounded-0').css('z-index', 1050);
                            self._component.body.addClass('h-100');
                            self._component.collapse.addClass('h-100 overflow-auto');
                            self._component.tools.fullscreen.icon.removeClass('bi-fullscreen').addClass('bi-fullscreen-exit');
                            if(self._properties.collapse){
                                self._component.tools.collapse.addClass('d-none');
                            }
                            self._component.card[0].style.setProperty('margin', '0px', 'important');
                            self._component.card[0].style.setProperty('padding', '0px', 'important');
                            self._component.collapse[0].style.setProperty('margin', '0px', 'important');
                            self._component.collapse[0].style.setProperty('padding', '0px', 'important');
                        } else {
                            self._component.card.removeClass('position-fixed top-0 start-0 w-100 h-100 rounded-0').css('z-index', '');
                            self._component.body.removeClass('h-100');
                            self._component.collapse.removeClass('h-100 overflow-auto');
                            self._component.tools.fullscreen.icon.removeClass('bi-fullscreen-exit').addClass('bi-fullscreen');
                            if(self._properties.collapse){
                                self._component.tools.collapse.removeClass('d-none');
                            }
                            self._component.card[0].style.setProperty('margin', '');
                            self._component.card[0].style.setProperty('padding', '');
                            self._component.collapse[0].style.setProperty('margin', '');
                            self._component.collapse[0].style.setProperty('padding', '');
                        }
                        if(typeof self._properties.callback.fullscreen === 'function'){
                            self._properties.callback.fullscreen(self,self._component,!self._component.tools.fullscreen.icon.hasClass('bi-fullscreen'));
                        }
                    });
                } else {
                    this._component.tools.fullscreen.addClass('d-none');
                }
                // Collapse Button
                if(this._properties.collapse){
                    this._component.collapse.bs = new bootstrap.Collapse(this._component.collapse,{toggle:false});
                    this._component.tools.collapse.click(function(){
                        if(self._component.tools.collapse.icon.hasClass('bi-chevron-bar-expand')){
                            self._component.collapse.bs.show();
                            self._component.tools.collapse.icon.removeClass('bi-chevron-bar-expand').addClass('bi-chevron-bar-contract');
                            if(self._properties.hideFooter && !self._properties.hideHeader){
                                self._component.header.removeClass('rounded border-0');
                            }
                            if(!self._properties.hideFooter && !self._properties.hideHeader){
                                self._component.footer.removeClass('border-0');
                            }
                        } else {
                            self._component.collapse.bs.hide()
                            self._component.tools.collapse.icon.removeClass('bi-chevron-bar-contract').addClass('bi-chevron-bar-expand');
                            if(self._properties.hideFooter && !self._properties.hideHeader){
                                self._component.header.addClass('rounded border-0');
                            }
                            if(!self._properties.hideFooter && !self._properties.hideHeader){
                                self._component.footer.addClass('border-0');
                            }
                        }
                    });
                } else {
                    this._component.tools.collapse.addClass('d-none');
                }
                if(this._properties.collapsed){
                    this._component.collapse.removeClass('show');
                    this._component.tools.collapse.icon.removeClass('bi-chevron-bar-contract').addClass('bi-chevron-bar-expand');
                    if(this._properties.hideFooter && !this._properties.hideHeader){
                        this._component.header.addClass('rounded border-0');
                    }
                    if(!this._properties.hideFooter && !this._properties.hideHeader){
                        this._component.footer.addClass('border-0');
                    }
                }

                // Configure Card Footer
                if(this._properties.footer){
                    this._component.footer.html(this._properties.footer);
                }
                if(this._properties.hideFooter){
                    this._component.footer.addClass('d-none');
                }
            }
        },
        tabs: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        card: null,
                        header: null,
                        body: null,
                        footer: null,
                        navbar: null,
                        content: null,
                    },
                    icon: null,
                    title: null,
                    footer: null,
                    stretch: false,
                    hideHeader: false,
                    hideFooter: true,
                    close:true,
                    fullscreen: true,
                    collapse: true,
                    collapsed: false,
                    properties: {
                        class: {
                            nav: null,
                            tab: null,
                        },
                        icon: null,
                        label: null,
                        callback: null,
                    },
                };
            }

            #navbar = null;
            #content = null;
            #tabs = {};
            #id = null;

            _create(){

                // Set Self
                const self = this;

                // Create Card
                this._component = this._builder.Component('card',this._properties,function(card,component){

                    // ID
                    self.#id = component.id;

                    // Set Card Class
                    component.header.title.addClass('d-flex justify-content-start align-items-center');

                    // Create Tabs Nav
                    self.#navbar = $(document.createElement('div')).addClass('nav').attr('role','tablist').appendTo(component.header.title);

                    // If a card title is set, add margin to the left of the tabs
                    if(self._properties.title){
                        self.#navbar.addClass('ms-2');
                    }

                    // Set Tabs Nav Class
                    if(self._properties.class.navbar){
                        self.#navbar.addClass(self._properties.class.navbar);
                    }

                    // Create Tabs Content
                    self.#content = $(document.createElement('div')).addClass('tab-content').appendTo(component.body);

                    // Set Tabs Content Class
                    if(self._properties.class.content){
                        self.#content.addClass(self._properties.class.content);
                    }
                });
            }

            add(param1 = null, param2 = null, param3 = null){

                // Set Self
                const self = this;

                let name = null;
                let options = {};
                let callback = null;

                // Set selector, options, and callback
                [param1, param2, param3].forEach(param => {
                    if(param !== null){
                        if (typeof param === 'string') {
                            name = param;
                        } else if (typeof param === 'object') {
                            options = param;
                        } else if (typeof param === 'function') {
                            callback = param;
                        }
                    }
                });

                // Set Properties
                var properties = {};

                // Configure Properties
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }

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

                // Check if Tab Exists
                if(typeof this.#tabs[name] !== 'undefined'){
                    console.log('This Tab Already Exists');
                    return false;
                }

                // Create Tab
                var tab = {};

                // Set ID
                tab.id = this._count();

                // Set Properties
                tab.properties = properties;

                // Create Tab Nav
                tab.nav = $(document.createElement('button')).attr({
                    'id': this.#id + 'nav' + tab.id,
                    'class': 'nav-link',
                    'type': 'button',
                    'role': 'tab',
                    'data-bs-toggle': 'tab',
                    'aria-selected': false,
                    'data-bs-target': '#' + this.#id + 'tab' + tab.id,
                    'aria-controls': this.#id + 'tab' + tab.id,
                }).appendTo(this.#navbar);
                tab.nav.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + properties.icon).appendTo(tab.nav);
                tab.nav.label = $(document.createElement('span')).addClass('text-capitalize').appendTo(tab.nav);

                // Create Tab Content
                tab.tab = $(document.createElement('div')).attr({
                    'id': this.#id + 'tab' + tab.id,
                    'class': 'tab-pane fade',
                    'role': 'tabpanel',
                    'aria-labelledby': this.#id + 'nav' + tab.id,
                }).appendTo(this.#content);

                // Set Tab Nav Class
                if(properties.class.nav){
                    tab.nav.addClass(properties.class.nav);
                }

                // Set Tab Content Class
                if(properties.class.tab){
                    tab.tab.addClass(properties.class.tab);
                }

                // Set Tab Nav Icon
                if(properties.icon == null){
                    tab.nav.icon.remove();
                }

                // Set Tab Nav Label
                if(properties.label){
                    tab.nav.label.text(properties.label);
                } else {
                    tab.nav.label.text(name);
                }

                // Execute Callback
                if(typeof properties.callback === 'function'){
                    properties.callback(tab.tab,tab.nav,this);
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(tab.tab,tab.nav,this);
                }

                // Set Active Tab
                if(tab.id === 1){

                    // Set First Tab as Active
                    tab.tab.addClass('show active');

                    // Set First Nav as Active
                    tab.nav.addClass('active');
                }

                // Save Tab
                this.#tabs[name] = tab;

                // Return Object
                return this;
            }

            outerHTML(){

                // Return Object
                return this._component.outerHTML();
            }
        },
        modal: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        dialog: null,
                        content: null,
                        header: null,
                        body: null,
                        footer: null,
                    },
                    callback: {
                        submit: null,
                        cancel: null,
                        fullscreen: null,
                        close: null,
                        onShow: null,
                        onShown: null,
                        onHide: null,
                        onHidden: null,
                    },
                    onEnter: true,
                    close:true,
                    fullscreen:true,
                    destroy:false,
                    icon:null,
                    title: null,
                    body: null,
                    static: false,
                    cancel: true,
                    submit: true,
                    center: false,
                    size: 'none',
                };
            }

            _insert(){

                // Set Self
                const self = this;

                // Check if Selector is Set
                if(this._component && this._selector){

                    // Add Class to Selector
                    this._selector.addClass('cursor-pointer');

                    // Add Event to Selector
                    this._selector.click(function(){
                        self.toggle();
                    });
                }
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'modal' + this._id,
                    'class': 'modal fade',
                    'tabindex': -1,
                }).prependTo('body');
                this._component.id = this._component.attr('id');

                // Create Dialog
                this._component.dialog = $(document.createElement('div')).addClass('modal-dialog').appendTo(this._component);

                // Create Content
                this._component.dialog.content = $(document.createElement('div')).addClass('modal-content').appendTo(this._component.dialog);

                // Create Header
                this._component.dialog.content.header = $(document.createElement('div')).addClass('modal-header').appendTo(this._component.dialog.content);
                this._component.header = this._component.dialog.content.header;

                // Create Title
                this._component.dialog.content.header.title = $(document.createElement('h5')).addClass('modal-title').appendTo(this._component.dialog.content.header);
                this._component.dialog.content.header.title.icon = $(document.createElement('i')).addClass('me-2 bi').appendTo(this._component.dialog.content.header.title);
                this._component.dialog.content.header.title.label = $(document.createElement('span')).appendTo(this._component.dialog.content.header.title);

                // Create Tools
                this._component.dialog.content.header.tools = $(document.createElement('div')).addClass('btn-group').appendTo(this._component.dialog.content.header);

                // Create FullScreen Button
                this._component.dialog.content.header.tools.fullscreen = $(document.createElement('button')).attr('type','button').addClass('btn btn-lg btn-link').html('<i class="bi-fullscreen"></i>').attr('data-bs-toggle','modal-fullscreen').attr('data-bs-target','#' + this._component.id).attr('aria-label','Fullscreen').appendTo(this._component.dialog.content.header.tools);

                // Create Close Button
                this._component.dialog.content.header.tools.close = $(document.createElement('button')).attr('type','button').addClass('btn btn-lg btn-link').html('<i class="bi-x-lg"></i>').attr('data-bs-dismiss','modal').attr('aria-label','Close').appendTo(this._component.dialog.content.header.tools);

                // Create Body
                this._component.dialog.content.body = $(document.createElement('div')).addClass('modal-body').appendTo(this._component.dialog.content);
                this._component.body = this._component.dialog.content.body;

                // Create Footer
                this._component.dialog.content.footer = $(document.createElement('div')).addClass('modal-footer p-0').appendTo(this._component.dialog.content);
                this._component.footer = this._component.dialog.content.footer;

                // Create Submit Button
                this._component.dialog.content.footer.submit = $(document.createElement('button')).attr('type','button').css({'border-top-left-radius': 'none','border-top-right-radius': 'none','border-bottom-left-radius': 'var(--bs-modal-inner-border-radius)!important'}).addClass('btn btn-lg btn-link fs-6 text-decoration-none col py-3 m-0 rounded-0 border-end').text('Save changes').appendTo(this._component.dialog.content.footer);

                // Create Cancel Button
                this._component.dialog.content.footer.cancel = $(document.createElement('button')).attr('type','button').css({'border-top-left-radius': 'none','border-top-right-radius': 'none','border-bottom-right-radius': 'var(--bs-modal-inner-border-radius)!important'}).addClass('btn btn-lg btn-link fs-6 text-decoration-none col py-3 m-0 rounded-0').attr('data-bs-dismiss','modal').text('Cancel').appendTo(this._component.dialog.content.footer);

                // Set Size
                if(this._properties.size != null && typeof this._properties.size === 'string'){
                    switch(this._properties.size){
                        case"small":
                        case"sm":
                            this._component.dialog.addClass('modal-sm')
                            break
                        case"default":
                        case"none":
                            break
                        case"large":
                        case"lg":
                            this._component.dialog.addClass('modal-lg')
                            break
                        case"extra-large":
                        case"xl":
                            this._component.dialog.addClass('modal-xl')
                            break
                        case"xxl":
                        case"fullscreen":
                            this._component.dialog.addClass('modal-fullscreen')
                            break
                    }
                }

                // Set Center
                if(this._properties.center != null && typeof this._properties.center === 'boolean' && this._properties.center){
                    this._component.dialog.addClass('modal-dialog-centered');
                }

                // Set Static
                if(this._properties.static != null && typeof this._properties.static === 'boolean' && this._properties.static){
                    this._component.attr('data-bs-backdrop','static').attr('data-bs-keyboard',false);
                }

                // Set Icon
                if(this._properties.icon != null){
                    this._component.dialog.content.header.title.icon.addClass('bi-' + this._properties.icon);
                } else {
                    this._component.dialog.content.header.title.icon.addClass('d-none');
                }

                // Set Title
                if(this._properties.title != null){
                    this._component.dialog.content.header.title.label.html(this._properties.title);
                }

                // Set Body
                if(this._properties.body != null){
                    this._component.dialog.content.body.html(this._properties.body);
                }

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Dialog Class
                if(this._properties.class.dialog){
                    this._component.dialog.addClass(this._properties.class.dialog);
                }

                // Set Content Class
                if(this._properties.class.content){
                    this._component.dialog.content.addClass(this._properties.class.content);
                }

                // Set Header Class
                if(this._properties.class.header){
                    this._component.dialog.content.header.addClass(this._properties.class.header);
                }

                // Set Body Class
                if(this._properties.class.body){
                    this._component.dialog.content.body.addClass(this._properties.class.body);
                }

                // Set Footer Class
                if(this._properties.class.footer){
                    this._component.dialog.content.footer.addClass(this._properties.class.footer);
                }

                // Initialize Bootstrap Modal
                this._bootstrap = new bootstrap.Modal(this._component);

                // Destroy
                if(this._properties.destroy){
                    this._component.on('hide.bs.modal',function(){
                        self._component.remove();
                    });
                }

                // onEnter
                if(this._properties.onEnter){
                    this._component.on('keypress',function(e){
                        if(e.which == 13) {
                            self._component.dialog.content.footer.submit.click();
                        }
                    });
                }

                // Fullscreen
                if(this._properties.fullscreen){
                    this._component.dialog.content.header.tools.fullscreen.click(function(){
                        if(self._component.dialog.hasClass('modal-fullscreen')){
                            self._component.dialog.removeClass('modal-fullscreen');
                            self._component.dialog.content.header.tools.fullscreen.html('<i class="bi-fullscreen"></i>');
                        } else {
                            self._component.dialog.addClass('modal-fullscreen');
                            self._component.dialog.content.header.tools.fullscreen.html('<i class="bi-fullscreen-exit"></i>');
                        }
                    });
                } else {
                    this._component.dialog.content.header.tools.fullscreen.addClass('d-none');
                }

                // Close
                if(!this._properties.close){
                    this._component.dialog.content.header.tools.close.addClass('d-none');
                }

                // Cancel
                if(!this._properties.cancel){
                    this._component.dialog.content.footer.cancel.remove();
                }

                // Submit
                if(!this._properties.submit){
                    this._component.dialog.content.footer.submit.remove();
                }

                // Callback Function on Show
                if(typeof this._properties.callback.onShow === 'function'){
                    this._component.on('show.bs.modal',function(){
                        self._properties.callback.onShow(self._component,self);
                    });
                }

                // Callback Function on Show
                if(typeof this._properties.callback.onShown === 'function'){
                    this._component.on('shown.bs.modal',function(){
                        self._properties.callback.onShown(self._component,self);
                    });
                }

                // Callback Function on Hide
                if(typeof this._properties.callback.onHide === 'function'){
                    this._component.on('hide.bs.modal',function(){
                        self._properties.callback.onHide(self._component,self);
                    });
                }

                // Callback Function on Hide
                if(typeof this._properties.callback.onHidden === 'function'){
                    this._component.on('hidden.bs.modal',function(){
                        self._properties.callback.onHidden(self._component,self);
                    });
                }

                // Callback Function on Close
                if(typeof this._properties.callback.close === 'function'){
                    this._component.dialog.content.header.tools.close.click(function(){
                        self._properties.callback.close(self._component,self);
                    });
                }

                // Callback Function on Fullscreen
                if(typeof this._properties.callback.fullscreen === 'function'){
                    this._component.dialog.content.header.tools.fullscreen.click(function(){
                        self._properties.callback.fullscreen(self._component,self);
                    });
                }

                // Callback Function on Cancel
                if(typeof this._properties.callback.cancel === 'function'){
                    this._component.dialog.content.footer.cancel.click(function(){
                        self._properties.callback.cancel(self._component,self);
                    });
                }

                // Callback Function on Submit
                if(typeof this._properties.callback.submit === 'function'){
                    this._component.dialog.content.footer.submit.click(function(){
                        self._properties.callback.submit(self._component,self);
                    });
                }
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

                let properties = {
                    icon: null,
                    label: null,
                    color: null,
                };

                // Set options, and callback
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

                // Create Action Button
                let action = $(document.createElement('button')).attr({
                    'class': 'btn btn-lg btn-link fs-6 text-decoration-none col py-3 m-0 rounded-0 border-end',
                    'style': 'border-top-left-radius: 0px !important; border-top-right-radius: 0px !important',
                    'type': 'button',
                }).prependTo(this._component.dialog.content.footer);
                action.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + properties.icon).prependTo(action);
                action.label = $(document.createElement('span')).appendTo(action);
                action.properties = properties;

                // Set icon
                if(properties.icon == null){
                    action.icon.remove();
                }

                // Set label
                if(properties.label){
                    action.label.text(properties.label);
                }

                // Set color
                if(properties.color){
                    action.removeClass('btn-link').addClass('btn-' + properties.color);
                }

                // Set Border Radius
                this._component.dialog.content.footer.find('button').removeClass('rounded-start rounded-end');
                this._component.dialog.content.footer.find('button').first().addClass('rounded-start');
                this._component.dialog.content.footer.find('button').last().addClass('rounded-end').removeClass('border-end');

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(action,self._component,self);
                }

                // Return
                return action;
            }

            bootstrap(){
                return this._bootstrap;
            }

            show(){
                this._bootstrap.show();
            }

            hide(){
                this._bootstrap.hide();
            }

            toggle(){
                this._bootstrap.toggle();
            }
        },
        offcanvas: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    callback: {
                        show: null,
                        shown: null,
                        hide: null,
                        hidden: null,
                    },
                    icon: null,
                    title: null,
                    body: null,
                    dismissible: true,
                    backdrop: true,
                    scroll: true,
                    color: null,
                    side: null,
                };
            }

            _insert(){

                // Set Self
                const self = this;

                // Check if Selector is Set
                if(this._component && this._selector){

                    // Add Class to Selector
                    this._selector.addClass('cursor-pointer');

                    // Add Event to Selector
                    this._selector.click(function(){
                        self.toggle();
                    });
                }
            }

            bootstrap(){
                return this._bootstrap;
            }

            show(){
                this._bootstrap.show();
            }

            hide(){
                this._bootstrap.hide();
            }

            toggle(){
                this._bootstrap.toggle();
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'offcanvas' + this._id,
                    'class': 'offcanvas',
                    'tabindex': -1,
                    'data-bs-scroll': this._properties.scroll,
                    'data-bs-backdrop': this._properties.backdrop,
                }).prependTo('body');
                this._component.id = this._component.attr('id');

                // Create Header
                this._component.header = $(document.createElement('div')).addClass('offcanvas-header').appendTo(this._component);
                this._component.header.title = $(document.createElement('h5')).addClass('offcanvas-title').appendTo(this._component.header);

                // Create Icon
                this._component.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + this._properties.icon).appendTo(this._component.header.title);

                // Create Title
                this._component.title = $(document.createElement('span')).text(this._properties.title).appendTo(this._component.header.title);

                // Create Close Button
                this._component.close = $(document.createElement('button')).attr({
                    'class': 'btn-close',
                    'type': 'button',
                    'aria-label': 'Close',
                    'data-bs-dismiss': 'offcanvas',
                }).appendTo(this._component.header);

                // Create Body
                this._component.body = $(document.createElement('div')).addClass('offcanvas-body').html(this._properties.body).appendTo(this._component);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Icon
                if(this._properties.icon == null){
                    this._component.icon.remove();
                }

                // Set Color
                if(this._properties.color){
                    this._component.addClass('text-bg-' + this._properties.color);
                }

                // Set Dismissible
                if(!this._properties.dismissible){
                    this._component.close.remove();
                }

                // Set Side
                switch(this._properties.side){
                    case"start":
                    case"end":
                    case"top":
                    case"bottom":
                        this._component.addClass('offcanvas-' + this._properties.side);
                        break;
                    default:
                        this._component.addClass('offcanvas-end');
                        break;
                }

                // Initialize Bootstrap Offcanvas
                this._bootstrap = new bootstrap.Offcanvas(this._component);

                // Set Callbacks
                if(typeof this._properties.callback.show === 'function'){
                    this._component.on('show.bs.offcanvas', function(){
                        self._properties.callback.show(self,self._component);
                    });
                }
                if(typeof this._properties.callback.shown === 'function'){
                    this._component.on('shown.bs.offcanvas', function(){
                        self._properties.callback.shown(self,self._component);
                    });
                }
                if(typeof this._properties.callback.hide === 'function'){
                    this._component.on('hide.bs.offcanvas', function(){
                        self._properties.callback.hide(self,self._component);
                    });
                }
                if(typeof this._properties.callback.hidden === 'function'){
                    this._component.on('hidden.bs.offcanvas', function(){
                        self._properties.callback.hidden(self,self._component);
                    });
                }
            }
        },
        dropdown: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        button: null,
                        menu: null,
                    },
                    icon: null,
                    label: null,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).addClass('dropdown').attr('id','dropdown' + this._id);
                this._component.id = this._component.attr('id');

                // Create Button
                this._component.btn = $(document.createElement('button')).addClass('btn btn-link').attr('type','button').attr('data-bs-toggle','dropdown').attr('aria-expanded','false').appendTo(this._component);
                this._component.btn.icon = $(document.createElement('i')).addClass('bi').appendTo(this._component.btn);
                this._component.btn.label = $(document.createElement('span')).appendTo(this._component.btn);
                this._component.menu = $(document.createElement('ul')).addClass('dropdown-menu').appendTo(this._component);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Menu Class
                if(this._properties.class.menu){
                    this._component.menu.addClass(this._properties.class.menu);
                }

                // Set Button Class
                if(this._properties.class.button){
                    this._component.btn.addClass(this._properties.class.button);
                }

                // Set Button Icon
                if(this._properties.icon){
                    this._component.btn.icon.addClass('bi-' + this._properties.icon);
                }

                // Set Button Label
                if(this._properties.label){
                    this._component.btn.label.text(this._properties.label);
                    this._component.btn.icon.addClass('me-1');
                }
            }

            item(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {
                    class: {
                        item: null, //string
                        button: null, //string
                        label: null, //string
                    },
                    link: null, //string
                    icon: null, //string
                    label: null, //string
                    visible: null, //function
                    click: function(item,self){}, //function
                };

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

                // Create Item
                var item = $(document.createElement('li')).appendTo(this._component.menu);

                // Save Item options
                item.properties = properties;

                // Set Item Link/Button
                if(item.properties.link != null){
                    item.btn = $(document.createElement('a')).attr('href',item.properties.link).addClass('dropdown-item').appendTo(item);
                } else {
                    item.btn = $(document.createElement('button')).attr('type','button').addClass('dropdown-item').appendTo(item);
                }

                // Set Item Icon
                item.icon = $(document.createElement('i')).addClass('me-1 bi').appendTo(item.btn);
                if(item.properties.icon != null){
                    item.icon.addClass('bi-' + item.properties.icon);
                }

                // Set Item Label
                item.label = $(document.createElement('span')).appendTo(item.btn);
                if(item.properties.label != null){
                    item.label.text(item.properties.label);
                }

                // Set Item Class
                if(item.properties.class.item){
                    item.addClass(item.properties.class.item);
                }

                // Set Button Class
                if(item.properties.class.button){
                    item.btn.addClass(item.properties.class.button);
                }

                // Set Label Class
                if(item.properties.class.label){
                    item.label.addClass(item.properties.class.label);
                }

                // Set Item Visibility
                if(item.properties.visible !== null){
                    if(typeof item.properties.visible === 'function'){
                        if(!item.properties.visible()){
                            item.hide();
                        }
                    } else if(typeof item.properties.visible === 'boolean'){
                        if(!item.properties.visible){
                            item.hide();
                        }
                    }
                }

                // Set Item Click Event
                if(item.properties.click !== null){
                    if(typeof item.properties.click === 'function'){
                        item.btn.click(function(){
                            item.properties.click(item,self);
                        });
                    }
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(item,this);
                }

                // Return
                return this;
            }

            seperator(){

                // Set Self
                const self = this;

                // Create Seperator
                var seperator = $(document.createElement('li')).appendTo(this._component.menu);
                seperator.hr = $(document.createElement('hr')).addClass('dropdown-divider').appendTo(seperator);

                // Return
                return this;
            }
        },
        progress: class extends this.ComponentClass {

            #value = 0;

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        bar: null,
                        label: null,
                    },
                    callback: {
                        change: null,
                    },
                    size: null,
                    color: null,
                    striped: true,
                    animated: true,
                    label: null,
                    scale: 100,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr('id','progress' + this._id).addClass('progress');

                // Create Progress Bar
                this._component.bar = $(document.createElement('div')).addClass('progress-bar').appendTo(this._component);
                this._component.bar.label = $(document.createElement('span')).addClass('progress-label').appendTo(this._component.bar);

                // Set Progress Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Bar Class
                if(this._properties.class.bar){
                    this._component.bar.addClass(this._properties.class.bar);
                }

                // Set Label Class
                if(this._properties.class.label){
                    this._component.bar.label.addClass(this._properties.class.label);
                }

                // Set Size
                if(this._properties.size){
                    this._component.css({height:this._properties.size});
                }

                // Set Color
                if(this._properties.color){
                    this._component.bar.addClass('text-bg-' + this._properties.color);
                }

                // Set Striped
                if(this._properties.striped){
                    this._component.bar.addClass('progress-bar-striped');
                }

                // Set Animated
                if(this._properties.animated){
                    this._component.bar.addClass('progress-bar-animated');
                }

                // Set Label
                if(this._properties.label){
                    this._component.bar.label.html(this._properties.label);
                }
            }

            set(value){

                // Set Scale
                this._component.bar.attr('aria-valuemin',0).attr('aria-valuemax',this._properties.scale);

                // Calculate Value
                value = Math.round((value / this._properties.scale) * 100);

                // Save Value
                this.#value = value;

                // Set Value
                this._component.bar.css({width:value + '%'}).attr('aria-valuenow',value);

                // Set Label
                if(this._properties.label){
                    this._component.bar.label.html(this._properties.label.replace('{progress}', value).replace('{percent}', value + '%').replace('{scale}', this._properties.scale));
                }

                // Execute Callback
                if(typeof this._properties.callback.change === 'function'){
                    this._properties.callback.change(this);
                }

                // Return Object
                return this;
            }

            get(){

                // Return Value
                return this.#value;
            }

            val(value = null){
                if(value){
                    return this.set(value);
                } else {
                    return this.get();
                }
            }
        },
        avatar: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    email: null,
                    extension: false, //in request
                    size: false, //s
                    default: 'mp', //d
                    force: false, //f
                    rating: false, //r
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Check if Email is Set
                if(!this._properties.email){
                    console.log('Gravatar: Email is required');
                    return false;
                }

                // Create Component
                this._component = $(document.createElement('img')).attr({
                    'id': 'avatar' + this._id,
                    'class': 'avatar',
                    'src': this._builder.Helper.gravatar(this._properties.email,this._properties),
                    'alt': this._properties.email,
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Size
                if(this._properties.size){
                    this._component.css({
                        width: this._properties.size,
                        height: this._properties.size,
                    });
                }
            }
        },
        favicon: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                    },
                    url: null,
                    size: false,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Check if URL is Set
                if(!this._properties.url){
                    console.log('Favicon: URL is required');
                    return false;
                }

                // Create Component
                this._component = $(document.createElement('img')).attr({
                    'id': 'favicon' + this._id,
                    'class': 'favicon',
                    'src': this._builder.Helper.favicon(this._properties.url),
                    'alt': this._properties.url,
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Size
                if(this._properties.size){
                    this._component.css({
                        width: this._properties.size,
                        height: this._properties.size,
                    });
                }
            }
        },
        list: class extends this.ComponentClass {

            #tools = {};
            #actions = {};
            #items = {};

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        item: null,
                    },
                    callback: {
                        tool: null,
                        action: null,
                        item: null,
                        click: null,
                        dblclick: null,
                        separator: null,
                    },
                    icon: null,
                    tools:{},
                    actions:{},
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('ul')).attr({
                    'id': 'list' + this._id,
                    'class': 'list-group list-group-flush',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Add List to Search
                this._builder.Search.add(this._component);
            }

            _timeout(){

                // Set Self
                const self = this;

                // Add Tools
                for(var [name, tool] of Object.entries(this._properties.tools)){
                    tool.name = name;
                    this.tool(tool);
                }

                // Add Actions
                for(var [name, action] of Object.entries(this._properties.actions)){
                    action.name = name;
                    this.action(action);
                }

                // Generate Tools
                this.#genTools();

                // Generate Actions
                for(var [id, item] of Object.entries(this.#items)){
                    this.#genActions(item);
                }

                // Remove Tools if none exist
                if(Object.entries(this.#tools).length <= 0){
                    if(typeof this._component.tools !== 'undefined'){
                        this._component.tools.remove();
                    }
                }
            }

            action(options){

                // Configure Options
                let properties = {
                    icon: null,
                    label: null,
                    color: null,
                    class: null,
                    callback: null,
                    format: null,
                    name:null,
                };
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        properties[key] = value;
                    }
                }

                // Check if Action Name is Set
                if(properties.name == null){
                    console.log('List: Action name is required');
                    return false;
                }

                // Check if Action Name Exists
                if(typeof this.#actions[properties.name] !== 'undefined'){
                    console.log('List: Action "'+properties.name+'" already exists');
                    return false;
                }

                // Store Action
                this.#actions[properties.name] = properties;

                // Return Object
                return this;
            }

            tool(options){

                // Configure Options
                let properties = {
                    icon: null,
                    label: null,
                    color: null,
                    class: null,
                    callback: null,
                    format: null,
                    name:null,
                };
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        properties[key] = value;
                    }
                }

                // Check if Tool Name is Set
                if(properties.name == null){
                    console.log('List: Tool name is required');
                    return false;
                }

                // Check if Tool Name Exists
                if(typeof this.#tools[properties.name] !== 'undefined'){
                    console.log('List: Tool "'+properties.name+'" already exists');
                    return false;
                }

                // Store Tool
                this.#tools[properties.name] = properties;

                // Return Object
                return this;
            }

            #genActions(item){

                // Set Self
                const self = this;

                // Check if Item wants actions
                if(!item.properties.actions){
                    return false;
                }

                // Create Actions Group
                let actions = $(document.createElement('div')).addClass('flex-shrink-1 mx-1 btn-group pe-3').appendTo(item.container);

                // Create Actions Array Property
                actions.actions = {};

                // Create Actions Button
                for(const [name, properties] of Object.entries(this.#actions)){
                    actions.actions[name] = this.#genAction(item, actions, name);
                }

                // Save Actions in Item
                this.#items[item.id].actions = actions;

                // Return Actions
                return actions;
            }

            #genAction(item, actions, name){

                // Set Self
                const self = this;

                // Check if Action Name Exists
                if(typeof this.#actions[name] === 'undefined'){
                    console.log('List: Action "'+name+'" does not exist');
                    return false;
                }

                // Create Action Button
                let action = $(document.createElement('button')).attr({
                    'type': 'button',
                    'class': 'btn btn-sm btn-light',
                    'data-action': name,
                }).appendTo(actions);

                // Save Action Properties
                action.properties = this.#actions[name];

                // Add Action Button Class
                if(action.properties.class){
                    action.addClass(action.properties.class);
                }

                // Set Action Button Color
                if(action.properties.color){
                    action.removeClass('btn-light').addClass('btn-' + action.properties.color);
                }

                // Add Action Button Icon
                if(action.properties.icon){
                    action.icon = $(document.createElement('i')).addClass('bi bi-' + action.properties.icon).appendTo(action);
                }

                // Add Action Button Label
                if(action.properties.label){
                    action.label = $(document.createElement('span')).addClass('text-capitalize').html(action.properties.label).appendTo(action)
                }

                // Add Action Button Icon Spacing
                if(action.properties.icon && action.properties.label){
                    action.icon.addClass('me-1')
                }

                // Add Action Button Click Event
                action.click(function(){
                    if(typeof action.properties.callback === 'function'){
                        action.properties.callback(action,item,self);
                    }
                });
                if(typeof self._properties.callback.action === 'function'){
                    self._properties.callback.action(action,item,self);
                }
                if(typeof action.properties.format === 'function'){
                    action.properties.format(action,item,self);
                }

                // Return Action
                return action;
            }

            #genTools(){

                // Set Self
                const self = this;

                // Create Tools Group
                let tools = $(document.createElement('li')).addClass('list-group-item user-select-none').prependTo(this._component);
                tools.flex = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center').appendTo(tools);
                tools.group = $(document.createElement('div')).addClass('btn-group w-100').appendTo(tools.flex);

                // Create Tools Array Property
                tools.tools = {};

                // Create Tools Button
                for(const [name, properties] of Object.entries(this.#tools)){
                    tools.tools[name] = this.#genTool(tools, name);
                }

                // Save Tools in Component
                this._component.tools = tools;

                // Return Tools
                return tools;
            }

            #genTool(tools, name){

                // Set Self
                const self = this;

                // Check if Tool Name Exists
                if(typeof this.#tools[name] === 'undefined'){
                    console.log('List: Tool "'+name+'" does not exist');
                    return false;
                }

                // Create Tool Button
                let tool = $(document.createElement('button')).attr({
                    'type': 'button',
                    'class': 'btn btn-light',
                    'data-action': name,
                }).appendTo(tools.group);

                // Save Tool Properties
                tool.properties = this.#tools[name];

                // Add Tool Button Class
                if(tool.properties.class){
                    tool.addClass(tool.properties.class);
                }

                // Add Tool Color
                if(tool.properties.color){
                    tool.removeClass('btn-light').addClass('btn-' + tool.properties.color)
                }

                // Add Tool Icon
                if(tool.properties.icon){
                    tool.icon = $(document.createElement('i')).addClass('bi bi-' + tool.properties.icon).appendTo(tool)
                }

                // Add Tool Label
                if(tool.properties.label){
                    tool.label = $(document.createElement('span')).addClass('text-capitalize').html(tool.properties.label).appendTo(tool)
                }

                // Add Icon Spacing
                if(tool.properties.icon && tool.properties.label){
                    tool.icon.addClass('me-1')
                }

                // Add Tool Callback
                tool.click(function(){
                    if(typeof tool.properties.callback === 'function'){
                        tool.properties.callback(tool, self)
                    }
                });

                // Add Callback Function
                if(typeof self._properties.callback.tool === 'function'){
                    self._properties.callback.tool(tool, self)
                }
                if(typeof tool.properties.format === 'function'){
                    tool.properties.format(tool, self)
                }

                // Return Tool
                return tool;
            }

            get(){
                return this.#items;
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

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
                let properties = {
                    icon: null,
                    class: null,
                    field: null,
                    click: null,
                    dblclick: null,
                    actions: true,
                };
                for(const [key, value] of Object.entries(this._properties)){
                    switch(key){
                        case"callback":
                            for(const [name, opts] of Object.entries(value)){
                                if(typeof this._properties[key][name] !== 'undefined'){
                                    this._properties[key][name] = opts;
                                }
                            }
                            break
                        default:
                            if(typeof properties[key] !== 'undefined'){
                                properties[key] = value
                            }
                            break
                    }
                }
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        properties[key] = value;
                    }
                }

                // Create ID
                let id = this._count();

                // Create Item
                let item = $(document.createElement('li')).attr({
                    'id': this._component.id + 'item' + id,
                    'class': 'list-group-item item user-select-none p-0',
                    'style': 'transition: all 300ms ease 0s;',
                }).appendTo(this._component);

                // Save ID
                item.id = item.attr('id');

                // Save Options
                item.properties = properties;

                // Add Item Row
                item.container = $(document.createElement('div')).addClass('d-flex align-items-center').appendTo(item);

                // Add Item Icon
                if(properties.icon){
                    item.container.icon = $(document.createElement('div')).addClass('flex-shrink-1 px-3 py-2 pe-0 align-self-stretch align-middle').appendTo(item.container);
                    item.icon = $(document.createElement('i')).appendTo(item.container.icon);
                    item.icon.addClass('bi bi-' + properties.icon);
                }

                // Add Item Field
                item.field = $(document.createElement('div')).addClass('flex-grow-1 px-1 text-break px-3 py-2').appendTo(item.container);

                // Check if Icon Exists
                if(properties.icon){
                    item.field.addClass('ps-2');
                }

                // Check if Actions Exist
                if(properties.actions){
                    item.field.addClass('pe-0');
                }

                // Add Item Field Content
                if(properties.field){
                    item.field.html(properties.field);
                }

                // Add Item Class
                if(this._properties.class.item){
                    item.addClass(this._properties.class.item);
                }

                // Add Item Class
                if(item.properties.class){
                    item.addClass(item.properties.class);
                }

                // Add Item Click and Double Click Events
                if(typeof item.properties.click === 'function' || typeof item.properties.dblclick === 'function' || typeof self._properties.callback.click === 'function' || typeof self._properties.callback.dblclick === 'function'){

                    // Add Item Cursor Pointer
                    item.addClass('cursor-pointer')

                    // Add Item Hover Effect
                    item.hover(function(){
                        item.addClass("text-bg-primary");
                    }, function(){
                        item.removeClass("text-bg-primary");
                    });

                    // Add Item Click Event
                    item.field.click(function(){
                        if(typeof self._properties.callback.click === 'function'){
                            self._properties.callback.click(item, self);
                        }
                        if(typeof item.properties.click === 'function'){
                            item.properties.click(item, self);
                        }
                    });
                    item.container.icon.click(function(){
                        if(typeof self._properties.callback.click === 'function'){
                            self._properties.callback.click(item, self);
                        }
                        if(typeof item.properties.click === 'function'){
                            item.properties.click(item, self);
                        }
                    });

                    // Add Item Double Click Event
                    item.field.dblclick(function(){
                        if(typeof self._properties.callback.click === 'function'){
                            self._properties.callback.click(item, self);
                        }
                        if(typeof item.properties.click === 'function'){
                            item.properties.click(item, self);
                        }
                    });
                    item.icon.dblclick(function(){
                        if(typeof self._properties.callback.click === 'function'){
                            self._properties.callback.click(item, self);
                        }
                        if(typeof item.properties.click === 'function'){
                            item.properties.click(item, self);
                        }
                    });
                }

                // Add List Callback
                if(typeof this._properties.callback.item === 'function'){
                    this._properties.callback.item(item,self);
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(item,self);
                }

                // Check if rounded
                if(this._component.hasClass('rounded') && this._component.find('li').length > 0){
                    this._component.find('li').removeClass('rounded rounded-top rounded-bottom');
                    if(this._component.find('li').length === 1){
                        this._component.find('li').addClass('rounded');
                    } else {
                        this._component.find('li:first').addClass('rounded-top');
                        this._component.find('li:last').addClass('rounded-bottom');
                    }
                }

                // Set Item Search
                this._builder.Search.set(item);

                // Save Item
                this.#items[item.id] = item;

                // Return Object
                return this;
            }
        },
        ribbon: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        wrapper: null,
                        ribbon: null,
                    },
                    color: null,
                    label: null,
                    icon: null,
                    size: null,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'ribbon' + this._id,
                    'class': 'ribbon-wrapper',
                });
                this._component.id = this._component.attr('id');

                // Create Ribbon
                this._component.ribbon = $(document.createElement('div')).addClass('ribbon').appendTo(this._component);
                this._component.ribbon.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + this._properties.icon).appendTo(this._component.ribbon);
                this._component.ribbon.label = $(document.createElement('span')).appendTo(this._component.ribbon);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Wrapper Class
                if(this._properties.class.wrapper){
                    this._component.addClass(this._properties.class.wrapper);
                }

                // Set Ribbon Class
                if(this._properties.class.ribbon){
                    this._component.ribbon.addClass(this._properties.class.ribbon);
                }

                // Set Color
                if(this._properties.color){
                    this._component.ribbon.addClass('text-bg-' + this._properties.color);
                }

                // Set Label
                if(this._properties.label){
                    this._component.ribbon.label.html(this._properties.label);
                }

                // Set Icon
                if(this._properties.icon == null){
                    this._component.ribbon.icon.remove();
                }

                // Set Size
                if(this._properties.size){
                    switch(this._properties.size){
                        case"lg":
                            this._component.addClass('ribbon-lg');
                            break;
                        case"xl":
                            this._component.addClass('ribbon-xl');
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        alert: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        alert: null,
                    },
                    color: null,
                    dismissible: true,
                    icon: null,
                    title: null,
                    content: null,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'alert' + this._id,
                    'class': 'alert',
                });
                this._component.id = this._component.attr('id');

                // Close Button
                this._component.close = $(document.createElement('button')).attr({
                    'class': 'btn-close',
                    'type': 'button',
                    'data-bs-dismiss': 'alert',
                }).appendTo(this._component);

                // Create Header
                this._component.header = $(document.createElement('h5')).appendTo(this._component);

                // Create Icon
                this._component.header.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + this._properties.icon).prependTo(this._component.header);

                // Create Title
                this._component.header.title = $(document.createElement('span')).appendTo(this._component.header);

                // Create Content
                this._component.content = $(document.createElement('p')).addClass('mb-0').appendTo(this._component);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Alert Class
                if(this._properties.class.alert){
                    this._component.addClass(this._properties.class.alert);
                }

                // Set Color
                if(this._properties.color){
                    this._component.addClass('alert-' + this._properties.color);
                }

                // Set Dismissible
                if(this._properties.dismissible){
                    this._component.addClass('alert-dismissible fade show');
                } else {
                    this._component.close.addClass('d-none');
                }

                // Set Icon
                if(this._properties.icon === null){
                    this._component.header.icon.remove();
                }

                // Set Title
                if(this._properties.title){
                    this._component.header.title.text(this._properties.title);
                }

                // Set Content
                if(this._properties.content){
                    this._component.content.html(this._properties.content);
                }
            }
        },
        blockquote: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        figure: null,
                        blockquote: null,
                        figcaption: null,
                        cite: null,
                    },
                    quote: null,
                    author: null,
                    source: null,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('figure')).attr({
                    'id': 'blockquote' + this._id,
                    'class': '',
                });
                this._component.id = this._component.attr('id');

                // Create Blockquote
                this._component.blockquote = $(document.createElement('blockquote')).addClass('blockquote').appendTo(this._component);
                this._component.blockquote.quote = $(document.createElement('p')).appendTo(this._component.blockquote);

                // Create Figcaption
                this._component.figcaption = $(document.createElement('figcaption')).addClass('blockquote-footer').appendTo(this._component.blockquote);
                this._component.figcaption.author = $(document.createElement('span')).appendTo(this._component.figcaption);
                this._component.figcaption.seperator = $(document.createElement('span')).text(' in ').appendTo(this._component.figcaption);
                this._component.figcaption.source = $(document.createElement('cite')).appendTo(this._component.figcaption);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Figure Class
                if(this._properties.class.figure){
                    this._component.addClass(this._properties.class.figure);
                }

                // Set Blockquote Class
                if(this._properties.class.blockquote){
                    this._component.blockquote.addClass(this._properties.class.blockquote);
                }

                // Set Figcaption Class
                if(this._properties.class.figcaption){
                    this._component.figcaption.addClass(this._properties.class.figcaption);
                }

                // Set Cite Class
                if(this._properties.class.cite){
                    this._component.figcaption.source.addClass(this._properties.class.cite);
                }

                // Set Quote
                if(this._properties.quote){
                    this._component.blockquote.quote.text(this._properties.quote);
                }

                // Set Author
                if(this._properties.author){
                    this._component.figcaption.author.text(this._properties.author);
                }

                // Set Source
                if(this._properties.source){
                    this._component.figcaption.source.text(this._properties.source);
                }

                // Hide Figcaption if No Author or Source
                if(!this._properties.author && !this._properties.source){
                    this._component.figcaption.addClass('d-none');
                }

                // Hide Seperator if No Author or Source
                if(!this._properties.author || !this._properties.source){
                    this._component.figcaption.seperator.addClass('d-none');
                }
            }
        },
        accordion: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        accordion: null,
                        collapse: null,
                        button: null,
                    },
                    flush: false,
                    alwaysOpen: true,
                    properties: {
                        class: {
                            collapse: null,
                            button: null,
                        },
                        icon: null,
                        title: null,
                        content: null,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'accordion' + this._id,
                    'class': 'accordion',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Accordion Class
                if(this._properties.class.accordion){
                    this._component.addClass(this._properties.class.accordion);
                }

                // Set Object Flush
                if(this._properties.flush){
                    this._component.addClass('accordion-flush');
                }

                // Add Search
                this._builder.Search.add(this._component);
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {};

                // Configure Options
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
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

                // Generate ID
                let id = this._count();

                // Create Collapse
                let collapse = $(document.createElement('div')).attr({
                    'id': this._component.id + 'collapse' + id,
                    'class': 'accordion-item',
                }).appendTo(this._component);
                collapse.id = collapse.attr('id');

                // Save Properties
                collapse.properties = properties;

                // Create Header
                collapse.header = $(document.createElement('h2')).addClass('accordion-header').appendTo(collapse);
                collapse.header.button = $(document.createElement('button')).attr({
                    'id': collapse.id + 'button',
                    'class': 'accordion-button collapsed',
                    'type': 'button',
                    'data-bs-toggle': 'collapse',
                    'data-bs-target': '#' + collapse.id + 'collapse',
                    'aria-controls': collapse.id + 'collapse',
                    'aria-expanded': 'false',
                }).appendTo(collapse.header);

                // Create Icon
                collapse.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + collapse.properties.icon).appendTo(collapse.header.button);

                // Create Title
                collapse.title = $(document.createElement('span')).appendTo(collapse.header.button);

                // Create Collapse
                collapse.collapse = $(document.createElement('div')).attr({
                    'id': collapse.id + 'collapse',
                    'class': 'accordion-collapse collapse',
                    'data-bs-parent': '#' + this._component.id,
                }).appendTo(collapse);
                collapse.collapse.id = collapse.collapse.attr('id');

                // Create Content
                collapse.content = $(document.createElement('div')).addClass('accordion-body').appendTo(collapse.collapse);

                // Set Collapse Class
                if(this._properties.class.collapse){
                    collapse.addClass(this._properties.class.collapse);
                }
                if(collapse.properties.class.collapse){
                    collapse.addClass(collapse.properties.class.collapse);
                }

                // Set Button Class
                if(this._properties.class.button){
                    collapse.header.button.addClass(this._properties.class.button);
                }
                if(collapse.properties.class.button){
                    collapse.header.button.addClass(collapse.properties.class.button);
                }

                // Set Always Open
                if(this._properties.alwaysOpen){
                    collapse.collapse.attr('data-bs-parent','');
                }

                // Set Icon
                if(collapse.properties.icon == null){
                    collapse.icon.remove();
                }

                // Set Title
                if(collapse.properties.title){
                    collapse.title.html(collapse.properties.title);
                }

                // Set Content
                if(collapse.properties.content){
                    collapse.content.html(collapse.properties.content);
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(collapse,this);
                }

                // Set Search
                this._builder.Search.set(collapse);

                // Return collapse
                return collapse;
            }
        },
        badge: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        badge: null,
                        icon: null,
                        content: null,
                    },
                    icon: 'circle',
                    color: 'primary',
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'badge' + this._id,
                    'class': 'card p-2',
                });
                this._component.id = this._component.attr('id');

                // Create Row
                this._component.row = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center').appendTo(this._component);

                // Create Icon Frame
                this._component.iconFrame = $(document.createElement('div')).addClass('d-flex justify-content-center align-items-center rounded text-bg-' + this._properties.color).css({width:'64px',height:'64px'}).appendTo(this._component.row);
                this._component.icon = $(document.createElement('i')).addClass('fs-3 bi bi-' + this._properties.icon).appendTo(this._component.iconFrame);

                // Create Content
                this._component.content = $(document.createElement('div')).addClass('flex-grow-1 d-flex flex-column justify-content-center align-items-start ms-3').appendTo(this._component.row);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Badge Class
                if(this._properties.class.badge){
                    this._component.addClass(this._properties.class.badge);
                }

                // Set Box Icon Frame Class
                if(this._properties.class.icon){
                    this._component.iconFrame.addClass(this._properties.class.icon);
                }

                // Set Box Content Class
                if(this._properties.class.content){
                    this._component.content.addClass(this._properties.class.content);
                }
            }
        },
        info: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        info: null,
                        icon: null,
                        content: null,
                        link: null,
                    },
                    icon: 'circle',
                    color: 'primary',
                    link: null,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'info' + this._id,
                    'class': 'card text-bg-' + this._properties.color,
                });
                this._component.id = this._component.attr('id');

                // Create Row
                this._component.row = $(document.createElement('div')).addClass('d-flex justify-content-between align-items-stretch px-2').appendTo(this._component);

                // Create Link
                this._component.link = $(document.createElement('a')).attr('href',this._properties.link).addClass('text-center text-bg-black-25 w-100 p-1').appendTo(this._component);
                this._component.link.text = $(document.createElement('span')).text('More Info').appendTo(this._component.link);
                this._component.link.icon = $(document.createElement('i')).addClass('ms-1 bi bi-arrow-right-circle').appendTo(this._component.link.text);

                // Create Content
                this._component.content = $(document.createElement('div')).addClass('p-2').appendTo(this._component.row);

                // Create Icon Frame
                this._component.iconFrame = $(document.createElement('div')).appendTo(this._component.row);
                this._component.iconFrame.icon = $(document.createElement('i')).addClass('text-dark opacity-50 bi bi-' + this._properties.icon).css({"font-size":"5rem"}).appendTo(this._component.iconFrame);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Info Class
                if(this._properties.class.box){
                    this._component.addClass(this._properties.class.box);
                }

                // Set Info Icon Frame Class
                if(this._properties.class.icon){
                    this._component.iconFrame.addClass(this._properties.class.icon);
                }

                // Set Info Content Class
                if(this._properties.class.content){
                    this._component.content.addClass(this._properties.class.content);
                }

                // Set Info Link Class
                if(this._properties.class.link){
                    this._component.link.addClass(this._properties.class.link);
                }

                // Set Info Icon
                if(this._properties.icon == null){
                    this._component.iconFrame.icon.remove();
                }

                // Set Info Link
                if(this._properties.link == null){
                    this._component.link.remove();
                }
            }
        },
        timeline: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        timeline: null,
                        item: null,
                        icon: null,
                        object: null,
                        filters: null,
                        component: null,
                    },
                    order: 'DESC',
                    showNow: true,
                    showStart: true,
                    properties: {
                        icon: 'circle',
                        color: 'secondary',
                        type: '',
                        datetime: null,
                        order: null,
                        label: true,
                        id:null,
                        class: {
                            item: null,
                            icon: null,
                            object: null,
                        },
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'timeline' + this._id,
                });
                this._component.id = this._component.attr('id');

                // Create Filters
                this._component.filters = $(document.createElement('div')).attr({
                    'id': this._component.id + 'filters',
                    'class': 'btn-group',
                    'role': 'group',
                    'aria-label': 'Filters',
                    'data-filters': '',
                }).appendTo(this._component);

                // Add Filter 'All'
                this._component.filters.all = $(document.createElement('button')).attr({
                    'class': 'btn btn-primary text-capitalize',
                    'type': 'button',
                    'data-type': null,
                    'data-label': 'All',
                }).html('All').appendTo(this._component.filters);
                this._component.filters.all.click(function(){
                    self._component.filters.attr('data-filters','');
                    self.filter();
                });

                // Create Timeline
                this._component.timeline = $(document.createElement('div')).addClass('timeline').appendTo(this._component);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Filters Class
                if(this._properties.class.filters){
                    this._component.filters.addClass(this._properties.class.filters);
                }

                // Set Timeline Class
                if(this._properties.class.timeline){
                    this._component.timeline.addClass(this._properties.class.timeline);
                }

                // Clear Timeline
                this.clear();

                // Add Search to Timeline
                this._builder.Search.add(this._component.timeline);
            }

            clear(){

                // Set Self
                const self = this;

                // Remove Children
                this._component.timeline.children().remove();

                // Show Start
                if(this._properties.showStart){
                    this.add({order:'0000000000000',icon:'clock-history',label: false},function(object){
                        object.item.remove();
                        object.removeAttr('data-search').removeAttr('data-type');
                    });
                }

                // Show Now
                if(this._properties.showNow){
                    this.add({order:'9999999999999',color:'success',icon:'clock',label: false},function(object){
                        object.item.remove();
                        object.removeAttr('data-search').removeAttr('data-type');
                    });
                }

                // Return Object
                return this;
            }

            sort(order = null){

                // Set Order
                if(order == null){
                    order = this._properties.order;
                }

                // Sanitize Order
                if(order != 'ASC' && order != 'DESC'){
                    order = 'DESC';
                }

                // Retrieve Objects
                let objects = this._component.timeline.children('div').detach().get();

                // Sort Objects
                objects.sort(function(a, b){
                    if(order == 'ASC'){
                        return new Date($(a).data('order')) - new Date($(b).data('order'));
                    } else {
                        return new Date($(b).data('order')) - new Date($(a).data('order'));
                    }
                });

                // Append Objects
                this._component.timeline.append(objects)

                // Return Object
                return this;
            }

            filter(){
                this._component.filters.find('button').removeClass('btn-primary').addClass('btn-light');
                let current = this._component.filters.attr('data-filters').split(',');
                if(this._component.filters.attr('data-filters') != ''){
                    this._component.timeline.find('[data-type]').hide();
                    for(const [key, filter] of Object.entries(current)){
                        this._component.filters.find('button[data-type="' + filter + '"]').addClass('btn-primary').removeClass('btn-light');
                        this._component.timeline.find('[data-type="' + filter + '"]').show();
                    }
                } else {
                    this._component.timeline.find('[data-type]').show();
                    this._component.filters.find('button[data-label="All"]').addClass('btn-primary').removeClass('btn-light');
                }
            }

            addFilter(type = '', string = null){

                // Set Self
                const self = this;

                // Set Label
                var label = string;
                if(label == null && type != ''){
                    label = type;
                }

                // Check if Filter Exists
                if(label != null && this._component.filters.children('[data-label="' + label + '"]').length <= 0){

                    // Create Filter
                    var filter = $(document.createElement('button')).attr({
                        'class': 'btn btn-light text-capitalize',
                        'type': 'button',
                        'data-type': type,
                        'data-label': label,
                    }).html(self._builder.Locale.get(label)).appendTo(this._component.filters);

                    // Add Filter Event
                    filter.click(function(){

                        // Get Current Filters
                        var current = self._component.filters.attr('data-filters').split(',')
                        if(self._builder.Helper.inArray(type,current)){
                            current = current.filter(function(value){
                                return value != type;
                            });
                        } else {
                            current.push(type);
                        }
                        let filterString = current.toString();
                        if(filterString.charAt(0) == ','){
                            filterString = filterString.substring(1);
                        }
                        self._component.filters.attr('data-filters',filterString);
                        self.filter();
                    });
                }
            }

            label(timestamp, color = 'primary'){

                // Sanitize Timestamp
                let datetime = new Date(timestamp);

                // Set Order
                let order = datetime.setHours(0,0,0,0);

                // Check if Label Exists
                if(this._component.timeline.find('div.time-label[data-order="'+order+'"]').length > 0){

                    // Return Object
                    return this;
                }

                // Create Label
                var label = $(document.createElement('div')).attr({
                    'class': 'time-label',
                    'data-order': order,
                }).addClass('time-label').attr('data-order',order).prependTo(this._component.timeline);
                label.time = $(document.createElement('span')).attr({
                    'class': 'text-bg-'+color,
                    'title': datetime.toLocaleString('en-US'),
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'right',
                }).html(datetime.toLocaleDateString('en-US',{day: 'numeric', month: 'long', year: 'numeric'})).appendTo(label);

                // Return Object
                return this;
            }

            add(options = {}, callback = null){

                // Check if options is a Function
                if(options instanceof Function){ callback = options; options = {}; }

                // Create Properties Options
                let properties = {};
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        switch(key){
                            case"datetime":
                                properties[key] = Date.parse(new Date());
                                break;
                            case"class":
                                properties[key] = {};
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

                // Set Options
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

                // Create Timeline
                var object = $(document.createElement('div')).attr({
                    'id': this._component.id + 'object' + id,
                    'class': 'timeline-object',
                }).appendTo(this._component.timeline);
                object.id = object.attr('id');

                // Set Properties
                object.properties = properties;

                // Set object Class
                if(this._properties.class.object){
                    object.addClass(this._properties.class.object);
                }
                if(properties.class.object){
                    object.addClass(properties.class.object);
                }

                // Set DateTime
                if(properties.datetime == null){
                    properties.datetime = new Date();
                }
                var datetime = new Date(properties.datetime);

                // Set Order
                var order = Date.parse(datetime);
                if(properties.order != null){
                    order = properties.order;
                }
                object.attr('data-order',order);

                // Set Type
                if(properties.type != null){
                    object.attr('data-type',properties.type);
                }

                // Add Filter
                if(properties.type != null){
                    this.addFilter(properties.type);
                }

                // Set Icon
                object.icon = $(document.createElement('i')).addClass('bi bi-' + properties.icon + ' text-bg-'+properties.color).appendTo(object);
                if(properties.class.icon){
                    object.icon.addClass(properties.class.icon);
                }

                // Set item
                object.item = $(document.createElement('div')).addClass('timeline-item').appendTo(object);
                if(this._properties.class.item){
                    object.item.addClass(this._properties.class.item);
                }
                if(properties.class.item){
                    object.item.addClass(properties.class.item);
                }

                // Set Tools
                object.tools = $(document.createElement('div')).addClass('tools').appendTo(object.item);

                // Set Time
                var time = $(document.createElement('span')).appendTo(object.tools);
                time.icon = $(document.createElement('i')).addClass('bi bi-clock me-1').appendTo(time);
                time.ago = $(document.createElement('time')).attr({
                    'class': 'timeago',
                    'title': datetime.toLocaleString(),
                    'datetime': datetime.toLocaleString(),
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                    'data-bs-title': datetime.toLocaleString(),
                }).appendTo(time);
                time.ago.timeago();
                time.ago.bootstrap = new bootstrap.Tooltip(time.ago);
                object.time = time;

                // Add Label
                if(properties.label){
                    this.label(order)
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(object,this);
                }

                // Sort
                this.sort();

                // Set Search
                this._builder.Search.set(object);

                // Return Object
                return this;
            }
        },
        feed: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        feed: null,
                        post: null,
                    },
                    properties: {
                        username: null,
                        title: null,
                        content: null,
                        datetime: null,
                        class: {
                            post: null,
                        },
                    },
                    controls:{},
                    iframed: false,
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'feed' + this._id,
                    'class': 'feed',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Feed Class
                if(this._properties.class.feed){
                    this._component.addClass(this._properties.class.feed);
                }

                // Add Search
                this._builder.Search.add(this._component);
            }

            clear(){

                // Clear Feed's Children
                this._component.children().remove();

                // Return Object
                return this;
            }

            sort(order = null){

                // Set Order
                if(order == null){
                    order = this._properties.order;
                }

                // Sanitize Order
                if(order != 'ASC' && order != 'DESC'){
                    order = 'DESC';
                }

                // Retrieve Objects
                let objects = this._component.children('div').detach().get();

                // Sort Objects
                objects.sort(function(a, b){
                    if(order == 'ASC'){
                        return new Date($(a).data('order')) - new Date($(b).data('order'));
                    } else {
                        return new Date($(b).data('order')) - new Date($(a).data('order'));
                    }
                });

                // Append Objects
                this._component.append(objects)

                // Return Object
                return this;
            }

            add(options = {}, callback = null){

                // Set Self
                const self = this

                // Check if Options is a Function
                if(options instanceof Function){ callback = options; options = {}; }

                // Create properties Options
                let properties = {};
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        switch(key){
                            case"datetime":
                                properties[key] = Date.parse(new Date());
                                break;
                            case"class":
                                properties[key] = {};
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

                // Set Options
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

                // Create Post
                var post = $(document.createElement('div')).attr({
                    'id': this._component.id + 'post' + id,
                    'class': 'post',
                }).appendTo(this._component);
                post.id = post.attr('id');
                post.properties = properties;

                // Set Post Class
                if(this._properties.class.post){
                    post.addClass(this._properties.class.post);
                }

                // Set DateTime
                var datetime = new Date(properties.datetime);

                // Set Order
                var order = Date.parse(datetime);
                if(properties.order != null){
                    order = properties.order;
                }
                post.attr('data-order',order);

                // Create Title Block
                post.title = $(document.createElement('div')).addClass('title-block').appendTo(post);
                post.title.header = $(document.createElement('h2')).addClass('title').appendTo(post.title);

                // Set Title
                if(properties.title != null){
                    post.title.header.text(properties.title);
                }

                // Create User Block
                post.user = $(document.createElement('div')).addClass('user-block user-select-none').appendTo(post);
                post.user.avatar = $(document.createElement('img'))
                    .attr({
                        class: 'avatar img-circle rounded-circle img-bordered-sm',
                        alt: 'Avatar',
                    })
                    .appendTo(post.user);
                post.user.username = $(document.createElement('span')).addClass('username mt-2').appendTo(post.user);
                post.user.link = $(document.createElement('a')).addClass('text-decoration-none').appendTo(post.user.username);
                post.user.date = $(document.createElement('span')).addClass('description mt-1').appendTo(post.user);
                post.user.date.icon = $(document.createElement('i')).addClass('bi-clock me-1').appendTo(post.user.date);
                post.user.date.timeago = $(document.createElement('time')).attr({
                    'class': 'timeago',
                    'title': datetime.toLocaleString(),
                    'datetime': datetime.toLocaleString(),
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                    'data-bs-title': datetime.toLocaleString(),
                }).html(datetime.toLocaleString()).appendTo(post.user.date).timeago();
                post.user.date.timeago.bootstrap = new bootstrap.Tooltip(post.user.date.timeago);

                // Set User Avatar
                if(properties.username != null){
                    post.user.link.attr('href','/users/details?id=' + properties.username).html(properties.username);
                    post.user.avatar.attr('src',this._builder.Helper.gravatar(properties.username));
                }

                // Check if post are iframed for isolation
                if(self._properties.iframed){

                    // Create Iframe Block
                    post.content = $(document.createElement('iframe')).attr({
                        'class': 'content w-100 border-0 bg-transparent',
                        'allowtransparency': 'true',
                        'frameborder': '0',
                        'style': 'background-color: transparent !important;'
                    }).appendTo(post);

                    // Set the iframe to load before injecting content
                    post.content.on('load', function() {

                        // Check if properties.content is not null
                        if (properties.content != null) {

                            // Access the iframe's document object
                            var iframeDocument = post.content[0].contentDocument || post.content[0].contentWindow.document;

                            // Write the content into the iframe
                            iframeDocument.open();
                            iframeDocument.write(`
                                <style>
                                    html, body { background-color: transparent!important; margin: 0; padding: 0; scroll-behavior: smooth; }
                                    body { padding: 1rem; }
                                </style>
                                ${properties.content}
                            `);
                            iframeDocument.close();
                        }
                    });
                } else {

                    // Create Content Block
                    post.content = $(document.createElement('p')).addClass('content').appendTo(post);

                    // Set Content
                    if(properties.content != null){
                        post.content.html(properties.content);
                    }
                }

                // Create Controls Block
                post.controls = $(document.createElement('p')).addClass('controls user-select-none').appendTo(post);

                // Add Controls
                for(const [name, control] of Object.entries(self._properties.controls)){

                    // Create Control
                    var object = $(document.createElement('button')).addClass('text-decoration-none btn btn-sm btn-link me-1').appendTo(post.controls);
                    object.icon = $(document.createElement('i')).addClass('bi me-1').appendTo(object);
                    object.label = $(document.createElement('span')).appendTo(object);

                    // Set Icon
                    if(control.icon){
                        object.icon.addClass('bi-' + control.icon);
                    }

                    // Set Label
                    if(control.label){
                        object.label.html(control.label);
                    }

                    // Set Callback
                    if(control.callback && control.callback instanceof Function){
                        control.callback(object,post,self);
                    }
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(post,this);
                }

                // Sort
                this.sort();

                // Set Search
                this._builder.Search.set(post)

                // Return Object
                return this;
            }
        },
        table: class extends this.ComponentClass {

            #buttons = {
                columnsVisibility:{
                    label:{
                        extend: 'colvis',
                        text: '<i class="bi-layout-sidebar-inset me-2"></i>Columns',
                    },
                    icon:{
                        extend: 'colvis',
                        text: '<i class="bi-layout-sidebar-inset"></i>',
                    },
                },
                selectTools:{
                    label:{
                        extend: 'collection',
                        text: '<i class="bi-check2-square me-2"></i>Select',
                        buttons: [
                            {
                                extend: 'selectAll',
                                text: '<i class="bi-check2-all me-2"></i>All',
                            },
                            {
                                extend: 'selectNone',
                                text: '<i class="bi-x-square me-2"></i>None',
                            },
                        ],
                    },
                    icon:{
                        extend: 'collection',
                        text: '<i class="bi-check2-square"></i>',
                        buttons: [
                            {
                                extend: 'selectAll',
                                text: '<i class="bi-check2-all me-2"></i>All',
                            },
                            {
                                extend: 'selectNone',
                                text: '<i class="bi-x-square me-2"></i>None',
                            },
                        ],
                    },
                },
                advancedSearch:{
                    label:{
                        extend: 'collection',
                        text: '<i class="bi-search me-2"></i>Advanced Search',
                        action:function(e, dt, node, config){
                            const SearchBuilder = new bootstrap.Collapse(node.closest('div.dataTables_wrapper').find('#SearchBuilder.collapse'))
                            SearchBuilder.toggle()
                        },
                    },
                    icon:{
                        extend: 'collection',
                        text: '<i class="bi-search"></i>',
                        action:function(e, dt, node, config){
                            const SearchBuilder = new bootstrap.Collapse(node.closest('div.dataTables_wrapper').find('#SearchBuilder.collapse'))
                            SearchBuilder.toggle()
                        },
                    },
                },
                exportTools:{
                    label:{
                        extend: 'collection',
                        text: '<i class="bi-arrow-bar-down me-2"></i>Export',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="bi-clipboard me-2"></i>Clipboard',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                            {
                                extend: 'excel',
                                text: '<i class="bi-filetype-xlsx me-2"></i>Excel',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                            {
                                extend: 'csv',
                                text: '<i class="bi-filetype-csv me-2"></i>CSV',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                            {
                                extend: 'pdf',
                                text: '<i class="bi-filetype-pdf me-2"></i>PDF',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                        ],
                    },
                    icon:{
                        extend: 'collection',
                        text: '<i class="bi-arrow-bar-down"></i>',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="bi-clipboard me-2"></i>Clipboard',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                            {
                                extend: 'excel',
                                text: '<i class="bi-filetype-xlsx me-2"></i>Excel',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                            {
                                extend: 'csv',
                                text: '<i class="bi-filetype-csv me-2"></i>CSV',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                            {
                                extend: 'pdf',
                                text: '<i class="bi-filetype-pdf me-2"></i>PDF',
                                exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                            },
                        ],
                    },
                }
            }
            #datatable = null

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        buttons: null,
                        searchBuilder: null,
                        table: null,
                        footer: null,
                    },
                    card:false,
                    advancedSearch:true,
                    exportTools:true,
                    columnsVisibility:true,
                    selectTools:false,
                    showButtons:true,
                    showButtonsLabel:true,
                    pagination:true,
                    information:true,
                    lengthMenu:true,
                    buttons: [],
                    columnDefs: [],
                    actions:null,
                    dblclick: null,
                    title: null,
                    icon: null,
                    datatable: {
                        autoWidth: true,
                        lengthChange: true,
                        ordering: true,
                        paging: true,
                        searching: true,
                        dom: '<"d-flex flex-column justify-content-start align-items-start mb-2"B<"#SearchBuilder.collapse w-100 py-2 pt-3"<"card card-body"Q>><"#SearchPanes.collapse py-2 pt-3"<"card card-body"P>>><t><"d-flex justify-content-between align-items-center"lip>',
                        lengthMenu: [ 10, 25, 50, 100 ],
                        order: [[0, 'asc']],
                        pageLength: 10,
                        pagingType: 'simple_numbers',
                        renderer: 'bootstrap',
                        columnDefs: [],
                        initComplete: function(settings, json) {},
                        createdRow: function (row, data, index) {},
                        language:{
                            "decimal":        "",
                            "emptyTable":     "No data available in table",
                            "info":           "_START_ to _END_ of _TOTAL_",
                            "infoEmpty":      "0 to 0 of 0",
                            "infoFiltered":   "(filtered)",
                            "infoPostFix":    "",
                            "thousands":      ",",
                            "lengthMenu":     "_MENU_",
                            "loadingRecords": "Loading...",
                            "processing":     "",
                            "search":         "Search:",
                            "zeroRecords":    "No matching records found",
                            "paginate": {
                                "first":      "First",
                                "last":       "Last",
                                "next":       "Next",
                                "previous":   "Previous"
                            },
                            "aria": {
                                "sortAscending":  ": activate to sort column ascending",
                                "sortDescending": ": activate to sort column descending"
                            },
                            "searchBuilder": {
                                "add": "Add Condition",
                                "button": {
                                    0: "Search Builder",
                                    "_": "Search Builder (%d)",
                                },
                                "clearAll": "Clear All",
                                "condition": "Condition",
                                "conditions": {
                                    "array": {
                                        "contains": "Contains",
                                        "empty": "Empty",
                                        "equals": "Equals",
                                        "not": "Not",
                                        "notEmpty": "Not Empty",
                                        "without": "Without"
                                    },
                                    "date": {
                                        "after": "After",
                                        "before": "Before",
                                        "between": "Between",
                                        "empty": "Empty",
                                        "equals": "Equals",
                                        "not": "Not",
                                        "notBetween": "Not Between",
                                        "notEmpty": "Not Empty"
                                    },
                                    "number": {
                                        "between": "Between",
                                        "empty": "Empty",
                                        "equals": "Equals",
                                        "gt": "Greater Than",
                                        "gte": "Greater Than Equal To",
                                        "lt": "Less Than",
                                        "lte": "Less Than Equal To",
                                        "not": "Not",
                                        "notBetween": "Not Between",
                                        "notEmpty": "Not Empty",
                                    },
                                    "string": {
                                        "contains": "Contains",
                                        "empty": "Empty",
                                        "endsWith": "Ends With",
                                        "equals": "Equals",
                                        "not": "Not",
                                        "notContains": "Does Not Contain",
                                        "notEmpty": "Not Empty",
                                        "notEndsWith": "Does Not End With",
                                        "notStartsWith": "Does Not Start With",
                                        "startsWith": "Starts With",
                                    },
                                },
                                "data": "Data",
                                "delete": "&times",
                                "deleteTitle": "Delete filtering rule",
                                "left": "<",
                                "leftTitle": "Outdent criteria",
                                "logicAnd": "And",
                                "logicOr": "Or",
                                "right": ">",
                                "rightTitle": "Indent criteria",
                                "title": {
                                    0: "",
                                    "_": "",
                                },
                                "value": "Value",
                                "valueJoiner": "and",
                            },
                        },
                        colReorder: false,
                        fixedColumns: false,
                        select: false,
                        buttons: [],
                        responsive: true,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'table' + this._id,
                    'class': '',
                });
                this._component.id = this._component.attr('id');

                // Create Table
                this._component.table = $(document.createElement('table')).addClass('table table-striped table-hover m-0 w-100 user-select-none').attr('style','margin-top: 0px!important;margin-bottom: 0px!important;').appendTo(this._component);

                // Create Dropdown
                if(self._properties.actions && typeof self._properties.actions === 'object'){
                    if(Object.entries(self._properties.actions).length > 0){
                        this._component.actions = this._builder.Component(
                            'dropdown',
                            {
                                icon: "three-dots-vertical",
                                class: {
                                    object: "dropstart",
                                    button: "p-0 px-2",
                                },
                            },
                            function(dropdown){
                                if(self._properties.actions){
                                    for(const [name, action] of Object.entries(self._properties.actions)){
                                        dropdown.item(
                                            action,
                                            function(item){
                                                item.btn.attr('data-action',name);
                                            }
                                        );
                                    }
                                }
                            },
                        );
                    }
                }

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }
            }

            #button(name,label = false){

                // Set Self
                const self = this;

                // Set Key
                let key = 'icon';

                // Check if label is true
                if(label){
                    key = 'label';
                }

                // Check if Button Exists
                if(typeof this.#buttons[name] === "undefined"){
                    return null;
                }

                // Check if Button and Label exist
                if(typeof this.#buttons[name][key] === "undefined"){
                    return null;
                }

                // Return Button
                return this.#buttons[name][key];
            }

            #configure(){

                // Set Self
                const self = this;

                // Add Action column
                if(typeof this._component.actions === 'object' && Object.entries(this._properties.actions).length > 0){
                    this._properties.datatable.columnDefs.push(
                        {
                            target: this._properties.datatable.columnDefs.length,
                            visible: true,
                            responsivePriority: 1,
                            title: "Action",
                            data: null,
                            width: '80px',
                            defaultContent: this._component.actions.outerHTML(),
                        }
                    );
                }

                // Add Select Tools
                if(this._properties.selectTools){
                    this._properties.datatable.select = this._properties.selectTools
                    this._properties.datatable.buttons.push(self.#button('selectTools',this._properties.showButtonsLabel));
                }

                // Add Export Tools
                if(this._properties.exportTools){
                    this._properties.datatable.buttons.push(self.#button('exportTools',this._properties.showButtonsLabel));
                }

                // Add Columns Visibility
                if(this._properties.columnsVisibility){
                    this._properties.datatable.buttons.push(self.#button('columnsVisibility',this._properties.showButtonsLabel));
                }

                // Add Advanced Search
                if(this._properties.advancedSearch){
                    this._properties.datatable.buttons.push(self.#button('advancedSearch',this._properties.showButtonsLabel));
                }

                // Add Classes
                this._properties.datatable.dom = '<"d-flex flex-column justify-content-start align-items-start';
                if(this._properties.class.buttons){
                    this._properties.datatable.dom += ' ' + this._properties.class.buttons;
                }
                this._properties.datatable.dom += '"B<"#SearchBuilder.collapse w-100';
                if(this._properties.class.searchBuilder){
                    this._properties.datatable.dom += ' ' + this._properties.class.searchBuilder;
                }
                this._properties.datatable.dom += '"<"card card-body"Q>><"#SearchPanes.collapse py-2 pt-3"<"card card-body"P>>><"';
                if(this._properties.class.table){
                    if(this._properties.class.table.indexOf('mt-0') === -1){
                        this._properties.datatable.dom += ' mt-4';
                    }
                    this._properties.datatable.dom += ' ' + this._properties.class.table;
                }
                this._properties.datatable.dom += '"t><"d-flex justify-content-between align-items-center';
                if(this._properties.class.footer){
                    this._properties.datatable.dom += ' ' + this._properties.class.footer;
                }
                this._properties.datatable.dom += '"lip>';

                // drawCallback
                this._properties.datatable.drawCallback = function(){

                    setTimeout(function() {
                        // Tooltips
                        $('[data-bs-toggle="tooltip"]').tooltip();

                        // Timeago
                        $('.timeago').timeago();
                    }, 0);

                    if(typeof self.#datatable !== 'undefined'){

                        // Double Click Event
                        if(typeof self._properties.dblclick === 'function'){
                            self._component.table.find('tr').off().dblclick(
                                function(event){
                                    let node = $(this)
                                    let data = self.#datatable.row(node).data();
                                    self._properties.dblclick(event, self, self.#datatable, node, data);
                                },
                            );
                        }

                        // Action Button Events
                        self._component.table.find('button.dropdown-item[data-action]').each(function(){
                            let node = $(this);
                            let li = node.parents('li');
                            let action = node.attr('data-action');
                            let row = node.parents('tr');
                            let data = self.#datatable.row(row).data();
                            node.off().click(function(event){
                                if(typeof self._properties.actions[action].action === 'function'){
                                    self._properties.actions[action].action(event, self, self.#datatable, node, row, data);
                                }
                            })
                            if(typeof self._properties.actions[action].visible === 'function'){
                                if(!self._properties.actions[action].visible(li, self, node, row, data)){
                                    li.hide();
                                } else {
                                    li.show();
                                }
                            }
                            if(typeof self._properties.actions[action].visible === 'boolean'){
                                if(!self._properties.actions[action].visible){
                                    li.hide();
                                } else {
                                    li.show();
                                }
                            }
                        });
                    }
                }

                // return
                return this._properties.datatable;
            }

            _timeout(){

                // Set Self
                const self = this;

                // Initialize Datatable
                this.#datatable = this._component.table.DataTable(this.#configure());

                // Add Search
                this._builder.Search.get().on('input propertychange',function(){
                    self.#datatable.search($(this).val()).draw();
                });
            }

            data(){

                // Return Data
                return this.#datatable.data().toArray();
            }

            add(data){

                // Set Self
                const self = this;

                if(this.#datatable){

                    // Add Row
                    this.#datatable.row.add(data).draw()
                } else {

                    // Clear the interval once the table is found
                    var interval = setInterval(function() {
                        if(self.#datatable){
                            clearInterval(interval);
                            self.#datatable.row.add(data).draw()
                        }
                    }, 100);
                }
            }

            update(row, data){

                // Set Self
                const self = this;

                // Update Row
                setTimeout(() => this.#datatable.row(row).data(data).draw(), 0);
            }

            delete(row){

                // Set Self
                const self = this;

                // Delete Row
                setTimeout(() => this.#datatable.row(row).remove().draw(), 0);
            }
        },
        carousel: class extends this.ComponentClass {

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        carousel: null,
                        slide: null,
                        inner: null,
                        indicators: null,
                    },
                    fade: false,
                    touch: true,
                    autoplay: false,
                    indicators: false,
                    controls: true,
                    properties: {
                        class: {
                            slide: null,
                            image: null,
                            caption: null,
                        },
                        interval: null,
                        caption: null,
                        source: null,
                        alt: null,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'carousel' + this._id,
                    'class': 'carousel slide',
                });
                this._component.id = this._component.attr('id');

                // Create Indicators
                if(this._properties.indicators){
                    this._component.indicators = $(document.createElement('div')).addClass('carousel-indicators').appendTo(this._component);
                }

                // Create Inner
                this._component.inner = $(document.createElement('div')).addClass('carousel-inner').appendTo(this._component);

                // Create Controls
                this._component.controls = {};
                this._component.controls.previous = $(document.createElement('button')).addClass('carousel-control-prev').attr('type','button').attr('data-bs-target','#' + this._component.id).attr('data-bs-slide','prev').appendTo(this._component);
                this._component.controls.previous.icon = $(document.createElement('span')).addClass('carousel-control-prev-icon').attr('aria-hidden','true').appendTo(this._component.controls.previous);
                this._component.controls.previous.label = $(document.createElement('span')).addClass('visually-hidden').text('Previous').appendTo(this._component.controls.previous);
                this._component.controls.next = $(document.createElement('button')).addClass('carousel-control-next').attr('type','button').attr('data-bs-target','#' + this._component.id).attr('data-bs-slide','next').appendTo(this._component);
                this._component.controls.next.icon = $(document.createElement('span')).addClass('carousel-control-next-icon').attr('aria-hidden','true').appendTo(this._component.controls.next);
                this._component.controls.next.label = $(document.createElement('span')).addClass('visually-hidden').text('Next').appendTo(this._component.controls.next);

                // Set Fade
                if(this._properties.fade){
                    this._component.addClass('carousel-fade');
                }

                // Set Touch
                if(!this._properties.touch){
                    this._component.attr('data-bs-touch','false');
                }

                // Set Auto Play
                if(this._properties.autoplay){
                    this._component.attr('data-bs-ride',this._properties.autoplay);
                }

                // Set Controls
                if(!this._properties.controls){
                    this._component.controls.previous.addClass('d-none');
                    this._component.controls.next.addClass('d-none');
                }

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Carousel Class
                if(this._properties.class.carousel){
                    this._component.addClass(this._properties.class.carousel);
                }

                // Set Inner Class
                if(this._properties.class.inner){
                    this._component.inner.addClass(this._properties.class.inner);
                }

                // Set Indicators Class
                if(this._properties.class.indicators){
                    this._component.indicators.addClass(this._properties.class.indicators);
                }
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {};

                // Configure Options
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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

                // Create Slide
                let slide = $(document.createElement('div')).addClass('carousel-item').appendTo(this._component.inner);

                // Create Image
                slide.image = $(document.createElement('img')).addClass('d-block w-100').attr('src',properties.source).attr('alt',properties.alt).appendTo(slide);

                // Create Caption
                slide.caption = $(document.createElement('div')).addClass('carousel-caption d-none d-md-block').appendTo(slide);

                // Create Indicator
                if(this._properties.indicators){
                    slide.indicator = $(document.createElement('button')).attr('type','button').attr('data-bs-target','#' + this._component.id).attr('data-bs-slide-to',this._component.inner.children().length - 1).appendTo(this._component.indicators);
                }

                // Set Interval
                if(properties.interval){
                    slide.attr('data-bs-interval',properties.interval);
                }

                // Set Caption
                if(properties.caption){
                    slide.caption.removeClass('d-none').html(properties.caption);
                } else {
                    slide.caption.remove();
                }

                // Set Slide Class
                if(this._properties.class.slide){
                    slide.addClass(this._properties.class.slide);
                }
                if(properties.class.slide){
                    slide.addClass(this._properties.class.slide);
                }

                // Set Image Class
                if(properties.class.image){
                    slide.image.addClass(this._properties.class.image);
                }

                // Set Caption Class
                if(properties.class.caption){
                    slide.caption.addClass(this._properties.class.caption);
                }

                // Set Active
                if(this._component.inner.children().length === 1){
                    slide.addClass('active');
                    if(this._properties.indicators){
                        slide.indicator.addClass('active');
                    }
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(slide, this);
                }

                // Return
                return this;
            }
        },
        stepper: class extends this.ComponentClass {

            #current = 1;
            #steps = {};

            _init(){
                this._properties = {
                    class: {
                        component: null,
                        stepper: null,
                        controls: null,
                        steps: null,
                        pagination: null,
                    },
                    color: "primary",
                    callback: {},
                    properties: {
                        class: {},
                        callback: {
                            hide: null,
                            hidden: null,
                            show: null,
                            shown: null,
                        },
                        icon: null,
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'stepper' + this._id,
                    'class': 'stepper',
                });
                this._component.id = this._component.attr('id');

                // Create Controls
                this._component.controls = $(document.createElement('div')).appendTo(this._component);
                this._component.controls.position = $(document.createElement('div')).addClass('position-relative m-4').attr('id',this._component.id + 'controls').appendTo(this._component.controls);
                this._component.progress = $(document.createElement('div')).addClass('progress').attr({'role':'progressbar', 'aria-label':'Progress', 'aria-valuemin':'0', 'aria-valuemax':'100'}).css('height','4px').appendTo(this._component.controls.position);
                this._component.progress.bar = $(document.createElement('div')).addClass('progress-bar progress-bar-striped progress-bar-animated').css({'width':'0%','transition':'all 500ms ease'}).appendTo(this._component.progress);
                this._component.controls.position.absolute = $(document.createElement('div')).addClass('position-absolute w-100 top-0 start-50 translate-middle').appendTo(this._component.controls.position);
                this._component.controls.list = $(document.createElement('div')).addClass('d-flex justify-content-between').attr('id',this._component.id + 'controls').appendTo(this._component.controls.position.absolute);
                this._component.controls.id = this._component.controls.list.attr('id');

                // Create Steps
                this._component.steps = $(document.createElement('div')).appendTo(this._component);
                this._component.steps.accordion = $(document.createElement('div')).addClass('accordion').attr('id',this._component.id + 'steps').appendTo(this._component.steps);
                this._component.steps.id = this._component.steps.accordion.attr('id');

                // Create Pagination
                this._component.pagination = $(document.createElement('div')).appendTo(this._component);
                this._component.pagination.list = $(document.createElement('div')).addClass('d-block text-center').attr('id',this._component.id + 'pagination').appendTo(this._component.pagination);
                this._component.pagination.previous = $(document.createElement('button')).addClass('btn btn-primary float-start').attr({'type':'button', 'data-bs-toggle':'collapse'}).appendTo(this._component.pagination.list);
                this._component.pagination.previous.icon = $(document.createElement('i')).addClass('bi bi-chevron-left').appendTo(this._component.pagination.previous);
                this._component.pagination.previous.text = $(document.createElement('span')).addClass('ms-1').text('Previous').appendTo(this._component.pagination.previous);
                this._component.pagination.next = $(document.createElement('button')).addClass('btn btn-primary float-end').attr({'type':'button', 'data-bs-toggle':'collapse'}).appendTo(this._component.pagination.list);
                this._component.pagination.next.text = $(document.createElement('span')).addClass('ms-1').text('Next').appendTo(this._component.pagination.next);
                this._component.pagination.next.icon = $(document.createElement('i')).addClass('bi bi-chevron-right').appendTo(this._component.pagination.next);

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Stepper Class
                if(this._properties.class.stepper){
                    this._component.addClass(this._properties.class.stepper);
                }

                // Set Controls Class
                if(this._properties.class.controls){
                    this._component.controls.addClass(this._properties.class.controls);
                }

                // Set Steps Class
                if(this._properties.class.steps){
                    this._component.steps.addClass(this._properties.class.steps);
                }

                // Set Pagination Class
                if(this._properties.class.pagination){
                    this._component.pagination.addClass(this._properties.class.pagination);
                }
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {};

                // Configure Options
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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

                // Create Step Control
                let control = $(document.createElement('button')).attr({
                    'id':this._component.controls.id + id,
                    'class':'btn btn-sm btn-secondary rounded-circle align-middle text-center fw-bold',
                    'type':'button',
                    'data-bs-toggle':'collapse',
                    'data-bs-target':'#' + this._component.steps.id + id,
                    'aria-controls':this._component.steps.id + id,
                    'aria-expanded':'false',
                }).text(id).css({'width':'3rem','height':'3rem','transition':'all 500ms ease'}).appendTo(this._component.controls.list);
                control.id = control.attr('id');
                control.properties = properties;

                // Create Step Content
                let content = $(document.createElement('div')).attr({
                    'id':this._component.steps.id + id,
                    'class':'fade collapse',
                    'aria-labelledby':this._component.controls.id + id,
                    'data-bs-parent':'#' + this._component.steps.id,
                }).appendTo(this._component.steps.accordion);
                content.id = content.attr('id');
                content.properties = properties;
                content.bootstrap = new bootstrap.Collapse(content,{toggle:false});

                // Set Icon
                if(properties.icon){
                    control.icon = $(document.createElement('i')).addClass('fs-3 bi bi-' + properties.icon).appendTo(control);
                    control.html(control.icon);
                }

                // Set Step
                const step = {content:content,control:control,properties:properties,id:id};

                // Save Step
                this.#steps[id] = step;

                // Set Step Content Events
                content.on('hide.bs.collapse', function (event) {

                    // Execute Callback
                    if(typeof properties.callback.hide === 'function'){
                        properties.callback.hide(event,step,self);
                    }
                });
                content.on('hidden.bs.collapse', function (event) {

                    // Execute Callback
                    if(typeof properties.callback.hidden === 'function'){
                        properties.callback.hidden(event,step,self);
                    }
                });
                content.on('show.bs.collapse', function (event) {

                    // Set Current Step
                    self.#current = step.id;

                    // Check if Step is First
                    if(step.id === 1){
                        self._component.pagination.previous.attr('disabled',true).attr('data-bs-target','');
                    } else {
                        self._component.pagination.previous.attr('disabled',false).attr('data-bs-target','#' + self._component.steps.id + (step.id - 1));
                    }

                    // Check if Step is Last
                    if(step.id === self._counter){
                        self._component.pagination.next.attr('disabled',true).attr('data-bs-target','');
                    } else {
                        self._component.pagination.next.attr('disabled',false).attr('data-bs-target','#' + self._component.steps.id + (step.id + 1));
                    }

                    // Set Steps
                    for (let id = 1; id <= self._counter; id++) {
                        if(id <= step.id){
                            self.#steps[id].control.removeClass('btn-secondary').addClass('btn-primary');
                        } else {
                            self.#steps[id].control.removeClass('btn-primary').addClass('btn-secondary');
                        }
                        if(id !== step.id){
                            self.#steps[id].content.bootstrap.hide();
                            self.#steps[id].control.attr('aria-expanded',false);
                        } else {
                            self.#steps[id].control.attr('aria-expanded',true);
                        }
                    }

                    // Set Progress Bar
                    let width = 0 + '%';
                    if(self._counter > 1){
                        width = (((step.id - 1) / (self._counter - 1)) * 100) + '%';
                    }
                    self._component.progress.bar.css('width',width);

                    // Execute Callback
                    if(typeof properties.callback.show === 'function'){
                        properties.callback.show(event,step,self);
                    }
                });
                content.on('shown.bs.collapse', function (event) {

                    // Execute Callback
                    if(typeof properties.callback.shown === 'function'){
                        properties.callback.shown(event,step,self);
                    }
                });

                // Check if Step is First
                if(step.id === 1){
                    content.bootstrap.show();
                }

                // Check if Stepper contains a single step
                if(this._counter > 1 && this._component.pagination.next.attr('disabled') === 'disabled'){
                    this._component.pagination.next.attr('disabled',false).attr('data-bs-target','#' + self._component.steps.id + '2');
                }

                // Execute Callback
                if(typeof callback === 'function'){
                    callback(step,this);
                }

                // Return Object
                return this;
            }
        },
        form: class extends this.ComponentClass {

            _inputs = {};

            _init(){
                this._properties = {
                    class:{
                        component: null,
                        form: null,
                        input: null,
                        label: null,
                        field: null,
                    },
                    callback:{
                        submit: function(form){},
                        val: function(values){ return values; },
                        init: function(form){},
                        onChange: function(form){},
                        reset: function(form){},
                        clear: function(form){},
                    },
                };
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('form')).attr({
                    'id': 'form' + this._id,
                    'class': '',
                    'method': 'post',
                    'autocomplete': 'off',
                });
                this._component.id = this._component.attr('id');

                // Reset Event
                this._component.on('reset', function(e){
                    self.reset();
                });

                // Submit Event
                this._component.on('submit', function(e){
                    e.preventDefault();
                    self.submit();
                });

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set Form Class
                if(this._properties.class.form){
                    this._component.addClass(this._properties.class.form);
                }

                // Adding Search Support
                this._builder.Search.add(this._component);
            }

            submit(){

                // Set Self
                const self = this;

                // Callback
                if(typeof this._properties.callback.submit === 'function'){
                    this._properties.callback.submit(this);
                }

                // Return
                return this;
            };

            reset(){

                // Set Self
                const self = this;

                // Reset Values
                for(const [key, input] of Object.entries(self._inputs)){
                    input.reset();
                }

                // Callback
                if(typeof self._properties.callback.reset === 'function'){
                    self._properties.callback.reset(self);
                }

                // Return
                return this;
            };

            focus(){

                // Set Self
                const self = this;

                // Set focus on form
                self._component.focus();

                // Return
                return this;
            }

            init(){

                // Set Self
                const self = this;

                // Reset Values
                for(const [key, input] of Object.entries(self._inputs)){
                    if(typeof input.init === 'function'){
                        input.init();
                    }
                }

                // Callback
                if(typeof self._properties.callback.init === 'function'){
                    self._properties.callback.init(self);
                }

                // Return
                return this;
            }

            clear(){

                // Set Self
                const self = this;

                // Reset Values
                for(const [key, input] of Object.entries(self._inputs)){
                    input.clear();
                }

                // Callback
                if(typeof self._properties.callback.clear === 'function'){
                    self._properties.callback.clear(self);
                }

                // Return
                return this;
            };

            onChange(){

                // Set Self
                const self = this;

                // Reset Values
                for(const [key, input] of Object.entries(self._inputs)){
                    if(typeof input.onChange === 'function'){
                        input.onChange();
                    }
                }

                // Callback
                if(typeof self._properties.callback.onChange === 'function'){
                    self._properties.callback.onChange(self);
                }

                // Return
                return this;
            }

            val(values = null){

                // Set Self
                const self = this;

                // Set Values
                if(typeof values === 'object'){
                    if(values !== null){
                        for(const [key, value] of Object.entries(values)){
                            if(typeof self._inputs[key] !== 'undefined'){
                                self._inputs[key].val(value);
                            }
                        }
                    }
                } else {

                    // Check if values is a string and matches a key
                    if(typeof values === 'string' && typeof self._inputs[values] !== 'undefined'){
                        return self._inputs[values].val();
                    }
                }

                // Retrieve Values
                let object = {};
                for(const [key, input] of Object.entries(self._inputs)){
                    object[key] = input.val();
                }

                // Callback
                if(typeof self._properties.callback.val === 'function'){
                    object = self._properties.callback.val(object);
                }

                // Return
                return object;
            };

            add(param1, param2 = null){

                // Set Self
                const self = this;

                let selector = this._component;
                let options = {};
                let callback = null;

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

                // Configure Default Options
                let properties = {
                    name: null,
                    label: null,
                    color: null,
                    icon: 'input-cursor-text',
                    type: 'text',
                    target: null,
                    value: null,
                    step: null,
                    min: 0,
                    max: 100,
                    options: null,
                    modal: null,
                    multiple: false,
                    allowNew: false,
                    class: {
                        input: null,
                        label: null,
                        field: null,
                    },
                    callback: {
                        onChange: function(field,form){},
                        condition: function(form){ return true; },
                        format: function(option, component){ return option.text; },
                    }
                };

                // Overwrite Default Options
                for(const [key, value] of Object.entries(options)){
                    switch(key){
                        case 'class':
                        case 'callback':
                            if(typeof properties[key] === 'object'){
                                for(const [classKey, classValue] of Object.entries(value)){
                                    if(typeof properties[key][classKey] !== 'undefined'){
                                        properties[key][classKey] = classValue;
                                    }
                                }
                            }
                            break;
                        default:
                            if(typeof properties[key] !== 'undefined'){
                                properties[key] = value;
                            }
                            break;
                    }
                }

                // Add Default Options
                switch(properties.type){
                    case 'color':
                        if(properties.icon === null){
                            properties.icon = 'palette';
                        }
                        if(properties.color === null){
                            properties.color = null;
                        }
                        break;
                    case 'textarea':
                        if(properties.icon === null){
                            properties.icon = 'textarea-t';
                        }
                        if(properties.color === null){
                            properties.color = null;
                        }
                        break;
                    case 'select':
                        if(properties.icon === null){
                            properties.icon = 'list';
                        }
                        if(properties.color === null){
                            properties.color = null;
                        }
                        break;
                    case 'ide':
                        if(properties.icon === null){
                            properties.icon = 'code';
                        }
                        if(properties.color === null){
                            properties.color = null;
                        }
                        break;
                    case 'mce':
                        if(properties.icon === null){
                            properties.icon = 'input-cursor-text';
                        }
                        if(properties.color === null){
                            properties.color = null;
                        }
                        break;
                    case 'submit':
                        if(properties.icon === null){
                            properties.icon = 'save';
                        }
                        if(properties.color === null){
                            properties.color = 'success';
                        }
                        break;
                    case 'reset':
                        if(properties.icon === null){
                            properties.icon = 'arrow-clockwise';
                        }
                        if(properties.color === null){
                            properties.color = 'info';
                        }
                        break;
                    case 'clear':
                        if(properties.icon === null){
                            properties.icon = 'x-lg';
                        }
                        if(properties.color === null){
                            properties.color = 'light';
                        }
                        break;
                    default:
                        if(properties.icon === null){
                            properties.icon = 'input-cursor';
                        }
                        if(properties.color === null){
                            properties.color = null;
                        }
                        break;
                }

                // Set ID
                let id = this._count();

                // Create Field
                let field = $(document.createElement('div')).attr({
                    'id': this._component.id + 'group' + id,
                }).appendTo(selector);
                field.id = field.attr('id');
                field.properties = properties;

                // Set Field Class
                if(this._properties.class.field){
                    field.addClass(this._properties.class.field);
                }
                if(properties.class.field){
                    field.addClass(properties.class.field);
                }

                // condition method
                field.condition = function(){

                    // Set Condition
                    if(typeof properties.callback.condition === 'function'){
                        if(!properties.callback.condition(self)){
                            field.addClass('d-none');
                        } else {
                            field.removeClass('d-none');
                        }
                    }
                };

                // onChange method
                field.onChange = function(){

                    // Test Condition
                    field.condition();

                    // Execute Callback
                    if(typeof properties.callback.onChange === 'function'){
                        properties.callback.onChange(field, self);
                    }
                }

                // Create Group
                field.group = $(document.createElement('div')).attr({
                    'class': 'input-group d-flex flex-nowrap',
                }).appendTo(field);

                // Create Label
                field.label = $(document.createElement('label')).attr({
                    'class': 'input-group-text',
                    'for': field.id + 'input',
                }).text(properties.label).appendTo(field.group);

                // Set Label Class
                if(this._properties.class.label){
                    field.label.addClass(this._properties.class.label);
                }
                if(properties.class.label){
                    field.label.addClass(properties.class.label);
                }

                // Create Icon
                field.label.icon = $(document.createElement('i')).addClass('bi bi-' + properties.icon).prependTo(field.label);

                // Add Margin if Label is not Empty
                if(properties.label){
                    field.label.icon.addClass('me-1');
                }

                // Create Input
                switch(properties.type){
                    case 'clear':
                        field.input = $(document.createElement('button')).attr({
                            'id': field.id + 'clear',
                            'class': 'flex-grow-1 btn btn-' + properties.color,
                            'name': properties.name,
                            'type': 'button',
                            'value': properties.value,
                        }).html(field.label.html()).appendTo(field.group);
                        field.label.remove();
                        if(this._properties.class.label){
                            field.input.addClass(this._properties.class.label);
                        }
                        if(properties.class.label){
                            field.input.addClass(properties.class.label);
                        }
                        field.input.click(function(){
                            self.clear();
                        });
                        break;
                    case 'reset':
                        field.input = $(document.createElement('button')).attr({
                            'id': field.id + 'reset',
                            'class': 'flex-grow-1 btn btn-' + properties.color,
                            'name': properties.name,
                            'type': properties.type,
                            'value': properties.value,
                        }).html(field.label.html()).appendTo(field.group);
                        field.label.remove();
                        if(this._properties.class.label){
                            field.input.addClass(this._properties.class.label);
                        }
                        if(properties.class.label){
                            field.input.addClass(properties.class.label);
                        }
                        break;
                    case 'submit':
                        field.input = $(document.createElement('button')).attr({
                            'id': field.id + 'submit',
                            'class': 'flex-grow-1 btn btn-' + properties.color,
                            'name': properties.name,
                            'type': properties.type,
                            'value': properties.value,
                        }).html(field.label.html()).appendTo(field.group);
                        field.label.remove();
                        if(this._properties.class.label){
                            field.input.addClass(this._properties.class.label);
                        }
                        if(properties.class.label){
                            field.input.addClass(properties.class.label);
                        }
                        break;
                    case 'color':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'form-control form-control-color flex-grow-1',
                            'type': 'color',
                            'name': properties.name,
                        }).val(properties.value).appendTo(field.group);
                        // Execute onChange
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'ide':
                        field.input = $(document.createElement('div')).addClass('ide form-control p-0 flex-grow-1').appendTo(field.group);
                        field.input.lines = $(document.createElement('div')).addClass('ide-lines px-0').appendTo(field.input);
                        field.input.editor = $(document.createElement('textarea')).attr({
                            'id': field.id + 'input',
                            'class': 'ide-input',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).text(properties.value).appendTo(field.input);
                        field.input.val = function(value = null){
                            if(value !== null){
                                field.input.editor.val(value);
                                field.input.editor.trigger('propertychange');
                            }
                            return field.input.editor.val();
                        };
                        field.input.editor
                            .keydown(function(e) {
                                if(e.keyCode === 9) {
                                    e.preventDefault();

                                    var start = this.selectionStart;
                                    var end = this.selectionEnd;

                                    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
                                    this.selectionStart = this.selectionEnd = start + 1;
                                }
                            })
                            .on('input propertychange', function() {
                                var lines = $(this).val().split('\n').length;
                                field.input.lines.empty();
                                for (var i = 1; i <= lines; i++) {
                                    field.input.lines.append(`<div class="p-0 px-2">${i}</div>`);
                                }
                            })
                            .trigger('propertychange')
                        field.del = function(startLine, endLine = startLine) {

                            // Get current lines from textarea
                            let lines = field.input.editor.val().split('\n');

                            // Ensure the specified lines are within the bounds of the current text
                            if (startLine < 1 || endLine > lines.length || startLine > endLine) {
                                console.warn('Invalid line range');
                                return;
                            }

                            // Remove the specified lines
                            lines.splice(startLine - 1, endLine - startLine + 1);

                            // Update the textarea with the modified text
                            field.input.editor.val(lines.join('\n'));
                            field.input.editor.trigger('propertychange'); // Update line numbers and other listeners
                        }
                        field.highlight = function(...args) {

                            if (args.length === 0) {

                                // If no arguments are provided, highlight all lines
                                field.input.lines.children().each(function () {
                                    $(this).addClass('text-bg-pink');
                                });
                            } else {

                                // Loop through each argument
                                args.forEach(arg => {
                                    if (Array.isArray(arg)) {

                                        // If the argument is an array, treat it as a range [start, end]
                                        let [startLine, endLine] = arg;
                                        for (let i = startLine; i <= endLine; i++) {
                                            if (i > 0 && i <= field.input.lines.children().length) {
                                                let lineElement = field.input.lines.children().eq(i - 1);
                                                if (!lineElement.hasClass('text-bg-pink')) {
                                                    lineElement.addClass('text-bg-pink');
                                                }
                                            }
                                        }
                                    } else {

                                        // If the argument is a single line number
                                        let line = arg;
                                        if (line > 0 && line <= field.input.lines.children().length) {
                                            let lineElement = field.input.lines.children().eq(line - 1);
                                            if (!lineElement.hasClass('text-bg-pink')) {
                                                lineElement.addClass('text-bg-pink');
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        field.unhighlight = function (...args) {

                            if (args.length === 0) {

                                // If no arguments are provided, unhighlight all lines
                                field.input.lines.children().removeClass('text-bg-pink');
                            } else {

                                // Loop through each argument
                                args.forEach(arg => {
                                    if (Array.isArray(arg)) {

                                        // If the argument is an array, treat it as a range [start, end]
                                        let [startLine, endLine] = arg;
                                        for (let i = startLine; i <= endLine; i++) {
                                            if (i > 0 && i <= field.input.lines.children().length) {
                                                let lineElement = field.input.lines.children().eq(i - 1);
                                                if (lineElement.hasClass('text-bg-pink')) {
                                                    lineElement.removeClass('text-bg-pink');
                                                }
                                            }
                                        }
                                    } else {

                                        // If the argument is a single line number
                                        let line = arg;
                                        if (line > 0 && line <= field.input.lines.children().length) {
                                            let lineElement = field.input.lines.children().eq(line - 1);
                                            if (lineElement.hasClass('text-bg-pink')) {
                                                lineElement.removeClass('text-bg-pink');
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        field.highlighted = function (...args) {

                            let isHighlighted = false;

                            // Loop through each argument
                            args.forEach(arg => {
                                if (Array.isArray(arg)) {
                                    // If the argument is an array, treat it as a range [start, end]
                                    let [startLine, endLine] = arg;
                                    for (let i = startLine; i <= endLine; i++) {
                                        if (i > 0 && i <= field.input.lines.children().length) {
                                            let lineElement = field.input.lines.children().eq(i - 1);
                                            if (lineElement.hasClass('text-bg-pink')) {
                                                isHighlighted = true;
                                                return; // Exit as soon as any highlighted line is found
                                            }
                                        }
                                    }
                                } else {
                                    // If the argument is a single line number
                                    let line = arg;
                                    if (line > 0 && line <= field.input.lines.children().length) {
                                        let lineElement = field.input.lines.children().eq(line - 1);
                                        if (lineElement.hasClass('text-bg-pink')) {
                                            isHighlighted = true;
                                            return; // Exit as soon as any highlighted line is found
                                        }
                                    }
                                }
                            });

                            return isHighlighted;
                        }
                        // Execute onChange
                        field.input.editor.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'mce':
                        field.input = $(document.createElement('div')).addClass('mce form-control p-0 flex-grow-1').appendTo(field.group);
                        field.input.editor = $(document.createElement('textarea')).attr({
                            'id': field.id + 'input',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).val(properties.value).appendTo(field.input);
                        field.init = function(){
                            tinymce.init({
                                selector: '#' + field.id + 'input',
                                height: 400,
                                width: '100%',
                                menubar: false,
                                skin: 'oxide-dark',
                                plugins: [
                                    'advlist', 'autolink',
                                    'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                    'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | code table help',
                                init_instance_callback: function (editor) {
                                    field.input.editor.mce = editor;
                                    field.input.editor.mce.getBody().setAttribute('contenteditable', true);
                                    var container = $(editor.getContainer());
                                    container.find('.tox-statusbar').addClass("d-none");
                                    if (field.hasClass('rounded-0')) {
                                        container.addClass("rounded-0 border-0");
                                    } else {
                                        container.addClass("rounded-0 rounded-end border-0");
                                    }
                                },
                                setup: function (editor) {
                                    editor.on('change', function(){
                                        self.onChange();
                                    });
                                }
                            });
                        };
                        // Setting or getting the value of the TinyMCE editor
                        field.input.val = function(value = null){
                            if (value !== null) {

                                // If the editor is already initialized, just update the content without removing/re-initializing TinyMCE
                                if (typeof field.input.editor.mce !== 'undefined') {
                                    field.input.editor.mce.setContent(value);  // Set content safely
                                    field.input.editor.mce.focus(); // Ensure focus is on the editor
                                } else {

                                    // If TinyMCE is not initialized, initialize it and set the content
                                    field.input.editor.val(value);
                                    field.init();
                                }
                            }

                            // Return the content of the editor
                            if (typeof field.input.editor.mce !== 'undefined') {
                                return field.input.editor.mce.getContent();
                            } else {
                                return field.input.editor.val();
                            }
                        };
                        field.init();
                        break;
                    case 'textarea':
                        field.input = $(document.createElement('textarea')).attr({
                            'id': field.id + 'input',
                            'class': 'form-control flex-grow-1',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).text(properties.value).appendTo(field.group);
                        // Execute onChange
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'select':
                        field.input = {};
                        field.input.select = $(document.createElement('select')).attr({
                            'id': field.id + 'input',
                            'class': 'form-select flex-grow-1',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).appendTo(field.group);
                        if(properties.multiple){
                            field.input.select.attr('multiple',true);
                            field.input.select.attr('name','[]' + properties.name);
                        }
                        field.options = {};
                        field.delete = function(id = null){
                            if(id){
                                if(typeof field.options[id] !== 'undefined'){
                                    field.options.remove();
                                    delete field.options[id];
                                }
                            } else {
                                for(const [key, element] of Object.entries(field.options)){
                                    element.remove();
                                    delete field.options[key];
                                }
                            }
                        };
                        field.add = function(id,text){
                            if(typeof field.options[id] === 'undefined'){
                                field.options[id] = $(document.createElement('option')).attr('value',id).text(text).appendTo(field.input.select);
                            }
                        }
                        if(properties.options !== null){
                            for(const [key, option] of Object.entries(properties.options)){
                                field.add(option.id,option.text);
                            }
                        }
                        field.init = function(){
                            let defaults = {
                                theme: "bootstrap-5",
                                width: 'calc(100% - ' + field.label.outerWidth() + 'px)'
                            }
                            if(properties.multiple){
                                defaults.allowClear = true;
                            }
                            if(properties.allowNew){
                                defaults.tags = true;
                            }
                            if(properties.modal !== null){
                                defaults.dropdownParent = properties.modal;
                            }
                            if(typeof properties.callback.format === 'function'){
                                defaults.templateResult = properties.callback.format;
                            }
                            field.select2 = field.input.select.select2(defaults);
                        }
                        field.input.val = function(value = null){
                            if(value !== null && value !== field.input.select.val()){
                                field.input.select.val(value).trigger('change');
                            }
                            return field.input.select.val();
                        }
                        field.init();
                        field.input.val(properties.value);
                        // Execute onChange
                        field.input.select.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'locale':
                        field.input = {};
                        field.input.select = $(document.createElement('select')).attr({
                            'id': field.id + 'input',
                            'class': 'form-select flex-grow-1',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).appendTo(field.group);
                        if(properties.multiple){
                            field.input.select.attr('multiple',true);
                            field.input.select.attr('name','[]' + properties.name);
                        }
                        field.options = {};
                        field.delete = function(id = null){
                            if(id){
                                if(typeof field.options[id] !== 'undefined'){
                                    field.options.remove();
                                    delete field.options[id];
                                }
                            } else {
                                for(const [key, element] of Object.entries(field.options)){
                                    element.remove();
                                    delete field.options[key];
                                }
                            }
                        };
                        field.add = function(id,text){
                            if(typeof field.options[id] === 'undefined'){
                                field.options[id] = $(document.createElement('option')).attr('value',id).text(text).appendTo(field.input.select);
                            }
                        }
                        for(const [key, option] of Object.entries(self._builder.Option.get('locales'))){
                            field.add(option.id,option.text);
                        }
                        field.init = function(){
                            let defaults = {
                                theme: "bootstrap-5",
                                width: 'calc(100% - ' + field.label.outerWidth() + 'px)'
                            }
                            if(properties.multiple){
                                defaults.allowClear = true;
                            }
                            if(properties.allowNew){
                                defaults.tags = true;
                            }
                            if(properties.modal !== null){
                                defaults.dropdownParent = properties.modal;
                            }
                            if(typeof properties.callback.format === 'function'){
                                defaults.templateResult = properties.callback.format;
                            }
                            field.select2 = field.input.select.select2(defaults);
                        }
                        field.input.val = function(value = null){
                            if(value !== null && value !== field.input.select.val()){
                                field.input.select.val(value).trigger('change');
                            }
                            return field.input.select.val();
                        }
                        field.init();
                        field.input.val(properties.value);
                        // Execute onChange
                        field.input.select.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'rating':
                    case 'status':
                    case 'priority':
                        properties.callback.format = function(option, component){

                            // Check if the option is a placeholder
                            if (!option.id) { return option.text; }

                            // Retrieve the rating
                            let targetData = {
                                label: 'Unknown',
                                color: 'secondary',
                                icon: 'question',
                            };
                            switch(properties.type){
                                case 'rating':
                                    targetData = self._builder.Rating.get(properties.target,option.id);
                                    break;
                                case 'status':
                                    targetData = self._builder.Status.get(properties.target,option.id);
                                    break;
                                case 'priority':
                                    targetData = self._builder.Priority.get(properties.target,option.id);
                                    break;
                            }

                            // Create the option
                            var $option = $('<div class="px-3 py-2 animate-flicker-hover text-bg-'+targetData.color+'" style="margin: -.375rem -.75rem!important;"><i class="me-1 bi bi-'+targetData.icon+'"></i>'+targetData.label+'</div>');

                            // Return the option
                            return $option;
                        };
                    case 'source':
                    case 'type':
                        switch(properties.type){
                            case 'rating':
                                properties.targetTable = 'ratings';
                                break;
                            case 'status':
                                properties.targetTable = 'statuses';
                                break;
                            case 'priority':
                                properties.targetTable = 'priorities';
                                break;
                            case 'source':
                                properties.targetTable = 'sources';
                                break;
                            case 'type':
                                properties.targetTable = 'types';
                                break;
                        }
                        field.input = {};
                        field.input.select = $(document.createElement('select')).attr({
                            'id': field.id + 'input',
                            'class': 'form-select flex-grow-1',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).appendTo(field.group);
                        if(properties.multiple){
                            field.input.select.attr('multiple',true);
                            field.input.select.attr('name','[]' + properties.name);
                        }
                        field.options = {};
                        field.delete = function(id = null){
                            if(id){
                                if(typeof field.options[id] !== 'undefined'){
                                    field.options.remove();
                                    delete field.options[id];
                                }
                            } else {
                                for(const [key, element] of Object.entries(field.options)){
                                    element.remove();
                                    delete field.options[key];
                                }
                            }
                        };
                        field.add = function(id,text){
                            if(typeof field.options[id] === 'undefined'){
                                field.options[id] = $(document.createElement('option')).attr('value',id).text(text).appendTo(field.input.select);
                            }
                        }
                        for(const [key, option] of Object.entries(self._builder.Option.get(properties.targetTable,properties.target))){
                            field.add(option.id,option.text);
                        }
                        field.init = function(){
                            let defaults = {
                                theme: "bootstrap-5",
                                width: 'calc(100% - ' + field.label.outerWidth() + 'px)'
                            }
                            if(properties.multiple){
                                defaults.allowClear = true;
                            }
                            if(properties.allowNew){
                                defaults.tags = true;
                            }
                            if(properties.modal !== null){
                                defaults.dropdownParent = properties.modal;
                            }
                            if(typeof properties.callback.format === 'function'){
                                defaults.templateResult = properties.callback.format;
                            }
                            field.select2 = field.input.select.select2(defaults);
                        }
                        field.input.val = function(value = null){
                            if(value !== null && value !== field.input.select.val()){
                                field.input.select.val(value).trigger('change');
                            }
                            return field.input.select.val();
                        }
                        field.init();
                        field.input.val(properties.value);
                        // Execute onChange
                        field.input.select.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'country':
                    case 'state':
                        switch(properties.type){
                            case 'country':
                                properties.targetTable = 'countries';
                                break;
                            case 'state':
                                properties.targetTable = 'states';
                                break;
                        }
                        field.input = {};
                        field.input.select = $(document.createElement('select')).attr({
                            'id': field.id + 'input',
                            'class': 'form-select flex-grow-1',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).appendTo(field.group);
                        if(properties.multiple){
                            field.input.select.attr('multiple',true);
                            field.input.select.attr('name','[]' + properties.name);
                        }
                        field.options = {};
                        field.delete = function(id = null){
                            if(id){
                                if(typeof field.options[id] !== 'undefined'){
                                    field.options.remove();
                                    delete field.options[id];
                                }
                            } else {
                                for(const [key, element] of Object.entries(field.options)){
                                    element.remove();
                                    delete field.options[key];
                                }
                            }
                        };
                        field.add = function(id,text){
                            if(typeof field.options[id] === 'undefined'){
                                field.options[id] = $(document.createElement('option')).attr('value',id).text(text).appendTo(field.input.select);
                            }
                        }
                        if(properties.type === 'country'){
                            for(const [key, option] of Object.entries(self._builder.Option.get(properties.targetTable))){
                                field.add(option.id,option.text);
                            }
                        }
                        if(properties.type === 'state' && typeof self._inputs.country !== 'undefined'){
                            for(const [key, option] of Object.entries(self._builder.Option.get(properties.targetTable,self._inputs.country.val()))){
                                field.add(option.id,option.text);
                            }
                        }
                        field.init = function(){
                            let defaults = {
                                theme: "bootstrap-5",
                                width: 'calc(100% - ' + field.label.outerWidth() + 'px)'
                            }
                            if(properties.multiple){
                                defaults.allowClear = true;
                            }
                            if(properties.allowNew){
                                defaults.tags = true;
                            }
                            if(properties.modal !== null){
                                defaults.dropdownParent = properties.modal;
                            }
                            if(typeof properties.callback.format === 'function'){
                                defaults.templateResult = properties.callback.format;
                            }
                            field.select2 = field.input.select.select2(defaults);
                        }
                        field.input.val = function(value = null){
                            if(value !== null && value !== field.input.select.val()){
                                field.input.select.val(value).trigger('change');
                            }
                            return field.input.select.val();
                        }
                        field.init();
                        field.input.val(properties.value);
                        // Execute onChange
                        field.input.select.on('input change keyup',function(){
                            if(properties.type === 'country' && typeof self._inputs.state !== 'undefined'){
                                self._inputs.state.delete();
                                for(const [key, option] of Object.entries(self._builder.Option.get('states',field.input.val()))){
                                    self._inputs.state.add(option.id,option.text);
                                }
                            }
                            self.onChange();
                        });
                        break;
                    case 'tags':
                    case 'industries':
                        field.input = {};
                        field.input.select = $(document.createElement('select')).attr({
                            'id': field.id + 'input',
                            'class': 'form-select flex-grow-1',
                            'name': properties.name,
                            'autocomplete': 'off',
                        }).appendTo(field.group);
                        field.input.select.attr('multiple',true);
                        field.input.select.attr('name','[]' + properties.name);
                        field.options = {};
                        field.delete = function(id = null){
                            if(id){
                                if(typeof field.options[id] !== 'undefined'){
                                    field.options.remove();
                                    delete field.options[id];
                                }
                            } else {
                                for(const [key, element] of Object.entries(field.options)){
                                    element.remove();
                                    delete field.options[key];
                                }
                            }
                        };
                        field.add = function(id,text){
                            if(typeof field.options[id] === 'undefined'){
                                field.options[id] = $(document.createElement('option')).attr('value',id).text(text).appendTo(field.input.select);
                            }
                        }
                        for(const [key, option] of Object.entries(self._builder.Option.get(properties.type))){
                            field.add(option.id,option.text);
                        }
                        field.init = function(){
                            let defaults = {
                                theme: "bootstrap-5",
                                width: 'calc(100% - ' + field.label.outerWidth() + 'px)'
                            }
                            defaults.allowClear = true;
                            if(properties.allowNew){
                                defaults.tags = true;
                            }
                            if(properties.modal !== null){
                                defaults.dropdownParent = properties.modal;
                            }
                            if(typeof properties.callback.format === 'function'){
                                defaults.templateResult = properties.callback.format;
                            }
                            field.select2 = field.input.select.select2(defaults);
                        }
                        field.input.val = function(value = null){
                            if(value !== null && value !== field.input.select.val()){
                                field.input.select.val(value).trigger('change');
                            }
                            return field.input.select.val();
                        }
                        field.init();
                        field.input.val(properties.value);
                        // Execute onChange
                        field.input.select.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'range':
                        if(properties.value === null){
                            properties.value = properties.min;
                        }
                        field.input = $(document.createElement('div')).addClass('tooltip-range form-control border border-start-0 rounded-end flex-grow-1 px-2 d-flex align-items-center').appendTo(field.group);
                        field.input.range = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-range',
                            'type': properties.type,
                            'step': properties.step,
                            'value': properties.value,
                            'min': properties.min,
                            'max': properties.max,
                        }).appendTo(field.input);
                        field.input.output = $(document.createElement('output')).attr({
                            'for': field.id + 'input',
                        }).appendTo(field.input);
                        if(properties.options !== null && typeof properties.options === "object" && typeof properties.options[properties.value] !== "undefined"){
                            field.input.output.html(properties.options[properties.value]);
                        } else {
                            field.input.output.html(properties.value);
                        }
                        field.input.range.on('input',function(){
                            if(properties.options !== null && typeof properties.options === "object" && typeof properties.options[field.input.range.val()] !== "undefined"){
                                field.input.output.html(properties.options[field.input.range.val()]);
                            } else {
                                field.input.output.html(field.input.range.val());
                            }
                        });
                        field.input.val = function(value = null){
                            if(value !== null){
                                field.input.range.val(value);
                                field.input.range.trigger('input');
                            }

                            return field.input.range.val();
                        };
                        // Execute onChange
                        field.input.range.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'switch':
                        field.input = $(document.createElement('div')).addClass('form-control form-check form-switch m-0 px-2 border border-start-0 rounded-end flex-grow-1 d-flex align-items-center').appendTo(field.group);
                        field.input.switch = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-check-input m-0',
                            'type': 'checkbox',
                            'role': 'switch',
                            'value': properties.value,
                            'style': 'height: 24px;',
                        }).appendTo(field.input);
                        field.input.val = function(value = null){
                            if(value !== null){
                                if(value){
                                    field.input.switch.attr('value',true);
                                    field.input.switch.attr('checked','checked');
                                } else {
                                    field.input.switch.attr('value',false);
                                    field.input.switch.removeAttr('checked');
                                }
                            }

                            return field.input.switch.prop('checked');
                        };
                        field.input.val(properties.value);
                        field.input.switch.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'file':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': properties.type,
                            'value': properties.value,
                        }).appendTo(field.group);

                        // Check if multiple files are allowed
                        if(properties.multiple){
                            field.input.attr('multiple',true);
                            field.input.attr('name','[]' + properties.name);
                        }

                        // Execute onChange
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });

                        // Create a Handler for the file input
                        field.input.val = function(){
                            return new Promise((resolve, reject) => {
                                // Initialize Values
                                let values = [];

                                // Retrieve the files
                                let files = field.input[0].files;

                                // Check if any file is selected
                                if (files.length === 0) {
                                    resolve(values);
                                    return;
                                }

                                // Function to read a single file
                                function readFile(file) {
                                    return new Promise((resolve, reject) => {
                                        let reader = new FileReader();
                                        reader.onload = function(e) {
                                            resolve({
                                                name: file.name,
                                                size: file.size,
                                                type: file.type,
                                                extension: file.name.split('.').pop(),
                                                content: e.target.result,
                                                icon: getFileIcon(file.name)
                                            });
                                        };
                                        reader.onerror = reject;
                                        reader.readAsDataURL(file);
                                    });
                                }

                                // Function to determine file icon based on extension
                                function getFileIcon(fileName) {
                                    let extension = fileName.split('.').pop().toLowerCase();
                                    switch(extension) {
                                        case 'pdf': return 'file-earmark-pdf';
                                        case 'doc':
                                        case 'docx': return 'file-earmark-word';
                                        case 'xls':
                                        case 'xlsx': return 'file-earmark-excel';
                                        case 'ppt':
                                        case 'pptx': return 'file-earmark-ppt';
                                        case 'zip':
                                        case 'rar': return 'file-earmark-zip';
                                        case 'jpg':
                                        case 'jpeg':
                                        case 'png':
                                        case 'gif':
                                        case 'tiff':
                                        case 'bmp':
                                        case 'webp': return 'file-earmark-image';
                                        case 'mp3':
                                        case 'wav':
                                        case 'wma':
                                        case 'ogg':
                                        case 'm4a': return 'file-earmark-music';
                                        case 'mp4':
                                        case 'avi':
                                        case 'mkv':
                                        case 'wmv':
                                        case 'mov': return 'file-earmark-play';
                                        case 'css':
                                        case 'less':
                                        case 'scss':
                                        case 'sass':
                                        case 'js':
                                        case 'json':
                                        case 'xml':
                                        case 'html':
                                        case 'htm':
                                        case 'php':
                                        case 'asp':
                                        case 'aspx':
                                        case 'jsp':
                                        case 'cfm': return 'file-earmark-code';
                                        case 'txt':
                                        case 'log':
                                        case 'csv':
                                        case 'tsv': return 'file-earmark-text';
                                        case 'msg':
                                        case 'eml': return 'envelope-at';
                                        default: return 'file-earmark';
                                    }
                                }

                                // Read all files
                                let promises = [];
                                for (let i = 0; i < files.length; i++) {
                                    promises.push(readFile(files[i]));
                                }

                                // Resolve all promises
                                Promise.all(promises).then(fileData => {
                                    resolve(fileData);
                                }).catch(error => {
                                    reject(error);
                                });
                            });
                        };
                        break;
                    case 'phone-international':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: "+9 (999) 999-9999[ x9{1,8}]",
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'phone-extension':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: "(999) 999-9999[ x9{1,8}]",
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'phone':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: ["(999) 999-9999", "+9 (999) 999-9999"],
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'stopwatch':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: ["99:99", "99:99:99"],
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'zipcode':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: ["99999", "A9A 9A9"],
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'ca-tax':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: ["999999999RC9999"],
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'ca-gst':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: ["999999999RT9999"],
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    case 'ca-importer':
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': 'text',
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.inputmask({
                            mask: ["999999999RM9999"],
                            placeholder: " ",
                            greedy: false,
                            showMaskOnHover: false,
                            showMaskOnFocus: true
                        });
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                    default:
                        field.input = $(document.createElement('input')).attr({
                            'id': field.id + 'input',
                            'class': 'flex-grow-1 form-control',
                            'name': properties.name,
                            'autocomplete': 'off',
                            'type': properties.type,
                            'value': properties.value,
                        }).appendTo(field.group);
                        field.input.on('input change keyup',function(){
                            self.onChange();
                        });
                        break;
                }

                // Set Input Class
                if(this._properties.class.input){
                    field.input.addClass(this._properties.class.input);
                }
                if(properties.class.input){
                    field.input.addClass(properties.class.input);
                }

                // Set Name
                field.name = properties.name;

                // Val method
                field.val = function(param1 = null){

                    // Set Value
                    if(param1 !== null){

                        // Set Value
                        field.input.val(param1);
                    }

                    // Return Value
                    return field.input.val();
                }

                // Clear method
                field.clear = function(){
                    field.input.val('');
                }

                // Reset method
                field.reset = function(){
                    field.input.val(field.properties.value);
                }

                // Store Input
                this._inputs[field.name] = field;

                // Check for icon
                if(field.properties.icon === null){
                    field.label.icon.remove();
                }

                // Callback
                if(typeof callback === 'function'){
                    callback(field, self);
                }

                // Set Search
                this._builder.Search.set(field);

                // Execute onChange
                self.onChange();

                // Return Field
                return field;
            };
        },
        calendar: class extends this.ComponentClass {

            #events = {};

            _init(){
                this._properties = {
                    themeSystem: 'bootstrap5',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    height: 'auto',
                    initialDate: null,
                    initialView: 'dayGridMonth',
                    selectable: false,
                    editable: false,
                    eventDragMinDistance: 0,
                    class: {
                        component: null,
                        calendar: null,
                        header: null,
                    },
                    callback: {
                        dateClick: function(info) {},
                        select: function(info) {},
                        eventClick: function(info) {},
                        eventMouseEnter: function(info) {},
                        eventMouseLeave: function(info) {},
                        eventDrop: function(info) {},
                        eventResize: function(info) {},
                        eventDidMount: function(info) {},
                    },
                    events: [],
                    properties: {
                        start: null,
                        end: null,
                        allDay: false,
                        isBackground: false,
                        color: null,
                        icon: null,
                        title: null,
                        description: null,
                        popover: true,
                        callback: {
                            click: function(info) {},
                            mouseEnter: function(info) {},
                            mouseLeave: function(info) {},
                            drop: function(info) {},
                            resize: function(info) {},
                        },
                    },
                };
            }

            _config(name,options){
                if(typeof this._properties[name] !== 'undefined'){
                    switch(name){
                        case'headerToolbar':
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
                    'id': 'calendar' + this._id,
                    'class': '',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }

                // Set intialDate
                if(this._properties.initialDate === null){
                    this._properties.initialDate = new Date();
                }

                // Set Options
                this._component.properties = {
                    themeSystem: this._properties.themeSystem,
                    headerToolbar: this._properties.headerToolbar,
                    initialDate: this._properties.initialDate,
                    initialView: this._properties.initialView,
                    selectable: this._properties.selectable,
                    editable: this._properties.editable,
                    height: this._properties.height,
                    eventDragMinDistance: this._properties.eventDragMinDistance,
                    dateClick: function(info) { self.#dateClick(info); },
                    select: function(info) { self.#select(info); },
                    eventClick: function(info) { self.#eventClick(info); },
                    eventMouseEnter: function(info) { self.#eventMouseEnter(info); },
                    eventMouseLeave: function(info) { self.#eventMouseLeave(info); },
                    eventDrop: function(info) { self.#eventDrop(info); },
                    eventResize: function(info) { self.#eventResize(info); },
                    eventDidMount: function(info) { self.#eventDidMount(info); },
                    eventContent: function(arg) { return self.#eventContent(arg); },
                };
            }

            _timeout(){

                // Set Self
                const self = this;

                // Create Calendar
                this._component.fullCalendar = new FullCalendar.Calendar(this._component[0], this._component.properties);

                // Set header Class
                setTimeout(function() {
                    if(self._properties.class.header){
                        self._component.find('.fc-header-toolbar').addClass(self._properties.class.header);
                    }
                }, 0);

                // Initialize Calendar
                this.render();

                // Add Events
                for(const [key, value] of Object.entries(this._properties.events)){
                    this.add(value);
                }

                // Add Event to Calendar on Sidebar Toggle
                $('#sidebarToggle').click(function(){
                    self._component.fullCalendar.render();
                });
            }

            render(){

                // Set Self
                const self = this;

                // Get all ancestors of the calendar element
                var ancestors = this._selector.parents();

                // Filter out only the collapsible ancestors
                var collapsibles = ancestors.filter(function() {
                    return $(this).hasClass('collapse');
                });

                // Listen for the shown.bs.collapse event on each collapsible ancestor
                collapsibles.on('shown.bs.collapse', function () {
                    // Call the updateSize method after the collapsible is shown
                    self._component.fullCalendar.updateSize();
                });

                // Render Calendar
                this._component.fullCalendar.render();

                setTimeout(function() {
                    // Call the updateSize method after the timeout
                    self._component.fullCalendar.updateSize();
                }, 0);
            }

            add(param1 = null, param2 = null){

                // Set Self
                const self = this;

                let options = {};
                let callback = null;

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

                let properties = {};

                // Configure Options
                for(const [key, value] of Object.entries(this._properties.properties)){
                    if(typeof properties[key] === 'undefined'){
                        properties[key] = value;
                    }
                }
                for(const [key, value] of Object.entries(options)){
                    if(typeof properties[key] !== 'undefined'){
                        switch(key){
                            case"callback":
                                if(typeof properties[key] !== 'undefined'){
                                    for(const [k, v] of Object.entries(value)){
                                        if(typeof properties[key][k] !== 'undefined'){
                                            properties[key][k] = v;
                                        }
                                    }
                                }
                                break;
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
                const EventID = this._count();

                // Set Event
                var event = {
                    title: properties.title,
                    start: properties.start,
                    end: properties.end,
                    allDay: properties.allDay,
                    id: EventID,
                };

                if(properties.color){
                    event.classNames = 'text-bg-' + properties.color + ' border-' + properties.color;
                }

                if(properties.icon){
                    event.extendedProps = {icon: properties.icon};
                }

                if(properties.isBackground){
                    event.display = 'background';
                }

                // Set Event
                this.#events[EventID] = {
                    id: EventID,
                    event: event,
                    properties: properties,
                    callback: properties.callback,
                };

                // Add Timeout
                setTimeout(function(){

                    // Add Event to Calendar
                    var calendarEvent = self._component.fullCalendar.addEvent(event);

                    // Set Calendar Event
                    self.#events[EventID].calEvent = calendarEvent;

                }, 0);
            }

            #dateClick(info){

                // Execute Callback
                if(typeof this._properties.callback.dateClick === 'function'){
                    this._properties.callback.dateClick(info,this);
                }
            }

            #select(info){

                // Execute Callback
                if(typeof this._properties.callback.select === 'function'){
                    this._properties.callback.select(info,this);
                }
            }

            #eventContent(arg) {
                let arrayOfDomNodes = [];

                let spacerElement = document.createElement('span');
                spacerElement.classList.add('ms-1');
                arrayOfDomNodes.push(spacerElement);

                if (arg.event.extendedProps.icon) {
                    let iconElement = document.createElement('i');
                    iconElement.classList.add('me-1','bi', 'bi-' + arg.event.extendedProps.icon);
                    arrayOfDomNodes.push(iconElement);
                }

                let titleElement = document.createElement('span');
                titleElement.innerText = arg.event.title;
                arrayOfDomNodes.push(titleElement);

                return { domNodes: arrayOfDomNodes };
            }

            #eventClick(info){
                const EventID = info.event._def.publicId;
                const EventName = {calendar: 'eventClick', event: 'click'};

                // Check if Event Exists
                if(typeof this.#events[EventID] !== 'undefined'){

                    const Event = this.#events[EventID];

                    // Execute Calendar Callback
                    if(typeof this._properties.callback[EventName.calendar] === 'function'){
                        this._properties.callback[EventName.calendar](Event,info,this);
                    }

                    // Execute Event Callback
                    if(typeof Event.callback[EventName.event] === 'function'){
                        Event.callback[EventName.event](Event,info,this);
                    }
                }
            }

            #eventMouseEnter(info){
                const EventID = info.event._def.publicId;
                const EventName = {calendar: 'eventMouseEnter', event: 'mouseEnter'};

                // Check if Event Exists
                if(typeof this.#events[EventID] !== 'undefined'){

                    const Event = this.#events[EventID];

                    // Execute Calendar Callback
                    if(typeof this._properties.callback[EventName.calendar] === 'function'){
                        this._properties.callback[EventName.calendar](Event,info,this);
                    }

                    // Execute Event Callback
                    if(typeof Event.callback[EventName.event] === 'function'){
                        Event.callback[EventName.event](Event,info,this);
                    }
                }
            }

            #eventMouseLeave(info){
                const EventID = info.event._def.publicId;
                const EventName = {calendar: 'eventMouseLeave', event: 'mouseLeave'};

                // Check if Event Exists
                if(typeof this.#events[EventID] !== 'undefined'){

                    const Event = this.#events[EventID];

                    // Execute Calendar Callback
                    if(typeof this._properties.callback[EventName.calendar] === 'function'){
                        this._properties.callback[EventName.calendar](Event,info,this);
                    }

                    // Execute Event Callback
                    if(typeof Event.callback[EventName.event] === 'function'){
                        Event.callback[EventName.event](Event,info,this);
                    }
                }
            }

            #eventDrop(info){
                const EventID = info.event._def.publicId;
                const EventName = {calendar: 'eventDrop', event: 'drop'};

                // Check if Event Exists
                if(typeof this.#events[EventID] !== 'undefined'){

                    const Event = this.#events[EventID];

                    // Execute Calendar Callback
                    if(typeof this._properties.callback[EventName.calendar] === 'function'){
                        this._properties.callback[EventName.calendar](Event,info,this);
                    }

                    // Execute Event Callback
                    if(typeof Event.callback[EventName.event] === 'function'){
                        Event.callback[EventName.event](Event,info,this);
                    }
                }
            }

            #eventResize(info){
                const EventID = info.event._def.publicId;
                const EventName = {calendar: 'eventResize', event: 'resize'};

                // Check if Event Exists
                if(typeof this.#events[EventID] !== 'undefined'){

                    const Event = this.#events[EventID];

                    // Execute Calendar Callback
                    if(typeof this._properties.callback[EventName.calendar] === 'function'){
                        this._properties.callback[EventName.calendar](Event,info,this);
                    }

                    // Execute Event Callback
                    if(typeof Event.callback[EventName.event] === 'function'){
                        Event.callback[EventName.event](Event,info,this);
                    }
                }
            }

            #eventDidMount(info){
                const EventID = info.event._def.publicId;
                const EventName = {calendar: 'eventDidMount', event: 'didMount'};

                // Check if Event Exists
                if(typeof this.#events[EventID] !== 'undefined'){

                    const Event = this.#events[EventID];

                    // Create Popover
                    if(Event.properties.popover){
                        // Create focus trigger
                        $(info.el).hover(function() {
                            $(this).trigger('focus');
                        });

                        // Create Popover
                        var title = $(document.createElement('span')).text(Event.properties.title);
                        if(Event.properties.icon){
                            title.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + Event.properties.icon).prependTo(title);
                        }
                        info.el.setAttribute('data-bs-toggle','popover');
                        info.el.setAttribute('data-bs-trigger','focus');
                        info.el.setAttribute('data-bs-html','true');
                        info.el.setAttribute('data-bs-title',title.html());
                        info.el.setAttribute('data-bs-content',Event.properties.description);
                        const popover = bootstrap.Popover.getOrCreateInstance(info.el);
                    }

                    // Execute Calendar Callback
                    if(typeof this._properties.callback[EventName.calendar] === 'function'){
                        this._properties.callback[EventName.calendar](Event,info,this);
                    }

                    // Execute Event Callback
                    if(typeof Event.callback[EventName.event] === 'function'){
                        Event.callback[EventName.event](Event,info,this);
                    }
                }
            }
        },
    }

    #widgets = {
        template: class extends this.ComponentClass {

            _init(){
                this._properties = {};
            }

            _create(){

                // Set Self
                const self = this;

                // Create Component
                this._component = $(document.createElement('div')).attr({
                    'id': 'component' + this._id,
                    'class': '',
                });
                this._component.id = this._component.attr('id');

                // Set Component Class
                if(this._properties.class.component){
                    this._component.addClass(this._properties.class.component);
                }
            }
        },
    }
}
