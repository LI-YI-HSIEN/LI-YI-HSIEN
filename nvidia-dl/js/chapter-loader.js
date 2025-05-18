class ChapterLoader {
    static async loadChapterCards() {
        const response = await fetch('includes/chapter-card.html');
        const template = await response.text();
        const container = document.querySelector('.card-container');

        const isRoot = !window.location.pathname.includes('/chapters/');
        const datasetBasePath = isRoot ? './' : '../';

        // 新增這個變數來處理章節連結路徑
        const chaptersBasePath = isRoot ? './chapters/' : './';

        chapters.forEach(chapter => {
            let cardHtml = template;

            // 檢查章節編號是否是字母（附錄）或數字
            const isAppendix = isNaN(chapter.number); // 如果 chapter.number 不是數字，則為 true

            // 基本資訊替換，修改標題格式
            if (isAppendix) {
                // 對於附錄（A、B、C），不使用「第」字
                cardHtml = cardHtml.replace('<span class="badge bg-success">{{emoji}}</span> 第{{chapterNumber}}章：{{chapterTitle}}',
                    '<span class="badge bg-success">{{emoji}}</span> {{chapterNumber}}：{{chapterTitle}}');
            }

            // 其他替換保持不變
            cardHtml = cardHtml.replaceAll('{{chapterNumber}}', chapter.number);
            cardHtml = cardHtml.replaceAll('{{chapterTitle}}', chapter.title);
            cardHtml = cardHtml.replaceAll('{{chapterDescription}}', chapter.description);
            cardHtml = cardHtml.replaceAll('{{chapterLink}}', `${chaptersBasePath}${chapter.link}`);
            cardHtml = cardHtml.replaceAll('{{emoji}}', chapter.emoji);

            // 處理 Colab 下拉選單
            if (chapter.colabLinks && chapter.colabLinks.length > 0) {
                // 移除 if 標記但保留內容
                cardHtml = cardHtml.replace('{{#if colabLinks}}', '');
                cardHtml = cardHtml.replace('{{/if}}', '');

                // 替換 each 內容
                let colabItemsHtml = '';
                chapter.colabLinks.forEach(link => {
                    colabItemsHtml += `<li><a class="dropdown-item" href="${link.url}" target="_blank">${link.title}</a></li>`;
                });

                // 替換 each 區塊
                const colabPattern = /{{#each colabLinks}}[\s\S]*?{{\/each}}/;
                cardHtml = cardHtml.replace(colabPattern, colabItemsHtml);
            } else {
                // 如果沒有 Colab 連結，移除整個區塊
                cardHtml = cardHtml.replace(/{{#if colabLinks}}[\s\S]*?{{\/if}}/g, '');
            }

            // 處理 Dataset 下拉選單
            if (chapter.datasetLinks && chapter.datasetLinks.length > 0) {
                // 移除 if 標記但保留內容
                cardHtml = cardHtml.replace('{{#if datasetLinks}}', '');
                cardHtml = cardHtml.replace('{{/if}}', '');

                // 替換 each 內容
                let datasetItemsHtml = '';
                chapter.datasetLinks.forEach(link => {
                    const datasetPath = `${datasetBasePath}${link.url}`;
                    datasetItemsHtml += `<li><a class="dropdown-item" href="${datasetPath}" download>${link.title}</a></li>`;
                });

                // 替換 each 區塊
                const datasetPattern = /{{#each datasetLinks}}[\s\S]*?{{\/each}}/;
                cardHtml = cardHtml.replace(datasetPattern, datasetItemsHtml);
            } else {
                // 如果沒有 Dataset 連結，移除整個區塊
                cardHtml = cardHtml.replace(/{{#if datasetLinks}}[\s\S]*?{{\/if}}/g, '');
            }

            container.innerHTML += cardHtml;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ChapterLoader.loadChapterCards();
});