window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  const params = new Map(event.data.properties);

  const url = params.get("url");
  const style = params.get("style");
  const img = document.getElementById("logo");

  if (!url) {
      const dataset = params.get("dataSet");
      if (dataset && dataset.data.length > 0) {
        img.src = dataset.data[0][0];
      } else {
          img.src = "./no-image.png";
      }
  } else {
    img.src = url;
  }
  img.setAttribute("style", style);
}
