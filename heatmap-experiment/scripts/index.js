const svgContainer = document.getElementById("svg-container");

const taskNodesId = ['_60FA6326-76DC-4DB2-AB06-DB8AC8EE8DC8', '_B7417363-C542-4A4A-A314-2AF370DE2515',
    '_0C615323-1520-40BF-8A41-46C2BBC6819C']

const constTaskNodesEl = [];

const constTaskNodesHeat = [0, 0, 0];

const heatmapInstance = h337.create({
        container: document.querySelector('.container'),
        radius: 90
    });


function init() {
    fetch("images/sample-svg.svg")
        .then(response => response.text())
        .then(svg => searchTaskNodes(svg));
    
    scheduleHeadMap();
}

function scheduleHeadMap() {
    setInterval(function(){ drawHeatMap(); }, 1000);
}

function drawHeatMap() {
    let randomEl = constTaskNodesEl[Math.floor(Math.random() * constTaskNodesEl.length)];
    let heatValue = constTaskNodesHeat[constTaskNodesEl.indexOf(randomEl)];
    heatValue += .1;
    constTaskNodesHeat[constTaskNodesEl.indexOf(randomEl)] = heatValue;

    heatmapInstance.addData({
        x: getNodeMidX(randomEl),
        y: getNodeMidY(randomEl),
        value: heatValue
      });
}

function searchTaskNodes(svg) {
    svgContainer.insertAdjacentHTML("afterbegin", svg)

    let els = svgContainer.querySelectorAll("[bpmn2nodeid]");
    els.forEach(el => {
        if (taskNodesId.indexOf(el.getAttribute("bpmn2nodeid")) >= 0) {
            constTaskNodesEl.push(el);
        }
    });
    
}

function getNodeMidX(el) {
    return (el.getBoundingClientRect().left + el.getBoundingClientRect().right) / 2;
}

function getNodeMidY(el) {
    return (el.getBoundingClientRect().top + el.getBoundingClientRect().bottom) / 2;
}
