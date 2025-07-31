window.notifs = {};

function CreateNotification(data) {
    let $notification = $(document.createElement('div'));
    let iconHtml = '<div class="notifymain_item_icon" style="display:none"></div>';
    let iconHtml2 = '<div class="notifymain_item_icon2" style="display:none"></div>';
    let iconHtml3 = '<div class="notifymain_item_icon3" style="display:none"></div>';
    let timeHtml = '';

    if (data.ntype == "error") {
        $notification.html(`
            <div class="notifymain_item">
                ${iconHtml}
                <div class="notifymain_item_text">${data.ntext}</div>
                ${timeHtml}
            </div>
        `);
    }

    if (data.ntype == "info") {
        $notification.html(`
            <div class="notifymain_item2">
                ${iconHtml2}
                <div class="notifymain_item_text2">${data.ntext}</div>
                ${timeHtml}
            </div>
        `);
    }

    if (data.ntype == "success") {
        $notification.html(`
            <div class="notifymain_item3">
                ${iconHtml3}
                <div class="notifymain_item_text">${data.ntext}</div>
                ${timeHtml}
            </div>
        `);
    }
    $notification.fadeIn();
    if (data.style !== undefined) {
        Object.keys(data.style).forEach(function(css) {
            $notification.css(css, data.style[css])
        });
    }
    return $notification;
}

function ShowNotif(data) {
    if (data.id != null) {
        if (notifs[data.id] === undefined) {
            let $notification = CreateNotification(data);
            $('.notifymain').append($notification);
            notifs[data.id] = {
                notif: $notification,
                timer: setTimeout(function() {
                    let $notification = notifs[data.id].notif;
                    $.when($notification.fadeOut()).done(function() {
                        $notification.remove();
                        clearTimeout(notifs[data.id].timer);
                        delete notifs[data.id];
                    });
                }, data.ntime != null ? data.ntime : 2500)
            };
        } else {
            clearTimeout(notifs[data.id].timer);
            notifs[data.id].timer = setTimeout(function() {
                let $notification = notifs[data.id].notif;
                $.when($notification.fadeOut()).done(function() {
                    $notification.remove();
                    clearTimeout(notifs[data.id].timer);
                    delete notifs[data.id];
                });
            }, data.ntime != null ? data.ntime : 2500)
        }
    } else {
        let $notification = CreateNotification(data);
        $('.notifymain').append($notification);
        setTimeout(function() {
            $.when($notification.fadeOut()).done(function() {
                $notification.remove()
            });
        }, data.ntime != null ? data.ntime : 2500);
    }
}

window.addEventListener('message', function(event) {
    if (event.data && event.data.action === "notify") {
        ShowNotif(event.data.data);
    }
});
