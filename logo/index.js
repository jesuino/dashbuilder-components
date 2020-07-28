window.addEventListener("message", receiveMessage, false);


function receiveMessage(event) {
    const params = new Map(event.data.properties);

    const url = params.get("url");
    const style = params.get("style");
    const img = document.getElementById("logo");
    img.src = url;
    img.setAttribute("style", style);
}