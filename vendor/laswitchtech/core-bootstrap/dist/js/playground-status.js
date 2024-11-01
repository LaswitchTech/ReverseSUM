class UtilityClass  {

    _builder = null;
    _id = null;

    constructor(builder){

        // Set Builder
        this._builder = builder;

        // Generate Incremental ID
        this._id = this._builder.count();
    }
}

class StatusUtility extends UtilityClass {

    #statuses = {};
    #locale = 'en-ca';
    #default = 'en-ca';
    _callback = null;

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
        for(const [key, value] of Object.entries(['type','locale','label','description','icon','color','level'])){

            // Check if field is set
            if(typeof status[value] === 'undefined'){
                console.log('Missing Field: '+value);
                return;
            }
        }

        // Check if locale is set
        if(typeof self.#statuses[status.locale] === 'undefined'){
            self.#statuses[status.locale] = {};
        }

        // Check if type is set
        if(typeof self.#statuses[status.locale][status.type] === 'undefined'){
            self.#statuses[status.locale][status.type] = {};
        }

        // Set Value
        self.#statuses[status.locale][status.type][status.level] = {
            'type': status.type,
            'locale': status.locale,
            'label': status.label,
            'description': status.description,
            'icon': status.icon,
            'color': status.color,
            'level': status.level,
        };
    }

    set(locale){

        // Set Self
        const self = this;

        // Check if locale is set
        if(typeof locale === 'string'){
            self.#locale = locale;
        }
    }

    get(type, level, locale = null){

        // Set Self
        const self = this;

        // Set Locale
        if(locale === null || typeof self.#statuses[locale] === 'undefined'){
            locale = self.#locale;
        }

        // Check if locale, type and level are set
        if(typeof self.#statuses[locale] === 'undefined' || typeof self.#statuses[locale][type] === 'undefined' || typeof self.#statuses[locale][type][level] === 'undefined'){

            // Check if callback is set
            if(typeof self._callback === 'function'){
                self._callback(type, locale, level);
            }

            // Check if local is different from default
            if(locale !== self.#default){

                // Check if default locale, type and level are set
                if(typeof self.#statuses[self.#default] === 'undefined' || typeof self.#statuses[self.#default][type] === 'undefined' || typeof self.#statuses[self.#default][type][level] === 'undefined'){

                    // Check if callback is set
                    if(typeof self._callback === 'function'){
                        self._callback(type, self.#default, level);
                    }

                    // Return Empty Status
                    return {
                        'type': null,
                        'locale': null,
                        'label': null,
                        'description': null,
                        'icon': null,
                        'color': null,
                        'level': null,
                    };
                } else {

                    // Return Status
                    return self.#statuses[self.#default][type][level];
                }
            } else {

                // Return Empty Status
                return {
                    'type': null,
                    'locale': null,
                    'label': null,
                    'description': null,
                    'icon': null,
                    'color': null,
                    'level': null,
                };
            }
        } else {

            // Return Status
            return self.#statuses[locale][type][level];
        }
    }

    badge(type, level, locale = null){

        // Set Self
        const self = this;

        // Get Status
        const status = self.get(type, level, locale);

        // Create Badge
        var badge = $(document.createElement('span'))
            .attr({
                'class': 'cursor-help badge',
            });

        // Check if label is set
        if(status.label !== null){

            // Set Label
            badge.text(status.label);
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

        // Check if Locale is set
        if(status.locale !== null){

            // Set Locale
            badge.attr('data-locale', status.locale);
        }

        // Check if Type is set
        if(status.type !== null){

            // Set Type
            badge.attr('data-type', status.type);
        }

        // Check if Level is set
        if(status.level !== null){

            // Set Level
            badge.attr('data-level', status.level);
        }

        // Return Badge
        return badge;
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
                let type = parts[1];
                let level = parts[2];

                if(utility === 'status'){

                    // Get Status
                    let status = self.badge(type, level, locale);

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
}

$(document).ready(function(){

    // Create Component
    Utility = new StatusUtility(builder);

    // Loop through each status
    for(const [key, status] of Object.entries([
        {type: 'leads',locale: 'en-ca',label: 'New',description: "The lead has been created but no action has been taken yet. It is in the initial stage and is yet to be worked on.",icon: 'stars',color: 'success',level: 1},
        {type: 'leads',locale: 'en-ca',label: 'Open',description: "The lead has been opened but no action has been taken yet. It is in the initial stage and is yet to be worked on.",icon: 'folder',color: 'primary',level: 2},
        {type: 'leads',locale: 'en-ca',label: 'Assign',description: "The lead is ready to be assigned to a specific team member or representative who will be responsible for following up and managing the lead.",icon: 'person-check',color: 'primary',level: 3},
        {type: 'leads',locale: 'en-ca',label: 'Analysis',description: "The lead needs to be analyzed by the assigned team member or representative. The analysis is so that the team member or representative can learn about the prospect.",icon: 'eyeglasses',color: 'purple',level: 4},
        {type: 'leads',locale: 'en-ca',label: 'Contact',description: "The lead is ready to be contacted by the assigned team member or representative. This contact is meant to make the initial presentation of the services.",icon: 'easel2',color: 'blue',level: 5},
        {type: 'leads',locale: 'en-ca',label: 'Firm Report',description: "The lead showed interest in the services. We now need to setup an Authorization Letter to request the prospect's history of customs entries.", icon: 'file-earmark-spreadsheet',color: 'pink',level: 6},
        {type: 'leads',locale: 'en-ca',label: 'Agreement',description: "A firm report has been obtained and analyzed by a consultant. We are ready to prepare an offer and sign an agreement.",icon: 'vextor-pen',color: 'info',level: 7},
        {type: 'leads',locale: 'en-ca',label: 'Allocate',description: "The agreement has been signed by the prospect. We are now ready to start the process of customs claims.",icon: 'person-check-fill',color: 'warning',level: 8},
        {type: 'leads',locale: 'en-ca',label: 'in Progress',description: "The lead is in the process of customs claims. The process is being handled by the assigned team member or representative.",icon: 'arrow-repeat',color: 'orange',level: 9},
        {type: 'leads',locale: 'en-ca',label: 'Completed',description: "The customs claims process has been completed. The lead is now closed and the process is finished.",icon: 'check-circle',color: 'success',level: 10},
        {type: 'leads',locale: 'en-ca',label: 'Archived',description: "The lead has been archived. It is no longer active and has been moved to the archive folder.",icon: 'archive',color: 'dark',level: 11},
    ])){

        // Save Status
        Utility.save(status);
    }

    // Setup a Callback for Missing Strings
    Utility._callback = function(type, locale, level){
        console.log('Missing Status: '+type+' ['+locale+'] ['+level+']');
    }

    // Get a Status Badge
    $(document.createElement('div'))
        .append(Utility.badge('leads', 4))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[leads] [4]'))
        .appendTo('#playground')

    // Get an unknown Status Badge
    $(document.createElement('div'))
        .append(Utility.badge('prospects', 1))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[prospects] [1]'))
        .appendTo('#playground')

    // Set Locale to fr-ca
    Utility.set('fr-ca');

    // Get a Status Badge (fr-ca)
    $(document.createElement('div'))
        .append(Utility.badge('leads', 4))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[leads] [4]'))
        .appendTo('#playground')

    // Get an unknown Status Badge
    $(document.createElement('div'))
        .append(Utility.badge('prospects', 1))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[prospects] [1]'))
        .appendTo('#playground')

    // Set Locale to en-ca
    Utility.set('en-ca');

    // Parse a Status Badge
    $(document.createElement('div'))
        .append(Utility.parse('Parsing [[status:leads:4]]'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[[status:leads:4]]'))
        .appendTo('#playground')
});
