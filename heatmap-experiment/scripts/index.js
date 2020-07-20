const svgContainer = document.getElementById("svg-container");
const message = document.getElementById("message");

const elementHeats = new Map();



function init() {
    window.addEventListener("message", receiveMessage, false);
}

function receiveMessage(event) {
    console.log("Received message on component:");
    const params = new Map(event.data.properties);

    const svg = params.get("svg");
    const dataSet = params.get("dataSet");

    cleanUp();

    if (!svg) {
        message.textContent = "You must must provide a valid SVG";
        return;
    }

    if (!dataSet) {
        message.textContent = "You must must provide a valid SVG";
        return;
    }

    const data = dataSet.data;

    const nodes = [];
    const heats = [];

    for (let i = 0; i < data.length; i++) {
        nodes.push(data[i][0]);
        heats.push(parseInt(data[i][1]));
    }
    searchTaskNodes(svg, nodes, heats);

    let heatmapInstance = h337.create({
        container: document.querySelector('.container')
    });
    drawHeatMap(heatmapInstance);
}

function cleanUp() {
    message.textContent = "";
    svgContainer.innerHTML = "";
    elementHeats.clear();
}

function drawHeatMap(heatmapInstance) {
    elementHeats.forEach((heat, node) => {
        const target = node.children[1];
        heatmapInstance.addData({
            x: getNodeMidX(target),
            y: getNodeMidY(target),
            radius: getSize(target),
            value: heat
        });
    });
}

function searchTaskNodes(svg, nodes, heats) {
    svgContainer.innerHTML = svg;
    let els = svgContainer.querySelectorAll("[bpmn2nodeid]");
    els.forEach(el => {
        console.log(el.getAttribute("bpmn2nodeid"));
        const taskNodeIndex = nodes.indexOf(el.getAttribute("bpmn2nodeid"));
        if (taskNodeIndex >= 0) {
            elementHeats.set(el, heats[taskNodeIndex]);
        }
    });

}

function getSize(el) {
    return el.getBoundingClientRect().height;
}

function getNodeMidX(el) {
    return (el.getBoundingClientRect().left + el.getBoundingClientRect().right) / 2;
}

function getNodeMidY(el) {
    return (el.getBoundingClientRect().top + el.getBoundingClientRect().bottom) / 2;
}
