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
            clear: function(form){}, //Clear Callback
        },
    },
    function(form,component){ //Callback
        form.add( //Add Inputs
            {
                name: 'rating', //Input Name
                label: 'Rating', //Input Label
                icon: 'star-half', //Input Icon
                type: 'range', //Input Type
                value: 1, //Input Value
                min: 1, //Input Minimum Value
                max: 5, //Input Maximum Value
                options: { //Range Options Labels
                    1:'Very Bad',
                    2:'Bad',
                    3:'OK',
                    4:'Good',
                    5:'Very Good',
                },
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'text-bg-primary', //Label Element
                    field: null, //Field Element
                },
            },
            function(input,form){
                // console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val(3); // Sets Input Value
            },
        );

        form.reset(); // Resets Form
        form.val({rating:5}); // Sets Form Value
        // console.log(form.val()); // Returns Form Value
        form.submit(); // Submits Form
    },
);
