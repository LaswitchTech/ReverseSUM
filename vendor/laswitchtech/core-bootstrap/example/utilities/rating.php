<!-- ======= Rating ======= -->
<div class="col-12">
    <div class="row">
        <div class="col-12 my-2">
            <div class="card card-body" id="example"></div>
        </div>
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
                    "code",
                    "#code",
                    {
                        language: 'javascript',
                        title: 'Code',
                        clipboard:true,
                        fullscreen:true,
                        collapsed:true,
                        code:data,
                    },
                );
            },
            error: function(xhr, status, error) {
                console.error('Error fetching the JS file:', status, error);
            }
        });
    });
</script>
<!-- ======= End Rating ======= -->
