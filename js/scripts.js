document.addEventListener('DOMContentLoaded', () => {
  const worksLink = document.querySelector('.works-link');
  const aboutLink = document.querySelector('.about-link');
  const nameText = document.querySelector('.name.logo');
  const projectLinks = document.querySelectorAll('.projects');
  const projectsContainer = document.querySelector('.projects-container');
  const backgroundIframe = document.querySelector('.background-iframe');
  const overlayContainer = document.querySelector('.overlay-container');
  const closeButton = document.querySelector('.close-button');
  const projectTitle = document.querySelector('.project-title');
  const slideshow = document.querySelector('.slideshow');
  const projectDescription = document.querySelector('.project-description');
  const aboutContent = document.querySelector('.about-content');

  let projectLinksVisible = false; // To track whether project links are visible


  worksLink.addEventListener('click', () => {
    projectsContainer.style.visibility = 'visible';
    projectLinksVisible = true;
    backgroundIframe.style.display = 'none';
    aboutContent.style.display = 'none'; // Hide the about content
  });

  aboutLink.addEventListener('click', () => {
    projectsContainer.style.visibility = 'hidden'; // Hide project links
    projectLinksVisible = false; // Set project links visibility to false
    backgroundIframe.style.display = 'none'; // Hide the iframe
    overlayContainer.style.display = 'none';
    aboutContent.style.display = 'flex'; // Show about content
    document.body.style.overflow = ''; // Restore body scrolling
  });

  closeButton.addEventListener('click', () => {
    projectsContainer.style.visibility = 'visible';
    backgroundIframe.style.display = 'none';
    aboutContent.style.display = 'none'; // Hide the about content
    overlayContainer.style.display = 'none'; // Hide the overlay
    document.body.style.overflow = ''; // Restore body scrolling
  });

  nameText.addEventListener('click', () => {
    projectsContainer.style.visibility = 'hidden';
    backgroundIframe.style.display = 'block';
    aboutContent.style.display = 'none'; // Hide the about content
    overlayContainer.style.display = 'none';
    document.body.style.overflow = ''; // Restore body scrolling
  });

  projectLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (!projectLinksVisible) return; // Only proceed if project links are visible

      const projectId = link.id;
      const projectData = getProjectData(projectId);

      if (projectData) {
        overlayContainer.style.display = 'flex';
        projectTitle.textContent = projectData.title;
        projectDescription.textContent = projectData.description;

        const swiperContainer = document.createElement('div');
        swiperContainer.className = 'swiper-container';
        swiperContainer.innerHTML = `
          <div class="swiper-wrapper">
            ${projectData.slideshow}
          </div>
          <div class="swiper-pagination"></div>
        `;

        slideshow.innerHTML = '';
        slideshow.appendChild(swiperContainer);

        document.body.style.overflow = 'hidden';

        const mySwiper = new Swiper(swiperContainer, {
          pagination: {
            el: '.swiper-pagination',
          },
        });
 
      }
    });
  });


  function getProjectData(projectId) {
    const projects = {
    project1: {
      title: 'How to build a telescope',
      description: '‘How to build a telescope’ is an essay on technology in a rural context. It is a project that lives in the day-to-day of my reflections on the topic of curiosity and the need for invention...',
      slideshow: '<div class="swiper-slide"><img src="./content/jpg/HTBAT_01.jpg" alt="HTBAT_01.jpg"></div><div class="swiper-slide"><img src="./content/jpg/HTBAT_03.jpg" alt="Project 1 Image 3"></div><div class="swiper-slide"><img src="./content/jpg/HTBAT_04.jpg" alt="Project 1 Image 2"></div><div class="swiper-slide"><img src="./content/jpg/HTBAT_02.jpg" alt="Project 1 Image 4"></div>'
    },
    project2: {
      title: 'Rise of trivial',
      slideshow: '<div class="swiper-slide"><img src="./content/jpg/HTBAT_01.jpg" alt="Project 2 Image 1"></div><div class="swiper-slide"><img src="./content/jpg/HTBAT_01.jpg" alt="Project 2 Image 2"></div>',
      description: '‘Rise of trivial’ is a multiplatform project about virtual identity and the ways we interact in the internet.'
    },
    project3: {
      title: 'Glad I spent it with you',
      description: 'There is no such thing as a manual on reading digital images for humans...',
      slideshow: `
        <div class="swiper-slide"><img src="./content/jpg/GISWY_01.jpg" alt="Project 3 Image 1"></div>
        <div class="swiper-slide"><img src="./content/jpg/GISWY_02.jpg" alt="Project 3 Image 2"></div>
        <div class="swiper-slide"><img src="./content/jpg/GISWY_03.jpg" alt="Project 3 Image 3"></div>
        <div class="swiper-slide"><img src="./content/jpg/GISWY_04.jpg" alt="Project 3 Image 4"></div>
        <div class="swiper-slide"><img src="./content/jpg/GISWY_05.jpg" alt="Project 3 Image 5"></div>
        <div class="swiper-slide"><img src="./content/jpg/GISWY_06.jpg" alt="Project 3 Image 6"></div>
      `
    },
    project4: {
      title: 'Narrow Slice',
      slideshow: '<div class="swiper-slide"><img src="./content/jpg/HTBAT_01.jpg" alt="Project 4 Image 1"></div><div class="swiper-slide"><img src="./content/jpg/HTBAT_01.jpg" alt="Project 4 Image 2"></div>',
      description: '“Isn’t the human emancipation of Nature really just an outcome of our own Nature?”...'
    }
  };

  return projects[projectId] || null;
}

const worksOffset = 0;
const aboutOffset = 10;

let mouseX = 0;
let mouseY = 0;
let time = 0;
const speed = 0.005;

function updateMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const skewAmount = 6;

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
    const projectOffset = index * 10;
    const projectXMovement = projectOffset + Math.sin(time) * 6 + mouseY / window.innerHeight * 4 - 2;
    const projectYMovement = projectOffset + Math.cos(time) * 6 + mouseX / window.innerWidth * 4 - 2;

    link.style.transform = `translateX(${projectXMovement}px) translateY(${projectYMovement}px) skewX(${projectYMovement / 10}deg) skewY(${projectXMovement / -4}deg)`;
  });

  time += speed;
  requestAnimationFrame(animateLinks);
}

animateLinks();

const mySwiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
});
});