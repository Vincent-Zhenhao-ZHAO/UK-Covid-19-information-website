/**
 * @file code source from: https://www.youtube.com/watch?v=VZzWzRVXPcQ&ab_channel=GTCoding.
 */
/**
 * selectbutton
 * @description get selected content from html
 */
const selectbutton = document.querySelector(".selected");
/**
 * options
 * @description get option container from html
 */
const options = document.querySelector(".options-container");
/**
 * searchBox
 * @description get input of search box from html
 */
const searchBox = document.querySelector(".search-box input");
/**
 * optionList
 * @description get all options from html
 */
const optionList = document.querySelectorAll(".option");
/**
 * tierOne
 * @description get tier content from html
 */
const tierOne = document.querySelector(".tier-3"); 
// when click it, it will give all options.
selectbutton.addEventListener("click", () => {
    options.classList.toggle("active");
    //give input value as nothing
    searchBox.value = "";
    filterList("");
    if (options.classList.contains("active")) {
        searchBox.focus();
    }
});
// search each element in list,if click it, will hide the others, and show the content.
optionList.forEach(element => {
    element.addEventListener("click", () => {
        selectbutton.innerHTML = element.querySelector("label").innerHTML;
        options.classList.remove("active");
        tierOne.classList.remove("hide");
    });
});
// if input content match the latter, show the options.
searchBox.addEventListener("keyup", function(item) {
    filterList(item.target.value);
});
/**
 * 
 * @param searchitem input value
 * @description this function is to match avaliable inputs and help user find area name more easily.
 */
const filterList = searchitem => {
    searchitem = searchitem.toLowerCase();// make it as same case.
    // search each options and find the suitable one.
    optionList.forEach(choices => {
        /**
         * @global
         * @description this is to find every options and see each later with lowercase.
         */
        let label = choices.firstElementChild.nextElementSibling.innerText.toLowerCase();
        if (label.indexOf(searchitem) != -1) {
            choices.style.display = "block";
        } 
        else {
            choices.style.display = "none";
        }
    });
};
