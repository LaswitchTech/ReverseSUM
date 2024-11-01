// $(document).ready(function(){

//     // Sample
//     const sampleObject = new Accordion(
//         '#example', //Selector or JQuery Object to add click event to
//         {
//             class: { //Add Classes
//                 accordion: null, //Accordion Element
//                 item: null, //Accordion Item Element
//             },
//             defaults: { //Default Tab Options
//                 icon: null, //Add Icon
//                 title: null, //Add Title
//                 content: null, //Add Content
//             },
//         },
//         function(tabs){ // Callback Function
//             tabs.add( //Add tab to the navbar //Note: This function can be called multiple times to add multiple tabs. It can also called outside of the callback function.
//                 'tab1', //Name of the tab
//                 {
//                     class: { //Add Classes
//                         nav: null, //Nav Element
//                         tab: null, //Tab Element
//                     },
//                     icon: null, //Add Icon
//                     label: null, //Add Label
//                     callback: null, //Callback Function
//                 }, //Options
//                 function(tab,nav){ //Callback Function
//                     tab.text('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')
//                 },
//             );
//         },
//     );

//     // Code

//     let scriptCode = "";
//     scriptCode += "" + "\n";
    
//     const code = new Code(
//         '#code',
//         {
//             language: 'javascript',
//             title: 'Code',
//             clipboard:true,
//             fullscreen:true,
//             collapsed:true,
//             code:scriptCode,
//         },
//         function(element,code){}
//     );

//     let pretty = prettier.format($('#example').html(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
    
//     const html = new Code(
//         '#htmlcode',
//         {
//             language: 'markup',
//             title: 'Code',
//             clipboard:true,
//             fullscreen:true,
//             collapsed:true,
//             code:pretty,
//         },
//         function(element,code){}
//     );
// });