import './App.scss';
import React, {createRef} from "react";
import Navbar from "./components/Navbar";
import github from "./img/github.svg";
import profile from "./img/profile.png";
import config from "./config.json";
import {scrollTo, scrollToProject} from "./util/Scroller";
import Mailform from "./components/Mailform";

// TODO: Add email functionality using EmailJS
// TODO: Add CAPTCHA to email form
// TODO: Add regex for mailadress in mailform
// TODO: Change mail focus style

// TODO: Add download svg to Resume -> maybe make a english resume
// TODO: Media query between desktop and mobile
// TODO: Fix lighthouse scores to 100% on all

class App extends React.Component {

    navBarRef = createRef();

    render() {
        return (
            <div className="App">
                <div className="landing">
                    <div className="github">
                        <a href="https://github.com/stenterstal/stenterstal.com">
                            <img src={github} alt="Github"/>
                        </a>
                    </div>
                    <div className="container">
                        <img src={profile} alt=""/>
                        <div className="info">
                            <div className="text">
                                <h2>Hey there,</h2>
                                <h1>I'm {config.name}</h1>
                                <h2>A {config.title}</h2>
                            </div>
                            <div className="buttons">
                                <button>
                                    <p onClick={() => scrollTo(this.navBarRef.current, "about")}>
                                        Projects
                                    </p>
                                </button>
                                <button>
                                    <a href="https://github.com/stenterstal/stenterstal/raw/main/CV.pdf">
                                        Resume
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="links">
                        <div className="link">
                            <p>Email</p>
                            <a href={"mailto:" + config.email}>{config.email}</a>
                        </div>
                        <div className="link">
                            <p>Github</p>
                            <a href={"https://github.com/" + config.github}>github.com/{config.github}</a>
                        </div>
                        <div className="link">
                            <p>LinkedIn</p>
                            <a href={"https://www.linkedin.com/in/" + config.linkedin}>linkedin.com/in/{config.linkedin}</a>
                        </div>
                    </div>
                </div>
                <Navbar ref={this.navBarRef}/>
                <div className="about" id="about">
                    <div className="container">
                        <h1>About me</h1>
                        <div className="col">
                            <div className="col-3">
                                <p>{config.about.description}</p>
                            </div>
                            <div className="col-2">
                                <p><span>Name : </span> {config.name}</p>
                                <p><span>Date of Birth : </span> {config.about.birthdate}</p>
                                <p><span>Nationality : </span> {config.about.nationality}</p>
                                <p><span>Location : </span> {config.about.location}</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="col">
                                <h2>Experience</h2>
                                {config.about.experience.map((experience) => (
                                    <div className="section" key={experience.title}>
                                        <h5>{experience.title}</h5>
                                        <p className="date">{experience.date}</p>
                                        <p className="description">{experience.description}</p>
                                        {experience.readMoreID !== undefined &&
                                        <p onClick={() => scrollToProject(this.navBarRef.current, experience.readMoreID)}
                                           className="readmore">Read more...</p>}
                                    </div>
                                ))}
                            </div>
                            <div className="col">
                                <h2>Education</h2>
                                {config.about.education.map((education) => (
                                    <div className="section" key={education.title}>
                                        <h5>{education.title}</h5>
                                        <p className="date">{education.date}</p>
                                        {education.description !== undefined &&
                                        <p className="description">{education.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="skills-container">
                            <h2>Skills</h2>
                            <div className="col">
                                <div className="col">
                                    <h3>Languages</h3>
                                    {
                                        config.about.skills[0].map((language) => (
                                            <div className="skill" key={language.title}>
                                                <h4>{language.title}</h4>
                                                <div className="bar">
                                                    <div className="outer">
                                                        <div className="inner" style={{width: language.percentage}}/>
                                                    </div>
                                                    <p>{language.experience}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="col">
                                    <h3>Frameworks / Tools</h3>
                                    {
                                        config.about.skills[1].map((item) => (
                                            <div className="skill" key={item.title}>
                                                <h4>{item.title}</h4>
                                                <div className="bar">
                                                    <div className="outer">
                                                        <div className="inner" style={{width: item.percentage}}/>
                                                    </div>
                                                    <p>{item.experience}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="projects" id="projects">
                    <div className="container">
                        <h1>Projects</h1>
                        <div className="projects-container">
                            {
                                config.projects.map((project) => (
                                    <div className="project" id={project.id} key={project.title}>
                                        <h3>{project.title}</h3>
                                        {project.badges != null && project.badges.length > 0 &&
                                        <div className="badges">
                                            {
                                                project.badges.map((badge, index) => (
                                                    <img src={badge[1]} alt={badge[0]} key={project.title+"-badge-"+index}/>
                                                ))
                                            }
                                        </div>
                                        }
                                        {
                                            project.description.map((paragraph, index) =>
                                                <div key={project.title + "-paragraph-"+index}>
                                                    <p className="wrap">{paragraph}</p>
                                                    {index !== project.description.size ? <br/> : null}
                                                </div>)
                                        }
                                        {project.source != null &&
                                        <a href={project.source}>
                                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"
                                                 viewBox="0 0 24 24">
                                                <path fill="#FFFFFF"
                                                      d="M10.07031,20.50291a1.00008,1.00008,0,0,0-1.18115-.9834c-1.30908.24024-2.96191.27637-3.40137-.958a5.70754,5.70754,0,0,0-1.83691-2.415,1.20073,1.20073,0,0,1-.1665-.10938,1,1,0,0,0-.93067-.64551H2.54883a.99965.99965,0,0,0-1,.99512c-.00391.81543.811,1.33789,1.1416,1.51465a4.4408,4.4408,0,0,1,.92383,1.35937c.36426,1.02344,1.42285,2.57617,4.46582,2.376.001.03516.00195.06836.00244.09863l.00439.26758a1,1,0,0,0,2,0l-.00488-.31836C10.07715,21.4951,10.07031,21.22068,10.07031,20.50291Zm10.667-15.126c.03174-.125.063-.26367.09034-.41992a6.27792,6.27792,0,0,0-.40821-3.293,1.002,1.002,0,0,0-.61572-.58007c-.356-.12012-1.67041-.35645-4.18408,1.25a13.86918,13.86918,0,0,0-6.354,0C6.76221.751,5.45459.9658,5.10205,1.07908a.99744.99744,0,0,0-.63135.584,6.3003,6.3003,0,0,0-.40332,3.35644c.02442.12793.05078.2461.07813.35449A6.26928,6.26928,0,0,0,2.89014,9.20311a8.42168,8.42168,0,0,0,.04248.92187c.334,4.60254,3.334,5.98438,5.42431,6.459-.04345.125-.083.25878-.11816.40039a1.00023,1.00023,0,0,0,1.94238.47851,1.6784,1.6784,0,0,1,.46778-.87793.99947.99947,0,0,0-.5459-1.74512c-3.4541-.39453-4.95362-1.80175-5.1792-4.89843a6.61076,6.61076,0,0,1-.03369-.73828,4.25769,4.25769,0,0,1,.91943-2.71289,3.022,3.022,0,0,1,.1958-.23145.99988.99988,0,0,0,.188-1.02441,3.3876,3.3876,0,0,1-.15527-.55567A4.09356,4.09356,0,0,1,6.1167,3.06346a7.54263,7.54263,0,0,1,2.415,1.17968,1.00877,1.00877,0,0,0,.82764.13282,11.77716,11.77716,0,0,1,6.17285.001,1.00549,1.00549,0,0,0,.83056-.13769,7.572,7.572,0,0,1,2.40528-1.19043,4.03977,4.03977,0,0,1,.0874,1.57812,3.205,3.205,0,0,1-.16895.60743.9999.9999,0,0,0,.188,1.02441c.07715.08691.1543.18066.22363.26855A4.12186,4.12186,0,0,1,20,9.20311a7.03888,7.03888,0,0,1-.0376.77734c-.22021,3.05566-1.72558,4.46387-5.1958,4.85937a1,1,0,0,0-.54541,1.7461,1.63079,1.63079,0,0,1,.46631.9082,3.06079,3.06079,0,0,1,.09229.81934v2.334C14.77,21.2949,14.77,21.78025,14.77,22.00291a1,1,0,1,0,2,0c0-.2168,0-.69238.00977-1.33984V18.31346a4.8815,4.8815,0,0,0-.15479-1.31153,4.25638,4.25638,0,0,0-.11621-.416,6.51258,6.51258,0,0,0,5.44531-6.42383A8.69677,8.69677,0,0,0,22,9.20311,6.13062,6.13062,0,0,0,20.7373,5.37693Z"/>
                                            </svg>
                                            View source
                                        </a>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="contact" id="contact">
                    <Mailform/>
                </div>
                <div className="footer">
                    <div className="container">
                        <p>Licensed under MIT License - <a target="_blank" rel="noreferrer"
                                                           href="https://github.com/stenterstal/stenterstal.com/blob/master/LICENSE">Read
                            More</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
