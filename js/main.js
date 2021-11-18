const lines = document.getElementById("lines");
const textarea = document.getElementById("textarea");

class Window {
    constructor(opts) {

        this.options = { ...opts };
        this.isScanning = false;
        
        this.textProps = {};
        for (const key of ["red", "orange", "green", "underline", "redBack"]) {
            this.textProps[key] = (text) => {
                return {
                    text: text.options ? text.text : text,
                    options: text.options ? [...text.options, key]: [key],
                }
            };
        }
        this.client = {
            scan: this.scan,
            print: this.print,
            clear: this.clear,
            color: this.textProps,
        };
        
    }

    spawn() {
        document.addEventListener("keypress", async ({ keyCode }) => {
            if (keyCode !== 13) return;

            /*CLI Haler*/
            const lastLine = textarea.value.split("\n").pop();
            textarea.value = null;
            this.print(lastLine);

            /*Check if the user is Scanning, and if it is we don't run the commands*/
            if (this.isScanning) return;

            /*Command Handler:*/
            const args = lastLine.split(" ");
            const commandName = args.shift();
            const command = commands.filter(({ name }) => name === commandName)[0];
            /*Text Command is SHowing while scanning*/
            if (!command) return this.print(this.options.TextError || "Unvailable Command !");
            await command.run(this.client, args);
        });
    }

    scan = async () => {
        this.isScanning = true;
        return new Promise((resolve, reject) => {
            document.addEventListener("keypress", ({ keyCode }) => {
                if (keyCode !== 13) return;

                const result = Object.values(lines.children).at(-1).innerHTML;

                resolve(result);
            });
        }).finally((r) => {
            this.isScanning = false
            return r;
        });
    };

    print() {
        const args = Object.values(arguments).map((text) => text.options ? `<span class="${text.options.join(" ")}">${text.text}</span>` : text);
        lines.innerHTML += `<div class="window-line">${args.join(" ")}</div>`
    }

    clear() {
        lines.innerHTML = null;
    }

};