const svgContainer = document.getElementById("svg-container");

//sample svg
// const taskNodesId = ['_60FA6326-76DC-4DB2-AB06-DB8AC8EE8DC8', '_B7417363-C542-4A4A-A314-2AF370DE2515',
//     '_0C615323-1520-40BF-8A41-46C2BBC6819C',
//     '_0E0784C3-1BEC-4A51-A5E6-D7E5DA3A4402',
//     '_F368D316-78E0-4D1C-A59A-79BC75A0A62B',
//     '_8BEA9396-93DE-4D44-8CE2-4A146464264E'
// ]
//order-svg
const taskNodesId = ['_5D13614D-BB35-4131-9C0A-3F5238F7119E',
    '_662BB1B5-DCB4-4C4E-AE6A-2F1BCDDC39AA',
    '_BEE4932A-0B68-4415-B4C5-B8CCD59DD2E1',
    '_00C173F9-8C4D-4CD5-8B99-19FF70856ABF',
    '_14E7DA8A-5F5F-4A43-9826-B73E3A28A3B9',
    '_4EB138C8-354F-49F4-A4A9-2602E50149CA',
    '_361B2557-307C-4D64-A5F2-BD5FE227EC83',
    '_20B72189-E025-4623-A157-A06430ABC341',
    '_8E5CF3D2-E326-42E2-82C3-10DE7C63ECD6',
    '_F9C621D9-75E3-4A3A-AF38-8D6B074E381C',
    '_09F307D7-5866-4DD7-8CD2-0C51DF86CC89',
    '_C14C45F8-2CB1-4FBA-86E0-8C43E2FEB0B7'];


const constTaskNodesEl = [];

//sample svg
// const constTaskNodesHeat = [0, 0, 0, 0, 0, 0];

//order-svg
const constTaskNodesHeat = ['0',
'0',
'0',
'0',
'0',
'0',
'0',
'0',
'0',
'0',
'0',
'0'];

const heatmapInstance = h337.create({
        container: document.querySelector('.container'),
        radius: 90
    });


function init() {
    //fetch("images/sample-svg.svg")
    fetch("images/order-svg.svg")
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
        x: getNodeMidX(randomEl.children[1]),
        y: getNodeMidY(randomEl.children[1]),
        value: heatValue
      });
}

function searchTaskNodes(svg) {
    svgContainer.insertAdjacentHTML("afterbegin", svg)

    let els = svgContainer.querySelectorAll("[bpmn2nodeid]");
    els.forEach(el => {
        console.log(el.getAttribute("bpmn2nodeid"));
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
