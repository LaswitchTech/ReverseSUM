<!-- ======= List ======= -->
<div class="col-12">
    <div class="row">
        <div id="example" class="col-12 my-2 d-flex justify-content-center align-items-center"></div>
        <div id="code" class="col-12 my-2"></div>
        <div id="htmlcode" class="col-12 my-2"></div>
    </div>
</div>
<?php if($type){ $source = $type.'/'.$page; } else { $source = $page; }?>
<script src="/js/<?= $source ?>.js"></script>
<script>
    $(document).ready(function(){

        // Retrieve the script code
        $.ajax({
            url: '/js/<?= $source ?>.js',
            dataType: 'text',
            success: function(data) {

                // Code
                const code = sampleBuilder.Component(
                    "code", //Component Name
                    "#code", //Selector or JQuery Object to appendTo
                    {
                        language: 'javascript',
                        title: 'Code',
                        clipboard:true,
                        fullscreen:true,
                        collapsed:true,
                        code:data,
                    },
                );

                // HTML Code
                let pretty = prettier.format(sampleComponent.outerHTML(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
                const html = sampleBuilder.Component(
                    "code", //Component Name
                    "#htmlcode", //Selector or JQuery Object to appendTo
                    {
                        language: 'markup',
                        title: 'Code',
                        clipboard:true,
                        fullscreen:true,
                        collapsed:true,
                        code:pretty,
                    },
                );
            },
            error: function(xhr, status, error) {
                console.error('Error fetching the JS file:', status, error);
            }
        });
    });
</script>
<!-- ======= End List ======= -->
