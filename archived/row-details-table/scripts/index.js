window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  const params = new Map(event.data.properties);

  const dataSet = params.get("dataSet");
  const columnsName = params.get("columnsName") || "Column";
  const valuesName = params.get("valuesName") || "Values";
  const headerBgColor = params.get("headerBgColor") || "white";
  const headerTextColor = params.get("headerTextColor") || "black";
  const rowsBgColor = params.get("rowsBgColor") || "white";
  const rowsTextColor = params.get("rowsTextColor") || "black";
  const isZebra = params.get("zebra") === "true";
  const stripColor = params.get("stripColor") || "lightgray";

  document.getElementById("columnsCL").innerText = columnsName;
  document.getElementById("valuesCL").innerText = valuesName;
  document.getElementById("tblHeader").style.backgroundColor = headerBgColor;
  document.getElementById("tblBody").style.color = rowsTextColor;

  document.querySelectorAll("tbody>tr").forEach((c) => c.remove());

  // TODO: Support for all rows in future with a navigation button
  if (dataSet && dataSet.data.length > 0 && dataSet.columns.length > 0) {
    for (let i = 0; i < dataSet.columns.length; i++) {
      const cl = dataSet.columns[i];
      const row = document.createElement("tr");
      const clCell = document.createElement("td");
      const vlCell = document.createElement("td");
      clCell.innerText = cl.settings.columnName;
      vlCell.innerText = dataSet.data[0][i];
      row.appendChild(clCell);
      row.appendChild(vlCell);
      tblBody.appendChild(row);
    }
  }

  document
    .querySelectorAll("tr>th")
    .forEach((e) => (e.style.color = headerTextColor));

  const rows = document.querySelectorAll("tbody>tr");

  for (let i = 0; i < rows.length; i++) {
    const e = rows[i];
    let backgroundColor = rowsBgColor;
    if (isZebra && i % 2 == 0) {
        backgroundColor = stripColor;
    }
    console.log(backgroundColor);
    e.style.backgroundColor = backgroundColor;
  }
}
