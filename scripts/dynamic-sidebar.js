// Function to generate sidebar content
function generateSidebar(courseStructure) {
    const sidebar = document.querySelector('.sidebar__buttons');
    const logoLink = sidebar.querySelector('.nav__logo');
    
    sidebar.innerHTML = '';
    sidebar.appendChild(logoLink);

    courseStructure.lessons.forEach((lesson, index) => {
        const lessonButton = document.createElement('div');
        lessonButton.className = 'sidebar__lesson';

        const mainButton = document.createElement('a');
        mainButton.href = lesson.parts[0];
        mainButton.className = 'sidebar__button';
        mainButton.innerHTML = `<h1>Lesson ${index + 1}: ${lesson.title}</h1>`;

        lessonButton.appendChild(mainButton);

        if (lesson.parts.length > 1) {
            const subMenu = document.createElement('div');
            subMenu.className = 'sidebar__submenu';
            subMenu.style.display = 'none';

            lesson.parts.forEach((part, partIndex) => {
                const partButton = document.createElement('a');
                partButton.href = part;
                partButton.className = 'sidebar__subbutton';
                partButton.textContent = `Part ${partIndex + 1}`;

                if (window.location.pathname.endsWith(part)) {
                    partButton.classList.add('active-page');
                    mainButton.classList.add('active-lesson');
                    subMenu.style.display = 'block';
                }

                subMenu.appendChild(partButton);
            });

            lessonButton.appendChild(subMenu);

            mainButton.addEventListener('click', (e) => {
                e.preventDefault();
                subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
            });
        } else {
            if (window.location.pathname.endsWith(lesson.parts[0])) {
                mainButton.classList.add('active-page');
            }
        }

        sidebar.appendChild(lessonButton);
    });
}

// Function to generate navigation buttons
function generateNavigation(courseStructure) {
    const currentPath = window.location.pathname;
    const navContainer = document.querySelector('.main__next');
    if (!navContainer) return;

    let allPages = [];

    // Flatten lesson structure
    courseStructure.lessons.forEach(lesson => {
        allPages = allPages.concat(lesson.parts);
    });

    const currentIndex = allPages.findIndex(page => currentPath.endsWith(page));
    
    if (currentIndex > 0) {
        const prevButton = document.createElement('a');
        prevButton.href = allPages[currentIndex - 1];
        prevButton.textContent = 'Previous';
        prevButton.className = 'anchor-button';
        navContainer.appendChild(prevButton);
    }

    if (currentIndex < allPages.length - 1) {
        const nextButton = document.createElement('a');
        nextButton.href = allPages[currentIndex + 1];
        nextButton.textContent = 'Next';
        nextButton.className = 'anchor-button';
        navContainer.appendChild(nextButton);
    }
}

// Fetch the course structure and initialize
fetch('course-structure.json')
    .then(response => response.json())
    .then(courseStructure => {
        generateSidebar(courseStructure);
        generateNavigation(courseStructure);
    })
    .catch(error => console.error('Error loading course structure:', error));