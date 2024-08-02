import { experienceData, projectData } from "./data.js";
import { techStack } from "../public/tech/index.js";

export class CommonFunctions {
  static renderExperience() {
    const experienceSection = document.querySelector(".experience-section");
    experienceSection.innerHTML = "";

    experienceData.forEach((exp) => {
      const card = document.createElement("div");
      card.className = "experience-card";
      card.onclick = () => this.toggleDetails(card);

      const title = document.createElement("h2");
      title.textContent = exp.title;

      const duration = document.createElement("p");
      duration.textContent = exp.duration;

      const details = document.createElement("div");
      details.className = "experience-details";
      details.textContent = exp.details;

      card.appendChild(title);
      card.appendChild(duration);
      card.appendChild(details);
      experienceSection.appendChild(card);
    });
  }

  static toggleDetails(element) {
    const details = element.querySelector(".experience-details");
    if (details.style.display === "block") {
      details.style.display = "none";
    } else {
      details.style.display = "block";
    }
  }
}

// adding skills
document.addEventListener("DOMContentLoaded", () => {
  const skillsContainer = document.getElementById("skills-container");

  techStack.forEach((skill) => {
    const skillElement = document.createElement("div");
    skillElement.className = "skill";

    const skillImage = document.createElement("img");
    skillImage.src = skill.name;
    skillImage.alt = `${skill.tag} logo`;
    skillImage.style.width = "60px";
    skillImage.style.height = "60px";

    const skillText = document.createElement("span");
    skillElement.textContent = `${skill.tag} `;
    skillElement.appendChild(skillImage);
    skillElement.appendChild(skillText);
    skillsContainer.appendChild(skillElement);
  });
});

// adding projects
document.addEventListener("DOMContentLoaded", () => {
  const projectContainer = document.getElementById("project-container");

  projectData.forEach((project) => {
    const projectElement = document.createElement("a");
    projectElement.style.textDecoration = "none";
    projectElement.href = project.site;
    projectElement.className = "project";
    projectElement.target = "_blank";

    const projectImage = document.createElement("img");
    projectImage.src = project.frontImage;
    projectImage.alt = `${project.title} logo`;
    projectImage.style.width = "160px";
    projectImage.style.height = "160px";

    const projectTitle = document.createElement("h4");
    projectTitle.innerText = project.title;
    projectTitle.style.textDecoration = "none";

    const projectTech = document.createElement("span");
    projectElement.textContent = `${project.technologies.join(" · ")} `;
    projectTech.style.textDecoration = "none";

    projectElement.appendChild(projectImage);
    projectElement.appendChild(projectTech);
    projectElement.appendChild(projectTitle);
    projectContainer.appendChild(projectElement);
  });
});
