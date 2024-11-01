<!-- ======= 500 ======= -->
<div class="col-12">
    <div class="d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-start align-items-center">
            <h1 class="display-1 text-danger me-3">500</h1>
            <div style="max-width: 500px">
                <h3><i class="bi bi-exclamation-triangle fs-1 text-danger me-2"></i>Oops! Something went wrong.</h3>
                <p>
                    We will work on fixing that right away.
                    Meanwhile, you may <a href="/">return to dashboard</a> or try using the search form.
                </p>
                <form action="?p=searchResults" method="post" autocomplete="on" novalidate>
                    <div class="input-group">
                        <input type="text" name="search" class="form-control search" placeholder="Search..." value="<?php if(isset($_POST['search'])){ echo $_POST['search']; } ?>">
                        <button type="submit" name="submit" class="btn btn-secondary"><i class="bi bi-search"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- ======= End 500 ======= -->
