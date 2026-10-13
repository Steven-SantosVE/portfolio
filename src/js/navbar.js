// function handleWindowResize() {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   console.log(`Viewport size: ${width}px x ${height}px`);
// }

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
    const navbarToggle = document.getElementById("navbar-toggle");
    const navbarCollapsed = document.querySelector(".navbar-collapsed");
    const navbarClose = document.querySelector(".navbar-close");
    const navbarItemCol = document.querySelectorAll(".navbar-item-collapsed")
    

    navbarToggle.addEventListener("click", () => {
        navbarCollapsed.classList.toggle("visible");
        navbarToggle.classList.toggle("visible");
        navbarClose.classList.toggle("visible");
    }); 

    navbarClose.addEventListener("click", () =>{
        navbarCollapsed.classList.toggle("visible");
        navbarToggle.classList.toggle("visible");
        navbarClose.classList.toggle("visible");
    });

    const closeNavOnClick = () =>{
        for (let i = 0; i < navbarItemCol.length; i++) {
            navbarItemCol[i].addEventListener("click", () => {
                navbarCollapsed.classList.toggle("visible");
                navbarClose.classList.toggle("visible");
                navbarToggle.classList.toggle("visible");
            });
    }};
    closeNavOnClick()
};

toggleButton();