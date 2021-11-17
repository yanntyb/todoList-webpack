import "./css/reset.css";
import "./css/component/Liste.css"
import "./css/component/Utils.css";
import "./css/animation/focus.css";
import {Liste} from "./js/classes/Liste";
import {Utils} from "./js/classes/Utils";

new Utils(document.querySelector("body"));
const main = document.querySelector("#main");


/**
 * Create liste according to localStorage data
 */

if(localStorage.getItem("listes")){
    let listes = JSON.parse(localStorage.getItem("listes"))
    for(let indexListe of Object.keys(listes)){
        let liste = new Liste(listes[indexListe]["liste-title"],indexListe, listes[indexListe]["pos"],main);
        let items = listes[indexListe]["items"];
        for(let indexItem of Object.keys(items)){
            liste.addItem(items[indexItem]["title"],items[indexItem]["data"],false,items[indexItem]);
        }
    }
}

document.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);


