import {Liste} from "./Liste";
import randomInteger from 'random-int';
const _ = require('underscore');

class Utils{
    constructor(parent){
        this.parent = parent;
        this.div = document.createElement("div");
        this.createDom();
        this.liste = this.div.querySelector("#utils-list");
        this.updateListDisplay();
    }

    /**
     * define Dom and event
     */
    createDom(){
        this.parent.appendChild(this.div);
        this.div.id = "utils";
        this.div.innerHTML =
            `
            <h1>Listes</h1>
            <div>
                <input type="text" placeholder="Name...">
                <input type="submit">
            </div>
            <div id="utils-list"></div>
            `
        ;

        const submit = this.div.querySelector("input[type=submit]");
        const name = this.div.querySelector("input[type=text]");

        /**
         * Add a list
         */
        submit.addEventListener("click", () => {
            if(name.value !== ""){
                const localStorageListes = JSON.parse(localStorage.getItem("listes"));
                let newId;
                if(localStorageListes !== null){
                    if(!_.isEmpty(localStorageListes)){
                        const id_liste = Object.keys(localStorageListes);
                        newId = parseInt(id_liste[id_liste.length - 1]) + 1;
                    }
                    else{
                        newId = 0;
                    }
                }
                else{
                    newId = 0;
                }

                new Liste(name.value, newId, {
                    top: randomInteger(0, 50) + "%",
                    left: randomInteger(0, 30) + "%"
                });
                this.updateListDisplay();
                name.value = "";
            }

        })
    }

    /**
     * Update Liste of liste
     */
    updateListDisplay(){
        this.liste.innerHTML = "";
        const localStorageListes = JSON.parse(localStorage.getItem("listes"));
        if(localStorageListes !== null){
            if(!_.isEmpty(localStorageListes)) {
                const id_liste = Object.keys(localStorageListes);
                for(let id of id_liste){
                    this.liste.innerHTML +=
                        `
                        <div class="liste-title-utils" data-id='${id}'>${localStorageListes[id]["liste-title"]}</div>
                        `;
                }
                const titles = this.liste.querySelectorAll(".liste-title-utils");
                for(let title of titles){
                    title.addEventListener("click", () => {
                        /**
                         * Reset zindex and animation of all liste then apply animation to selected one
                         */
                        for(let title2 of titles){
                            let div = document.querySelector("#liste-" + title2.dataset.id);
                            div.style.zIndex = "1";
                            this.clearAnimation(div);
                        }
                        this.animateDiv(document.querySelector("#liste-" + title.dataset.id));
                    })
                }
            }
        }
    }

    animateDiv(div){
        div.style.zIndex = "10";
        div.style.animationName = "focus";
        div.style.animationDuration = "0.5s";
        div.style.animationIterationCount = "4";
        window.setTimeout(() => {
            this.clearAnimation(div);
        },2000);
    }

    clearAnimation(div){
        div.style.animationName = "";
    }

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

export {Utils};