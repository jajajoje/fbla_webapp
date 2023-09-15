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

var companyButton = []
var companyName = []
var companyResources = []
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
    if(document.getElementById("button0") !== null){
        for(let i = 0; i < oldListLength; i++){
            companyButton[i].remove()
        }
        if(document.getElementById("infoId") !== null){
            exit_button.remove()
            titleHeader.remove()
            miniTitle.remove()
            resourcesText.remove()
            companyLink.remove()
            infoPage.remove()
        }
    }
    companyButton = []
    let container = document.getElementById("buttonBox")
    for(let i = 0; i < list.length; i++){
        companyButton[i] = document.createElement("button")
        companyName[i] = document.createElement("p")
        companyResources[i] = document.createElement("p") 
        container.appendChild(companyButton[i])
        companyButton[i].setAttribute("id", "button"+i)
        companyButton[i].setAttribute("class", "dataButtons")
        companyButton[i].appendChild(companyName[i])
        companyButton[i].appendChild(companyResources[i])
        companyName[i].innerHTML = '<b>'+list[i][0]+'</b>'
        companyResources[i].innerHTML = list[i][1]
        companyName[i].classList.add("company_name_button")
        companyResources[i].classList.add("company_resources_button")
        companyButton[i].classList.add("company_button")
        companyButton[i].style.top = 120+65*i+"px"
    }
    container.style.height = 15+(list.length*65)+"px"
    buttonEvents(exampleData)
}
//called as soon as the text input or drop down change
function listSearch(textInput, value, list2d){
    let trueTimes = 0;
    for(var l = 0; l < list2d.length; l++){
        if(simpleSearch(list2d[l][value].toString(),textInput.toString())){
            companyButton[l].style.top = 135+60*trueTimes+"px"
            companyButton[l].style.display = "block"
            trueTimes ++
        }else{
            companyButton[l].style.display = "none"
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
    //reader.onload is async
    reader.onload = function(event) {
        const csvContent = event.target.result
        exampleData = csvToArray(csvContent)
        document.getElementById('textSearch').value = ''
        var dropdownIndex = document.getElementById('dropdown')
        dropdownIndex.selectedIndex = 0; 
        refreshList(exampleData)
    };

    reader.readAsText(file)
}
// csv shinanigans
function csvToArray(csvString) {
    const rows = csvString.split('\n')
    const result = []
    for (const row of rows) {
        const values = []
        let currentValue = ''
        let insideQuotes = false
        for (let i = 0; i < row.length; i++) {
            const char = row[i]
            if (char === '"') {
                insideQuotes = !insideQuotes
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue)
                currentValue = ''
            } else {
                currentValue += char
            }
        }
        values.push(currentValue)
        result.push(values)
    }
    return result;
}
function convertArrayToCSV(data) {
    const csvRows = []
    for (const row of data) {
        const csvRow = row.map(value => {
            if (typeof value === 'string' && value.includes(',')) {
                return `"${value.replace(/"/g, '""')}"`
            } else {
                return value
            }
        }).join(",")
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
        companyButton[i].style.width = "65%"
    }
    //panel
    let element = document.getElementById("infoId")
    element !== null ? document.getElementById("infoId").remove() : 0
    infoPage = document.createElement("div");
    let container = document.getElementById("buttonBox");
    infoPage.setAttribute("id", "infoId")
    container.appendChild(infoPage)
    infoPage.classList.add("infoPage")
    //button creaton
    exit_button = document.createElement("button")
    let containerPower = document.getElementById("infoId")
    containerPower.appendChild(exit_button)
    exit_button.innerHTML = "<b>x</b>"
    exit_button.style.height = "35px"
    exit_button.style.aspectRatio = "1/1"
    exit_button.style.backgroundColor = "red"
    exit_button.style.margin= "10px";
    // exit_button.style.position = "absolute"
    exit_button.style.borderRadius = "30%"
    exit_button.style.fontSize = "150%"
    exit_button.style.right = "20px"
    //main title (company name)
    titleHeader = document.createElement("h3")
    containerPower.appendChild(titleHeader)
    if(dataList[0] !== undefined){
        titleHeader.innerHTML = dataList[0]
    }else{
        titleHeader.innerHTML = "No company name given"
    }
    titleHeader.innerHTML = dataList[0]
    titleHeader.style.fontSize = "35px"
    titleHeader.style.margin = "10px"
    titleHeader.style.textAlign = "center"
    //mini infotitle (date created and location)
    miniTitle = document.createElement("p")
    containerPower.appendChild(miniTitle)
    if(dataList[2] !== undefined){
        miniTitle.innerHTML = dataList[2] + " Created " + dataList[3]
    }else{
        miniTitle.innerHTML = "No date created given"
    }
    miniTitle.style.fontSize = "10px"
    miniTitle.style.textAlign = "center"
    //Company resources
    resourcesText = document.createElement("p")
    containerPower.appendChild(resourcesText)
    if(dataList[1] !== undefined){
        resourcesText.innerHTML = dataList[1]
    }else{
        resourcesText.innerHTML = "No resources given"
    }
    resourcesText.style.margin = "10px"
    resourcesText.style.marginTop = "25px"
    //website(hyperlink)
    companyLinkWrap = document.createElement("p")
    companyLink = document.createElement("a")
    containerPower.appendChild(companyLinkWrap)
    companyLinkWrap.appendChild(companyLink)
    if(dataList[4] !== undefined){
        companyLink.innerHTML = dataList[4]
        companyLink.setAttribute("href","https://"+dataList[4])
    }else{
        companyLink.innerHTML = "No website given"
        companyLink.style.color = "blue"
    }
    companyLink.style.backgroundColor = "#2d2b2b"
    companyLink.style.padding = "10px"
    companyLink.style.borderRadius = "10px"
    companyLinkWrap.style.textAlign = "center"
    resourcesText.style.marginTop = "25px"

    //this is executed after the button has been created
    window.addEventListener('scroll', function() {
        let containerPower = document.getElementById("infoId");
        var headerHeight = document.querySelector(".top_bar").offsetHeight;
        if (window.scrollY > headerHeight) {
            containerPower.style.position = "fixed"
            containerPower.style.top = "0px"
        } else {
            containerPower.style.position = "absolute"
            containerPower.style.top = ""
        }
    });
    //same with this
    exit_button.addEventListener('click', () => {
        for(let i = 0; i < exampleData.length; i++){
            companyButton[i].style.width = "90%"
        }
        exit_button.remove()
        titleHeader.remove()
        miniTitle.remove()
        resourcesText.remove()
        companyLink.remove()
        infoPage.remove()
    })
}

// creates button events
function buttonEvents(list){
    for(let i = 0; i < list.length; i++){
        companyButton[i].addEventListener('click', () => {
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
