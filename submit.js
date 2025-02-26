function submit()
{
    fetch("https://script.google.com/macros/s/AKfycbxrmDKueG5rjUq_yRX2kVsWNRQbM8cXDCRu_3dC9vWjRxRLVBsFjv_jZOfvD7aOO_tyuw/exec", {
        redirect: "follow",
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            lang: getCurrentLanguage(), 
            favorite: GetFavoLocation(),
            leastFavorite: GetLeastFavoLocation()
        })
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