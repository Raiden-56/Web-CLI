const commands = [
    {
        name: "help",
        run: (client, args) => {
            client.print(client.color.underline(client.color.red("You help me :/")));
        }
    },
    {
        name: "clear",
        run: (client, args) => {
            client.clear();
        }
    },
    {
        name: "pow",
        run: async (client, args) => {
            client.print(client.color.underline("Please give a number"), client.color.orange("n: "));
            var number = Number(await client.scan());
            while(isNaN(number)) {
                client.print(client.color.redBack("It's not a number, Another one: "))
                var number = Number(await client.scan());
            }
            client.print("Your number is", number * number)
        }
    }
]