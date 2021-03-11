import React, {Component, createRef} from 'react';
import menu from "./img/menu.svg";
import {scrollToFromNavigation} from './Scroller';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixed: false,
            hidden: true,
        }
    }

    hide = () => {
        this.setState({hidden: true});
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const landingPageHeight = document.getElementsByClassName("landing")[0].scrollHeight;
        const navbarHeight = document.getElementsByTagName("nav")[0].scrollHeight;
        // TODO: Tidy this
        if(window.screen.width > 750){
            if(window.scrollY >= landingPageHeight-(navbarHeight/2) && this.state.fixed === false){
                this.setState({fixed: true});
            } else if(window.scrollY < landingPageHeight-(navbarHeight/2)){
                this.setState({fixed: false});
            }
        } else {
            if(window.scrollY >= landingPageHeight && this.state.fixed === false){
                this.setState({fixed: true});
            } else if(window.scrollY < landingPageHeight){
                this.setState({fixed: false});
            }
        }
    };

    scrollTo = (selector) => {
        this.setState({hidden: true});
        const el = document.getElementById(selector);
        window.scroll({top: el.offsetTop+5, left: 0, behavior: "smooth"});
    };

    render() {
        return(
            <nav className={this.state.fixed ? "nav fixed" : "nav"}>
                <ul className={this.state.hidden ? "hidden" : ""}>
                    <li onClick={() => scrollToFromNavigation(this, "about")}>About</li>
                    <li onClick={() => scrollToFromNavigation(this, "projects")}>Projects</li>
                    <li onClick={() => scrollToFromNavigation(this, "contact")}>Contact</li>
                </ul>
                <img src={menu} alt="Toggle Menu" className="hamburger" onClick={() => {
                    this.setState({
                        hidden: !this.state.hidden
                    })
                }}/>
            </nav>
        );
    }
}
