const avatar = document.getElementById("avatar");
const cardTitle = document.getElementById("cardTitle");
const cardDesc = document.getElementById("cardDesc");

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  const params = new Map(event.data.properties);

  const dataSet = params.get("dataSet");
  const supportsImage = params.get("supportsAvatar") === "true";
  const avatarStyle = params.get("avatarStyle");

  avatar.src = "";
  avatar.style = avatarStyle;
  cardTitle.innerText = "";
  cardDesc.innerText = "";

  if (dataSet && dataSet.data.length > 0) {
    const row = dataSet.data[0];
    let i = 0;
    if (supportsImage) {
      avatar.src = row[i++];
    }
    cardTitle.innerText = row[i++];
    cardDesc.innerText = row[i];
  }
}
