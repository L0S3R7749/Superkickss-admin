var path = window.location.pathname;
if (path.match('/admins') || path.match('/admins/search') || path.match('/users') || path.match('/users/search')) {
    $onAccAction = $('a.account-actions');
    $onAccAction.on('click', async function() {
        const id = $(this).attr('data-id');
        try {
            const request = {
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {
                    'Content-type': 'application/json'
                }
            };
            await fetch(path.includes('admins') ? '/admins' : '/users', request);
            location.reload();
        } catch(err) {
            console.log(err.message);
        }
    });
}