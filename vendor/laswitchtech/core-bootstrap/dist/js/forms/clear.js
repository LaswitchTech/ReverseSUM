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
            submit: function(form){}, //Submit Callback
            val: function(form){}, //Val Callback
            reset: function(form){}, //Reset Callback
            clear: function(form){ //Clear Callback
                console.log(form.val()); // Returns Form Value
            },
        },
    },
    function(form,component){ //Callback
        form.add( //Add Inputs
            {
                name: 'clear', //Input Name
                label: 'Clear', //Input Label
                icon: 'x-lg', //Input Icon
                type: 'clear', //Input Type
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
                input.val('30'); // Sets Input Value
            },
        );

        form.reset(); // Resets Form
        form.clear(); // Clears Form
        form.val({clear:'300'}); // Sets Form Value
        console.log(form.val()); // Returns Form Value
        form.submit(); // Submits Form
    },
);
