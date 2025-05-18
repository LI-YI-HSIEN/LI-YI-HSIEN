document.addEventListener("DOMContentLoaded", function () {
    const sidebarContainer = document.getElementById("sidebar-placeholder");
    if (!sidebarContainer) {
        console.error("Sidebar placeholder not found!");
        return;
    }

    const isRoot = !window.location.pathname.includes('/chapters/');
    const basePath = isRoot ? './chapters/' : './';

    // 動態生成側邊欄
    let sidebarHtml = `
        <div class="sidebar">
            <h2>跟NVIDIA學深度學習</h2>
            <ul class="nav flex-column">
                <li class="nav-item"><a class="nav-link" href="${isRoot ? './index.html' : '../index.html'}">🏠 首頁</a></li>
                <li class="nav-item">📖 章節列表</li>
    `;

    chapters.forEach(chapter => {
        // 確保章節ID中不包含特殊字符，將字母編號轉為有效ID
        const chapterId = `chapter-${typeof chapter.number === 'string' ? 'appendix-' + chapter.number : chapter.number}`;

        sidebarHtml += `
            <li class="nav-item chapter">
                <a class="nav-link chapter-toggle" href="${basePath}${chapter.link}" data-target="${chapterId}-submenu">
                    ${chapter.number}. ${chapter.title}
                </a>
                <ul id="${chapterId}-submenu" class="nav flex-column ms-3 chapter-submenu">
        `;

        chapter.subsections.forEach(subsection => {
            sidebarHtml += `
                <li class="nav-item">
                    <a class="nav-link" href="${basePath}${chapter.link}${subsection.anchor}">${subsection.title}</a>
                </li>
            `;
        });

        sidebarHtml += `</ul></li>`;
    });

    sidebarHtml += `</ul></div>`;
    sidebarContainer.innerHTML = sidebarHtml;

    // 章節折疊功能
    document.querySelectorAll(".chapter-toggle").forEach(toggle => {
        const targetId = toggle.getAttribute("data-target");
        const submenu = document.getElementById(targetId);
        const currentPath = window.location.pathname.split("/").pop();
        const href = toggle.getAttribute("href").split('/').pop();

        if (href === currentPath) {
            submenu.classList.add("active");
        }

        toggle.addEventListener("click", function (event) {
            if (!toggle.getAttribute("href").includes('.html')) {
                event.preventDefault();
                submenu.classList.toggle("active");
            }
        });
    });
});