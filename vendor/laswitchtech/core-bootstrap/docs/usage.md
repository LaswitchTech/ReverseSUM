# Usage
## Import coreBootstrap
To import coreBootstrap in your project, you can open `config/css.cfg` and `config/js.cfg` to retrieve the list of files to include in your project. You can also use `coreRouter` to import the files in your project. The following code snippet shows how to import coreBootstrap in your project using `coreRouter`:

```html
<!-- ======= Within a view file ======= -->

<!-- ======= Load coreBootstrap CSS ======= -->
<?= $this->css(); ?>

<!-- ======= Load coreBootstrap JS ======= -->
<?= $this->js(); ?>
```

You will also need to add a symlink to the `coreBootstrap` directory in your project's `public/dist/plugins` directory. The following code snippet shows how to add a symlink to the `coreBootstrap` directory in your project's `public/dist/plugins` directory:

```bash
ln -s vendor/laswitchtech/core-bootstrap dist/plugins/core-bootstrap
```

Note: This is necessary due to `coreRouter` handling of paths.
