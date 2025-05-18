class ImageHandler {
    static async loadImageModal(imageData) {
        try {
            const response = await fetch('../includes/image-modal.html');
            if (!response.ok) throw new Error("Failed to load modal template");
            let template = await response.text();

            // 替換所有的變數，包括 description
            Object.entries(imageData).forEach(([key, value]) => {
                template = template.replaceAll(`{{${key}}}`, value);
            });
            return template;
        } catch (error) {
            console.error('Error in loadImageModal:', error);
            return '';
        }
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    console.log('📸 Image Handler Initialized');

    const imageContainers = document.querySelectorAll('[data-image-container]');
    if (!imageContainers.length) {
        console.warn('⚠️ 沒有找到 data-image-container 元素，請檢查 HTML');
        return;
    }

    for (const container of imageContainers) {
        const imageData = {
            id: container.dataset.imageId || '',
            chapter: container.dataset.chapter || '',
            filename: container.dataset.filename || '',
            alt: container.dataset.alt || '',
            'figure-number': container.dataset.figureNumber || '',
            caption: container.dataset.caption || '',
            description: container.dataset.description || '' // ✅ 新增 description
        };

        const modalHtml = await ImageHandler.loadImageModal(imageData);
        if (modalHtml) {
            container.innerHTML = modalHtml;
            console.log(`✅ 圖片載入成功: ${imageData.filename}`);
        }
    }
});
