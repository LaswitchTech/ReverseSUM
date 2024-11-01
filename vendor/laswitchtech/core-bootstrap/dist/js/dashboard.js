$(document).ready(function() {

    // RGB Colors
    // primary: 82, 143, 179
    // info: 57, 203, 251
    // success: 65, 215, 167
    // warning: 255, 193, 7
    // danger: 238, 95, 91

    // Sales Chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Objective',
                    data: [65524.23,69190.92,98206.74,132016.41,30654],
                    backgroundColor: 'rgba(255, 193, 7, 1)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Profit',
                    data: [67329,133176,27425,142210,-700],
                    backgroundColor: 'rgba(65, 215, 167, 1)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Income',
                    data: [728047,768788,1091186,1466849,340600],
                    backgroundColor: 'rgba(82, 143, 179, 1)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#F8F9FA'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            return context.dataset.label + ': ' + value.toFixed(2) + ' $';
                        }
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        color: '#F8F9FA',
                    },
                    ticks: {
                        color: '#F8F9FA',
                    },
                },
                y: {
                    grid: {
                        color: '#F8F9FA',
                    },
                    ticks: {
                        color: '#F8F9FA',
                        callback: function(value, index, values) {
                            return value.toFixed(2) + ' $';
                        },
                    },
                    beginAtZero: true
                }
            }
        }
    });

    // Boxes
    // Bonus
    const badgeBonus = new Box(
        '#badgeBonus',
        {
            icon:'plus-slash-minus',
            color:'success',
        },
        function(badge){

            // Set Content
            var header = $(document.createElement('h5')).addClass('m-0').html('Bonus').appendTo(badge.content);
            var paragraph = $(document.createElement('p')).addClass('m-0').html('+ 1,352 $').appendTo(badge.content);
        }
    );
    // Tasks
    const badgeTasks = new Box(
        '#badgeTasks',
        {
            icon:'list-task',
            color:'primary',
        },
        function(badge){

            // Set Content
            var header = $(document.createElement('h5')).addClass('m-0').html('Tasks').appendTo(badge.content);
            var paragraph = $(document.createElement('p')).addClass('m-0').html('12').appendTo(badge.content);
        }
    );
    // Transactions
    const badgeTransactions = new Box(
        '#badgeTransactions',
        {
            icon:'file-earmark-post',
            color:'warning',
        },
        function(badge){

            // Set Content
            var header = $(document.createElement('h5')).addClass('m-0').html('Transactions').appendTo(badge.content);
            var paragraph = $(document.createElement('p')).addClass('m-0').html('43').appendTo(badge.content);
        }
    );
    // Tickets
    const badgeTickets = new Box(
        '#badgeTickets',
        {
            icon:'ticket-detailed',
            color:'danger',
        },
        function(badge){

            // Set Content
            var header = $(document.createElement('h5')).addClass('m-0').html('Open Tickets').appendTo(badge.content);
            var paragraph = $(document.createElement('p')).addClass('m-0').html('78').appendTo(badge.content);
        }
    );

    // Timeline
    const myTimeline = new Timeline('#timelineContainer',{
        class:{
            item:'border rounded',
        }
    });
    myTimeline.create(
        {
            icon:'person',
            color:'primary',
            type:'registration',
        },
        function(object,timeline){

            // Set Tools
            var deleteTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            deleteTool.i = $(document.createElement('i')).addClass('bi bi-trash me-1').appendTo(deleteTool);
            deleteTool.append('Delete');
            var editTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            editTool.i = $(document.createElement('i')).addClass('bi bi-pencil-square me-1').appendTo(editTool);
            editTool.append('Edit');

            // Set Content
            var header = $(document.createElement('div')).addClass('card-header border-0').appendTo(object.item);
            header.h5 = $(document.createElement('h5')).addClass('card-title').html("louis@laswitchtech.com has registered").appendTo(header);
        }
    );
    myTimeline.create(
        {
            icon:'bell',
            color:'danger',
            type:'alert',
        },
        function(object,timeline){

            // Set Tools
            var deleteTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            deleteTool.i = $(document.createElement('i')).addClass('bi bi-trash me-1').appendTo(deleteTool);
            deleteTool.append('Delete');
            var editTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            editTool.i = $(document.createElement('i')).addClass('bi bi-pencil-square me-1').appendTo(editTool);
            editTool.append('Edit');

            // Set Content
            var header = $(document.createElement('div')).addClass('card-header border-0').appendTo(object.item);
            header.h5 = $(document.createElement('h5')).addClass('card-title').html("louis@laswitchtech.com has been banned").appendTo(header);
        }
    );

    // Feed
    const myFeed = new Feed('#feedContainer',{
        class:{
            // item:'border rounded',
        },
        controls:{
            like:{
                icon:'hand-thumbs-up',
                label:'Like',
                callback:function(control,post,feed){},
            },
            share:{
                icon:'share',
                label:'Share',
                callback:function(control,post,feed){},
            },
            note:{
                icon:'sticky',
                label:'Note',
                callback:function(control,post,feed){},
            },
            comment:{
                icon:'chat-text',
                label:'Commments',
                callback:function(control,post,feed){},
            },
            edit:{
                icon:'pencil-square',
                color:'warning',
                label:'Edit',
                callback:function(control,post,feed){},
            },
            delete:{
                icon:'trash',
                color:'danger',
                label:'Delete',
                callback:function(control,post,feed){},
            },
        },
    });
    myFeed.post(
        {
            username:'louis@laswitchtech.com',
            content: 'Lorem ipsum 1',
        },
        function(post,feed){

            // // Set Tools
            // var deleteTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            // deleteTool.i = $(document.createElement('i')).addClass('bi bi-trash me-1').appendTo(deleteTool);
            // deleteTool.append('Delete');
            // var editTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            // editTool.i = $(document.createElement('i')).addClass('bi bi-pencil-square me-1').appendTo(editTool);
            // editTool.append('Edit');

            // // Set Content
            // var header = $(document.createElement('div')).addClass('card-header border-0').appendTo(object.item);
            // header.h5 = $(document.createElement('h5')).addClass('card-title').html("louis@laswitchtech.com has registered").appendTo(header);
        }
    );
    myFeed.post(
        {
            username:'louis@laswitchtech.com',
            content: 'Lorem ipsum 2',
        },
        function(post,feed){

            // // Set Tools
            // var deleteTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            // deleteTool.i = $(document.createElement('i')).addClass('bi bi-trash me-1').appendTo(deleteTool);
            // deleteTool.append('Delete');
            // var editTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            // editTool.i = $(document.createElement('i')).addClass('bi bi-pencil-square me-1').appendTo(editTool);
            // editTool.append('Edit');

            // // Set Content
            // var header = $(document.createElement('div')).addClass('card-header border-0').appendTo(object.item);
            // header.h5 = $(document.createElement('h5')).addClass('card-title').html("louis@laswitchtech.com has registered").appendTo(header);
        }
    );
    myFeed.post(
        {
            username:'louis@laswitchtech.com',
            content: 'Lorem ipsum 3',
        },
        function(post,feed){

            // // Set Tools
            // var deleteTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            // deleteTool.i = $(document.createElement('i')).addClass('bi bi-trash me-1').appendTo(deleteTool);
            // deleteTool.append('Delete');
            // var editTool = $(document.createElement('a')).attr('href','#').addClass('text-decoration-none').prependTo(object.tools);
            // editTool.i = $(document.createElement('i')).addClass('bi bi-pencil-square me-1').appendTo(editTool);
            // editTool.append('Edit');

            // // Set Content
            // var header = $(document.createElement('div')).addClass('card-header border-0').appendTo(object.item);
            // header.h5 = $(document.createElement('h5')).addClass('card-title').html("louis@laswitchtech.com has registered").appendTo(header);
        }
    );
});