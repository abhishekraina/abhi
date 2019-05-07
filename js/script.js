let stationsGraph = new Graph(); // graph required for application
let stationsList = new Set();   // station list required for application

/**
 * This method will read the text file from given path.
 * @param {*} file 
 */
function readFile(file)
{
    let fileData = new XMLHttpRequest();
    fileData.open("GET", file, false);
    fileData.onreadystatechange = function ()
    {
        if(fileData.readyState === 4)
        {
            if(fileData.status === 200 || fileData.status == 0)
            {
                let allText = fileData.responseText;
                fetchingStations(allText);
            }
        }
    }
    fileData.send(null);

}

/**
 * This method will fetch all stations from the text and into the graph.
 * @param {*} text 
 */
function fetchingStations(text){
    let lines = text.split("\n");
    
    lines.forEach(line=>{
        let tempArray = line.split(':');

        let stationName =  tempArray[0].trim();
        let stationsNearBy =  tempArray[1].split(",");
        
        if(!stationsList.has(stationName)){
            stationsList.add(stationName);
            stationsGraph.addNode(stationName); // adding graph nodes
        }

        stationsNearBy.forEach(nearerStation =>{ 
            let nearerStationName = nearerStation.trim();
            let isNodeAdded = stationsList.has(nearerStationName);

            if(!isNodeAdded) {
                stationsList.add(nearerStationName);
                stationsGraph.addNode(nearerStationName);
            }
            stationsGraph.addEdge(stationName,nearerStationName,1); // adding graph edges
        });
        
    });

}

/**
 * This is event handler which is triggered when there is change in any input field and accepting context of that field as parameter.
 * @param {*} context 
 */
function inputChange(context){
    if(context.id == "source")
        showList(context,"list1");
    else
        showList(context,"list2");
}

/**
 * This method is will show dynamic list of all stations below input field.
 * @param {*} context 
 * @param {*} id 
 */
function showList(context,id){
    let stationsListArray = Array.from(stationsList);
    let list = document.getElementById(id);

    list.style.display = "block";
    list.innerHTML = "";

    stationsListArray.filter(station=> station.toLowerCase().includes(context.value.toLowerCase())).forEach(station=>{
        list.innerHTML+=`<li class="list-group-item" onclick="setFieldValue('${context.id}','${station}')">${station}</li>`;
    });
}

/**
 * Function will set field value of corresponding input field.
 */
function setFieldValue(field,value){
    document.getElementById(field).value = value;

    if(field == "source")
        document.getElementById("list1").style.display = "none";
    else
        document.getElementById("list2").style.display = "none";
}

/**
 * This method will get the shortest path between selected Source and Destination and print the path in Path Showing Area.
 */
function getShortestPath(){
        let source = document.getElementById('source').value.trim();
        let destination = document.getElementById('destination').value.trim();

        let result = document.getElementById('path');

        if(stationsList.has(source) && stationsList.has(destination))
            result.innerText = stationsGraph.findPathWithDijkstra(source,destination);
        else
            if(stationsList.has(source))
                alert("Destination not found");
            else
                alert("Source not found");

}

readFile("http://127.0.0.1:8080/assets/metro.txt"); // Reading loacl file pushed on web server 'metro.txt'.

