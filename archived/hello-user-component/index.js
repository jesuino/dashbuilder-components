window.addEventListener("message", receive);

function receive(e){
    console.log(e);
    console.log("invoking receive");
    const params=new Map(e.data.properties);
    const name= params.get("name");
    document.getElementById("msg").textContent="Hello " + name;
}