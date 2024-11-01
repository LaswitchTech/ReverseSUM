// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "carousel", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        fade: false, //Fade Effect
        touch: true, //Touch Support
        autoplay: 'carousel', //Autoplay //Note: This can be set to 'carousel', true or null
        indicators: true, //Indicators
        controls: true, //Controls
        properties: { //Default Slide Options
            class: { //Add Classes
                slide: null, //Slide Element
                image: null, //Slide Image Element
                caption: null, //Slide Caption Element
            },
            interval: null, //Slide Interval
            caption: null, //Slide Caption
            source: null, //Slide Image Source
            alt: null, //Slide Image Alt
        },
    },
    function(carousel,component){ //Callback
        carousel.add( //Add slide to the carousel //Note: This function can be called multiple times to add multiple slides. It can also called outside of the callback function.
            { //Options
                class: { //Add Classes
                    slide: null, //Slide Element
                    image: null, //Slide Image Element
                    caption: null, //Slide Caption Element
                },
                interval: null, //Slide Interval
                caption: '<h3>Mountain</h3>', //Slide Caption
                source: 'https://picsum.photos/id/235/1280/720/', //Slide Image Source
                alt: 'picsum', //Slide Image Alt
            },
            function(slide){}, //Callback Function
        );
        carousel.add( //Add slide to the carousel //Note: This function can be called multiple times to add multiple slides. It can also called outside of the callback function.
            { //Options
                class: { //Add Classes
                    slide: null, //Slide Element
                    image: null, //Slide Image Element
                    caption: null, //Slide Caption Element
                },
                interval: null, //Slide Interval
                caption: '<h3>Houses</h3>', //Slide Caption
                source: 'https://picsum.photos/id/236/1280/720/', //Slide Image Source
                alt: 'picsum', //Slide Image Alt
            },
            function(slide){}, //Callback Function
        );
        carousel.add( //Add slide to the carousel //Note: This function can be called multiple times to add multiple slides. It can also called outside of the callback function.
            { //Options
                class: { //Add Classes
                    slide: null, //Slide Element
                    image: null, //Slide Image Element
                    caption: null, //Slide Caption Element
                },
                interval: null, //Slide Interval
                caption: '<h3>Dog</h3>', //Slide Caption
                source: 'https://picsum.photos/id/237/1280/720/', //Slide Image Source
                alt: 'picsum', //Slide Image Alt
            },
            function(slide){}, //Callback Function
        );
    },
);
