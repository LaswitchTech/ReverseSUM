// Autor: Louis Ouellet

// Create Builder
const builder = new Builder();

// Declare Components
const content = $('#content');
const sidebar = $('#sidebar');
const defaultTheme = $('html[data-theme]').attr('data-theme');
const breadcrumbs = $('#breadcrumbs');

// Declare Utilities
builder.Notification.appendTo('#notificationArea');
builder.Message.appendTo('#messageArea');
builder.Task.appendTo('#taskArea');
builder.Toast.position('top-center');

// FullScreen Toggle
$("#fullscreenToggle").on("click", function () {
	if (document.fullscreenElement) {
		document.exitFullscreen();
		$("#fullscreenToggle").find('i').removeClass('bi-fullscreen-exit').addClass('bi-fullscreen');
	} else {
		document.documentElement.requestFullscreen();
		$("#fullscreenToggle").find('i').removeClass('bi-fullscreen').addClass('bi-fullscreen-exit');
	}
});

// Light Mode Switcher
$('[data-bs-theme-value]').click(function () {
	const theme = $(this).attr('data-bs-theme-value');
	$('[data-bs-theme]').attr('data-bs-theme', theme);
	$('[data-bs-theme-value]').removeClass('active');
	$(this).addClass('active');
});

// Theme Switcher
$('[data-theme-value]').click(function () {
	const theme = $(this).attr('data-theme-value');
	$('[data-theme-value]').removeClass('active');
	$(this).addClass('active');
	$('link[data-theme]').prop("disabled", true);
	$('link[data-theme="'+theme+'"]').prop("disabled", false);
});

// Default Theme
$('[data-theme-value]').removeClass('active');
$('[data-theme-value="' + defaultTheme + '"]').addClass('active');
$('link[data-theme]').prop("disabled", true);
$('link[data-theme="'+defaultTheme+'"]').prop("disabled", false);

// Control Collapse
$('[data-bs-toggle="collapse"][data-bs-target="#controlsCollapsible"]').click(function () {
	if($(this).attr('aria-expanded') === 'true'){
		$(this).find('i').removeClass('bi-chevron-left').addClass('bi-chevron-right');
	} else {
		$(this).find('i').removeClass('bi-chevron-right').addClass('bi-chevron-left');
	}
});

// Back to Top
$('.back-to-top').hide();
window.onscroll = function() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$('.back-to-top').show();
	} else {
		$('.back-to-top').hide();
	}
};

// Sidebar Toggle
if(sidebar.length > 0){
	const sidebarCollapse = new bootstrap.Collapse(sidebar, {toggle: false});
	const sidebarToggle = $('#sidebarToggle');

	// Add Event Listener on Toggle
	sidebarToggle.click(function() {
		if (sidebar.hasClass('show')) {
			sidebarToggle.removeClass('active');
			content.css({'width': '100%', 'margin-left': '0px'});
		} else {
			sidebarToggle.addClass('active');
			content.css({'width': 'calc(100% - 300px)', 'margin-left': '300px'});
		}
		sidebarCollapse.toggle();
	});
}

// Nested Dropdowns
$('.dropdown-menu a[data-bs-toggle="dropdown"], .dropdown-menu button[data-bs-toggle="dropdown"]').on('click', function(e) {
	e.stopPropagation(); // prevent event from bubbling up

	var $el = $(this);
	var $parent = $(this).offsetParent(".dropdown-menu");
	if (!$(this).next().hasClass('show')) {
		$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
	}
	$(this).parent("li").toggleClass('show');

	return false;
});
$('body').on('hide.bs.dropdown', '.dropdown', function (e) {
	if ($(this).hasClass('show') && $(e.target).hasClass('dropdown-submenu')) {
		e.preventDefault();
		e.stopPropagation();
	}
});


// Set active link
$('a').removeClass('active');
$('a').each(function () {
	if (this.href === window.location.href) {
		$(this).addClass('active');
		$(this).parents('.collapse').addClass('show');
		$(this).parents('[data-bs-toggle="collapse"]').attr('aria-expanded',true);
	}
});
$('button').each(function () {
	if ($(this).attr('data-route') === window.location.pathname) {
		$(this).addClass('active');
		$(this).parents('.collapse').addClass('show');
		$(this).parents('[data-bs-toggle="collapse"]').attr('aria-expanded',true);
	}
});

// Set Avatars
$('img[data-avatar]').each(function () {
	if (!$(this).attr('src')) {
		$(this).attr('src',builder.Helper.gravatar($(this).attr('data-avatar')))
	}
});

// Configure Toast
builder.Toast.position('bottom-end');
