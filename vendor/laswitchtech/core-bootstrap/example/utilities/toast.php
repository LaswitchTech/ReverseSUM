<!-- ======= Toast ======= -->
<div class="col-12">
    <div class="row">
        <div class="col-12 my-2">
            <div class="card">
                <div class="card-body text-center">
                    <button id="create" type="button" class="btn btn-primary w-100">Create</button>
                </div>
            </div>
        </div>
        <div class="col-12 my-2">
            <div class="card">
                <div class="card-body text-center">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <button id="top-start" type="button" class="btn btn-secondary p-2 px-3"><i class="bi bi-app"></i></button>
                        <button id="top-center" type="button" class="btn btn-secondary p-2 px-3"><i class="bi bi-app"></i></button>
                        <button id="top-end" type="button" class="btn btn-secondary p-2 px-3"><i class="bi bi-app"></i></button>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <button id="bottom-start" type="button" class="btn btn-secondary p-2 px-3"><i class="bi bi-app"></i></button>
                        <button id="bottom-center" type="button" class="btn btn-secondary p-2 px-3"><i class="bi bi-app"></i></button>
                        <button id="bottom-end" type="button" class="btn btn-secondary p-2 px-3"><i class="bi bi-app"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div id="code" class="col-12 my-2"></div>
        <div id="htmlcode" class="col-12 my-2"></div>
    </div>
</div>
<?php if($type){ ?>
    <script src="/js/<?= $type ?>/<?= $page ?>.js"></script>
<?php } else { ?>
    <script src="/js/<?= $page ?>.js"></script>
<?php } ?>
<!-- ======= End Toast ======= -->