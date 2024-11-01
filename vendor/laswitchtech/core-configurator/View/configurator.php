<?php use LaswitchTech\coreConfigurator\Form; ?>
<?php $Form = new Form(); ?>
<?php foreach($Form->list(true) as $file): ?>
    <form method="post">
        <?php foreach($Form->get($file) as $key => $value): ?>
            <div class="form-group">
                <label for="<?php echo $key; ?>"><?php echo $value['label']; ?></label>
                <?php if($value['type'] == 'select'): ?>
                    <select class="form-control" id="<?php echo $key; ?>" name="<?php echo $key; ?>" required>
                        <?php foreach($value['options'] as $option): ?>
                            <option value="<?php echo $option; ?>"><?php echo $option; ?></option>
                        <?php endforeach; ?>
                    </select>
                <?php else: ?>
                    <input type="<?php echo $value['type']; ?>" class="form-control" id="<?php echo $key; ?>" name="<?php echo $key; ?>" value="<?php echo $value['default']; ?>" placeholder="<?php echo $value['placeholder']; ?>" required>
                <?php endif; ?>
                <small id="<?php echo $key; ?>Help" class="form-text text-muted"><?php echo $value['tooltip']; ?></small>
            </div>
        <?php endforeach; ?>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
<?php endforeach; ?>
