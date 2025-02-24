const translations = [
    {
        "id": "text-question-map-best",
        "en": "Click on your favorite place in the Efteling",
        "nl": "Druk op je favoriete plek in de Efteling"
    },
    {
        "id": "text-question-map-worst",
        "en": "Click on your least favorite place in the Efteling",
        "nl": "Druk op je minst favoriete plek in de Efteling"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-btn").forEach(button => {
        button.addEventListener("click", function () {
            let language = this.getAttribute("data-lang"); // Get selected language

            // Remove 'selected' class from all buttons
            document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("selected"));

            // Add 'selected' class to clicked button
            this.classList.add("selected");

            // Update text content for each translated element
            translations.forEach(entry => {
                let element = document.getElementById(entry.id);
                if (element) {
                    element.textContent = entry[language]; // Change text based on language
                }
            });

            console.log(`Language changed to: ${language}`);
        });
    });

    document.getElementById("lang-dutch").click();
});