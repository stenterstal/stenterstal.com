import './App.scss';
import React from "react";
import Navbar from "./Navbar";
import github from "./img/github.svg";
import profile from "./img/profile.png";
import config from "./config.json";

function App() {
    return (
        <div className="App">
            <div className="landing">
                <div className="github">
                    <a href="https://github.com/stenterstal/stenterstal.com">
                        <img src={github} alt=""/>
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
                                <a href="/">
                                    Projects
                                </a>
                            </button>
                            <button>
                                <a href="/">
                                    Resume
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="links">
                    <div className="link">
                        <h5>Email</h5>
                        <a href={"mailto:"+config.email}>{config.email}</a>
                    </div>
                    <div className="link">
                        <h5>Github</h5>
                        <a href={"https://github.com/"+config.github}>github.com/{config.github}</a>
                    </div>
                    <div className="link">
                        <h5>LinkedIn</h5>
                        <a href={"https://www.linkedin.com/in/"+config.linkedin}>linkedin.com/in/{config.linkedin}</a>
                    </div>
                </div>
            </div>
            <Navbar/>
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
                                <div className="section">
                                    <h5>{experience.title}</h5>
                                    <p className="date">{experience.date}</p>
                                    <p className="description">{experience.description}</p>
                                    {experience.readmore !== undefined && <a href="" className="readmore">Read more...</a>}
                                </div>
                            ))}
                        </div>
                        <div className="col">
                            <h2>Education</h2>
                            {config.about.education.map((education) => (
                                <div className="section">
                                    <h5>{education.title}</h5>
                                    <p className="date">{education.date}</p>
                                    {education.description !== undefined && <p className="description">{education.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col">
                        <h2>Work In Progress!</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
