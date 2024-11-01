<div class="p-5" id="layout">
    <div class="container mb-5">
        <p class="lead"><?= $this->Locale->get('This web application is a versatile tool designed to find all possible combinations of individual line values that match given target totals. Users can input lists of totals and individual values, and the application will determine which combinations of values add up to each total. This is particularly useful for reconciling invoice lines, budget calculations, or any situation requiring a reverse sum breakdown of totals.'); ?></p>
    </div>
    <div id="alert"></div>
</div>
<script>
    $(document).ready(function(){

        // Add Form
        const Form = builder.Component(
            "form",
            "#layout",
            {
                class:{
                    component: "row",
                    input: "rounded",
                    field: "rounded",
                },
                callback:{
                    val: function(values){ return values; },
                    submit: function(form){

                        // Retrieve inputs from textareas
                        const values = form.val();

                        // Submit the form
                        document.getElementById(form._component.id).submit();
                    },
                },
            },
            function(form,component){

                // Add Inputs - Totals
                form.add(
                    {
                        name: 'totals',
                        label: "<?= $this->Locale->get('Totals (One per Line)') ?>",
                        type: 'ide',
                        value: '<?= !empty($this->Return) ? trim(json_encode(trim($_POST['totals'])), '"') : '' ?>',
                        class: {
                            field: 'col-6',
                        },
                    },
                    function(input,form){
                        input.group.removeClass('input-group d-flex flex-nowrap').addClass('rounded bg-glass');
                        input.label.removeClass('input-group-text').addClass('p-2 px-3');
                        <?php if (!empty($this->Return)): ?>
                            input.group.append('<label class="p-2 px-3 align-middle"><i class="bi bi-plus-slash-minus me-2"></i><?= $this->Locale->get('Total'); ?>:<span class="ms-2 btn btn-sm btn-warning"><?= $this->Return['sumTotals'] ?></span></label>');
                        <?php endif; ?>
                    },
                );

                // Add Inputs - Lines
                form.add(
                    {
                        name: 'lines',
                        label: "<?= $this->Locale->get('Lines (One per Line)') ?>",
                        type: 'ide',
                        value: '<?= !empty($this->Return) ? trim(json_encode(trim($_POST['lines'])), '"') : '' ?>',
                        class: {
                            field: 'col-6',
                        },
                    },
                    function(input,form){
                        input.group.removeClass('input-group d-flex flex-nowrap').addClass('rounded bg-glass');
                        input.label.removeClass('input-group-text').addClass('p-2 px-3');
                        <?php if (!empty($this->Return)): ?>
                            input.group.append('<label class="p-2 px-3 align-middle"><i class="bi bi-plus-slash-minus me-2"></i><?= $this->Locale->get('Total'); ?>:<span class="ms-2 btn btn-sm btn-warning"><?= $this->Return['sumLines'] ?></span></label>');
                        <?php endif; ?>
                    },
                );

                // Add Inputs - Submit
                form.add(
                    {
                        name: 'Calculate',
                        label: "<?= $this->Locale->get('Calculate'); ?>", //Input Label
                        icon: 'calculator',
                        type: 'submit',
                        class: {
                            label: 'w-100',
                        },
                    },
                    function(input,form){
                        input.addClass('mt-3');
                        input.input.removeClass('btn-success').addClass('btn-primary');
                    },
                );
            },
        );

        // Display Results
        <?php if (!empty($this->Return)): ?>

            // Add Alert
            <?php if ($this->Return['sumTotals'] != $this->Return['sumLines']): ?>
                const Alert = builder.Component(
                    "alert",
                    "#alert",
                    {
                        class: {
                            component: 'mb-3',
                        },
                        color: "danger",
                        dismissible: true,
                        icon: "ban",
                        title: "Hmmmm...",
                        content: "Seems like the sum of the totals and lines do not match. Please verify your inputs.",
                    },
                    function(alert,component){},
                );
            <?php endif; ?>

            // Add Card
            const Card = builder.Component(
                "card",
                "#layout",
                {
                    class: {
                        component: 'mt-3',
                    },
                    icon: 'calculator',
                    title: '<?= $this->Locale->get('Results') ?>',
                },
                function(card,component){

                    // Remove padding
                    component.body.addClass('p-0');

                    // Add Table
                    const Table = builder.Component(
                        "table",
                        component.body,
                        {
                            class: {
                                buttons: "p-0 m-0 mb-0",
                                table: "m-0 mt-0",
                                footer: "px-4 pt-3 pb-4",
                            },
                            showButtons: false,
                            showButtonsLabel: false,
                            selectTools: false,
                            exportTools: false,
                            columnsVisibility: false,
                            advancedSearch: false,
                            actions:{},
                            datatable:{
                                columnDefs:[
                                    { target: 0, visible: true, responsivePriority: 1, title: '<?= $this->Locale->get('Total') ?>', name: 'total', data: 'total', render: function(data, type, row) {

                                        // Parse the data
                                        data = JSON.parse(data);

                                        // Return the HTML
                                        return '<a class="btn btn-sm btn-warning me-2" data-action="highlight" data-object="totals" data-index="' + data.index + '" data-value="' + data.value + '">' + data.value + '</a>';
                                    }},
                                    { target: 1, visible: true, responsivePriority: 2, title: '<?= $this->Locale->get('Combination') ?>', name: 'combination', data: 'combination', render: function(data, type, row) {

                                        // Parse the data
                                        data = JSON.parse(data);

                                        // Initialize the HTML
                                        var html = '';

                                        // Iterate over the data
                                        for(const [lineNbr, lineValue] of Object.entries(data)){
                                            html += '<a class="btn btn-sm btn-primary me-2" data-action="highlight" data-object="lines" data-index="' + lineNbr + '" data-value="' + lineValue + '">' + lineValue + '</a>';
                                        }

                                        // Return the HTML
                                        return html;
                                    }},
                                    { target: 2, visible: true, responsivePriority: 3, title: '<?= $this->Locale->get('Action') ?>', name: 'action', data: 'action', render: function(data, type, row) {

                                        // Parse the data
                                        data = JSON.parse(data);

                                        // Select the data
                                        var total = data.total;
                                        var combination = data.combination;

                                        // Initialize the selection
                                        var selection = total.index + ':';

                                        // Initialize the HTML
                                        var html = '';

                                        // Iterate over the data
                                        for(const [lineNbr, lineValue] of Object.entries(combination)){
                                            selection += lineNbr + ',';
                                        }

                                        // Remove the last comma
                                        selection = selection.slice(0, -1);

                                        // Add the Buttons
                                        html += '<button class="btn btn-sm btn-primary me-2" data-action="identify" data-selection="' + selection + '"><i class="bi bi-eye me-1"></i><?= $this->Locale->get('Identify') ?></button>';
                                        html += '<button class="btn btn-sm btn-danger me-2" data-action="remove" data-selection="' + selection + '"><i class="bi bi-trash me-1"></i><?= $this->Locale->get('Remove') ?></button>';

                                        // Return the HTML
                                        return html;
                                    }},
                                ],
                                buttons: [],
                            },
                        },
                        function(table,component){

                            // Set the table dark
                            component.table.addClass('table-dark');

                            // Add Results
                            <?php foreach ($this->Return['results'] as $totalNbr => $total): ?>
                                <?php foreach ($total['results'] as $index => $combination): ?>
                                    <?php $varTotal = ["index" => $totalNbr, "value" => $total['value']]; ?>
                                    <?php $varCombination = $combination; ?>
                                    <?php $varAction = ["total" => $varTotal, "combination" => $varCombination]; ?>
                                    table.add({
                                        total: '<?= json_encode($varTotal); ?>',
                                        combination: '<?= json_encode($varCombination) ?>',
                                        action: '<?= json_encode($varAction) ?>',
                                    });
                                <?php endforeach; ?>
                            <?php endforeach; ?>

                            // Add timeout to allow the table to load
                            setTimeout(function(){

                                // Add Event Listeners to identify the clicked object
                                $('[data-action="highlight"][data-object][data-index]').each(function(){

                                    // Variables
                                    const button = $(this);
                                    const object = button.attr('data-object');
                                    const index = button.attr('data-index');
                                    const value = button.attr('data-value');

                                    // Add Event Listener
                                    button.on('click', function(){

                                        // Highlight the clicked value
                                        if(Form._inputs[object].highlighted(index)){
                                            Form._inputs[object].unhighlight(index);
                                        } else {
                                            Form._inputs[object].highlight(index);
                                        }
                                        // Form._inputs[object].del(index);
                                    });
                                });

                                // Add Event Listeners to identify the all object
                                $('[data-action="identify"][data-selection]').each(function(){

                                    // Variables
                                    const button = $(this);
                                    const selection = button.attr('data-selection');

                                    // Select the total and the lines
                                    const total = selection.split(':')[0];
                                    const lines = selection.split(':')[1].split(',');

                                    // Add Event Listener
                                    button.on('click', function(){

                                        // Unhighlight all
                                        Form._inputs.totals.unhighlight();
                                        Form._inputs.lines.unhighlight();

                                        // Highlight the total
                                        Form._inputs.totals.highlight(total);

                                        // Highlight the lines
                                        for(const line of lines){
                                            Form._inputs.lines.highlight(line);
                                        }
                                    });
                                });

                                // Add Event Listeners to identify the all object
                                $('[data-action="remove"][data-selection]').each(function(){

                                    // Variables
                                    const button = $(this);
                                    const selection = button.attr('data-selection');

                                    // Select the total and the lines
                                    const total = selection.split(':')[0];
                                    const lines = selection.split(':')[1].split(',');

                                    // Sort lines from highest to lowest
                                    lines.sort(function(a, b){return b - a});

                                    // Add Event Listener
                                    button.on('click', function(){

                                        // Unhighlight all
                                        Form._inputs.totals.unhighlight();
                                        Form._inputs.lines.unhighlight();

                                        // Highlight the total
                                        Form._inputs.totals.del(total);

                                        // Highlight the lines
                                        for(const line of lines){
                                            Form._inputs.lines.del(line);
                                        }
                                    });
                                });
                            }, 500);
                        },
                    );
                },
            );
        <?php endif; ?>
    });
</script>
<?php if (empty($this->Return)): ?>
    <div class="p-5"></div>
<?php endif; ?>
