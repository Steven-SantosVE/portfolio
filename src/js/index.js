const container = document.querySelector('.container');
let currentSection = 0;
let isScrolling = false;
const audioScroll = document.getElementById("scrollsound");
import { burguerNavbar } from "./navbar.js";

const startAudio = (audio) => {
    audio.play()
        .then(() => {
            console.log("Audio playing successfully!");
        })
        .catch(error => {
            console.error("Audio playback failed:", error);
        });
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("The HTML is fully loaded and ready!");

    const audio = document.getElementById("mySound");
    audio.volume = 0.1
    
    document.addEventListener("click", () => startAudio(audio));
    document.addEventListener("keydown",() => startAudio(audio));
    document.addEventListener("mousemove",() => startAudio(audio));
});

const LoadSoundOnHover = (audio, selector) => {
const itemHovers = document.querySelectorAll(selector);

itemHovers.forEach((item) => {
  item.addEventListener("mouseover", () => {
    if (audio) {
      audio.currentTime = 0; // Reset sound to start on every hover
      audio.loop = true;
      audio.play().catch((err) => console.log("Autoplay blocked until user clicks page:", err));
    }
  });
  item.addEventListener("mouseleave", () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
});
};

LoadSoundOnHover(
  document.getElementById("hero-image-sound"), 
  ".hero-image-container"
);

const LoadAnimationsOnScroll = (nextIndex) => {
  const sections = document.querySelectorAll('.container > section');
  const targetSection = sections[nextIndex];

  if (!targetSection) return;

  // Simply mark the section as visible
  targetSection.classList.add('visible');
};

function handleScroll(e) {
  const direction = e.deltaY > 0 ? 1 : -1;
  const sections = container.children;
  let nextSection = currentSection + direction;
  
  const isLastSection = currentSection === sections.length - 1;
  if (isLastSection && direction > 0) {
    return;
  }

  e.preventDefault();
  
  if (isScrolling) return;

  isScrolling = true;

  // Boundary checks
  if (nextSection < 0) nextSection = 0;
  if (nextSection >= sections.length) nextSection = sections.length - 1;

  currentSection = nextSection;
  sections[nextSection].scrollIntoView({ behavior: "smooth" });

  // Debounce scroll lock
  setTimeout(() => {
      isScrolling = false;
}, 150);
}

container.addEventListener('wheel', (event)=> {
    if(window.innerWidth > 1000){
      handleScroll(event);
    }
}, {passive: false});

// ------------------------------------------------------------------------
// Setup IntersectionObserver
const observerOptions = {
  root: null, // Watch relative to the viewport
  threshold: 0.6 // Trigger when 60% of the section is visible on screen
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Get the index of the visible section among all container children
      const parent = entry.target.parentElement;
      const index = Array.from(parent.children).indexOf(entry.target);
      
      // Update global currentSection
      currentSection = index;
      console.log(`Current section updated to: ${entry.target.id} (Index: ${currentSection})`);

      // Trigger section-specific animations if applicable
      LoadAnimationsOnScroll(currentSection);
      burguerNavbar(currentSection);
      startAudio(audioScroll);
    }
  });
}, observerOptions);

// Observe all sections inside the main container when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.container > section');
  sections.forEach((section) => sectionObserver.observe(section));
  burguerNavbar(currentSection);
});

const aboutAnimation = () => {
    const aboutImage = document.querySelector('.about-image');
    
    const aboutSkillsContainer = document.querySelector('.skills');
    const aboutDescContainer = document.querySelector('.about-desc-container');

    aboutImage.addEventListener('mouseenter', () => {
        aboutSkillsContainer.classList.add('animate');
        aboutDescContainer.classList.add('animate');
        console.log("Mouse over about image: Animations added.");
    });
    aboutImage.addEventListener('mouseleave', () => {
        aboutSkillsContainer.classList.remove('animate');
        aboutDescContainer.classList.remove('animate');
    });

    console.log("Mouse over about image: Animations added.");
    LoadSoundOnHover(document.getElementById("kirbyinhale"), ".about-image");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", aboutAnimation);
}else{
    aboutAnimation();
}

window.addEventListener('resize', () => {
  burguerNavbar(currentSection);
});