<!-- ======= Search Results ======= -->
<div class="col-12">
    <div class="row">
        <div class="col-12">
            <form action="?p=searchResults" method="post" autocomplete="on" novalidate>
                <div class="input-group">
                    <input type="text" name="search" class="form-control search" placeholder="Search..." value="<?php if(isset($_POST['search'])){ echo $_POST['search']; } ?>">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Contacts</a></li>
                        <li><a class="dropdown-item" href="#">Files</a></li>
                        <li><a class="dropdown-item" href="#">Organizations</a></li>
                        <li><a class="dropdown-item" href="#">Roles</a></li>
                        <li><a class="dropdown-item" href="#">Transactions</a></li>
                        <li><a class="dropdown-item" href="#">Users</a></li>
                    </ul>
                    <button type="submit" name="submit" class="btn btn-secondary"><i class="bi bi-search"></i></button>
                </div>
            </form>
        </div>
        <div class="col-12 mt-4" id="results"></div>
    </div>
</div>
<script src="/js/<?= $page ?>.js"></script>
<!-- ======= End Search Results ======= -->