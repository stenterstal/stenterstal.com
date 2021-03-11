function scrollToFromNavigation(navigation, selector){
    navigation.hide();
    const el = document.getElementById(selector);
    window.scroll({top: el.offsetTop+5, left: 0, behavior: "smooth"});
}

export {scrollToFromNavigation};