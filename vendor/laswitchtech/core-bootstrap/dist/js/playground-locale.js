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

class LocaleUtility extends UtilityClass {

    #locales = {};
    #locale = 'en-ca';
    #default = 'en-ca';
    _callback = null;

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
                if(typeof self.#locales[self.#default] === 'undefined' || typeof self.#locales[self.#default][key] === 'undefined'){

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

        // Set Matches {{key}}
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
}

$(document).ready(function(){

    // Create Component
    Utility = new LocaleUtility(builder);

    // Save Locale
    Utility.save('en-ca', {
        'hello': 'Hello World',
    });
    Utility.save('fr-ca', {
        'hello': 'Bonjour le monde',
    });

    // Extend Locale
    Utility.save('en-ca', {
        'goodbye': 'Goodbye World',
    });

    // Setup a Callback for Missing Strings
    Utility._callback = function(key, locale){
        console.log('Missing String: '+key+' ['+locale+']');
    }

    // Get Current Locale
    $(document.createElement('div'))
        .prepend($(document.createElement('span')).addClass('mx-1').text('Current: '+Utility.current()))
        .appendTo('#playground')

    // Get Locale String (Default)
    $(document.createElement('div'))
        .text(Utility.get('hello'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[hello]'))
        .appendTo('#playground')

    // Get Locale String (fr-ca)
    $(document.createElement('div'))
        .text(Utility.get('hello','fr-ca'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[hello]'))
        .appendTo('#playground')

    // Set Locale
    Utility.set('fr-ca');
    $(document.createElement('div'))
        .prepend($(document.createElement('span')).addClass('mx-1').text('Current: '+Utility.current()))
        .appendTo('#playground')

    // Get Locale String (Default)
    $(document.createElement('div'))
        .text(Utility.get('hello'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[hello]'))
        .appendTo('#playground')

    // Get Locale String (unknown fr-ca)
    $(document.createElement('div'))
        .text(Utility.get('goodbye'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[goodbye]'))
        .appendTo('#playground')

    // Get Locale String (unknown all)
    $(document.createElement('div'))
        .text(Utility.get('unknown'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[unknown]'))
        .appendTo('#playground')

    // Set Locale
    Utility.set('en-ca');
    $(document.createElement('div'))
        .prepend($(document.createElement('span')).addClass('mx-1').text('Current: '+Utility.current()))
        .appendTo('#playground')

    // Get Locale String (unknown)
    $(document.createElement('div'))
        .text(Utility.get('goodbye'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[goodbye]'))
        .appendTo('#playground')

    // Get Locale String (unknown all)
    $(document.createElement('div'))
        .text(Utility.get('unknown'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[unknown]'))
        .appendTo('#playground')
});
