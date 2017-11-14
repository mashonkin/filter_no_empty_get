
/*работа фильтра*/

function ajax_form_callback(get) {

    if (get.length) {
        var url = '?' + get.join('&');
    } else {
        var url = location.origin + '' + location.pathname;
    }
    $(window).lazyLoad && $(window).lazyLoad('sleep');
    $('#product-list').addClass('loading');
    $.get(url, function (html) {
        var tmp = $('<div></div>').html(html);
        $('#product-list').html(tmp.find('#product-list').html()).removeClass('loading');
        $('#selectProductSort').html(tmp.find('#selectProductSort').html());
        if (!!(history.pushState && history.state !== undefined)) {
            window.history.pushState({}, '', url);
        }
        $(window).lazyLoad && $(window).lazyLoad('reload');
    });
}
function split_get(val) {
    var get_param = val.replace('?', '').split('&');
    var _get = new Object();
    var _get_count = 0;
    for (var i = 0; i < get_param.length; i++) {
        var p = get_param[i].split('=');
        var key = p[0];
        var value = p[1];
        if (value !== '' && value !== undefined) {
            _get[_get_count] = new Array(key, value);
            _get_count++;
        }
    }
    return _get;
}
function join_in_array_get(val) {
    var _get = new Array();
    for (i in val) {
        _get.push(val[i][0] + '=' + val[i][1]);
    }
    return _get;
}
$(document).on('change', '.filters.ajax form input', function () {
    var object_get = split_get($(this).closest('form').serialize());
    ajax_form_callback(join_in_array_get(object_get));
});
$(document).on('submit', '.filters.ajax form input', function () {
    var object_get = split_get($(this).serialize());
    ajax_form_callback(join_in_array_get(object_get));
    return false;
});

/*!работа фильтра*/