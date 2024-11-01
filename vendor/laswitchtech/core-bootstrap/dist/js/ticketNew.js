$(document).ready(function(){

    const MainContainer = $('#new');

    // New Form
    const FormCard = new Card(
        MainContainer,
        {
            class: {
                container: "w-100",
                body: "p-0",
            },
            icon: "ticket-perforated",
            title: 'Submit a Ticket',
        },
        function(card){

            // Create Grid
            var row = $(document.createElement('div')).addClass('row').appendTo(card.body);
            row.col = $(document.createElement('div')).addClass('col-12').appendTo(row);

            // Create Form
            var form = $(document.createElement('form')).attr({method:"post",autocomplete:"off"}).addClass('d-flex flex-column p-3').appendTo(row.col);

            // Create Main Form Section
            var section = $(document.createElement("div")).addClass('d-flex flex-column justify-content-center align-items-start w-100').appendTo(form);

            section.category = $(document.createElement("div")).addClass('w-100').appendTo(section);
            section.category.label = $(document.createElement("h5")).html('Category: ').appendTo(section.category);
            section.category.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(section.category);

            section.subCategory = $(document.createElement("div")).addClass('mt-2 w-100').appendTo(section);
            section.subCategory.label = $(document.createElement("h5")).html('Sub Category: ').appendTo(section.subCategory);
            section.subCategory.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(section.subCategory);

            section.item = $(document.createElement("div")).addClass('mt-2 w-100').appendTo(section);
            section.item.label = $(document.createElement("h5")).html('Item: ').appendTo(section.item);
            section.item.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(section.item);

            section.priority = $(document.createElement("div")).addClass('mt-2 w-100').appendTo(section);
            section.priority.label = $(document.createElement("h5")).html('Priority: ').appendTo(section.priority);
            section.priority.select = $(document.createElement("select")).addClass('form-select w-100').appendTo(section.priority);
            $.each(Priorities, function(key, value) {
                var randomDescription = value.alt[Math.floor(Math.random() * value.alt.length)];
                section.priority.select.append($("<option></option>")
                    .attr("value", key)
                    .text(value.label + ' - ' + randomDescription));
            });

            section.dates = $(document.createElement("div")).addClass('mt-2 w-100').appendTo(section);
            section.dates.label = $(document.createElement("h5")).html('Dates: ').appendTo(section.dates);
            section.dates.row = $(document.createElement("div")).addClass('row m-0 w-100').appendTo(section.dates);
            section.dates.row.col1 = $(document.createElement("div")).addClass('col-6 ps-0').appendTo(section.dates.row);
            section.dates.from = $(document.createElement("div")).addClass('input-group').appendTo(section.dates.row.col1);
            section.dates.from.label = $(document.createElement("span")).addClass('input-group-text').html('From: ').appendTo(section.dates.from);
            section.dates.from.input = $(document.createElement("input")).addClass('form-control').attr({type:"date"}).appendTo(section.dates.from);
            section.dates.row.col2 = $(document.createElement("div")).addClass('col-6 pe-0').appendTo(section.dates.row);
            section.dates.to = $(document.createElement("div")).addClass('input-group').appendTo(section.dates.row.col2);
            section.dates.to.label = $(document.createElement("span")).addClass('input-group-text').html('To: ').appendTo(section.dates.to);
            section.dates.to.input = $(document.createElement("input")).addClass('form-control').attr({type:"date"}).appendTo(section.dates.to);

            section.remote = $(document.createElement("div")).addClass('mt-2 w-100').appendTo(section);
            section.remote.label = $(document.createElement("h5")).html('Remote Access: ').appendTo(section.remote);
            section.remote.row = $(document.createElement("div")).addClass('row m-0 w-100').appendTo(section.remote);
            section.remote.row.col1 = $(document.createElement("div")).addClass('col-6 ps-0').appendTo(section.remote.row);
            section.remote.id = $(document.createElement("div")).addClass('input-group').appendTo(section.remote.row.col1);
            section.remote.id.label = $(document.createElement("span")).addClass('input-group-text').html('ID: ').appendTo(section.remote.id);
            section.remote.id.input = $(document.createElement("input")).addClass('form-control').attr({type:"text"}).inputmask({
                mask: "[9]99999999[9]",
                greedy: false,
                placeholder: "_",
            }).appendTo(section.remote.id);
            section.remote.row.col2 = $(document.createElement("div")).addClass('col-6 pe-0').appendTo(section.remote.row);
            section.remote.password = $(document.createElement("div")).addClass('input-group').appendTo(section.remote.row.col2);
            section.remote.password.label = $(document.createElement("span")).addClass('input-group-text').html('Password: ').appendTo(section.remote.password);
            section.remote.password.input = $(document.createElement("input")).addClass('form-control').attr({type:"text"}).appendTo(section.remote.password);

            section.subject = $(document.createElement("div")).addClass('mt-2 w-100').appendTo(section);
            section.subject.label = $(document.createElement("h5")).html('Subject: ').appendTo(section.subject);
            section.subject.input = $(document.createElement("input")).addClass('form-control w-100').attr({type:"text"}).appendTo(section.subject);

            section.description = $(document.createElement("div")).addClass('mt-2 w-100').appendTo(section);
            section.description.label = $(document.createElement("h5")).html('Description: ').appendTo(section.description);
            section.description.textarea = $(document.createElement("textarea")).addClass('w-100').attr({}).appendTo(section.description);
            section.description.tinymce = section.description.textarea.tinymce({
                height: 400,
                width: '100%',
                menubar: false,
                plugins: [
                   'advlist','autolink',
                   'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                   'fullscreen','insertdatetime','media','table','help','wordcount'
                ],
                toolbar: 'undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | code table help',
                init_instance_callback: function (editor) {
                    var container = $(editor.getContainer());
                    container.find('.tox-statusbar').addClass("d-none");
                },
            });
            
            section.submit = $(document.createElement("div")).addClass('px-3 w-100 mt-3').appendTo(form);
            section.submit.button = $(document.createElement("button")).addClass('btn btn-success w-100').html('Submit').appendTo(section.submit);
            section.submit.button.icon = $(document.createElement("i")).addClass('bi bi-ticket-perforated me-2').prependTo(section.submit.button);

            const render = function(){
                const keys = {
                    category: section.category.select.val(),
                    subCategory: section.subCategory.select.val(),
                    item: section.item.select.val(),
                };

                const category = Categories[keys.category];
                const subCategory = category.sub[keys.subCategory];

                if(typeof subCategory !== 'undefined'){
                    if(typeof subCategory.opts !== 'undefined'){
                        if( subCategory.opts.showCalendar){
                            section.dates.show();
                        } else {
                            section.dates.hide();
                        }
                        if( subCategory.opts.showRemoteAccess){
                            section.remote.show();
                        } else {
                            section.remote.hide();
                        }
                        if( subCategory.opts.showPriority){
                            section.priority.show();
                        } else {
                            section.priority.hide();
                        }
                        if( subCategory.opts.showSubject){
                            section.subject.show();
                        } else {
                            section.subject.hide();
                        }
                        if( subCategory.opts.showDescription){
                            section.description.show();
                        } else {
                            section.description.hide();
                        }
                        if( subCategory.opts.defaultPriority){
                            section.priority.select.val(subCategory.opts.defaultPriority);
                        }
                        section.subject.input.val('');
                        if( subCategory.opts.defaultSubject){
                            var Subject = subCategory.opts.defaultSubject;
                            const Variables = {
                                "%CATEGORY%": category.label,
                                "%SUBCATEGORY%": subCategory.label,
                                "%ITEM%": keys.item,
                                "%SUBJECT%": section.subject.input.val(),
                                "%REMOTEID%": section.remote.id.input.val(),
                                "%REMOTEPASSWORD%": section.remote.password.input.val(),
                                "%START%": section.dates.from.input.val(),
                                "%END%": section.dates.to.input.val(),
                            };
                            if(subCategory.opts.defaultSubject){
                                $.each(Variables, function(key, value) {
                                    Subject = Subject.replaceAll(key, value);
                                });
                                section.subject.input.val(Subject);
                            }
                        }
                    }
                }
            };

            // Update the category list
            section.category.update = function(category = null){
                var select = section.category.select;
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
            section.subCategory.update = function(subCategory = null){
                var select = section.subCategory.select;
                var categoryKey = section.category.select.val();
                const category = Categories[categoryKey];
                select.empty();
                if(typeof category !== 'undefined' && typeof category.sub !== 'undefined'){
                    section.subCategory.removeClass('d-none');
                    section.subCategory.select.removeClass('d-none');
                    $.each(category.sub, function(key, value) {
                        select.append($("<option></option>")
                            .attr("value", key)
                            .text(value.label));
                    });
                    if(subCategory){
                        select.val(subCategory);
                    }
                } else {
                    section.subCategory.addClass('d-none');
                    section.subCategory.select.addClass('d-none');
                }
                render();
            };

            // Update the item list
            section.item.update = function(item = null){
                var select = section.item.select;
                var categoryKey = section.category.select.val();
                var subCategoryKey = section.subCategory.select.val();
                const category = Categories[categoryKey];
                const subCategory = category.sub[subCategoryKey];
                select.empty();
                if(typeof category !== 'undefined' && typeof subCategory !== 'undefined' && typeof subCategory.sub !== 'undefined'){
                    section.item.removeClass('d-none');
                    section.item.select.removeClass('d-none');
                    $.each(subCategory.sub, function(key, value) {
                        select.append($("<option></option>")
                            .attr("value", key)
                            .text(value.label));
                    });
                    if(item){
                        select.val(item);
                    }
                } else {
                    section.item.addClass('d-none');
                    section.item.select.addClass('d-none');
                }
                render();
            };

            // Add the event listeners
            section.category.select.change(function() {
                section.subCategory.update();
                section.item.update();
            });
            section.subCategory.select.change(function() {
                section.item.update();
            });
            section.item.select.change(function() {
                render();
            });
            section.dates.from.input.change(function() {
                render();
            });
            section.dates.to.input.change(function() {
                render();
            });
            section.remote.id.input.change(function() {
                render();
            });
            section.remote.password.input.change(function() {
                render();
            });
            
            // Update the category, sub category and item lists
            section.category.update(Record.category);
            section.subCategory.update(Record.subCategory);
            section.item.update(Record.item);
        },
    );
});