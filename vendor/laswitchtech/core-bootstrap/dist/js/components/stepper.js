// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "stepper", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Add Classes
            stepper: null, //Stepper Element
            controls: 'card card-body my-2', //Stepper Controls Element
            steps: 'card card-body my-2', //Stepper Steps Element
            pagination: 'card card-body my-2', //Stepper Pagination Element
        },
        color: null, //Set Accent Color
        properties: { //Default Step Options
        },
    },
    function(stepper,component){ //Callback
        stepper.add( //Add step to the stepper //Note: This function can be called multiple times to add multiple steps. It can also called outside of the callback function.
            {}, //Options
            function(step){ //Callback Function
                console.log(step);
                step.content.html('<div class="p-5 bg-success rounded">Step 1</div>');
            },
        );
        stepper.add( //Add step to the stepper //Note: This function can be called multiple times to add multiple steps. It can also called outside of the callback function.
            {}, //Options
            function(step){  //Callback Function
                console.log(step);
                step.content.html('<div class="p-5 bg-warning rounded">Step 2</div>');
            },
        );
        stepper.add( //Add step to the stepper //Note: This function can be called multiple times to add multiple steps. It can also called outside of the callback function.
            {}, //Options
            function(step){  //Callback Function
                console.log(step);
                step.content.html('<div class="p-5 bg-danger rounded">Step 3</div>');
            },
        );
    },
);
