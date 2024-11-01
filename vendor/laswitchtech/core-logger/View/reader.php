<div>
    <table class="table table-hover table-striped">
        <thead>
            <tr>
                <th>Timestamp</th>
                <?php if(isset($this->Return[0]['ip'])): ?>
                    <th>IP</th>
                <?php endif; ?>
                <th>Level</th>
                <th>Trace</th>
                <th>Message</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($this->Return as $log): ?>
                <tr>
                    <td><?= $log['timestamp'] ?></td>
                    <?php if(isset($log['ip'])): ?>
                        <td><?= $log['ip'] ?></td>
                    <?php endif; ?>
                    <td><?= $log['level'] ?></td>
                    <td><?= $log['trace'] ?></td>
                    <td><?= $log['message'] ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
