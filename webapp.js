var exampleData = [
    // [Company Name, Resources Provided, Location, Founded Year, Website]
    ["Company A", "Software Development, IT Consulting", "New York, USA", 2000, "www.companyA.com"],
    ["Company B", "Manufacturing, Supply Chain Management", "Los Angeles, USA", 1995, "www.companyB.com"],
    ["Company C", "Biotechnology, Research Services", "San Francisco, USA", 2010, "www.companyC.com"],
    ["Company D", "Financial Services, Investment Banking", "London, UK", 1985, "www.companyD.co.uk"],
    ["Company E", "E-commerce, Online Retail", "Seattle, USA", 2008, "www.companyE.com"],
    ["Company F", "Healthcare, Medical Devices", "Boston, USA", 1998, "www.companyF.com"],
    ["Company G", "Green Energy, Solar Power", "Berlin, Germany", 2012, "www.companyG.de"],
    ["Company H", "Telecommunications, Network Solutions", "Tokyo, Japan", 1990, "www.companyH.co.jp"],
    ["Company I", "Automotive, Car Manufacturing", "Detroit, USA", 1970, "www.companyI.com"],
    ["Company J", "Aerospace, Space Exploration", "Houston, USA", 1965, "www.companyJ.com"],
    ["Company K", "Food Processing, Agriculture", "Paris, France", 2005, "www.companyK.fr"],
    ["Company L", "Fashion, Apparel Design", "Milan, Italy", 1992, "www.companyL.it"],
    ["Company M", "Entertainment, Media Production", "Los Angeles, USA", 1980, "www.companyM.com"],
    ["Company N", "Education, E-learning", "Toronto, Canada", 2015, "www.companyN.ca"],
    ["Company O", "Transportation, Logistics", "Shanghai, China", 2003, "www.companyO.cn"],
    ["Company P", "Real Estate, Property Development", "Dubai, UAE", 1999, "www.companyP.ae"],
    ["Company Q", "Pharmaceuticals, Drug Research", "Mumbai, India", 2011, "www.companyQ.in"],
    ["Company R", "Consumer Electronics, Gadgets", "Seoul, South Korea", 2007, "www.companyR.kr"],
    ["Company S", "Hospitality, Hotel Management", "Las Vegas, USA", 1975, "www.companyS.com"],
    ["Company T", "Environmental Services, Recycling", "Oslo, Norway", 2013, "www.companyT.no"],
    ["Company U", "Legal Services, Law Consulting", "New York, USA", 1997, "www.companyU.com"],
    ["Company V", "Pharmaceuticals, Drug Manufacturing", "Berlin, Germany", 1988, "www.companyV.de"],
    ["Company W", "Advertising, Marketing", "London, UK", 2001, "www.companyW.co.uk"],
    ["Company X", "Software as a Service (SaaS), Cloud Computing", "San Francisco, USA", 2010, "www.companyX.com"],
    ["Company Y", "Renewable Energy, Wind Power", "Stockholm, Sweden", 2006, "www.companyY.se"],
    ["Company Z", "Consulting, Business Advisory", "Sydney, Australia", 1994, "www.companyZ.com"],
]

var buttons = []
var oldListLength = null
var infoPage = null
var exit_button = null
var titleHeader = null
var miniTitle = null
var resourcesText = null
var companyLink = null
var companyLinkWrap = null
var dropdown = document.getElementById('dropdown')
var inputElement = document.getElementById('textSearch')
var exportButton1 = document.getElementById('exportButton')

refreshList(exampleData)

//will create the buttons and or replace them
function refreshList(list){
    console.log(document.getElementById("button0") !== null)
    if(document.getElementById("button0") !== null){
        // let buttonParent = document.getElementById("spreadsheet")
        for(let i = 0; i < oldListLength; i++){
            //this needs to work but it wont
            buttons[i].remove()
            // console.log(document.getElementById("button"+i))
            // let buttonReset = document.getElementById("button"+i)
            // buttonParent.removeChild(buttonReset)
            console.log("test")
        }
        if(document.getElementById("infoId") !== null){
            console.log("removing  info element")
            exit_button.remove()
            titleHeader.remove()
            miniTitle.remove()
            resourcesText.remove()
            companyLink.remove()
            document.getElementById("infoId").remove()
        }
    }
    buttons = []
    for(let i = 0; i < list.length; i++){
        buttons[i] = document.createElement("button")
        let container = document.getElementById("spreadsheet")
        container.appendChild(buttons[i])
        buttons[i].setAttribute("id", "button"+i)
        buttons[i].innerHTML = list[i][0]+' '+list[i][1]
        buttons[i].style.backgroundColor = "#1d52bc"
        buttons[i].style.width = "90%"
        buttons[i].style.height = "50px"
        buttons[i].style.position = "absolute"
        buttons[i].style.marginTop = "-25px"
        buttons[i].style.left = "5%"
        buttons[i].style.top = 135+60*i+"px"
        buttons[i].style.fontSize = "18px"
        buttons[i].style.border = "3px solid #2d2b2b"
    }
    document.getElementById("spreadsheet").style.height = list.length*61
    buttonEvents(exampleData)
}
//called as soon as the text input or drop down change
function listSearch(textInput, value, list2d){
    let trueTimes = 0;
    for(var l = 0; l < list2d.length; l++){
        if(simpleSearch(list2d[l][value].toString(),textInput.toString())){
            buttons[l].style.top = 135+60*trueTimes+"px"
            buttons[l].style.display = "block"
            trueTimes ++
        }else{
            buttons[l].style.display = "none"
        }
    }

}
//search algorithm 
function simpleSearch(text, input) {
    text = text.toLowerCase()
    input = input.toLowerCase()
  
    return text.includes(input)
}
//export button
function exportCompanyList (){
    const csvString = convertArrayToCSV(exampleData)
    const blob = new Blob([csvString], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url;
    link.download = 'data.csv'
    link.click()
    URL.revokeObjectURL(url)
}
//input input
function importCompanyList (file){
    oldListLength = exampleData.length
    const reader = new FileReader()
    reader.onload = function(event) {
        const csvContent = event.target.result
        exampleData = csvToArray(csvContent)
        console.log(exampleData)
    };

    reader.readAsText(file)

    document.getElementById('textSearch').value = ''
    var dropdownIndex = document.getElementById('dropdown')
    dropdownIndex.selectedIndex = 0; 
    refreshList(exampleData)
}
// csv shinanigans
function csvToArray(csvString) {
    const rows = csvString.split('\n');
    const result = [];

    for (const row of rows) {
        const values = row.split(',');
        result.push(values);
    }

    return result;
}

function convertArrayToCSV(data) {
    const csvRows = []
    for (const row of data) {
      const csvRow = row.map(value => `"${value}"`).join(",")
      csvRows.push(csvRow)
    }
    return csvRows.join("\n")
}

//potental for the future

// function removeListItem (){

// }

// function addListItem (){

// }
//this creates the info panel when a buttons on a row are made
function buttonClicked(dataList){
    for(let i = 0; i < exampleData.length; i++){
        buttons[i].style.width = "65%"
    }
    //panel
    let element = document.getElementById("infoId")
    element !== null ? document.getElementById("infoId").remove() : 0
    
    infoPage = document.createElement("div");
    let container = document.getElementById("spreadsheet");
    infoPage.setAttribute("id", "infoId")
    container.appendChild(infoPage)
    infoPage.style.right = "0px"
    infoPage.style.width = "25%"
    infoPage.style.height = "100%"
    infoPage.style.position = "fixed"
    infoPage.style.backgroundColor = "#1d52bc"
    //button creaton
    exit_button = document.createElement("button")
    let containerPower = document.getElementById("infoId")
    containerPower.appendChild(exit_button)
    exit_button.innerHTML = "<b>x</b>"
    exit_button.style.height = "35px"
    exit_button.style.aspectRatio = "1/1"
    exit_button.style.backgroundColor = "red"
    exit_button.style.margin= "10px";
    exit_button.style.position = "absolute"
    exit_button.style.borderRadius = "30%"
    exit_button.style.fontSize = "150%"
    exit_button.style.right = "20px"
    //main title (company name)
    titleHeader = document.createElement("h3")
    containerPower.appendChild(titleHeader)
    titleHeader.innerHTML = dataList[0]
    titleHeader.style.fontSize = "35px"
    titleHeader.style.margin = "10px"
    titleHeader.style.textAlign = "center"
    //mini infotitle (date created and location)
    miniTitle = document.createElement("p")
    containerPower.appendChild(miniTitle)
    miniTitle.innerHTML = dataList[2] + " Created " + dataList[3]
    miniTitle.style.fontSize = "10px"
    miniTitle.style.textAlign = "center"
    //resources (company resources)
    resourcesText = document.createElement("p")
    containerPower.appendChild(resourcesText)
    resourcesText.innerHTML = dataList[1]
    resourcesText.style.margin = "10px"
    resourcesText.style.marginTop = "25px"
    //website(hyperlink)
    companyLinkWrap = document.createElement("p")
    companyLink = document.createElement("a")
    containerPower.appendChild(companyLinkWrap)
    companyLinkWrap.appendChild(companyLink)
    companyLink.innerHTML = dataList[4]
    companyLink.setAttribute("href","https://"+dataList[4])
    companyLinkWrap.style.textAlign = "center"
    resourcesText.style.marginTop = "25px"

    //this is executed after the button has been created
    exit_button.addEventListener('click', () => {
        for(let i = 0; i < exampleData.length; i++){
            buttons[i].style.width = "90%"
        }
        exit_button.remove()
        titleHeader.remove()
        miniTitle.remove()
        resourcesText.remove()
        companyLink.remove()
        infoPage.remove()
    })
}

// function infoPanelRemove (){
// } look into this later

// creates button events
function buttonEvents(list){
    for(let i = 0; i < list.length; i++){
        buttons[i].addEventListener('click', () => {
            buttonClicked(list[i])
        })
    }
}

// buttonEvents(exampleData)

dropdown.addEventListener('change', function () {
    let valueInput = dropdown.value
    let textInput = inputElement.value
    listSearch(textInput,valueInput,exampleData)
})

inputElement.addEventListener('input', function () {
    let valueInput = dropdown.value
    let textInput = inputElement.value
    listSearch(textInput,valueInput,exampleData)
})

exportButton1.addEventListener('click', function (){
    exportCompanyList()
})
