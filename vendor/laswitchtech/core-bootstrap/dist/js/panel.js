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


$(document).ready(function() {

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
        sidebarToggle.click(function() {
            if (sidebar.hasClass('show')) {
                sidebarToggle.removeClass('active');
                content.removeClass('col-md-10').addClass('col-md-12 ms-0');
            } else {
                sidebarToggle.addClass('active');
                content.removeClass('col-md-12 ms-0').addClass('col-md-10');
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

    // Create Hierarchy Breadcrumbs
    var breadcrumbArray = []; // create an empty array
    var currentActive = sidebar.find('.nav-link.active'); // get the active link
    if(currentActive.length > 0) { // if the active link exists (length > 0
        let classes = currentActive.find('i').attr('class').split(' ');
        let iconClass = classes.find(cls => cls.startsWith('bi-'));
        let icon = iconClass ? iconClass.slice(3) : '';
        breadcrumbArray.push({
            icon: icon, // get the icon class
            text: currentActive.text().trim(), // get the text
            link: currentActive.attr('href') // get the link
        });
        currentActive.parents('.collapse').each(function(){ // iterate over each parent .collapse of the active link
            var parentButton = $(this).siblings('button.nav-link'); // find the associated button.nav-link
            if(parentButton.length > 0) { // if the button exists
                let parentClasses = parentButton.find('i').attr('class').split(' ');
                let parentIconClass = parentClasses.find(cls => cls.startsWith('bi-'));
                let parentIcon = parentIconClass ? parentIconClass.slice(3) : '';
                breadcrumbArray.push({
                    icon: parentIcon, // get the icon class
                    text: parentButton.text().trim(), // get the text
                    link: '#' // since these are buttons, they don't have href attributes. Substitute with your desired value
                });
            }
        });
        breadcrumbArray.reverse(); // reverse the array to have the topmost parent first
        breadcrumbArray.forEach(function(item){ // iterate over each item in the array
            if($('#navbarNavs').length <= 0) return;
            var nav = $(document.createElement('a')).addClass('nav-link').attr('href',item.link).appendTo('#navbarNavs');
            nav.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + item.icon).appendTo(nav);
            nav.label = $(document.createElement('span')).addClass('brand').text(item.text).appendTo(nav);
            if(nav[0].href === window.location.href){
                nav.addClass('active');
            }
        });
    }
    if($('#navbarNavs a[href="/"]').length <= 0) {
        var indexPage = sidebar.find('.nav-link[href="/"]'); // get the index link
        if(indexPage.length > 0) {
            let indexClasses = indexPage.find('i').attr('class').split(' ');
            let indexIconClass = indexClasses.find(cls => cls.startsWith('bi-'));
            let indexIcon = indexIconClass ? indexIconClass.slice(3) : '';
            var indexLink = {
                icon: indexIcon, // get the icon class
                text: indexPage.text().trim(), // get the text
                link: indexPage.attr('href') // get the link
            };
            var nav = $(document.createElement('a')).addClass('nav-link').attr('href',indexLink.link).prependTo('#navbarNavs');
            nav.icon = $(document.createElement('i')).addClass('me-1 bi bi-' + indexLink.icon).appendTo(nav);
            nav.label = $(document.createElement('span')).addClass('brand').text(indexLink.text).appendTo(nav);
            if (nav[0].href === window.location.href) {
                nav.addClass('active');
            }
        }
    }

    // Create Historic Breadcrumbs
    var maxItems = 5;
    var breadcrumbArray = JSON.parse(localStorage.getItem('breadcrumbs')) || [];
    var activeLinks = $('a.active');
    var currentItem = {};
    activeLinks.each(function(){
        if((activeLinks.length > 1 && !$(this).hasClass('sidebar-brand')) || activeLinks.length == 1){
            if ($(this)[0].href === window.location.href) {
                currentItem = {
                    text: $(this).text().trim(), // get the text
                    link: $(this).attr('href') // get the link
                };
                return false; // Exit the .each() loop
            }
        }
    });
    // Remove item if it already exists in the array
    breadcrumbArray = breadcrumbArray.filter(function(item) {
        return item.text !== currentItem.text;
    });
    breadcrumbArray.push(currentItem); // add new item at the end
    if(breadcrumbArray.length > maxItems) breadcrumbArray.shift(); // remove first item if array is too long
    localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbArray)); // save the new breadcrumb array
    var breadcrumbHtml = '';
    breadcrumbArray.forEach(function(item, index){
        breadcrumbHtml += '<li class="breadcrumb-item ' + ((index === breadcrumbArray.length - 1) ? 'active' : '') + '">';
        if(index === breadcrumbArray.length - 1){
            breadcrumbHtml += item.text;
        } else {
            breadcrumbHtml += '<a href="' + item.link + '">' + item.text + '</a>';
        }
        breadcrumbHtml += '</li>';
    });
    breadcrumbs.html(breadcrumbHtml); // display the breadcrumb

    // // Check User Activity
    // $(document).ready(function() {
    //     var isActive;

    //     $(window).focus(function() {
    //         isActive = true;
    //     });

    //     $(window).blur(function() {
    //         isActive = false;
    //     });

    //     // Check the isActive variable every 1 second
    //     setInterval(function(){
    //         if (isActive) {
    //             console.log("User is active");
    //         } else {
    //             console.log("User is inactive");
    //         }
    //     }, 1000);
    // });
});
