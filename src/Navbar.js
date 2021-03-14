import React, {Component, createRef} from 'react';
import menu from "./img/menu.svg";
import {scrollTo} from './Scroller';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixed: false,
            hidden: true,
            height: 0,
        }
    }

    navBarRef = createRef();

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.resizeWindow);
        this.resizeWindow();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.resizeWindow);
    }

    resizeWindow = () => {
        let height = this.navBarRef.current.getBoundingClientRect().height;
        this.setState({height});
    };

    hide = () => {
        this.setState({hidden: true});
    };

    getHeight = () => {
        return Math.round(this.state.height);
    };

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

    render() {
        return(
            <nav className={this.state.fixed ? "nav fixed" : "nav"} ref={this.navBarRef}>
                <ul className={this.state.hidden ? "hidden" : ""}>
                    <li onClick={() => scrollTo(this, "about")}>About</li>
                    <li onClick={() => scrollTo(this, "projects")}>Projects</li>
                    <li onClick={() => scrollTo(this, "contact")}>Contact</li>
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
