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
            reset: function(form){ //Reset Callback
                console.log(form.val()); // Returns Form Value
            },
            clear: function(form){ //Clear Callback
                console.log(form.val()); // Returns Form Value
            },
        },
    },
    function(form,component){ //Callback
        form.add( //Add Inputs
            {
                name: 'username', //Input Name
                label: 'Username', //Input Label
                icon: 'person', //Input Icon
                type: 'text', //Input Type
                value: 'john.doe@domain.com', //Input Value
                options: null, //Input Options
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'text-bg-primary', //Label Element
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('jane.doe@domain.com'); // Sets Input Value
            },
        );
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
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'text-bg-dark', //Label Element
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('moderator'); // Sets Input Value
            },
        );
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
                    label: 'text-bg-info', //Label Element
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'); // Sets Input Value
            },
        );
        form.add( //Add Inputs
            {
                name: 'bio', //Input Name
                label: 'Bio', //Input Label
                icon: 'code', //Input Icon
                type: 'ide', //Input Type
                value: "# Lorem Ipsum\n\nNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...", //Input Value
                options: null, //Input Options
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'text-bg-warning', //Label Element
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('# Lorem Ipsum\n\nNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'); // Sets Input Value
            },
        );
        form.add( //Add Inputs
            {
                name: 'brief', //Input Name
                label: 'Brief', //Input Label
                icon: 'person-lines-fill', //Input Icon
                type: 'mce', //Input Type
                value: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...", //Input Value
                options: null, //Input Options
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'text-bg-danger', //Label Element
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'); // Sets Input Value
            },
        );
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
                    label: 'text-bg-success', //Label Element
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                // console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val(3); // Sets Input Value
            },
        );
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
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('100'); // Sets Input Value
            },
        );
        form.add( //Add Inputs
            {
                name: 'reset', //Input Name
                label: 'Reset', //Input Label
                icon: 'arrow-clockwise', //Input Icon
                type: 'reset', //Input Type
                value: null, //Input Value
                options: null, //Input Options
                class: { //Add Classes
                    input: null, //Input Element
                    label: 'w-100', //Label Element
                    field: 'mb-3', //Field Element
                },
            },
            function(input,form){
                console.log(input.val()); // Returns Input Value
                input.reset(); // Resets Input Value
                input.val('10'); // Sets Input Value
            },
        );
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
        form.val({ // Sets Form Value
            username:'jack.doe@domain.com',
            role:'user',
            description:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            bio:'# Lorem Ipsum\n\nNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            rating:5,
            clear:'200',
            reset:'20',
            submit:'2',
        });
        console.log(form.val()); // Returns Form Value
        form.submit(); // Submits Form
    },
);
