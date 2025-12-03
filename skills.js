// skills.js
// ----------
// This file adds interactivity to the skills cards:
// 1. Click a skill image to upload a new one.
// 2. The chosen image is saved in localStorage so it persists across reloads.
// 3. "SEE MORE" buttons use regular links you can edit directly in the HTML.

(function () {
    // A simple prefix so all keys we put in localStorage are grouped together.
    const STORAGE_KEY_PREFIX = 'skillImage_';

    /**
     * Save the provided data URL for this skill id.
     * @param {string} skillId - The value from data-skill-id on the card.
     * @param {string} dataUrl - The base64 image data.
     */
    function saveImageToStorage(skillId, dataUrl) {
        try {
            localStorage.setItem(STORAGE_KEY_PREFIX + skillId, dataUrl);
        } catch (e) {
            // If storage is full or blocked, fail silently (image will still show for this session).
            console.warn('Could not save skill image to localStorage:', e);
        }
    }

    /**
     * Load any saved image for this skill and apply it to the <img>.
     * @param {string} skillId
     * @param {HTMLImageElement} img
     */
    function loadImageFromStorage(skillId, img) {
        const stored = localStorage.getItem(STORAGE_KEY_PREFIX + skillId);
        if (stored) {
            img.src = stored;
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach(function (card) {
            const skillId = card.getAttribute('data-skill-id');
            const img = card.querySelector('.skill-image');
            const fileInput = card.querySelector('.skill-image-input');

            if (!skillId || !img || !fileInput) {
                return;
            }

            // Load any saved image as soon as the page is ready.
            loadImageFromStorage(skillId, img);

            // When the user clicks the image, open the file picker.
            img.addEventListener('click', function () {
                fileInput.click();
            });

            // When the user chooses a new image, display it and save it.
            fileInput.addEventListener('change', function () {
                const file = fileInput.files && fileInput.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function (event) {
                    const dataUrl = event.target && event.target.result;
                    if (typeof dataUrl === 'string') {
                        img.src = dataUrl;
                        saveImageToStorage(skillId, dataUrl);
                    }
                };

                reader.readAsDataURL(file);
            });
        });
    });
})();





