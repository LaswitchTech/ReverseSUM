<!doctype html>
<html lang="en" data-bs-theme="light" data-theme="glass" class="h-100 w-100">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Panel - Forgot Password</title>

    <!-- ======= Boostrap Icons ======= -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

    <!-- ======= Themes ======= -->
	<link rel="stylesheet" href="css/themes/default/styles.css">
	<link rel="stylesheet" href="css/themes/cerulean/styles.css" data-theme="cerulean" disabled>
	<link rel="stylesheet" href="css/themes/cosmos/styles.css" data-theme="cosmos" disabled>
	<link rel="stylesheet" href="css/themes/cyborg/styles.css" data-theme="cyborg" disabled>
	<link rel="stylesheet" href="css/themes/darkly/styles.css" data-theme="darkly" disabled>
	<link rel="stylesheet" href="css/themes/flathy/styles.css" data-theme="flathy" disabled>
	<link rel="stylesheet" href="css/themes/glass/styles.css" data-theme="glass" disabled>
	<link rel="stylesheet" href="css/themes/journal/styles.css" data-theme="journal" disabled>
	<link rel="stylesheet" href="css/themes/litera/styles.css" data-theme="litera" disabled>
	<link rel="stylesheet" href="css/themes/lumen/styles.css" data-theme="lumen" disabled>
	<link rel="stylesheet" href="css/themes/lux/styles.css" data-theme="lux" disabled>
	<link rel="stylesheet" href="css/themes/materia/styles.css" data-theme="materia" disabled>
	<link rel="stylesheet" href="css/themes/minty/styles.css" data-theme="minty" disabled>
	<link rel="stylesheet" href="css/themes/morph/styles.css" data-theme="morph" disabled>
	<link rel="stylesheet" href="css/themes/pulse/styles.css" data-theme="pulse" disabled>
	<link rel="stylesheet" href="css/themes/quartz/styles.css" data-theme="quartz" disabled>
	<link rel="stylesheet" href="css/themes/sandstone/styles.css" data-theme="sandstone" disabled>
	<link rel="stylesheet" href="css/themes/simplex/styles.css" data-theme="simplex" disabled>
	<link rel="stylesheet" href="css/themes/sketchy/styles.css" data-theme="sketchy" disabled>
	<link rel="stylesheet" href="css/themes/slate/styles.css" data-theme="slate" disabled>
	<link rel="stylesheet" href="css/themes/solar/styles.css" data-theme="solar" disabled>
	<link rel="stylesheet" href="css/themes/spacelab/styles.css" data-theme="spacelab" disabled>
	<link rel="stylesheet" href="css/themes/superhero/styles.css" data-theme="superhero" disabled>
	<link rel="stylesheet" href="css/themes/united/styles.css" data-theme="united" disabled>
	<link rel="stylesheet" href="css/themes/vapor/styles.css" data-theme="vapor" disabled>
	<link rel="stylesheet" href="css/themes/yeti/styles.css" data-theme="yeti" disabled>
	<link rel="stylesheet" href="css/themes/zephyr/styles.css" data-theme="zephyr" disabled>

    <!-- ======= JQuery ======= -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <!-- ======= Bootstrap ======= -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- ======= JQuery Timeago ======= -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.6.7/jquery.timeago.min.js"></script>

    <!-- ======= Page.JS ======= -->
    <script src="/js/page.js"></script>

    <!-- ======= Builder.JS ======= -->
    <script src="/js/builder.js"></script>
</head>
<body class="h-100 w-100">

	<!-- ======= Controls ======= -->
	<div class="d-flex position-fixed bottom-0 end-0 mb-3 me-3 z-1035">

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
	<!-- ======= End Controls ======= -->
	
	<!-- ======= Main ======= -->
	<main class="h-100 w-100 d-flex align-items-center justify-content-center">
        <div class="card">
            <div class="card-body">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <h3 class="mb-3">Forgot Password</h3>
                    <form method="post" class="w-100">
                        <p class="text-center">
                            You forgot your password? Here you can easily retrieve a new password.
                        </p>
                        <div class="form-floating my-3">
                            <input type="text" name="username" class="form-control form-control-lg" placeholder="username@domain.com" id="username">
                            <label for="username">Email Address</label>
                        </div>
                        <input type="hidden" class="d-none" name="csrf" value="">
                        <button type="submit" name="forgot" class="btn btn-primary w-100">Request new password</button>
                    </form>
                </div>
            </div>
        </div>
	</main>
	<!-- ======= End Main ======= -->
    
</body>
</html>
