import {getAllProjects} from "@/lib/api";
import './App.scss'
import Avatar from '../../public/assets/img/Avatar.png';
import ProjectRow from "@/app/_components/ProjectRow";
import CardRow from "@/app/_components/CardRow";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLinkedinIn, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export default function Index() {

  const projects = getAllProjects();

  return (
      <>
        <section className="landing">
          <Image src={Avatar} height={204} width={192} alt={"Pixel art self portrait"} quality={100} priority={true}/>
          <div>
            <h1>Sten</h1>
            <h3>Software Engineer</h3>
            <p><i>Full stack</i> - with a preference for frontend</p>
            <p>Professionally a full stack developer, a hobbyist while at home.
              In my spare time I like to walk with my dog, read, play video games and experiment with technology.
              Beside programming I also have an interest in self hosting open source applications and creating a privacy
              friendly smart home/network.
            </p>
            <div className="socials">
              <a href="https://linkedin.com/in/stenterstal">
                <FontAwesomeIcon icon={faLinkedinIn} className={"icon"}/>
                <span>
                  LinkedIn
                </span>
              </a>
              <a href="https://github.com/stenterstal">
                <FontAwesomeIcon icon={faGithub} className={"icon"}/>
                Github
              </a>
              <a href="mailto:mail@stenterstal.com">
                <FontAwesomeIcon icon={faEnvelope} className={"icon"}/>
                Email
              </a>
            </div>
          </div>
        </section>
        <section className="projects">
          <header>
            <h2>Projects ({projects.length})</h2>
            {projects.length > 3 && <Link href={"/projects/"} className={"view-all"}>View all projects</Link>}
          </header>
          <div className="projects-container">
            {projects.slice(0, 3).map(project => <ProjectRow project={project} key={project.slug}/>)}
          </div>
          {projects.length > 3 && <Link href={"/projects/"} className={"view-all"}>View all projects</Link>}
        </section>
        <section className={"experience"}>
          <h2>Experience & Education</h2>
          <CardRow
              type={"Work"}
              title={"Software Engineer"}
              place={"Justid"}
              date={"nov 2022- present"}
              tags={["Angular", "Python", "Django", "Kubernetes", "Jenkins", "Docker"]}>
            <p>During my Graduation project I did research on how to migrate an existing server-side MVC application to
              JustitieConnect (Javascript
              SPA platform). Implemented this as a Proof of Concept with React as frontend and Django Rest Framework as
              backend<br/><br/></p>
            <p>During my actual work I am responsible for building and maintaining various applications using the Justice Service Interfaces (JSI), a service for exchanging information
              in the judicial chain. Am responsible for deploying an in-house version of <a
                  target={"_blank"} href="https://developer.overheid.nl">the open source developer.overheid.nl</a> for use in
              the Justice department.</p>
          </CardRow>
          <CardRow
              type={"Work"}
              title={"Student Job Frontend Developer"}
              place={"Fortes"}
              date={"feb 2021 - nov 2021"}
              tags={["React", "Backbone.js"]}>
            <p>During my internship made user configurable graphical segments to be used inside the Fortes Change
              Cloud.</p>
            <p>Stayed after my internship and worked with the scrum development team on new features and bugfixes</p>
          </CardRow>
          <CardRow
              type={"Education"}
              title={"HBO-ICT"}
              place={"Saxion Enschede"}
              date={"2018 - 2023"}>
            <ul>
              <li>Specialization Advanced Application Development - <i>Rapid prototyping, UI/UX</i></li>
              <li>Minor Smart Cities - <i>Multidisciplinary collaboration between IT and Spatial Development</i></li>
            </ul>
          </CardRow>
        </section>
      </>
  );
}
