function imageClicked() {
    alert("Dashbuilder logo!");
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    console.log("Received message on component:");
    console.log(event.data);
    var params = event.data;
    var fontSize = "12px";

    document.getElementById("age").innerHTML = params.age;
    document.getElementById("name").innerHTML = params.name;
    document.getElementById("container").style.color = params.color;
    document.getElementById("container").style.border = params.border;
    if (params.size === "true") {
        fontSize = "24px";
    }
    document.getElementById("container").style.fontSize =  fontSize;
}
