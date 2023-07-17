const worksLink = document.querySelector('.works-link');
const aboutLink = document.querySelector('.about-link');
const nameText = document.querySelector('.name.logo'); // Select the h1 element with both name and logo classes
const projectLinks = document.querySelectorAll('.projects');
const overlayContainer = document.querySelector('.overlay-container');
const closeButton = document.querySelector('.close-button');
const projectTitle = document.querySelector('.project-title');
const slideshow = document.querySelector('.slideshow');
const projectDescription = document.querySelector('.project-description');

projectLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const projectId = link.id;
    const projectData = getProjectData(projectId); // Retrieve project data based on the project ID

    if (projectData) {
      // Show the overlay container
      overlayContainer.style.display = 'flex';

      // Populate the overlay content with project data
      projectTitle.textContent = projectData.title;
      slideshow.innerHTML = projectData.slideshow;
      projectDescription.textContent = projectData.description;

      // Prevent scrolling when the overlay is open
      document.body.style.overflow = 'hidden';
    }
  });
});

closeButton.addEventListener('click', () => {
  // Hide the overlay container
  overlayContainer.style.display = 'none';

  // Reset scrolling when the overlay is closed
  document.body.style.overflow = '';
});

function getProjectData(projectId) {
  // Define a sample dataset for demonstration purposes
  const projects = {
    project1: {
      title: 'How to build a telescope',
      slideshow: '<img src="project1-image1.jpg" alt="Project 1 Image 1"><img src="project1-image2.jpg" alt="Project 1 Image 2">',
      description: '‘How to build a telescope’ is an essay on technology in a rural context. It is a project that lives in the day-to-day of my reflections on the topic of curiosity and the need for invention. Being intimate, the project reveals itself against an ethnographic approach, seeking to dismantle prejudices associated with technology that, in the contemporary rural world, has its maximum expression of freedom. The approach is thus fictional and it’s constantly drawing a constellation map surrounding the perception of affection on technology. It addresses the importance of reshaping the future of technology against mass production, proposing a reconnection between user, creator and creations.'
    },
    project2: {
      title: 'Rise of trivial',
      slideshow: '<img src="project2-image1.jpg" alt="Project 2 Image 1"><img src="project2-image2.jpg" alt="Project 2 Image 2">',
      description: '‘Rise of trivial’ is a multiplatform project about virtual identity and the ways we interact in the internet.'
    },
    project3: {
      title: 'Glad I spent it with you',
      slideshow: '<img src="project3-image1.jpg" alt="Project 3 Image 1"><img src="project3-image2.jpg" alt="Project 3 Image 2">',
      description: 'There is no such thing as a manual on reading digital images for humans. “Glad I spent it with you” is a set of images that unveil the basic structure of a digital image. These images are the product of unintentional errors that occured with a broken storage card. Although the files were corrupted, the machine maked the effort on reading the data, producing images that denounce the reading methods of the basic units that constitutes the digital photographs we produce with our cameras. This project intends to reclaim the authorship associated with images whose initial intention of assisting memory transforms into the realization and consecration of the digital image as an ephemeral by-product of contemporary virtual culture.'
    },
    project4: {
      title: 'Narrow Slice',
      slideshow: '<img src="project4-image1.jpg" alt="Project 4 Image 1"><img src="project4-image2.jpg" alt="Project 4 Image 2">',
      description: '“Isn’t the human emancipation of Nature really just an outcome of our own Nature?” ‘Narrow Slice’ is a documentary photography project that deals with the way human beings position themselves in time and space in relation to Nature. The unease caused by the ambiguity of this query proposes us to revisit the apparent reality, leading to the formulation of new questions.'
    }
  };

  return projects[projectId] || null; // Return project data for the given ID (or null if not found)
}


const worksOffset = 0; // Adjust the initial offset for Works link movement
const aboutOffset = 10; // Adjust the initial offset for About link movement

let mouseX = 0;
let mouseY = 0;
let time = 0;
const speed = 0.005; // Adjust the speed of the movement

function updateMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const skewAmount = 6; // Adjust the amount of skew transformation

  const skewX = (mouseX / window.innerWidth - 0.5) * skewAmount;
  const skewY = (mouseY / window.innerHeight - 0.5) * skewAmount;

  nameText.style.transform = `skew(${skewX}deg, ${skewY}deg) translateX(${skewX}px) translateY(${skewY}px)`;
}

document.addEventListener('mousemove', updateMousePosition);

function animateLinks() {
  const worksXMovement = worksOffset + Math.sin(time) * 10 + mouseY / window.innerHeight * 8 - 4;
  const worksYMovement = worksOffset + Math.cos(time) * 10 + mouseX / window.innerWidth * 8 - 4;

  const aboutXMovement = aboutOffset + Math.sin(time * -1) * 6 + mouseY / window.innerHeight * 4 - 2;
  const aboutYMovement = aboutOffset + Math.cos(time) * 6 + mouseX / window.innerWidth * 4 - 2;

  worksLink.style.transform = `translateX(${worksXMovement}px) translateY(${worksYMovement}px) skewX(${worksYMovement / 2}deg) skewY(${worksXMovement / 2}deg)`;
  aboutLink.style.transform = `translateX(${aboutXMovement}px) translateY(${aboutYMovement}px) skewX(${aboutYMovement / 2}deg) skewY(${aboutXMovement / 2}deg)`;
  nameText.style.transform = `translateX(${worksXMovement}px) translateY(${worksYMovement}px)`;

  projectLinks.forEach((link, index) => {
    const projectOffset = index * 10; // Adjust the initial offset for each project
    const projectXMovement = projectOffset + Math.sin(time) * 6 + mouseY / window.innerHeight * 4 - 2;
    const projectYMovement = projectOffset + Math.cos(time) * 6 + mouseX / window.innerWidth * 4 - 2;

    link.style.transform = `translateX(${projectXMovement}px) translateY(${projectYMovement}px) skewX(${projectYMovement / 10}deg) skewY(${projectXMovement / -4}deg)`;

  });

  time += speed;
  requestAnimationFrame(animateLinks);
}

animateLinks();
