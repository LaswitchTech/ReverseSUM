// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "form", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class:{ //Add Classes
            component: null, //Component Element
            form: null, //Form Element
            input: null, //Input Element
            label: null, //Label Element
            field: null, //Field Element
        },
        callback:{ //Add Callbacks
            submit: function(form){ //Submit Callback
                console.log(form.val()); // Returns Form Value
            },
            val: function(form){}, //Val Callback
            reset: function(form){}, //Reset Callback
            clear: function(form){}, //Clear Callback
        },
    },
    function(form,component){ //Callback
        form.add( //Add Inputs
            {
                name: 'submit', //Input Name
                label: 'Submit', //Input Label
                icon: 'save', //Input Icon
                type: 'submit', //Input Type
                value: null, //Input Value
                options: null, //Input Options
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'w-100', //Label Element
                    field: null, //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('1'); // Sets Input Value
            },
        );

        form.reset(); // Resets Form
        form.val({submit:'2'}); // Sets Form Value
        console.log(form.val()); // Returns Form Value
        form.submit(); // Submits Form
    },
);
