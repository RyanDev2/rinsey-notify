local function SendNotification(data)
    SendNUIMessage({
        action = "notify",
        data = data
    })
end

function Notify(text, ntype, ntime, id, style)
    local data = {
        ntext = text or "",
        ntype = ntype or "info",
        ntime = ntime or 2500,
        id = id,
        style = style
    }
    SendNotification(data)
end
exports('Notify', Notify)


RegisterNetEvent('rinsey-notify:notify', function(data)
    SendNotification(data)
end)

-- RegisterCommand("testnotify", function()
--     Notify("This is a success notification", "success", 2500)
--     Notify("This is an error notification", "error", 2500)
--     Notify("This is an info notification", "info", 2500)
-- end, false)
