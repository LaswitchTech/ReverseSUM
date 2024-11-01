<?php
    $page = 'dashboard';
    $type = null;

    if(isset($_GET,$_GET['p'])){ $page = $_GET['p']; }
    if(isset($_GET,$_GET['t'])){ $type = $_GET['t']; }

    $file = $page . '.php';
    if($type){ $file = $type . '/' . $page . '.php'; }
    $file = './' . $file;

    if(!file_exists($file)){ $page = '404'; }

    $title = ucwords(str_replace('_',' ',$page));
    if($type){ $title = ucwords(str_replace('_',' ',$type)) . ' - ' . $title; }

    /**
     * Scans a directory for files of a specific type.
     *
     * @param string $dir The directory to scan.
     * @param string $extension The file extension to look for (e.g., "txt").
     * @return array An array of files with the specified extension.
     */
    function scan($dir, $extension) {
        $files = array();
        
        // Check if directory exists
        if (!is_dir($dir)) {
            return false;
        }

        // Open directory and read its content
        if ($handle = opendir($dir)) {
            while (($file = readdir($handle)) !== false) {
                if ($file != "." && $file != ".." && pathinfo($file, PATHINFO_EXTENSION) == $extension) {
                    $files[] = $file;
                }
            }
            closedir($handle);
        }

        return $files;
    }

    /**
     * Scans a directory for files of a specific type.
     *
     * @param array $items The list of menu items.
     * @param int $depth of the menu.
     * @param boolean $reorder whether to reorder the items by name.
     * @return string A string containing the HTML menu.
     */
    function generateMenu($items, $depth=0, $reorder=false) {

        // Start the menu list
        $html = '<ul class="nav nav-pills flex-column">';

        // Sort the array by key in ascending order
        if($reorder) ksort($items);
    
        foreach($items as $key => $item) {

            // Generate unique id for the collapse component
            $id = 'menu-' . $key . '-' . $depth;
    
            if(isset($item['sub'])) {
                // Menu with submenu
                $html .= '<li class="nav-item ps-2">';
                $html .= '<button class="nav-link" data-bs-toggle="collapse" data-bs-target="#' . $id . '" role="button" aria-expanded="false" aria-controls="' . $id . '">';
                $html .= '<i class="bi bi-' . $item['icon'] . ' me-1"></i>';
                $html .= '<span class="">' . $item['label'] . '</span>';
                $html .= '</button>';
                $html .= '<div class="collapse" id="' . $id . '">';
                $html .= generateMenu($item['sub'], $depth+1, true); // Recursive call for submenu
                $html .= '</div>';
                $html .= '</li>';
            } else {
                // Simple menu item
                $html .= '<li class="nav-item ps-2">';
                $html .= '<a class="nav-link" href="' . $item['link'] . '">';
                $html .= '<i class="bi bi-' . $item['icon'] . ' me-1"></i>';
                $html .= '<span class="">' . $item['label'] . '</span>';
                $html .= '</a>';
                $html .= '</li>';
            }
        }
    
        // Close the menu list
        $html .= '</ul>';
    
        return $html;
    }

    $sidebar = [
        "dashboard" => [
            "label" => "Dashboard",
            "icon" => "speedometer2",
            "link" => "/",
        ],
        "animations" => [
            "label" => "Animations",
            "icon" => "play-circle",
            "link" => "?p=animations",
        ],
        "components" => [
            "label" => "Components",
            "icon" => "layers",
            "link" => "#",
            "sub" => [],
        ],
        "forms" => [
            "label" => "Forms",
            "icon" => "input-cursor",
            "link" => "#",
            "sub" => [],
        ],
        "helpers" => [
            "label" => "Helpers",
            "icon" => "wrench-adjustable",
            "link" => "#",
            "sub" => [],
        ],
        "layouts" => [
            "label" => "Layouts",
            "icon" => "layout-wtf",
            "link" => "#",
            "sub" => [],
        ],
        "pages" => [
            "label" => "Pages",
            "icon" => "file-earmark",
            "link" => "#",
            "sub" => [],
        ],
        "playground" => [
            "label" => "Playground",
            "icon" => "play-circle",
            "link" => "?p=playground",
        ],
        "utilities" => [
            "label" => "Utilities",
            "icon" => "tools",
            "link" => "#",
            "sub" => [],
        ],
    ];

    foreach($sidebar as $ptype => $pitem){
        if(isset($sidebar[$ptype]['sub'])){
            if(is_dir('./' . $ptype)){
                foreach(scan('./' . $ptype, 'php') as $pfile) {
                    $sidebar[$ptype]['sub'][pathinfo($pfile, PATHINFO_FILENAME)] = [
                        "label" => ucwords(str_replace('_',' ',pathinfo($pfile, PATHINFO_FILENAME))),
                        "icon" => $sidebar[$ptype]['icon'],
                        "link" => "?t=" . $ptype . "&p=" . pathinfo($pfile, PATHINFO_FILENAME),
                    ];
                    if($ptype == 'pages'){
                        $sidebar[$ptype]['sub'][pathinfo($pfile, PATHINFO_FILENAME)]['link'] = $ptype . '/' . $pfile;
                    }
                }
            }
        }
    }
?>
<!doctype html>
<html lang="en" data-bs-theme="light" data-theme="glass" class="h-100 w-100">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Panel - <?= $title; ?></title>

        <!-- ======= Bootstrap 5 ======= -->
        <link rel="stylesheet" href="/css/themes/default/styles.css">

        <!-- ======= Boostrap Icons ======= -->
        <link rel="stylesheet" href="/plugins/bootstrap/css/bootstrap-icons.min.css">

        <!-- ======= Leaflet.JS ======= -->
        <link rel="stylesheet" href="/plugins/leaflet/css/leaflet.css">

        <!-- ======= Tempus-Dominus.JS ======= -->
        <link rel="stylesheet" href="/plugins/tempus-dominus/css/tempus-dominus.min.css">

        <!-- ======= Prism.JS ======= -->
        <link rel="stylesheet" href="/plugins/prism/css/prism-tomorrow.min.css">
        <link rel="stylesheet" href="/plugins/prism/css/prism-autolinker.min.css">
        <link rel="stylesheet" href="/plugins/prism/css/prism-ie8.min.css">
        <link rel="stylesheet" href="/plugins/prism/css/prism-line-highlight.min.css">
        <link rel="stylesheet" href="/plugins/prism/css/prism-line-numbers.min.css">
        <link rel="stylesheet" href="/plugins/prism/css/prism-show-language.min.css">
        <link rel="stylesheet" href="/plugins/prism/css/prism-wpd.min.css">

        <!-- ======= DataTables.JS ======= -->
        <link rel="stylesheet" href="/plugins/datatables/css/dataTables.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/buttons.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/colReorder.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/fixedColumns.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/fixedHeader.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/keyTable.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/responsive.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/rowGroup.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/rowReorder.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/scroller.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/searchBuilder.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/dataTables.dateTime.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/stateRestore.bootstrap5.min.css">
        <link rel="stylesheet" href="/plugins/datatables/css/select.bootstrap5.min.css">

        <!-- ======= Select2 ======= -->
        <link rel="stylesheet" href="/plugins/select2/css/select2.min.css" />
        <link rel="stylesheet" href="/plugins/select2/css/select2-bootstrap-5-theme.min.css" />

        <!-- ======= Themes ======= -->
        <link rel="stylesheet" href="/css/themes/cerulean/styles.css" data-theme="cerulean" disabled>
        <link rel="stylesheet" href="/css/themes/cosmos/styles.css" data-theme="cosmos" disabled>
        <link rel="stylesheet" href="/css/themes/cyborg/styles.css" data-theme="cyborg" disabled>
        <link rel="stylesheet" href="/css/themes/darkly/styles.css" data-theme="darkly" disabled>
        <link rel="stylesheet" href="/css/themes/flathy/styles.css" data-theme="flathy" disabled>
        <link rel="stylesheet" href="/css/themes/glass/styles.css" data-theme="glass" disabled>
        <link rel="stylesheet" href="/css/themes/journal/styles.css" data-theme="journal" disabled>
        <link rel="stylesheet" href="/css/themes/litera/styles.css" data-theme="litera" disabled>
        <link rel="stylesheet" href="/css/themes/lumen/styles.css" data-theme="lumen" disabled>
        <link rel="stylesheet" href="/css/themes/lux/styles.css" data-theme="lux" disabled>
        <link rel="stylesheet" href="/css/themes/materia/styles.css" data-theme="materia" disabled>
        <link rel="stylesheet" href="/css/themes/minty/styles.css" data-theme="minty" disabled>
        <link rel="stylesheet" href="/css/themes/morph/styles.css" data-theme="morph" disabled>
        <link rel="stylesheet" href="/css/themes/pulse/styles.css" data-theme="pulse" disabled>
        <link rel="stylesheet" href="/css/themes/quartz/styles.css" data-theme="quartz" disabled>
        <link rel="stylesheet" href="/css/themes/sandstone/styles.css" data-theme="sandstone" disabled>
        <link rel="stylesheet" href="/css/themes/simplex/styles.css" data-theme="simplex" disabled>
        <link rel="stylesheet" href="/css/themes/sketchy/styles.css" data-theme="sketchy" disabled>
        <link rel="stylesheet" href="/css/themes/slate/styles.css" data-theme="slate" disabled>
        <link rel="stylesheet" href="/css/themes/solar/styles.css" data-theme="solar" disabled>
        <link rel="stylesheet" href="/css/themes/spacelab/styles.css" data-theme="spacelab" disabled>
        <link rel="stylesheet" href="/css/themes/superhero/styles.css" data-theme="superhero" disabled>
        <link rel="stylesheet" href="/css/themes/united/styles.css" data-theme="united" disabled>
        <link rel="stylesheet" href="/css/themes/vapor/styles.css" data-theme="vapor" disabled>
        <link rel="stylesheet" href="/css/themes/yeti/styles.css" data-theme="yeti" disabled>
        <link rel="stylesheet" href="/css/themes/zephyr/styles.css" data-theme="zephyr" disabled>

        <!-- ======= JQuery ======= -->
        <script src="/plugins/jquery/js/jquery.min.js"></script>

        <!-- ======= JQuery - Input Mask ======= -->
        <script src="/plugins/jquery/js/jquery.inputmask.min.js"></script>

        <!-- ======= Bootstrap ======= -->
        <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- ======= JQuery Timeago ======= -->
        <script src="/plugins/timeago/js/jquery.timeago.min.js"></script>

        <!-- ======= Chart.JS ======= -->
        <script src="/plugins/chart/js/chart.js"></script>

        <!-- ======= Leaflet.JS ======= -->
        <script src="/plugins/leaflet/js/leaflet.js"></script>

        <!-- ======= Tempus-Dominus.JS ======= -->
        <script src="/plugins/tempus-dominus/js/tempus-dominus.min.js"></script>

        <!-- ======= Prism.JS ======= -->
        <script src="/plugins/prism/js/prism.min.js"></script>
        <script src="/plugins/prism/js/prism-actionscript.min.js"></script>
        <script src="/plugins/prism/js/prism-apacheconf.min.js"></script>
        <script src="/plugins/prism/js/prism-applescript.min.js"></script>
        <script src="/plugins/prism/js/prism-aspnet.min.js"></script>
        <script src="/plugins/prism/js/prism-autohotkey.min.js"></script>
        <script src="/plugins/prism/js/prism-bash.min.js"></script>
        <script src="/plugins/prism/js/prism-c.min.js"></script>
        <script src="/plugins/prism/js/prism-clike.min.js"></script>
        <script src="/plugins/prism/js/prism-coffeescript.min.js"></script>
        <script src="/plugins/prism/js/prism-cpp.min.js"></script>
        <script src="/plugins/prism/js/prism-csharp.min.js"></script>
        <script src="/plugins/prism/js/prism-css.min.js"></script>
        <script src="/plugins/prism/js/prism-dart.min.js"></script>
        <script src="/plugins/prism/js/prism-eiffel.min.js"></script>
        <script src="/plugins/prism/js/prism-erlang.min.js"></script>
        <script src="/plugins/prism/js/prism-fortran.min.js"></script>
        <script src="/plugins/prism/js/prism-fsharp.min.js"></script>
        <script src="/plugins/prism/js/prism-gherkin.min.js"></script>
        <script src="/plugins/prism/js/prism-git.min.js"></script>
        <script src="/plugins/prism/js/prism-go.min.js"></script>
        <script src="/plugins/prism/js/prism-groovy.min.js"></script>
        <script src="/plugins/prism/js/prism-haml.min.js"></script>
        <script src="/plugins/prism/js/prism-handlebars.min.js"></script>
        <script src="/plugins/prism/js/prism-haskell.min.js"></script>
        <script src="/plugins/prism/js/prism-http.min.js"></script>
        <script src="/plugins/prism/js/prism-ini.min.js"></script>
        <script src="/plugins/prism/js/prism-jade.min.js"></script>
        <script src="/plugins/prism/js/prism-java.min.js"></script>
        <script src="/plugins/prism/js/prism-javascript.min.js"></script>
        <script src="/plugins/prism/js/prism-jsx.min.js"></script>
        <script src="/plugins/prism/js/prism-julia.min.js"></script>
        <script src="/plugins/prism/js/prism-latex.min.js"></script>
        <script src="/plugins/prism/js/prism-less.min.js"></script>
        <script src="/plugins/prism/js/prism-lolcode.min.js"></script>
        <script src="/plugins/prism/js/prism-markdown.min.js"></script>
        <script src="/plugins/prism/js/prism-markup.min.js"></script>
        <script src="/plugins/prism/js/prism-matlab.min.js"></script>
        <script src="/plugins/prism/js/prism-nasm.min.js"></script>
        <script src="/plugins/prism/js/prism-nsis.min.js"></script>
        <script src="/plugins/prism/js/prism-objectivec.min.js"></script>
        <script src="/plugins/prism/js/prism-pascal.min.js"></script>
        <script src="/plugins/prism/js/prism-perl.min.js"></script>
        <script src="/plugins/prism/js/prism-php-extras.min.js"></script>
        <script src="/plugins/prism/js/prism-php.min.js"></script>
        <script src="/plugins/prism/js/prism-powershell.min.js"></script>
        <script src="/plugins/prism/js/prism-python.min.js"></script>
        <script src="/plugins/prism/js/prism-r.min.js"></script>
        <script src="/plugins/prism/js/prism-rest.min.js"></script>
        <script src="/plugins/prism/js/prism-rip.min.js"></script>
        <script src="/plugins/prism/js/prism-ruby.min.js"></script>
        <script src="/plugins/prism/js/prism-rust.min.js"></script>
        <script src="/plugins/prism/js/prism-sas.min.js"></script>
        <script src="/plugins/prism/js/prism-scala.min.js"></script>
        <script src="/plugins/prism/js/prism-scheme.min.js"></script>
        <script src="/plugins/prism/js/prism-scss.min.js"></script>
        <script src="/plugins/prism/js/prism-smalltalk.min.js"></script>
        <script src="/plugins/prism/js/prism-smarty.min.js"></script>
        <script src="/plugins/prism/js/prism-sql.min.js"></script>
        <script src="/plugins/prism/js/prism-stylus.min.js"></script>
        <script src="/plugins/prism/js/prism-swift.min.js"></script>
        <script src="/plugins/prism/js/prism-twig.min.js"></script>
        <script src="/plugins/prism/js/prism-typescript.min.js"></script>
        <script src="/plugins/prism/js/prism-wiki.min.js"></script>
        <script src="/plugins/prism/js/prism-yaml.min.js"></script>
        <script src="/plugins/prism/js/prism-autolinker.min.js"></script>
        <script src="/plugins/prism/js/prism-file-highlight.min.js"></script>
        <script src="/plugins/prism/js/prism-highlight-keywords.min.js"></script>
        <script src="/plugins/prism/js/prism-ie8.min.js"></script>
        <script src="/plugins/prism/js/prism-line-highlight.min.js"></script>
        <script src="/plugins/prism/js/prism-line-numbers.min.js"></script>
        <script src="/plugins/prism/js/prism-show-language.min.js"></script>
        <script src="/plugins/prism/js/prism-wpd.min.js"></script>

        <!-- ======= Prettier.JS ======= -->
        <script src="/plugins/prettier/js/standalone.js"></script>
        <script src="/plugins/prettier/js/parser-html.js"></script>

        <!-- ======= JSZip.JS ======= -->
        <script src="/plugins/jszip/js/jszip.min.js"></script>

        <!-- ======= PDFMake.JS ======= -->
        <script src="/plugins/pdfmake/js/pdfmake.min.js"></script>
        <script src="/plugins/pdfmake/js/vfs_fonts.js"></script>

        <!-- ======= DataTables.JS ======= -->
        <script src="/plugins/datatables/js/jquery.dataTables.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.bootstrap5.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.buttons.min.js"></script>
        <script src="/plugins/datatables/js/buttons.bootstrap5.min.js"></script>
        <script src="/plugins/datatables/js/buttons.colVis.min.js"></script>
        <script src="/plugins/datatables/js/buttons.html5.min.js"></script>
        <script src="/plugins/datatables/js/buttons.print.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.dateTime.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.fixedColumns.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.fixedHeader.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.keyTable.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.responsive.min.js"></script>
        <script src="/plugins/datatables/js/responsive.bootstrap5.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.rowGroup.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.rowReorder.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.scroller.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.searchBuilder.min.js"></script>
        <script src="/plugins/datatables/js/searchBuilder.bootstrap5.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.dateTime.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.stateRestore.min.js"></script>
        <script src="/plugins/datatables/js/stateRestore.bootstrap5.min.js"></script>
        <script src="/plugins/datatables/js/dataTables.select.min.js"></script>

        <!-- ======= FullCalendar.JS ======= -->
        <script src="/plugins/fullcalendar/js/index.global.min.js"></script>

        <!-- ======= Select2.JS ======= -->
        <script src="/plugins/select2/js/select2.min.js"></script>

        <!-- ======= Showdown.JS ======= -->
        <script src="/plugins/showdown/js/showdown.min.js"></script>

        <!-- ======= Turndown.JS ======= -->
        <script src="/plugins/turndown/js/turndown.js"></script>

        <!-- ======= TinyMCE.JS ======= -->
        <script src="/plugins/tinymce/tinymce.min.js"></script>
        <script src="/plugins/tinymce/js/tinymce-jquery.min.js"></script>

        <!-- ======= Builder.JS ======= -->
        <script src="/js/builder.js"></script>
    </head>
    <body data-bs-spy="scroll" data-bs-target="#main-nav" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabindex="0" class="h-100 w-100">

        <!-- ======= Controls ======= -->
        <div id="controls" class="d-flex position-fixed bottom-0 end-0 mb-3 me-3" style="z-index:1041;">

            <!-- ======= Collapsible ======= -->
            <div id="controlsCollapsible" class="collapse collapse-horizontal show">

                <div class="d-flex">

                    <!-- ======= Back to Top ======= -->
                    <div class="mx-1 back-to-top" style="display:none;">
                        <a href="#" class="d-flex align-items-center justify-content-center btn btn-primary py-2">
                            <i class="bi bi-arrow-up my-1" style="font-size:1em;"></i>
                        </a>
                    </div>
                    <!-- ======= End Back to Top ======= -->

                    <!-- ======= Light Mode Selector ======= -->
                    <div class="mx-1 dropdown dropup">
                        <button class="btn btn-primary py-2 dropdown-toggle d-flex align-items-center" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
                        <i class="bi bi-circle-half my-1 theme-icon-active" style="font-size:1em;"></i>
                        <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
                        <li>
                            <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                            <i class="bi bi-sun-fill me-2 opacity-50 theme-icon" style="font-size:1em;"></i>
                            Light
                            </button>
                        </li>
                        <li>
                            <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                            <i class="bi bi-moon-stars-fill me-2 opacity-50 theme-icon" style="font-size:1em;"></i>
                            Dark
                            </button>
                        </li>
                        <li>
                            <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                            <i class="bi bi-circle-half me-2 opacity-50 theme-icon" style="font-size:1em;"></i>
                            Auto
                            </button>
                        </li>
                        </ul>
                    </div>
                    <!-- ======= End Light Mode Selector ======= -->

                    <!-- ======= Theme Selector ======= -->
                    <div class="mx-1 dropdown dropup">
                        <button class="btn btn-primary py-2 dropdown-toggle d-flex align-items-center" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
                            <i class="bi bi-palette my-1 theme-icon-active" style="font-size:1em;"></i>
                            <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center active" data-theme-value="default" aria-pressed="true">
                                Default
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="cerulean" aria-pressed="false">
                                Cerulean
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="cosmos" aria-pressed="false">
                                Cosmos
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="cyborg" aria-pressed="false">
                                Cyborg
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="darkly" aria-pressed="false">
                                Darkly
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="flathy" aria-pressed="false">
                                Flathy
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="glass" aria-pressed="false">
                                Glass
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="journal" aria-pressed="false">
                                Journal
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="litera" aria-pressed="false">
                                Litera
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="lumen" aria-pressed="false">
                                Lumen
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="lux" aria-pressed="false">
                                Lux
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="materia" aria-pressed="false">
                                Materia
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="minty" aria-pressed="false">
                                Minty
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="morph" aria-pressed="false">
                                Morph
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="pulse" aria-pressed="false">
                                Pulse
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="quartz" aria-pressed="false">
                                Quartz
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="sandstone" aria-pressed="false">
                                Sandstone
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="simplex" aria-pressed="false">
                                Simplex
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="sketchy" aria-pressed="false">
                                Sketchy
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="slate" aria-pressed="false">
                                Slate
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="solar" aria-pressed="false">
                                Solar
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="spacelab" aria-pressed="false">
                                Spacelab
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="superhero" aria-pressed="false">
                                Superhero
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="united" aria-pressed="false">
                                United
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="vapor" aria-pressed="false">
                                Vapor
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="yeti" aria-pressed="false">
                                Yeti
                                </button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="zephyr" aria-pressed="false">
                                Zephyr
                                </button>
                            </li>
                        </ul>
                    </div>
                    <!-- ======= End Theme Selector ======= -->

                </div>

            </div>
            <!-- ======= End Collapsible ======= -->

            <!-- ======= Collapse ======= -->
            <div class="mx-1">
                <button type="button" class="d-flex align-items-center justify-content-center btn btn-primary py-2" data-bs-toggle="collapse" data-bs-target="#controlsCollapsible" aria-expanded="true" aria-controls="controlsCollapsible">
                    <i class="bi bi-chevron-right my-1" style="font-size:1em;"></i>
                </button>
            </div>
            <!-- ======= End Collapse ======= -->

        </div>
        <!-- ======= End Controls ======= -->

        <!-- ======= Toasts ======= -->
        <div id="toastArea"></div>
        <!-- ======= End Toasts ======= -->
        
        <!-- ======= Main ======= -->
        <main>
        
            <!-- ======= Panel ======= -->
            <div class="container-fluid">
                <div class="row">

                    <!-- ======= Sidebar ======= -->
                    <div class="col-md-2 sidebar vh-100 pb-4 bg-dark bg-glass position-fixed vh-100 overflow-y collapse collapse-horizontal show" id="sidebar">
                        <div class="container-fluid">
                            <a class="sidebar-brand w-100 d-flex justify-content-center align-items-center py-4 fs-4 text-decoration-none" href="/">
                                <i class="bi bi-bootstrap-fill me-2 fs-1"></i>
                                <h4 class="brand m-0">Panel</h4>
                            </a>
                            <?= generateMenu($sidebar) ?>
                        </div>
                    </div>
                    <!-- ======= End Sidebar ======= -->
                
                    <!-- ======= Main Content ======= -->
                    <div id="content" class="col-12 col-md-10 d-md-block p-0" style="margin-left: 16.666667%;">

                        <!-- ======= Navbar ======= -->
                        <nav id="navbar" class="navbar navbar-expand-md navbar-light px-3">
                            <div class="container-fluid">

                                <!-- ======= Sidebar Toggler ======= -->
                                <a id="sidebarToggle" class="cursor-pointer pe-3" role="button" aria-expanded="true" aria-controls="Toggle Sidebar">
                                    <i class="bi bi-list fs-2"></i>
                                </a>
                                <!-- ======= End Sidebar Toggler ======= -->

                                <!-- ======= Nav ======= -->
                                <div id="navbarNavs" class="nav nav-pills d-flex align-items-center">
                                </div>
                                <!-- ======= End Nav ======= -->

                                <!-- ======= Widgets ======= -->
                                <ul class="nav nav-pills ms-3 d-flex align-items-center ms-auto z-1040">

                                    <!-- ======= Search Field ======= -->
                                    <li id="searchField" class="nav-item collapse collapse-horizontal">
                                        <form class="d-flex" action="?p=searchResults" method="post" autocomplete="on" novalidate>
                                            <input type="text" class="form-control search" placeholder="Search..." aria-label="Search" aria-describedby="searchBtn" value="<?php if(isset($_POST['search'])){ echo $_POST['search']; } ?>">
                                        </form>
                                    </li>
                                    <!-- ======= End Search Field ======= -->

                                    <!-- ======= Search Button ======= -->
                                    <li class="nav-item animate-slide-hover-top-20">
                                        <a id="searchBtn" href="#searchField" class="nav-link text-decoration-none py-2" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="Toggle Search Field">
                                            <i class="bi bi-search fs-4" style="height: 2.25rem !important;width: 1.5rem !important"></i>
                                        </a>
                                    </li>
                                    <!-- ======= End Search Button ======= -->

                                    <!-- ======= Tasks ======= -->
                                    <li class="nav-item" id="taskArea"></li>
                                    <!-- ======= End Tasks ======= -->

                                    <!-- ======= Messages ======= -->
                                    <li class="nav-item" id="messageArea"></li>
                                    <!-- ======= End Messages ======= -->

                                    <!-- ======= Notifications ======= -->
                                    <li class="nav-item" id="notificationArea"></li>
                                    <!-- ======= End Notifications ======= -->

                                    <!-- ======= FullScreen ======= -->
                                    <li class="nav-item animate-slide-hover-top-20">
                                        <button id="fullscreenToggle" type="button" class="nav-link text-decoration-none py-2">
                                            <i class="bi bi-fullscreen fs-4" style="height: 2.25rem !important;width: 1.5rem !important"></i>
                                        </button>
                                    </li>
                                    <!-- ======= End FullScreen ======= -->

                                    <!-- ======= Profile ======= -->
                                    <li class="nav-item dropdown">
                                        <button id="profileMenu" type="button" class="nav-link text-decoration-none py-0" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="https://www.gravatar.com/avatar/e05b4330e145079f1d73aa859b23ab86?s=128&d=mp" alt="mdo" width="48" height="48" class="rounded-circle">
                                            <span class="position-absolute top-80 start-80 translate-middle text-bg-success border border-light rounded-circle" style="padding: 8px; display:block;"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileMenu" style="min-width:350px;max-width:500px;">
                                            <li class="my-2">
                                                <div class="d-flex flex-column justify-content-center align-items-center">
                                                    <div class="">
                                                        <img src="https://www.gravatar.com/avatar/e05b4330e145079f1d73aa859b23ab86?s=128&d=mp" alt="mdo" width="72" height="72" class="rounded-circle my-2">
                                                        <span class="position-absolute translate-middle text-bg-success border border-light rounded-circle" style="padding: 8px; display:block;top: 96px;right:38%;"></span>
                                                    </div>
                                                    <div>
                                                        <h5>John Doe</h5>
                                                    </div>
                                                </div>
                                            </li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li class="dropdown-submenu dropstart">
                                                <button type="button" class="dropdown-item" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-circle-fill text-success me-1"></i>
                                                    <span>Online</span>
                                                </button>
                                                <ul class="dropdown-menu" style="min-width:350px;max-width:500px;">
                                                    <li>
                                                        <a class="dropdown-item" href="#">
                                                            <i class="bi bi-circle-fill text-success me-1"></i>
                                                            <span>Online</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item" href="#">
                                                            <i class="bi bi-circle-fill text-warning me-1"></i>
                                                            <span>Away</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item" href="#">
                                                            <i class="bi bi-circle-fill text-danger me-1"></i>
                                                            <span>Busy</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item" href="#">
                                                            <i class="bi bi-circle-fill text-secondary me-1"></i>
                                                            <span>Offline</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="?t=layouts&p=profile">
                                                    <i class="bi bi-person me-1"></i>
                                                    <span>Profile</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="?t=layouts&p=settings">
                                                    <i class="bi bi-gear me-1"></i>
                                                    <span>Settings</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="?t=layouts&p=help">
                                                    <i class="bi bi-question-circle me-1"></i>
                                                    <span>Help</span>
                                                </a>
                                            </li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li>
                                                <a class="dropdown-item" href="#">
                                                    <i class="bi bi-box-arrow-right me-1"></i>
                                                    <span>Sign Out</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <!-- ======= End Profile ======= -->

                                    </ul>
                                    <!-- ======= End Widgets ======= -->

                            </div>
                        </nav>
                        <!-- ======= End Navbar ======= -->
            
                        <!-- ======= Page Title and Breadcrumbs ======= -->
                        <div class="row py-2 px-3 mx-0 d-flex align-items-center">
                            <div class="col-md-6 d-flex align-items-center justify-content-start">
                                <h1 class="m-0"><?= $title; ?></h1>
                            </div>
                            <div class="col-md-6 d-flex justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol id="breadcrumbs" class="breadcrumb user-select-none"></ol>
                                </nav>
                            </div>
                        </div>
                        <!-- ======= End Page Title and Breadcrumbs ======= -->

                        <!-- ======= Panel.JS ======= -->
                        <script src="/js/panel.js"></script>
            
                        <!-- ======= Page Content ======= -->
                        <div id="page" class="row mt-4 px-3 mx-0 pb-3">
                            <?php if(file_exists($file)){ require $file; } ?>
                        </div>
                        <!-- ======= End Page Content ======= -->

                    </div>
                    <!-- ======= End Main Content ======= -->

                </div>
            </div>
            <!-- ======= End Panel ======= -->

        </main>
        <!-- ======= End Main ======= -->
    </body>
</html>
