const svgContainer = document.getElementById("svg-container");
const message = document.getElementById("message");

const ksForm = document.getElementById("ksForm");
const disconnect = document.getElementById("disconnect");

const elementHeats = new Map();
const svgCache = new Map();

const KS_URL_KEY = "heatMap.ksUrl";
const KS_URL_TOKEN = "heatMap.ksToken";
let ksInfo;

function init() {
    hideAll();
    ksInfo = loadKsInfo();
    if (ksInfo) {
        hideKsForm();
    } else {
        showKsForm();
    }
    window.addEventListener("message", receiveMessage, false);
}

function hideKsForm() {
    ksForm.style.display = "none";
    disconnect.style.display = "block";
}

function showKsForm() {
    ksForm.style.display = "block";
    disconnect.style.display = "none";
}

function hideAll() {
    ksForm.style.display = "none";
    disconnect.style.display = "none";
}

function disconnectFromKS() {
    localStorage.removeItem(KS_URL_KEY);
    localStorage.removeItem(KS_URL_TOKEN);
    showKsForm();
}

function loadKsInfo() {
    const url = localStorage.getItem(KS_URL_KEY);
    const token = localStorage.getItem(KS_URL_TOKEN);
    if (url && token) {
        return {
            url: url,
            token: token
        }
    }
}

function storeKsInfo(baseUrl, token) {
    localStorage.setItem(KS_URL_KEY, baseUrl);
    localStorage.setItem(KS_URL_TOKEN, token);
    hideKsForm();
}

function testConnection() {
    const ksBaseUrl = document.getElementById("ksUrl").value;
    const username = document.getElementById("ksUser").value;
    const password = document.getElementById("ksPassword").value;
    const token = btoa(username + ":" + password);
    const url = `${ksBaseUrl}/services/rest/server`;
    authenticatedFetch(url, token).then(r => {
        if (r.status === 200) {
            if (confirm("Test Sucessfull. Store Credentials?")) {
                storeKsInfo(ksBaseUrl, token);
            }
        } else {
            alert("Not able to connect!");
            console.log(r);
        }
    });


}

async function authenticatedFetch(url, basicToken) {
    let headers = new Headers();
    headers.set("Authorization", `Basic ${basicToken}`);
    return fetch(url, {
        headers: headers
    });
}

async function getSvgContent(params) {

    const svgUrl = params.get("svgUrl");
    const svg = params.get("svg");
    if (svg) {
        return svg;
    }

    if (svgUrl) {
        let svgContent = svgCache.get(svgUrl);
        if (!svgContent) {
            svgContent = await fetch(svgUrl).then(response => response.text());
            svgCache.put(svgUrl, svgContent);
        }
        return svgContent;
    }

    return undefined;
}

async function getSvgFromKieServer(ksContainer, ksProcessId) {
    const url = `${ksInfo.url}/services/rest/server/containers/${ksContainer}/images/processes/${ksProcessId}`;
    return await authenticatedFetch(url, ksInfo.token);
}

async function receiveMessage(event) {
    const params = new Map(event.data.properties);

    const ksContainer = params.get("ksContainer");
    const ksProcessId = params.get("ksProcessId");
    const dataSet = params.get("dataSet");    

    let svgContent = await getSvgContent(params);

    if (!svgContent && ksContainer && ksProcessId && ksInfo) {
        svgContent = await getSvgFromKieServer(ksContainer, ksProcessId).then(r => r.text());
    }

    cleanUp();

    if (!svgContent) {
        message.textContent = "You must must provide a valid SVG or Kie Server configuration to retrieve a process SVG.";
        return;
    }

    hideAll();


    if (!dataSet) {
        message.textContent = "You must must provide data.";
        return;
    }

    const data = dataSet.data;

    const nodes = [];
    const heats = [];

    for (let i = 0; i < data.length; i++) {
        nodes.push(data[i][0]);
        heats.push(parseInt(data[i][1]));
    }
    searchTaskNodes(svgContent, nodes, heats);

    let heatmapInstance = h337.create({
        container: document.querySelector('#svg-container')
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
