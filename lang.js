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
        "en": "A little about you:",
        "nl": "Een beetje over jou:"
    },
    {
        "id": "text-question-you-age",
        "en": "How old are you?",
        "nl": "Hoe oud ben jij?"
    },
    {
        "id": "text-question-you-frequency",
        "en": "How often have you been at Efteling?",
        "nl": "Hoe vaak ga je naar de Efteling?"
    },
    {
        "id": "visit-frequency",
        "en": [
            "Never been",
            "Once or twice in total",
            "A few times a year",
            "A few times a month",
            "Almost every week",
            "Almost every day"
        ],
        "nl": [
            "Nog nooit geweest",
            "Een of twee keer in totaal",
            "Een paar keer per jaar",
            "Een paar keer per maand",
            "Bijna elke week",
            "Bijna elke dag"
        ]
    },
    {
        "id": "text-end",
        "en": "Completely done? Press the button below to submit your results!",
        "nl": "Helemaal klaar? Druk op het knopje hieronder om je andwoorden te verstuuren!"
    },
    {
        "id": "text-end-title",
        "en": "Almost There!",
        "nl": "Bijna daar!"
    },
    {
        "id": "text-send",
        "en": "Send",
        "nl": "Verstuur"
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

            // Update text elements
            translations.forEach(entry => {
                let element = document.getElementById(entry.id);
                if (element) {
                    if (Array.isArray(entry[language])) {
                        updateDropdown(entry.id, entry[language]);
                    } else {
                        element.textContent = entry[language];
                    }
                }
            });

            console.log(`Language changed to: ${language}`);
        });
    });

    document.getElementById("lang-dutch").click();
});

function updateDropdown(selectId, optionsArray) {
    let selectElement = document.getElementById(selectId);
    if (selectElement) {
        selectElement.innerHTML = ""; // Clear existing options
        optionsArray.forEach(optionText => {
            let optionElement = document.createElement("option");
            optionElement.textContent = optionText;
            selectElement.appendChild(optionElement);
        });
    }
}

function getCurrentLanguage() {
    return currentLanguage;
}


function getCurrentLanguage() {
    return currentLanguage;
}