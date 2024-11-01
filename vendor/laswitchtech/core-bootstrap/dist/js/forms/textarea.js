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
        },
    },
    function(form,component){ //Callback
        form.add( //Add Inputs
            {
                name: 'description', //Input Name
                label: 'Description', //Input Label
                icon: 'person-vcard', //Input Icon
                type: 'textarea', //Input Type
                value: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', //Input Value
                options: null, //Input Options
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'text-bg-primary', //Label Element
                    field: null, //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'); // Sets Input Value
            },
        );

        form.reset(); // Resets Form
        form.val({description:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'}); // Sets Form Value
        console.log(form.val()); // Returns Form Value
        form.submit(); // Submits Form
    },
);
