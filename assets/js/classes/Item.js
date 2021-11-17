class Item{
    constructor(title, parent, data, id, listeId){
        this.title = title;
        this.parent = parent;
        this.id = id;
        this.listeId = listeId;
        this.edit = false;
        this.div = document.createElement('div');
        this.data = data;
        this.createDom();
    }

    /**
     * define Dom and event
     */
    createDom(){
        this.parent.appendChild(this.div);
        this.div.classList.add("item");
        this.setChecked();
        this.div.innerHTML =
            `
                <span>${this.title}</span>
                <div class="item-action">
                    <i class="far fa-check-circle done"></i>
                    <i class="far fa-edit edit"></i>
                    <i class="far fa-times-circle remove"></i>
                </div>
            `;

        /**
         * Change data done and set classe when needed
         * Also change data in localStorage
         */
        const done = this.div.querySelector(".done");
        done.addEventListener("click", () => {
            this.data["done"] = !this.data["done"];
            let currentStorage = JSON.parse(localStorage.getItem("listes"));
            currentStorage[this.listeId]["items"][this.id]["data"] = {
                done: this.data["done"],
            }
            localStorage.setItem("listes", JSON.stringify(currentStorage));

            this.setChecked();
        })

        /**
         * Remove item from list and from localStorage
         * @type {Element}
         */
        const remove = this.div.querySelector(".remove");
        remove.addEventListener("click", () => {
            this.parent.removeChild(this.div);
            let currentStorage = JSON.parse(localStorage.getItem("listes"));
            delete currentStorage[this.listeId]["items"][this.id];
            localStorage.setItem("listes", JSON.stringify(currentStorage));
        })

        /**
         * Change item to input first then change it to span and update localStorage
         * @type {Element}
         */
        const edit = this.div.querySelector(".edit");
        edit.addEventListener("click", () => {
            if(!this.edit){
                const span = this.div.querySelector("span");
                let input = document.createElement("input");
                this.div.prepend(input);
                input.className = "item-edit";
                input.value = span.innerHTML;
                this.div.removeChild(span);
            }
            else{
                const input = this.div.querySelector(".item-edit");
                let span = document.createElement("span");
                this.div.prepend(span);
                span.innerHTML = input.value;
                this.div.removeChild(input);
                this.title = span.innerHTML;

                /**
                 * Change title in localStorage
                 */
                let currentStorage = JSON.parse(localStorage.getItem("listes"));
                currentStorage[this.listeId]["items"][this.id]["title"] = this.title;
                localStorage.setItem("listes", JSON.stringify(currentStorage))

            }
            this.edit = !this.edit;
        })

    }

    /**
     * Toggle class "checked"
     */
    setChecked(){
        if(this.data){
            if(this.data["done"]) {
                this.div.classList.add("checked");
            }
            else{
                this.div.classList.remove("checked");
            }
        }
        else{
            this.div.classList.remove("checked");
        }
    }

}

export {Item};