const CLI = new Window({
    Title: "MyCli.",
    TextError: "Invalid Command !",
    Prefix: "user@raiden-56/home:",
    Buttons: [{
            icon: '',
            onClick: () => {
                console.log("Click Button 1")
            }
        },
        {
            icon: '',
            onClick: () => {
                console.log("Click Button 2")
            }
        }
    ]
})

CLI.spawn();
CLI.print("Welcome !");