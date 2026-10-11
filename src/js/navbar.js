function handleWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log(`Viewport size: ${width}px x ${height}px`);
}

// Initial call to log the viewport size
// window.addEventListener('resize', () => {
//     handleWindowResize();
// });

export const burguerNavbar = (index) => {
    const navbarDesktop = document.querySelector(".navbar-container-desktop");
    const navbarCollapsed = document.querySelector(".navbar-container-collapsed");

    // Check if the screen is small or if the index forces the collapsed view
    const shouldCollapse = window.innerWidth <= 1385 || index >= 1;

    navbarDesktop.classList.toggle("visible", !shouldCollapse);
    navbarCollapsed.classList.toggle("visible", shouldCollapse);
};

const toggleButton = () => {
    const navbartoggle = document.getElementById("navbar-toggle");
    const navbarCollapsed = document.querySelector(".navbar-collapsed");

    navbartoggle.addEventListener("click", () => {
        navbarCollapsed.classList.toggle("visible");
    }); 
};

toggleButton();