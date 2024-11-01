$(document).ready(function(){

    // Sample Data
    const records = [
        {name:'Airi Satou',position:'Accountant',office:'Tokyo',age:'33'},
        {name:'Angelica Ramos',position:'Chief Executive Officer (CEO)',office:'London',age:'47'},
        {name:'Ashton Cox',position:'Junior Technical Author',office:'San Francisco',age:'66'},
        {name:'Bradley Greer',position:'Software Engineer',office:'London',age:'41'},
        {name:'Brenden Wagner',position:'Software Engineer',office:'San Francisco',age:'28'},
        {name:'Brielle Williamson',position:'Integration Specialist',office:'New York',age:'61'},
        {name:'Bruno Nash',position:'Software Engineer',office:'London',age:'38'},
        {name:'Caesar Vance',position:'Pre-Sales Support',office:'New York',age:'21'},
        {name:'Cara Stevens',position:'Sales Assistant',office:'New York',age:'46'},
        {name:'Cedric Kelly',position:'Senior Javascript Developer',office:'Edinburgh',age:'22'},
    ];

    // Search
    Search.scan(); //Scan search inputs

    // Card
    const resultsCard = new Card(
        "#results",
        {
            class: {
                container: "w-100",
                body: "p-0",
            },
            icon: "search",
            title: "Results",
        },
        function(card){
            // Table
            const resultsTable = new Table(
                card.body,
                {
                    class: {
                        buttons: "px-4 pt-4",
                        table: "border-top",
                        footer: "px-4 pt-2 pb-4",
                    },
                    showButtonsLabel: false,
                    datatable:{
                        columnDefs:[
                            { target: 0, visible: true, responsivePriority: 1, title: 'Name', name: 'name', data: 'name' },
                            { target: 1, visible: true, responsivePriority: 1000, title: 'Position', name: 'position', data: 'position' },
                            { target: 2, visible: true, responsivePriority: 1000, title: 'Office', name: 'office', data: 'office' },
                            { target: 3, visible: true, responsivePriority: 2, title: 'Age', name: 'age', data: 'age' },
                        ],
                    },
                    actions:{
                      details:{
                        label:'Details',
                        icon:'eye',
                        action:function(event, table, node, row, data){},
                      },
                    },
                    dblclick:function(event, table, node, data){},
                },
                function(table){
                    for(const [key, record] of Object.entries(records)){
                        table.add(record);
                    }
                }, 
            );
        },
    );
});