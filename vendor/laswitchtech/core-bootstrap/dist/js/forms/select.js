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
                name: 'role', //Input Name
                label: 'Role', //Input Label
                icon: 'shield', //Input Icon
                type: 'select', //Input Type
                value: 'administrator', //Input Value
                options: [ //Input Options
                    {id:'administrator',text:'Administrator'},
                    {id:'moderator',text:'Moderator'},
                    {id:'user',text:'User'},
                ],
                multiple: true, //Multiple Inputs
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'text-bg-primary', //Label Element
                    field: null, //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('moderator'); // Sets Input Value
            },
        );

        form.reset(); // Resets Form
        form.val({role:'user'}); // Sets Form Value
        console.log(form.val()); // Returns Form Value
        form.submit(); // Submits Form
    },
);
