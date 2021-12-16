var path = window.location.pathname;
if (path.match('/admins') || path.match('/admins/search')) {
    $onAccAction = $('#account-action');
}

if (path.match('/users') || path.match('/users/search')) {
    $onAccAction = $('#account-action');
}