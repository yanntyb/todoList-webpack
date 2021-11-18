import {Item} from "./Item.js";

class Liste{
    constructor(title, id, pos, parent) {
        this.pos = pos;
        this.title = title;
        this.div = document.createElement("div");
        this.item = [];
        this.id = id;
        this.parent = parent;
        this.createDom();
        this.itemContainer = this.div.querySelector(".item-cont");
        this.setLocalStorage();
        this.zIndex();
    }

    /**
     * Initialise localStorage if no item
     */
    setLocalStorage(){
        let currentStorage = JSON.parse(localStorage.getItem("listes"));
        const id = this.id;
        if(currentStorage){
            if(!currentStorage[id]){
                currentStorage[id] = {
                        "liste-title": this.title,
                        "items": {
                        },
                        "pos": this.pos,
                }
                localStorage.setItem("listes", JSON.stringify(currentStorage));
            }
        }
        else{
            localStorage.setItem("listes", JSON.stringify(
                {
                    [id]:
                        {
                            "liste-title": this.title,
                            "items": {
                            },
                            "pos": this.pos,
                        }
                }
            ))
        }
    }

    /**
     * Add an item to the list and add it to localStorage if its the first time it is created
     * @param title
     * @param data
     * @param addToLocalStorage
     */
    addItem(title, data, addToLocalStorage){
        this.item.push(new Item(title,this.itemContainer,data,this.item.length,this.id));
        if(addToLocalStorage){
            let currentStorage = JSON.parse(localStorage.getItem("listes"));
            currentStorage[this.id]["items"][this.item.length-1] = {
                title: title,
                data: data,
            }

            localStorage.setItem("listes", JSON.stringify(currentStorage));
        }
    }

    /**
     * define Dom and event
     */
    createDom(){
        this.parent.append(this.div);
        this.div.className = "liste";
        this.div.id = "liste-" + this.id;
        this.div.innerHTML =
            `
            <i class="fas fa-arrows-alt move" draggable="true"></i>
            <i class="far fa-trash-alt remove"></i>
            <h1>${this.title}</h1>
            <div class="action">
                <input type="text" placeholder="Name...">
                <input type="submit" value="Add Item">
            </div>
            <div class="item-cont"></div>
            `;

        this.div.style.top = this.pos["top"] + "px";
        this.div.style.left = this.pos["left"] + "px";

        let name = this.div.querySelector("input[type=text]");
        const submit = this.div.querySelector("input[type=submit]");

        /**
         * Add item
         */
        submit.addEventListener("click", () => {
            if(name.value !== ""){
                this.addItem(name.value,{done: false},true,this.item.length,this.id);
                name.value = "";
            }
        })

        const move = this.div.querySelector(".move");

        move.addEventListener("drag", (e) => {
            this.pos["top"] = e.clientY - 15;
            this.pos["left"] = e.clientX - 15;
            this.div.style.top = this.pos["top"] + "px";
            this.div.style.left = this.pos["left"] + "px";
            let currentStorage = JSON.parse(localStorage.getItem("listes"));
            currentStorage[this.id]["pos"] = {
                top: this.pos["top"],
                left: this.pos["left"],
            }

            localStorage.setItem("listes", JSON.stringify(currentStorage));
        })


        const remove = this.div.querySelector(".remove");
        remove.addEventListener("click", () => {
            this.parent.removeChild(this.div);
            let currentStorage = JSON.parse(localStorage.getItem("listes"));
            delete currentStorage[this.id];
            localStorage.setItem("listes", JSON.stringify(currentStorage));
        })
    }

    /**
     * Set zindex higher when click is detected inside
     * Set zindex lower when click is detected outside
     */
    zIndex() {
        document.addEventListener("click", (e) => {
            let targetElement = e.target;
            do {
                if (targetElement === (this.div)) {
                    this.div.style.zIndex = "10";
                    return;
                }
                targetElement = targetElement.parentNode;
            } while (targetElement);
            this.div.style.zIndex = "1";
        })
    }
}

export {Liste};