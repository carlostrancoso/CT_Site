document.addEventListener("contextmenu", function(e) {
  e.preventDefault();  // Prevent the context menu from appearing
});

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
        document.body.style.overflow = 'hidden';
  
        slideshow.innerHTML = ''; // Clear existing content
  
        if (!projectData.series) {
          // Display single project data
          const swiperContainer = document.createElement('div');
          swiperContainer.className = 'swiper-container';
          swiperContainer.innerHTML = `
            <div class="swiper-wrapper">  
              ${projectData.slideshow}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          `;
  
          slideshow.appendChild(swiperContainer);
  
          const mySwiper = new Swiper(swiperContainer, {
            zoom: true,
            zoom: {
              maxRatio: 2,
              minRatio: 1
            },
            pagination: {
              el: ".swiper-pagination",
              type: "fraction",
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
  
          if (projectData.title && projectData.description) {
            const projectTitle = document.createElement('h2');
            projectTitle.className = 'project-title';
            projectTitle.textContent = projectData.title;
  
            const projectDescription = document.createElement('p');
            projectDescription.className = 'project-description';
            projectDescription.textContent = projectData.description;
  
            slideshow.appendChild(projectTitle);
            slideshow.appendChild(projectDescription);
          }
        } else {
          // Series data
          if (projectData.title && projectData.description) {
            const projectSeriesTitle = document.createElement('h2');
            projectSeriesTitle.className = 'project-title';
            projectSeriesTitle.textContent = projectData.title;
  
            const projectSeriesDescription = document.createElement('p');
            projectSeriesDescription.className = 'project-description';
            projectSeriesDescription.textContent = projectData.description;
  
            slideshow.appendChild(projectSeriesTitle);
            slideshow.appendChild(projectSeriesDescription);
          }
  
          projectData.series.forEach((series) => {
            const seriesContainer = document.createElement('div');
            seriesContainer.className = 'series-container';
  
            const swiperContainer = document.createElement('div');
            swiperContainer.className = 'swiper-container';
            swiperContainer.innerHTML = `
              <div class="swiper-wrapper">
                ${series.slideshow}
              </div>
              <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
              <div class="swiper-pagination"></div>
            `;
  
            seriesContainer.appendChild(swiperContainer);
  
            const seriesTitle = document.createElement('h2');
            seriesTitle.className = 'project-title';
            seriesTitle.textContent = series.title;
  
            const seriesDescription = document.createElement('p');
            seriesDescription.className = 'project-description';
            seriesDescription.textContent = series.description;
  
            seriesContainer.appendChild(seriesTitle);
            seriesContainer.appendChild(seriesDescription);
  
            slideshow.appendChild(seriesContainer);
  
            const mySwiper = new Swiper(swiperContainer, {
              zoom: true,
              zoom: {
                maxRatio: 2,
                minRatio: 1
              },
              pagination: {
                el: ".swiper-pagination",
                type: "fraction",
              },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
          });
        }
      }
    });
  });
    
  function getProjectData(projectId) {
    const projects = {
    project1: {
      title: 'How to build a telescope',
      description: '‘How to build a telescope’ is an essay on technology in a rural context. It is a project that lives in the day-to-day of my reflections on the topic of curiosity and the need for invention.Being intimate, the project reveals itself against an ethnographic approach, seeking to dismantle prejudices associated with technology that, in he contemporary rural world, has its maximum expression of freedom. The approach is thus fictional and it’s constantly drawing a constellation map surrounding the perception of affection on technology. It addresses the importance of reshaping the future of technology against mass production, proposing a reconnection between user, creator and creations.',
      slideshow: (() => {
        let slides = '';
        for (let i = 1; i <= 22; i++) {
          slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/HTBAT_${i.toString().padStart(2, '0')}.jpg" alt="HTBAT_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
        }
        return slides;
      })()
    },
    project2: {
      title: 'Rise of trivial',
      description: '‘Rise of trivial’ is a multiplatform project about virtual identity and the ways we interact in the internet.',
      series: [
        {
          title: 'Persona',
          description: '‘Persona’ series uses a term of digital marketing. It questions the platonic facet of the network: although we do not see it, we accept its existence. This creed is represented by tridimensional portraits (in the form of busts), result of the consent of individuals to be photographed in a social context. Through photogrammetric processes it was possible to collect superficial data related to their apparent identity. Seduction is present in the background’s hue of the busts, which are based on psychological strategies applied to colors used by the social platforms of the internet. ',
          slideshow: (() => {
            let slides = '';
            for (let i = 1; i <= 5; i++) {
              slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_P_${i.toString().padStart(2, '0')}.jpg" alt="ROT_P_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
            }
            return slides;
          })()
        },
        {
          title: 'ANN',
          description: '‘ANN’ stands for Artificial Neural Network. Similarly to the brain it’s a system that evolves from data analysis, following a learning method that allows the recognition of patterns. ‘ANN’ questions the learning process of new artificial intelligence. Atfer the Internet, we ceased looking for the Plato’s Eden and start building a world of forms in our own image, creating new religions such as Dataism. For what purposes are we creating these huge databases? Can we trust in computer generated data? Can we continue to talk about images as a strictly visual language? ',
          slideshow: (() => {
            let slides = '';
            for (let i = 1; i <= 5; i++) {
              slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_ANN_${i.toString().padStart(2, '0')}.jpg" alt="ROT_ANN_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
            }
            return slides;
          })()
        },
        {
          title: 'Backup',
          description: '‘Backup’ series reflects the concept of digital documents, not only as vehicles for information but also as testimonies of isolated uses and behaviors in a virtual scenario, using the power of duplication and making it a protocol. On one hand we have figurative representations of behavior patterns; on the other hand we have the paradigm of uncontrolled information related to our digital identity, making the “right to be forgotten on the internet” a truly utopian operation. The liberalism of the information market only leaves us with two choices: to accept everything or to enjoy nothing.',
          slideshow: (() => {
            let slides = '';
            for (let i = 1; i <= 5; i++) {
              slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_B_${i.toString().padStart(2, '0')}.jpg" alt="ROT_B_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
            }
            return slides;
          })()
        },
        {
          title: 'Non-causes',
          description: 'Non-causes Description',
          slideshow: '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/Project2_Series1_01.jpg" alt="Project2_Series1_01.jpg"></div></div>...'
        },
        {
          title: 'Inscription',
          description: 'Inscription Description',
          slideshow: '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/Project2_Series1_01.jpg" alt="Project2_Series1_01.jpg"></div></div>...'
        }
      ]
    },
    project3: {
      title: 'Glad I spent it with you',
      description: 'There is no such thing as a manual on reading digital images for humans. “Glad I spent it with you” is a set of images that unveil the basic structure of a digital image. These images are the product of unintentional errors that occured with a broken storage card. Although the files were corrupted, the machine maked the effort on reading the data, producing images that denounce the reading methods of the basic units that constitutes the digital photographs we produce with our cameras. This project intends to reclaim the authorship associated with images whose initial intention of assisting memory transforms into the realization and consecration of the digital image as an ephemeral by-product of contemporary virtual culture.',
      slideshow: (() => {
        let slides = '';
        for (let i = 1; i <= 8; i++) {
          slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/GISIWY_${i.toString().padStart(2, '0')}.jpg" alt="GISIWY_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
        }
        return slides;
      })()
    },
    project4: {
      title: 'Narrow Slice',
      description: '“Isn’t the human emancipation of Nature really just an outcome of our own Nature?” ‘Narrow Slice’ is a documentary photography project that deals with the way human beings position themselves in time and space in relation to Nature. The unease caused by the ambiguity of this query proposes us to revisit the apparent reality, leading to the formulation of new questions.',
      slideshow: (() => {
        let slides = '';
        for (let i = 1; i <= 12; i++) {
          slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/NS_${i.toString().padStart(2, '0')}.jpg" alt="NS_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
        }
        return slides;
      })()
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
  zoom: true,
  zoom: {
    maxRatio: 2,
    minRatio: 1
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
});