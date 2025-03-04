function submit()
{
    str = JSON.stringify({
        lang: getCurrentLanguage(), 
        age: getField("eftelingSlider"),
        visit_frequency: getField("visit-frequency"),
        favorite: GetFavoLocation(),
        favorite_why: getField("good-why"),
        leastFavorite: GetLeastFavoLocation(),
        leastFavorite_why: getField("bad-why"),
        first_to_mind: getField("first-to-mind"),
        story_element: getField("story-element"),
        adict: getField("text-does-game"),
        game_type: getField("game-type"),
        good_important: getField("good-important")
    });


    console.log(str);

    fetch("https://script.google.com/macros/s/AKfycbz00nBU8k8wFw75Jo38JrsEjq4uphfpNrViNgamaBJz51olI18UVccxFecUAIpQ8k0_/exec", {
        redirect: "follow",
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: str
    })
    .then(response => response.text())
    .then(data => console.log("Response from Google Apps Script:", data))
    .catch(error => console.error("Error:", error));

    const element = document.getElementById("questions");
    element.remove();

    const flags = document.getElementById("lang-buttons");
    flags.innerHTML = "<p>";

    window.scrollTo(0, 0);

    const text = document.getElementById("lang-title");
    text.innerHTML = "Thank you!<p> Bedankt!"
}
function getField(a)
{
    return document.getElementById(a).value;
}