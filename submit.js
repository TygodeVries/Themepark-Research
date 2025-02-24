function submit()
{
    fetch("https://script.google.com/macros/s/AKfycbwFUWS5A3MsFtFLSPw7pqfTfVMEXT9UGAfe6UZDkeEfpequn7OIFPuBMo823vHTjoFcRg/exec", {
     method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            lang: "en", 
            favorite: "Python Land",
            leastFavorite: "Haunted House"
        })
    })
    .then(response => response.text())
    .then(data => console.log("Response from Google Apps Script:", data))
    .catch(error => console.error("Error:", error));
}