// Extend Date Object
Date.prototype.today = function () {
	return this.getFullYear() + "-" +(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "-" + ((this.getDate() < 10)?"0":"") + this.getDate();
}
Date.prototype.timeNow = function () {
	return ((this.getHours() < 10)?"0":"") + this.getHours() + ":" + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ":" + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

// Extend jQuery
jQuery.expr[':'].contains = function(a, i, m){
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0
}

// Configure Select2
// $.fn.select2.defaults.set("theme", "bootstrap-5")
// $.fn.select2.defaults.set("width", "100%")
// $.fn.select2.defaults.set("allowClear", true)


// Helper Functions
// Generate a random number between min and max
function randomNumber(min = -10, max = 10){
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// Convert a string to a date
function convertStringToDate(string){
	let year = null, month = null, day = null, hour = null, minute = null, second = null, date = null, time = null, datetime = null, array = []
	if(string.includes(' ') || string.includes('T') || string.includes('t')){
		if(string.includes('T')){
			array = string.split('T')
		}
		if(string.includes('t')){
			array = string.split('t')
		}
		if(string.includes(' ')){
			array = string.split(' ')
		}
		if(array.length > 1){
			time = array[1]
		}
		if(time != null && time.toString().includes(':')){
			array = time.toString().split(':')
			if(array.length > 1){
				hour = array[0]
				minute = array[1]
				if(array.length > 2){
					second = array[2]
				}
			}
		}
	}
	// new Date(datetime)
}

// Validate an email address
function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	return ( $email.length > 0 && emailReg.test($email))
}

// Check if a value is in an array
function inArray(needle, haystack) {
	var length = haystack.length;
	for(var i = 0; i < length; i++) {
    if(haystack[i] == needle) return true;
	}
	return false;
}

// Format a number of bytes into a human readable string
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// Copy a string or object content to the clipboard
function copyToClipboard(object){
	if(typeof object !== 'undefined' && typeof object !== null && typeof object !== 'function'){
		let string = ''
		let input = $(document.createElement('textarea')).appendTo('body')
		if(typeof object === 'object'){ string = object.text(); }
		if(typeof object === 'number'){ string = object.toString(); }
		if(typeof object === 'boolean'){ string = object.toString(); }
		if(typeof object === 'string'){ string = object; }
		input.val(string).select();
		document.execCommand("copy");
		navigator.clipboard.writeText(input.val());
		input.remove();
	}
}

// Format a phone number
function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
	  return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return null
}

const md5 = (function() {
    var MD5 = function (d) {
      return M(V(Y(X(d), 8 * d.length)))
    }
    function M (d) {
      for (var _, m = '0123456789abcdef', f = '', r = 0; r < d.length; r++) {
        _ = d.charCodeAt(r)
        f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _)
      }
      return f
    }
    function X (d) {
      for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) {
        _[m] = 0
      }
      for (m = 0; m < 8 * d.length; m += 8) {
        _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32
      }
      return _
    }
    function V (d) {
      for (var _ = '', m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255)
      return _
    }
    function Y (d, _) {
      d[_ >> 5] |= 128 << _ % 32
      d[14 + (_ + 64 >>> 9 << 4)] = _
      for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
        var h = m
        var t = f
        var g = r
        var e = i
        f = md5ii(f = md5ii(f = md5ii(f = md5ii(f = md5hh(f = md5hh(f = md5hh(f = md5hh(f = md5gg(f = md5gg(f = md5gg(f = md5gg(f = md5ff(f = md5ff(f = md5ff(f = md5ff(f, r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551)
        m = safeadd(m, h)
        f = safeadd(f, t)
        r = safeadd(r, g)
        i = safeadd(i, e)
      }
      return [m, f, r, i]
    }
    function md5cmn (d, _, m, f, r, i) {
      return safeadd(bitrol(safeadd(safeadd(_, d), safeadd(f, i)), r), m)
    }
    function md5ff (d, _, m, f, r, i, n) {
      return md5cmn(_ & m | ~_ & f, d, _, r, i, n)
    }
    function md5gg (d, _, m, f, r, i, n) {
      return md5cmn(_ & f | m & ~f, d, _, r, i, n)
    }
    function md5hh (d, _, m, f, r, i, n) {
      return md5cmn(_ ^ m ^ f, d, _, r, i, n)
    }
    function md5ii (d, _, m, f, r, i, n) {
      return md5cmn(m ^ (_ | ~f), d, _, r, i, n)
    }
    function safeadd (d, _) {
      var m = (65535 & d) + (65535 & _)
      return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
    }
    function bitrol (d, _) {
      return d << _ | d >>> 32 - _
    }
    function MD5Unicode(buffer){
      if (!(buffer instanceof Uint8Array)) {
        buffer = new TextEncoder().encode(typeof buffer==='string' ? buffer : JSON.stringify(buffer));
      }
      var binary = [];
      var bytes = new Uint8Array(buffer);
      for (var i = 0, il = bytes.byteLength; i < il; i++) {
        binary.push(String.fromCharCode(bytes[i]));
      }
      return MD5(binary.join(''));
    }

    return MD5Unicode;
  })()

$(document).ready(function() {

    // Content Container
    const content = $('#content');

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
    const defaultTheme = $('html[data-theme]').attr('data-theme');
    $('[data-theme-value]').removeClass('active');
    $('[data-theme-value="' + defaultTheme + '"]').addClass('active');
    $('link[data-theme]').prop("disabled", true);
    $('link[data-theme="'+defaultTheme+'"]').prop("disabled", false);

    // Back to Top
    $('.back-to-top').hide();
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $('.back-to-top').show();
        } else {
        $('.back-to-top').hide();
        }
    };

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
});
