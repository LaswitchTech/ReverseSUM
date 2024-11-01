<?php
$this->Configurator->add('themes');
$this->Configurator->add('defaults');
$this->Configurator->add('identity');
if($this->Configurator->get('identity','brand') === null){
    $this->Configurator->set('identity','brand',$this->Configurator->get('defaults','brand'));
    $this->Configurator->set('identity','gradient-start',$this->Configurator->get('defaults','gradient-start'));
    $this->Configurator->set('identity','gradient-end',$this->Configurator->get('defaults','gradient-end'));
}
?>
<!doctype html>
<html lang="en" data-bs-theme="light" data-theme="<?= $this->Configurator->get('identity','theme')?>" class="h-100 w-100">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?= $this->getLabel() ?></title>

        <!-- ======= Fav Icons ======= -->
        <link rel="icon" href="/img/favicon.ico">
        <link rel="icon" sizes="16x16" href="/img/favicon-16.png">
        <link rel="icon" sizes="32x32" href="/img/favicon-32.png">
        <link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
        <link rel="manifest" href="/img/site.webmanifest">

        <!-- ======= Load Global CSS ======= -->
        <?= $this->css(); ?>

        <!-- ======= Load Themes CSS ======= -->
        <?php foreach($this->Configurator->get('themes','themes') as $name => $theme){ ?>
            <link rel="stylesheet" href="/css/themes/<?= $name ?>/styles.css" data-theme="<?= $name ?>" disabled>
        <?php } ?>

        <!-- ======= CSRF_TOKEN ======= -->
        <script>
            const CSRF_TOKEN = "<?php echo $this->CSRF->token(); ?>";
        </script>

        <!-- ======= Load Global JS ======= -->
        <?= $this->js(); ?>

        <!-- ======= Testing Styles ======= -->
        <style>
            body {
                /* Remove background image */
                background-image: none !important;
                background-color: none !important;
                /* Glass */
                background: linear-gradient(45deg, <?php echo $this->Configurator->get('identity','gradient-start') ?>, <?php echo $this->Configurator->get('identity','gradient-end') ?>)!important;
                background-attachment: fixed !important;
            }
            #sidebar {
                width: 300px;
            }
            #sidebar.collapsing {
                width: 0px;
            }
            #content {
                margin-left: 300px;
                width: calc(100vw - 300px);
                transition: 300ms ease;
            }
        </style>
    </head>
    <body data-bs-spy="scroll" data-bs-target="#main-nav" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabindex="0" class="h-100 w-100">

        <!-- ======= Controls ======= -->
        <div id="controls" class="d-flex position-fixed bottom-0 end-0 mb-3 me-3" style="z-index:1041;">

            <!-- ======= Back to Top ======= -->
            <div class="mx-1 back-to-top">
                <a href="#" class="d-flex align-items-center justify-content-center btn btn-primary shadow py-2">
                    <i class="bi bi-arrow-up" style="font-size:1.5em;"></i>
                </a>
            </div>
            <!-- ======= End Back to Top ======= -->

        </div>
        <!-- ======= End Controls ======= -->

        <!-- ======= Main ======= -->
        <main class="h-100 w-100">

            <!-- ======= Header ======= -->
            <div class="fixed-top shadow">
                <nav class="py-2 bg-body-tertiary bg-dark border-bottom">
                    <div class="d-flex flex-wrap px-5">
                        <a href="/" class="d-flex justify-content-center align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                            <img src="/img/logo.png" alt="Logo" class="me-2" style="max-height: 64px;max-width: 64px;">
                            <h1 class="display-5 fw-lighter m-0"><?php echo $this->Configurator->get('identity','brand') ?></h1>
                        </a>
                        <ul class="nav z-1040" style="padding-top: 3px;">

                            <!-- ======= FullScreen ======= -->
                            <li class="nav-item">
                                <button id="fullscreenToggle" type="button" class="nav-link text-decoration-none py-2 animate-slide-hover-top-20">
                                    <i class="bi bi-fullscreen fs-4" style="height: 2.25rem !important;width: 1.5rem !important"></i>
                                </button>
                            </li>
                            <!-- ======= End FullScreen ======= -->
                        </ul>
                    </div>
                </nav>
            </div>
            <!-- ======= End Header ======= -->

            <!--- Load View --->
            <!-- <div class="container-fluid px-0"> -->
            <div class="container-fluid px-0" style="padding-top: 88px;">
                <?php require $this->getViewFile(); ?>
            </div>

            <!-- ======= Footer ======= -->
            <div class="container-fluid px-5 pt-2 border-top shadow bg-dark">
                <footer class="py-5">
                    <div class="d-flex flex-column flex-sm-row justify-content-between pt-4 px-3 mb-4 border-top">
                        <!-- ======= GitHub ======= -->
                        <a href="https://github.com/LaswitchTech/ReverseSUM" class="btn btn-link py-1 d-flex align-items-center" target="_blank">
                            <i class="bi bi-github fs-1"></i>
                            <p class="text-muted m-0 ms-3"><?= $this->Locale->get('Source Code') ?></p>
                        </a>
                        <!-- ======= End GitHub ======= -->
                        <!-- ======= Locale ======= -->
                        <div class="dropdown dropup-center dropup ms-auto">
                            <button class="btn btn-link py-1 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <?= $this->Locale->current('language'); ?>
                            </button>
                            <ul class="dropdown-menu">
                                <?php foreach($this->Locale->list() as $locale => $language): ?>
                                    <?php if($locale === $this->Locale->current('name')){ continue; } ?>
                                    <li><a class="dropdown-item" href="?locale=<?= $locale ?>"><?= $language ?></a></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                        <!-- ======= End Locale ======= -->
                    </div>
                </footer>
            </div>
            <!-- ======= End Footer ======= -->
        </main>
        <!-- ======= End Main ======= -->

        <!-- ======= Panel.JS ======= -->
        <script src="/js/panel.js"></script>
    </body>
</html>
