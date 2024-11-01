<!-- ======= New Article ======= -->
<div class="col-12">
    <div class="row">
        <div class="col-12 my-2">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title"><i class="bi bi-pencil-square me-1"></i>Form</h4>
                </div>
                <div class="card-body" id="new">
                    <h4>Title:</h4>
                    <input id="newTitle" class="form-control form-control-lg" type="text" placeholder="Title">
                    <h4 class="mt-2">Section:</h4>
                    <select id="newSection" class="form-control form-control-lg">
                        <option value="0">Select Section</option>
                        <option value="FAQs">FAQs</option>
                        <option value="How-tos">How-tos</option>
                        <option value="Bugs">Bugs</option>
                        <option value="Announcements">Announcements</option>
                        <option value="Troubleshooting guides">Troubleshooting guides</option>
                        <option value="Informational">Informational</option>
                    </select>
                    <h4 class="mt-2">Article:</h4>
                    <div id="newArticle"></div>
                </div>
            </div>
        </div>
        <div id="preview" class="col-12 my-2">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title"><i class="bi bi-eye me-1"></i>Preview</h4>
                </div>
                <div class="card-body" id="preview">
                    <div>
                        <h2 class="card-title" id="previewTitle"></h2>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="p-2">
                            <img src="" data-avatar="john.doe@domain.com" alt="mdo" width="72" height="72" class="rounded-circle">
                        </div>
                        <div class="flex-grow-1 p-2">
                            <h6 class="my-0 mb-1">john.doe@domain.com</h6>
                            <p class="my-0"><i class="bi bi-clock me-1"></i><time class="timeago" datetime="<?= date('Y-m-d H:i:s') ?>"><?= date('Y-m-d H:i:s') ?></time></p>
                        </div>
                        <div class="p-2">
                            <button type="button" class="btn btn-primary"><i class="bi bi-pin-angle me-1"></i>Pin</button>
                        </div>
                    </div>
                    <div id="previewArticle"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/js/kbNew.js"></script>
<!-- ======= End New Article ======= -->