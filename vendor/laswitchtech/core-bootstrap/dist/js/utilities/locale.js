// Builder
const sampleBuilder = new Builder();

// Save Locale
for(const [locale, data] of Object.entries({
    'en-ca':{'hello':'Hello World'},
    'fr-ca':{'hello':'Bonjour le monde'},
})){

    // Save Locale
    sampleBuilder.Locale.save(locale, data);
}

// Extend Locale
sampleBuilder.Locale.save('en-ca', {
    'goodbye': 'Goodbye World',
});

// Setup a Callback for Missing Strings
sampleBuilder.Locale._callback = function(key, locale){
    console.log('['+locale+'] Missing String: '+key);
}

// Get Current Locale
$(document.createElement('div'))
    .prepend($(document.createElement('span')).addClass('mx-1').text('Current: '+sampleBuilder.Locale.current()))
    .appendTo('#example')

// Get Locale String (Default)
$(document.createElement('div'))
    .text(sampleBuilder.Locale.get('hello'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('[hello]'))
    .appendTo('#example')

// Get Locale String (fr-ca)
$(document.createElement('div'))
    .text(sampleBuilder.Locale.get('hello','fr-ca'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('[hello]'))
    .appendTo('#example')

// Set Locale
sampleBuilder.Locale.set('fr-ca');
$(document.createElement('div'))
    .prepend($(document.createElement('span')).addClass('mx-1').text('Current: '+sampleBuilder.Locale.current()))
    .appendTo('#example')

// Get Locale String (Default)
$(document.createElement('div'))
    .text(sampleBuilder.Locale.get('hello'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('[hello]'))
    .appendTo('#example')

// Get Locale String (unknown fr-ca)
$(document.createElement('div'))
    .text(sampleBuilder.Locale.get('goodbye'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('[goodbye]'))
    .appendTo('#example')

// Get Locale String (unknown all)
$(document.createElement('div'))
    .text(sampleBuilder.Locale.get('unknown'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('[unknown]'))
    .appendTo('#example')

// Set Locale
sampleBuilder.Locale.set('en-ca');
$(document.createElement('div'))
    .prepend($(document.createElement('span')).addClass('mx-1').text('Current: '+sampleBuilder.Locale.current()))
    .appendTo('#example')

// Get Locale String (unknown)
$(document.createElement('div'))
    .text(sampleBuilder.Locale.get('goodbye'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('[goodbye]'))
    .appendTo('#example')

// Get Locale String (unknown all)
$(document.createElement('div'))
    .text(sampleBuilder.Locale.get('unknown'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('[unknown]'))
    .appendTo('#example')
// Parse String
$(document.createElement('div'))
    .text(sampleBuilder.Locale.parse('Parsing a string {{hello}}'))
    .prepend($(document.createElement('strong')).addClass('mx-1').text('Parsing a string {{hello}}'))
    .appendTo('#example')

