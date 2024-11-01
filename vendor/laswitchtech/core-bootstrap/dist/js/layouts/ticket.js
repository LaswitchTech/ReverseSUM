$(document).ready(function(){

    const DetailsContainer = $('#layout');

    // Details
    const DetailsCard = new Card(
        DetailsContainer,
        {
            class: {
                container: "w-100",
                body: "p-0",
            },
            icon: "chat-dots",
            title: 'Ticket# ' + Record.id,
        },
        function(card){

            // // Create Grid
            // var row = $(document.createElement('div')).addClass('row').appendTo(card.body);
            // row.col1 = $(document.createElement('div')).addClass('col-6 col-xxl-8').appendTo(row);
            // row.col2 = $(document.createElement('div')).addClass('col-6 col-xxl-4').appendTo(row);
            // row.col2.row1 = $(document.createElement('div')).addClass('row p-3').appendTo(row.col2);
            // row.col2.row1.col1 = $(document.createElement('div')).addClass('col-12').appendTo(row.col2.row1);
            // row.col1.row1 = $(document.createElement('div')).addClass('row p-3').appendTo(row.col1);
            // row.col1.row1.col1 = $(document.createElement('div')).addClass('col-6').appendTo(row.col1.row1);
            // row.col1.row1.col2 = $(document.createElement('div')).addClass('col-6').appendTo(row.col1.row1);
            // row.col1.row1.col3 = $(document.createElement('div')).addClass('col-12').appendTo(row.col1.row1);
            // row.col1.row2 = $(document.createElement('div')).addClass('row p-3 pb-0').appendTo(row.col1);
            // row.col1.row2.col1 = $(document.createElement('div')).addClass('col-12 border-bottom').appendTo(row.col1.row2);
            // row.col1.row3 = $(document.createElement('div')).addClass('row p-3').appendTo(row.col1);
            // row.col1.row3.col1 = $(document.createElement('div')).addClass('col-12').appendTo(row.col1.row3);

            // var statusBox = new Box(
            //     row.col1.row1.col1,
            //     {
            //         class: {
            //             box: 'h-100 cursor-pointer',
            //         },
            //         icon:Statuses[Record.status].icon,
            //         color:Statuses[Record.status].color,
            //         type: "small",
            //     },
            //     function(box){
                    
            //         // Set Content
            //         var header = $(document.createElement("h4")).html(Statuses[Record.status].label).appendTo(box.content);
            //         var paragraph = $(document.createElement("p")).addClass().html("Status").appendTo(box.content);

            //         // Change Status
            //         box.modal = new Modal(
            //             box,
            //             {
            //                 callback: {
            //                     submit: function(element,modal){
            //                         console.log("Submit", element,modal);
            //                     },
            //                 },
            //                 icon: "question-circle",
            //                 title: "Change status to",
            //             },
            //             function(element,modal){
            //                 element.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(element.dialog.content.body);
            //                 for(const [key, value] of Object.entries(Statuses)){
            //                     $(document.createElement("option")).attr('value',key).html(value.label).appendTo(element.select);
            //                 }
            //                 element.select.val(Record.status);
            //             },
            //         );
            //     }
            // );

            // var priorityBox = new Box(
            //     row.col1.row1.col2,
            //     {
            //         class: {
            //             box: 'h-100 cursor-pointer',
            //         },
            //         icon:Priorities[Record.priority].icon,
            //         color:Priorities[Record.priority].color,
            //         type: "small",
            //     },
            //     function(box){
                    
            //         // Set Content
            //         var header = $(document.createElement("h4")).html(Priorities[Record.priority].label).appendTo(box.content);
            //         var paragraph = $(document.createElement("p")).addClass().html("Priority").appendTo(box.content);

            //         // Change Priority
            //         box.modal = new Modal(
            //             box,
            //             {
            //                 callback: {
            //                     submit: function(element,modal){
            //                         console.log("Submit", element,modal);
            //                     },
            //                 },
            //                 icon: "question-circle",
            //                 title: "Change priority to",
            //             },
            //             function(element,modal){
            //                 element.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(element.dialog.content.body);
            //                 $.each(Priorities, function(key, value) {
            //                     var randomDescription = value.alt[Math.floor(Math.random() * value.alt.length)];
            //                     element.select.append($("<option></option>")
            //                         .attr("value", key)
            //                         .text(value.label + ' - ' + randomDescription));
            //                 });
            //                 element.select.val(Record.priority);
            //             },
            //         );
            //     }
            // );

            const Reply = function(object, quote = null, author = null){
                var modal = new Modal(
                    object,
                    {
                        callback: {
                            submit: function(element,modal){
                                element.textarea = element.find('textarea');
                                if(quote){
                                    let parser = new DOMParser();
                                    let doc = parser.parseFromString(quote, 'text/html');
                                    let elementsToRemove = doc.getElementsByClassName('reply-quote');
                                    for (let element of Array.from(elementsToRemove)) {
                                        element.parentNode.removeChild(element);
                                    }
                                    quote = doc.documentElement.innerHTML;
                                    element.quote = new Alert(
                                        {
                                            class: {
                                                alert: "ms-3 reply-quote",
                                            },
                                            color: "secondary",
                                            dismissible: false,
                                            icon: "chat-quote",
                                            title: author,
                                            content: quote,
                                        }
                                    );
                                    quote = element.quote.outerHTML();
                                }
                                ticketFeed.post(
                                    {
                                        username: Record.owner,
                                        content: element.textarea.tinymce().getContent() + quote,
                                    }
                                );
                                modal.hide();
                            },
                        },
                        icon: "reply",
                        title: "Reply to ticket",
                        size: "lg",
                    },
                    function(element,modal){
                        element.dialog.content.body.addClass('p-0');
                        element.textarea = $(document.createElement("textarea")).addClass('').appendTo(element.dialog.content.body);
                        element.textarea.tinymce({
                            height: 400,
                            menubar: false,
                            plugins: [
                               'advlist','autolink',
                               'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                               'fullscreen','insertdatetime','media','table','help','wordcount'
                            ],
                            toolbar: 'undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | code table help',
                            init_instance_callback: function (editor) {
                                var container = $(editor.getContainer());
                                container.addClass("rounded-0 border-0");
                                container.find('.tox-statusbar').addClass("d-none");
                            },
                        });
                        element.dialog.content.footer.submit.text("Post");
                    },
                );
            };

            const Share = function(object){
                var modal = new Modal(
                    object,
                    {
                        callback: {
                            submit: function(element,modal){
                                console.log("Submit", element,modal);
                            },
                        },
                        icon: "share",
                        title: "Share this ticket to",
                    },
                    function(element,modal){
                        element.select = $(document.createElement("select")).attr('multiple','multiple').appendTo(element.dialog.content.body);
                        element.select.select2(
                            {
                                data: Contacts, 
                                tags: true,
                                multiple: true,
                                templateResult:function(option){
                                    if (!option.id) { return option.text; }
                                    var $option = $(
                                        '<span><i class="bi bi-envelope me-1"></i> ' + option.text + '</span>'
                                    );
                                    return $option;
                                },
                                templateSelection:function(option){
                                    if (!option.id) { return option.text; }
                                    var $option = $(
                                        '<span><i class="bi bi-envelope"></i> ' + option.text + '</span>'
                                    );
                                    return $option;
                                },
                            }
                        );
                        element.select.val([Record.owner,Record.assignedTo]).trigger('change');
                        element.dialog.content.footer.submit.text("Share");
                    },
                );
            };

            const Close = function(object){
                var modal = new Modal(
                    object,
                    {
                        callback: {
                            submit: function(element,modal){
                                console.log("Submit", element,modal);
                            },
                        },
                        icon: "question-diamond",
                        title: "Are you sure you",
                        body: "Are you sure you want to close this ticket?",
                    },
                    function(element,modal){
                        element.dialog.content.footer.submit.text("Close");
                    },
                );
            };

            const Archive = function(object){
                var modal = new Modal(
                    object,
                    {
                        callback: {
                            submit: function(element,modal){
                                console.log("Submit", element,modal);
                            },
                        },
                        icon: "question-diamond",
                        title: "Are you sure you",
                        body: "Are you sure you want to archive this ticket?",
                    },
                    function(element,modal){
                        element.dialog.content.footer.submit.text("Archive");
                    },
                );
            };

            // var subject = $(document.createElement("h2")).html(Record.subject).appendTo(row.col1.row2.col1);
            // var datetime = {};
            // datetime.openedOn = new Date(Record.openedOn);
            // var openedOn = $(document.createElement('div')).addClass('mt-1 mb-2').appendTo(row.col1.row2.col1);
            // openedOn.Label = $(document.createElement('span')).addClass('me-2').text('Opened On:').appendTo(openedOn);
            // openedOn.icon = $(document.createElement('i')).addClass('bi-clock me-1').appendTo(openedOn);
            // openedOn.timeago = $(document.createElement('time')).addClass('timeago').attr('data-bs-toggle','tooltip').attr('title',datetime.openedOn.toLocaleString()).attr('data-bs-title',datetime.openedOn.toLocaleString()).attr('data-bs-placement','top').attr('datetime',datetime.openedOn.toLocaleString()).html(datetime.openedOn.toLocaleString()).appendTo(openedOn);
            // openedOn.timeago.timeago();
            // openedOn.timeago.bootstrap = new bootstrap.Tooltip(openedOn.timeago);
            // if(Record.closedOn){
            //     datetime.closedOn = new Date(Record.closedOn);
            //     var closedOn = {};
            //     closedOn.Label = $(document.createElement('span')).addClass('ms-3 me-2').text('Closed On:').appendTo(openedOn);
            //     closedOn.icon = $(document.createElement('i')).addClass('bi-clock me-1').appendTo(openedOn);
            //     closedOn.timeago = $(document.createElement('time')).addClass('timeago').attr('data-bs-toggle','tooltip').attr('title',datetime.closedOn.toLocaleString()).attr('data-bs-title',datetime.closedOn.toLocaleString()).attr('data-bs-placement','top').attr('datetime',datetime.closedOn.toLocaleString()).html(datetime.closedOn.toLocaleString()).appendTo(openedOn);
            //     closedOn.timeago.timeago();
            //     closedOn.timeago.bootstrap = new bootstrap.Tooltip(closedOn.timeago);
            // }
            // var description = $(document.createElement("p")).html(Record.description).appendTo(row.col1.row2.col1);

            // const ticketFeed = new Feed(
            //     row.col1.row3.col1,
            //     {
            //         controls:{
            //             reply:{
            //                 icon:"reply",
            //                 label:"Reply",
            //                 callback:function(control,post,feed){
            //                     Reply(control,post.content.html(),post.user.link.text());
            //                 },
            //             },
            //             edit:{
            //                 icon:"pencil-square",
            //                 color:"warning",
            //                 label:"Edit",
            //                 callback:function(control,post,feed){
            //                     var modal = new Modal(
            //                         control,
            //                         {
            //                             callback: {
            //                                 submit: function(element,modal){
            //                                     element.textarea = element.find('textarea');
            //                                     post.content.html(element.textarea.tinymce().getContent());
            //                                     modal.hide();
            //                                 },
            //                             },
            //                             icon: "pencil-square",
            //                             title: "Edit Post",
            //                             size: "lg",
            //                         },
            //                         function(element,modal){
            //                             element.dialog.content.body.addClass('p-0');
            //                             element.textarea = $(document.createElement("textarea")).addClass('').appendTo(element.dialog.content.body);
            //                             element.tinymce = element.textarea.tinymce({
            //                                 height: 400,
            //                                 menubar: false,
            //                                 plugins: [
            //                                    'advlist','autolink',
            //                                    'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
            //                                    'fullscreen','insertdatetime','media','table','help','wordcount'
            //                                 ],
            //                                 toolbar: 'undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | code table help',
            //                                 init_instance_callback: function (editor) {
            //                                     var container = $(editor.getContainer());
            //                                     container.addClass("rounded-0 border-0");
            //                                     container.find('.tox-statusbar').addClass("d-none");
            //                                 },
            //                                 setup: function(editor) {
            //                                     editor.on('init', function(e) {
            //                                         editor.setContent(post.content.html());
            //                                     });
            //                                 }
            //                             });
            //                         },
            //                     );
            //                 },
            //             },
            //             delete:{
            //                 icon:"trash",
            //                 color:"danger",
            //                 label:"Delete",
            //                 callback:function(control,post,feed){
            //                     control.modal = new Modal(
            //                         control,
            //                         {
            //                             callback: {
            //                                 submit: function(element,modal){
            //                                     post.remove();
            //                                     modal.hide();
            //                                 },
            //                             },
            //                             icon: "question-diamond",
            //                             title: "Are you sure you",
            //                             body: "Are you sure you want to delete this post?",
            //                         },
            //                         function(element,modal){
            //                             element.dialog.content.footer.submit.text("Delete");
            //                         },
            //                     );
            //                 },
            //             },
            //         },
            //     },
            //     function(feed){
            //         for(const [key, post] of Object.entries(Record.posts)){
            //             feed.post(
            //                 {
            //                     datetime: post.created,
            //                     username: post.owner,
            //                     content: post.content,
            //                 },
            //             );
            //         }
            //     }, 
            // );

            // var controls = $(document.createElement("div")).addClass('btn-group w-100 mb-3').appendTo(row.col2.row1.col1);
            // controls.reply = $(document.createElement("button")).addClass('btn btn-primary d-flex flex-column justify-content-center align-items-center').appendTo(controls);
            // controls.reply.icon = $(document.createElement("i")).addClass('bi bi-reply fs-3').appendTo(controls.reply);
            // controls.reply.label = $(document.createElement("span")).addClass('d-none d-md-block').html("Reply").appendTo(controls.reply);
            // Reply(controls.reply);
            // controls.share = $(document.createElement("button")).addClass('btn btn-info d-flex flex-column justify-content-center align-items-center').appendTo(controls);
            // controls.share.icon = $(document.createElement("i")).addClass('bi bi-share fs-3').prependTo(controls.share);
            // controls.share.label = $(document.createElement("span")).addClass('d-none d-md-block').html("Share").appendTo(controls.share);
            // Share(controls.share);
            // controls.close = $(document.createElement("button")).addClass('btn btn-dark d-flex flex-column justify-content-center align-items-center').appendTo(controls);
            // controls.close.icon = $(document.createElement("i")).addClass('bi bi-x-circle fs-3').prependTo(controls.close);
            // controls.close.label = $(document.createElement("span")).addClass('d-none d-md-block').html("Close").appendTo(controls.close);
            // Close(controls.close);
            // controls.archive = $(document.createElement("button")).addClass('btn btn-light d-flex flex-column justify-content-center align-items-center').appendTo(controls);
            // controls.archive.icon = $(document.createElement("i")).addClass('bi bi-archive fs-3').prependTo(controls.archive);
            // controls.archive.label = $(document.createElement("span")).addClass('d-none d-md-block').html("Archive").appendTo(controls.archive);
            // Archive(controls.archive);

            // var ticketOwner = $(document.createElement("h4")).html('Owner').appendTo(row.col2.row1.col1);
            // ticketOwner.container = $(document.createElement("div")).addClass('d-flex justify-content-start align-items-center ms-2 user-select-none').appendTo(row.col2.row1.col1);
            // ticketOwner.container.avatar = new Avatar(
            //     Record.owner,
            //     {
            //         class: {
            //             object: "rounded-circle",
            //         },
            //         extension: false,
            //         size: "48px",
            //         default: "mp",
            //         force: false,
            //         rating: false,
            //     },
            // ).appendTo(ticketOwner.container);
            // ticketOwner.container.contactInfo = $(document.createElement("div")).addClass('ms-2 d-flex flex-column justify-content-center align-items-start').appendTo(ticketOwner.container);
            // ticketOwner.container.contactInfo.contact = $(document.createElement("strong")).text(Record.owner).appendTo(ticketOwner.container.contactInfo);

            // var ticketAssigned = $(document.createElement("h4")).html('Assigned To').addClass('mt-3').appendTo(row.col2.row1.col1);
            // ticketAssigned.container = $(document.createElement("div")).addClass('d-flex justify-content-start align-items-center ms-2 user-select-none cursor-pointer').appendTo(row.col2.row1.col1);
            // ticketAssigned.container.avatar = new Avatar(
            //     Record.assignedTo,
            //     {
            //         class: {
            //             object: "rounded-circle",
            //         },
            //         extension: false,
            //         size: "48px",
            //         default: "mp",
            //         force: false,
            //         rating: false,
            //     },
            // ).appendTo(ticketAssigned.container);
            // ticketAssigned.container.contactInfo = $(document.createElement("div")).addClass('ms-2 d-flex flex-column justify-content-center align-items-start').appendTo(ticketAssigned.container);
            // ticketAssigned.container.contactInfo.contact = $(document.createElement("strong")).text(Record.assignedTo).appendTo(ticketAssigned.container.contactInfo);
            // ticketAssigned.container.contactInfo.title = $(document.createElement("span")).text('Team Lead Customer Support').appendTo(ticketAssigned.container.contactInfo);
            // // Change Assigned To
            // ticketAssigned.modal = new Modal(
            //     ticketAssigned.container,
            //     {
            //         callback: {
            //             submit: function(element,modal){
            //                 console.log("Submit", element,modal);
            //             },
            //         },
            //         icon: "question-circle",
            //         title: "Assign ticket to",
            //     },
            //     function(element,modal){
            //         element.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(element.dialog.content.body);
            //         $(document.createElement("option")).attr('value','emma.johnson@domain.com').html('emma.johnson@domain.com').appendTo(element.select);
            //         $(document.createElement("option")).attr('value','michael.smith@domain.com').html('michael.smith@domain.com').appendTo(element.select);
            //         $(document.createElement("option")).attr('value','john.doe@domain.com').html('john.doe@domain.com').appendTo(element.select);
            //         $(document.createElement("option")).attr('value','jane.doe@domain.com').html('jane.doe@domain.com').appendTo(element.select);
            //         $(document.createElement("option")).attr('value','david.brown@domain.com').html('david.brown@domain.com').appendTo(element.select);
            //         element.select.val(Record.assignedTo);
            //     },
            // );

            // var details = $(document.createElement("div")).addClass('mt-3 d-flex flex-column justify-content-center align-items-start').appendTo(row.col2.row1.col1);
            // details.header = $(document.createElement("h4")).html('Details').appendTo(details);

            // details.category = $(document.createElement("strong")).addClass('mt-2').html('Category: ').appendTo(details);
            // details.category.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(details);

            // details.subCategory = $(document.createElement("strong")).addClass('mt-2').html('Sub Category: ').appendTo(details);
            // details.subCategory.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(details);

            // details.item = $(document.createElement("strong")).addClass('mt-2').html('Item: ').appendTo(details);
            // details.item.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(details);
            
            // details.submit = $(document.createElement("div")).addClass('px-3 w-100 mt-3').appendTo(details);
            // details.submit.button = $(document.createElement("button")).addClass('btn btn-success w-100').html('Save changes').appendTo(details.submit);
            // details.submit.button.icon = $(document.createElement("i")).addClass('bi bi-save me-2').prependTo(details.submit.button);
            
            // var calContainer = $(document.createElement("div")).addClass('mt-3').appendTo(row.col2.row1.col1);
            // calContainer.calendar = new Calendar(
            //     calContainer,
            //     {
            //         class: {
            //             header: 'p-0',
            //         },
            //         headerToolbar: {
            //             left: 'prev,next',
            //             center: '',
            //             right: 'title'
            //         },
            //         initialView: 'dayGridMonth',
            //         initialDate: Record.start,
            //         events: [
            //             {
            //                 title: Record.subject,
            //                 description: Record.description,
            //                 icon: 'question',
            //                 start: Record.start,
            //                 end: Record.end,
            //                 allDay: true,
            //                 color: 'info',
            //             },
            //         ],
            //     },
            // );

            // var accept = $(document.createElement("div")).addClass('px-3 w-100 mt-3').appendTo(row.col2.row1.col1);
            // accept.button = $(document.createElement("button")).addClass('btn btn-success w-100').html('Accept').appendTo(accept);
            // accept.button.icon = $(document.createElement("i")).addClass('bi bi-check-lg me-2').prependTo(accept.button);

            // var deny = $(document.createElement("div")).addClass('px-3 w-100 mt-3').appendTo(row.col2.row1.col1);
            // deny.button = $(document.createElement("button")).addClass('btn btn-danger w-100').html('Deny').appendTo(deny);
            // deny.button.icon = $(document.createElement("i")).addClass('bi bi-x-lg me-2').prependTo(deny.button);

            // var remoteAccess = $(document.createElement("div")).addClass('mt-3 d-flex flex-column justify-content-center align-items-start').appendTo(row.col2.row1.col1);
            // remoteAccess.header = $(document.createElement("h4")).html('Remote Access').appendTo(remoteAccess);
            // remoteAccess.list = new List(
            //     remoteAccess,
            //     {
            //         class: { list: "bg-transparent rounded w-100 border-0" },
            //         tools: {  },
            //     },
            //     function(list){
            //         list.item(
            //             { icon: 'hash', field: Record.remoteID, click: function(item){ Helper.copyToClipboard(Record.remoteID); } },
            //             function(item){},
            //         );
            //         list.item(
            //             { icon: 'key-fill', field: Record.remotePassword, click: function(item){ Helper.copyToClipboard(Record.remotePassword); } },
            //             function(item){},
            //         );
            //     }, 
            // );

            var files = $(document.createElement("div")).addClass('mt-3 d-flex flex-column justify-content-center align-items-start').appendTo(row.col2.row1.col1);
            files.header = $(document.createElement("h4")).html('Files').appendTo(files);
            files.list = new List(
                files,
                {
                    class: { list: "bg-transparent rounded w-100 border-0" },
                    tools: { upload: { icon: "upload", label: "Upload", color: "success", callback: function(tool){} } },
                    actions: {
                        view: { icon: "eye", color: "primary", callback: function(action){} },
                        download: { icon: "download", color: "success", callback: function(action){} },
                        delete: { icon: "trash", color: "danger", callback: function(action){} },
                    },
                },
                function(list){
                    for(const [key, file] of Object.entries(Record.files)){
                        var icon = "file-earmark";
                        list.item(
                            { icon: icon, field: file.filename, click: function(item){} },
                            function(item){},
                        );
                    }
                }, 
            );

            var references = $(document.createElement("div")).addClass('mt-3 d-flex flex-column justify-content-center align-items-start').appendTo(row.col2.row1.col1);
            references.header = $(document.createElement("h4")).html('References').appendTo(references);
            references.list = new List(
                references,
                {
                    class: { list: "bg-transparent rounded w-100 border-0" },
                    tools: { upload: { icon: "plus-lg", label: "Add", color: "success", callback: function(tool){} } },
                },
                function(list){
                    for(const [category, values] of Object.entries(Record.references)){
                        list.item(
                            function(item){
                                item.field.container = $(document.createElement("div")).addClass('d-flex justify-content-start align-items-center').appendTo(item.field);
                                item.field.category = $(document.createElement("strong")).addClass('me-2 text-capitalize').html(category + ':').appendTo(item.field.container);
                                item.field.values = $(document.createElement("div")).appendTo(item.field.container);
                                item.field.values.list = {};
                                for(const [key, value] of Object.entries(values)){
                                    item.field.values.list[key] = $(document.createElement("div")).addClass('btn-group m-1').appendTo(item.field.values);
                                    item.field.values.list[key].value = $(document.createElement("button")).addClass('btn btn-sm btn-primary').html(value).appendTo(item.field.values.list[key]);
                                    item.field.values.list[key].delete = $(document.createElement("button")).addClass('btn btn-sm btn-danger').appendTo(item.field.values.list[key]);
                                    item.field.values.list[key].delete.icon = $(document.createElement("i")).addClass('bi bi-x').appendTo(item.field.values.list[key].delete);
                                    item.field.values.list[key].value.click(function(){
                                        Helper.copyToClipboard(value);
                                    });
                                    item.field.values.list[key].delete.click(function(){
                                        item.field.values.list[key].remove();
                                    });
                                }
                            },
                        );
                    }
                }, 
            );

            var meta = $(document.createElement("div")).addClass('mt-3 d-flex flex-column justify-content-center align-items-start').appendTo(row.col2.row1.col1);
            meta.header = $(document.createElement("h4")).html('Meta').appendTo(meta);
            meta.list = new List(
                meta,
                {
                    class: { list: "bg-transparent rounded w-100 border-0" },
                    tools: { upload: { icon: "plus-lg", label: "Add", color: "success", callback: function(tool){} } },
                    actions: {
                        delete: { icon: "trash", color: "danger", callback: function(action){} },
                    },
                },
                function(list){
                    for(const [key, value] of Object.entries(Record.meta)){
                        list.item(
                            { field: value, click: function(item){} },
                            function(item){},
                        );
                    }
                }, 
            );

            const render = function(){
                const keys = {
                    category: details.category.select.val(),
                    subCategory: details.subCategory.select.val(),
                    item: details.item.select.val(),
                };

                const category = Categories[keys.category];
                const subCategory = category.sub[keys.subCategory];

                if(typeof subCategory !== 'undefined'){
                    if(typeof subCategory.opts !== 'undefined'){
                        if( subCategory.opts.showFiles){
                            files.removeClass('d-none');
                        } else {
                            files.addClass('d-none');
                        }
                        if( subCategory.opts.showShare){
                            controls.share.removeClass('d-none');
                        } else {
                            controls.share.addClass('d-none');
                        }
                        if( ! subCategory.opts.showClose || Record.status >= 8 ){
                            controls.close.addClass('d-none');
                        }
                        if( ! subCategory.opts.showArchive || Record.status != 8 ){
                            controls.archive.addClass('d-none');
                        }
                        if( subCategory.opts.showReferences){
                            references.removeClass('d-none');
                        } else {
                            references.addClass('d-none');
                        }
                        if( subCategory.opts.showMeta){
                            meta.removeClass('d-none');
                        } else {
                            meta.addClass('d-none');
                        }
                        if( subCategory.opts.showFeed){
                            ticketFeed.show();
                            controls.reply.removeClass('d-none');
                        } else {
                            ticketFeed.hide();
                            controls.reply.addClass('d-none');
                        }
                        if( subCategory.opts.showAccept){
                            accept.show();
                        } else {
                            accept.hide();
                        }
                        if( subCategory.opts.showDecline){
                            deny.show();
                        } else {
                            deny.hide();
                        }
                        if( subCategory.opts.showRemoteAccess){
                            remoteAccess.removeClass('d-none');
                        } else {
                            remoteAccess.addClass('d-none');
                        }
                        if( subCategory.opts.showCalendar){
                            calContainer.show();
                            calContainer.calendar.render();
                        } else {
                            calContainer.hide();
                            calContainer.calendar.render();
                        }
                        if( subCategory.opts.lockCategory || Record.status > 7 ){
                            details.category.select.attr('disabled', 'disabled');
                        }
                        if( subCategory.opts.lockSubCategory || Record.status > 7 ){
                            details.subCategory.select.attr('disabled', 'disabled');
                        }
                        if( subCategory.opts.lockItem || Record.status > 7 ){
                            details.item.select.attr('disabled', 'disabled');
                        }
                        if( details.category.select.attr('disabled') === 'disabled' && details.subCategory.select.attr('disabled') === 'disabled' && details.item.select.attr('disabled') === 'disabled' ){
                            details.submit.button.attr('disabled', 'disabled').addClass('d-none').remove();
                        }
                    }
                }

                controls.find('.btn').removeClass('rounded-start rounded-end');
                controls.find('.btn:not(.d-none):first').addClass('rounded-start');
                controls.find('.btn:not(.d-none):last').addClass('rounded-end');
            };

            // Update the category list
            details.category.update = function(category = null){
                var select = details.category.select;
                select.empty();
                $.each(Categories, function(key, value) {
                    select.append($("<option></option>")
                        .attr("value", key)
                        .text(value.label));
                });
                if(category){
                    select.val(category);
                }
                render();
            };

            // Update the sub category list
            details.subCategory.update = function(subCategory = null){
                var select = details.subCategory.select;
                var categoryKey = details.category.select.val();
                select.empty();
                if(typeof Categories[categoryKey] !== 'undefined' && typeof Categories[categoryKey].sub !== 'undefined'){
                    details.subCategory.removeClass('d-none');
                    details.subCategory.select.removeClass('d-none');
                    $.each(Categories[categoryKey].sub, function(key, value) {
                        select.append($("<option></option>")
                            .attr("value", key)
                            .text(value.label));
                    });
                    if(subCategory){
                        select.val(subCategory);
                    }
                } else {
                    details.subCategory.addClass('d-none');
                    details.subCategory.select.addClass('d-none');
                }
                render();
            };

            // Update the item list
            details.item.update = function(item = null){
                var select = details.item.select;
                var categoryKey = details.category.select.val();
                var subCategoryKey = details.subCategory.select.val();
                select.empty();
                if(typeof Categories[categoryKey] !== 'undefined' && typeof Categories[categoryKey].sub !== 'undefined' && typeof Categories[categoryKey].sub[subCategoryKey] !== 'undefined' && typeof Categories[categoryKey].sub[subCategoryKey].sub !== 'undefined'){
                    details.item.removeClass('d-none');
                    details.item.select.removeClass('d-none');
                    $.each(Categories[categoryKey].sub[subCategoryKey].sub, function(key, value) {
                        select.append($("<option></option>")
                            .attr("value", key)
                            .text(value.label));
                    });
                    if(item){
                        select.val(item);
                    }
                } else {
                    details.item.addClass('d-none');
                    details.item.select.addClass('d-none');
                }
                render();
            };

            // Add the event listeners
            details.category.select.change(function() {
                details.subCategory.update();
                details.item.update();
            });
            details.subCategory.select.change(function() {
                details.item.update();
            });
            
            // Update the category, sub category and item lists
            details.category.update(Record.category);
            details.subCategory.update(Record.subCategory);
            details.item.update(Record.item);
        },
    );
});