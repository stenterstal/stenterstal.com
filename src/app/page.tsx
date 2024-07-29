import {getAllProjects} from "@/lib/api";
import './App.scss'
import Avatar from './Avatar.png';
import ProjectRow from "@/app/_components/ProjectRow";
import CardRow from "@/app/_components/CardRow";
import Image from "next/image";
import Link from "next/link";
export default function Index() {

  const projects = getAllProjects();

  return (
      <>
        <section className="landing">
          <Image src={Avatar} alt={"Pixel art self portrait"} quality={100} priority={true}/>
          <div>
            <h1>Sten</h1>
            <h3>Software Engineer</h3>
            <p><i>Full stack</i> - with a preference for frontend</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book</p>
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
            <p>Building and maintaining the Justid Service Interfaces (JSI) used for exchanging of information
              in the judicial chain. Also responsible for deploying an in-house version of <a
                  target={"_blank"} href="https://developer.overheid.nl">developer.overheid.nl</a> for use in
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
