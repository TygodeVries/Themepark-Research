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
    },
    {
        "id": "text-disclaimer-body",
        "en": "This is a school research project and is not affiliated with, endorsed by, or associated with Efteling in any way. Any collected data is stored securely and remains completely anonymous.",
        "nl": "Dit is een schoolonderzoek en staat op geen enkele manier in verband met, wordt niet ondersteund door en is niet geassocieerd met de Efteling. Alle verzamelde gegevens worden veilig opgeslagen en blijven volledig anoniem."
    },
    {
        "id": "text-disclaimer-title",
        "en": "Disclaimer",
        "nl": "Disclaimer"
    },
    {
        "id": "text-header-you",
        "en": "A little about you",
        "nl": "Een beetje over jou"
    },
    {
        "id": "text-question-you-age",
        "en": "How old are you?",
        "nl": "Hoe oud ben jij?"
    }
];

let currentLanguage = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-btn").forEach(button => {
        button.addEventListener("click", function () {
            let language = this.getAttribute("data-lang"); 
            currentLanguage = language;
            document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("selected"));

            this.classList.add("selected");

            translations.forEach(entry => {
                let element = document.getElementById(entry.id);
                if (element) {
                    element.textContent = entry[language]; 
                }
            });

            console.log(`Language changed to: ${language}`);
        });
    });

    document.getElementById("lang-dutch").click();
});

function getCurrentLanguage() {
    return currentLanguage;
}