// Builder
const sampleBuilder = new Builder();

// Component
const sampleComponent = sampleBuilder.Component(
    "table", //Component Name
    "#example", //Selector or JQuery Object to appendTo
    {
        class: { //Classes
            buttons: "px-4 pt-4", //Buttons
            table: "border-top", //Table
            footer: "px-4 pt-2 pb-4", //Footer
        },
        showButtonsLabel: true, //Show Buttons Label
        selectTools:true, //Select Tools
        actions:{ //Actions, These are the buttons that appear in the table's action column
          remove:{
            label:'Remove',
            icon:'trash',
            action:function(event, table, node, row, data){
              table.delete(row);
            },
          },
        },
        datatable:{ //Datatable options
            columnDefs:[
                { target: 0, visible: true, responsivePriority: 1, title: 'ID', name: 'id', data: 'id' },
                { target: 1, visible: true, responsivePriority: 1000, title: 'Category', name: 'category', data: 'category' },
                { target: 2, visible: true, responsivePriority: 1000, title: 'Sub-Category', name: 'subCategory', data: 'subCategory' },
                { target: 3, visible: true, responsivePriority: 2, title: 'Subject', name: 'subject', data: 'subject' },
            ],
            buttons:[
                {
                    text: '<i class=\'bi-plus-lg\'></i>',
                    action:function(e, dt, node, config){
                        console.log(e, dt, node, config);
                        dt.row.add(sampleRecordsTickets[sampleBuilder.Helper.randomNumber(0,9)]).draw();
                    },
                }
            ],
        },
    },
    function(table,component){ //Callback
        for(const [key, record] of Object.entries(sampleRecordsTickets)){
            table.add(record); //Add record to table
        }
    },
);
