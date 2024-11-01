<div>
    <table class="table table-hover table-striped">
        <thead>
            <tr>
                <th>Log Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($this->Return as $log): ?>
                <tr>
                    <td><?= $log ?></td>
                    <td><a href="/logger/clear?name=<?= $log ?>" class="btn btn-sm btn-danger">Clear</a></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
