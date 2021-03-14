/**
 *  Scrolls to the element
 */
function scrollTo(navigation, selector){
    navigation.hide();
    const el = document.getElementById(selector);
    if(el) window.scroll({top: el.offsetTop + 5, left: 0, behavior: "smooth"});
}

/**
 * Scrolls to the element but leaves room for the navbar
 */
function scrollToProject(navigation, selector){
    navigation.hide();
    const el = document.getElementById(selector);
    if(el) window.scroll({top: el.offsetTop - navigation.getHeight() - 10, left: 0, behavior: "smooth"});
}

export {scrollTo, scrollToProject};
