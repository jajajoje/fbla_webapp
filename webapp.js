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

createList(exampleData);


function createList(list){
    for(let i = 0; i < exampleData.length; i++){
        buttons[i] = document.createElement("button")
        let container = document.getElementById("spreadsheet")
        container.appendChild(buttons[i])

        buttons[i].innerHTML = exampleData[i][0]+exampleData[i][1]
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
    document.getElementById("spreadsheet").style.height = exampleData.length*61;
}

function search(textInput, value, list2d){
    console.log(textInput, value)
    console.log(list2d)

    // for(let k = 0; k < list2d; k++){
    //     if(list2d[i][value].includes(textInput)){

    //     }else
    // }

    // function fuzzySearch(items, searchTerm) {
    //     return items.filter((item) => {
    //         return item.toLowerCase().includes(searchTerm);
    //     });
    // }
}

function removeListItem (){

};

function addListItem (){

};

function buttonClicked(dataList){
    for(let i = 0; i < exampleData.length; i++){
        buttons[i].style.width = "65%"
    }
    //panel
    let element = document.getElementById("infoId")
    element !== null ? document.getElementById("infoId").remove() : 0
    
    let infoPage = document.createElement("div");
    let container = document.getElementById("spreadsheet");
    infoPage.setAttribute("id", "infoId");
    container.appendChild(infoPage);
    infoPage.style.right = "0px"
    infoPage.style.width = "25%"
    infoPage.style.height = "100%"
    infoPage.style.position = "fixed"
    infoPage.style.backgroundColor = "#1d52bc"
    //button creaton
    let exit_button = document.createElement("button")
    var containerPower = document.getElementById("infoId")
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
    let titleHeader = document.createElement("h3")
    var containerPower = document.getElementById("infoId")
    containerPower.appendChild(titleHeader)
    titleHeader.innerHTML = dataList[0]
    titleHeader.style.fontSize = "35px"
    titleHeader.style.margin = "10px"
    titleHeader.style.textAlign = "center"
    //mini infotitle (date created and location)
    let miniTitle = document.createElement("p")
    var containerPower = document.getElementById("infoId")
    containerPower.appendChild(miniTitle)
    miniTitle.innerHTML = dataList[2] + " Created " + dataList[3]
    miniTitle.style.fontSize = "10px"
    miniTitle.style.textAlign = "center"
    //resources (company resources)
    let resourcesText = document.createElement("p")
    var containerPower = document.getElementById("infoId")
    containerPower.appendChild(resourcesText)
    resourcesText.innerHTML = dataList[1]
    resourcesText.style.margin = "10px"
    resourcesText.style.marginTop = "25px"
    //website(hyperlink)
    let companyLinkWrap = document.createElement("p")
    let companyLink = document.createElement("a")
    var containerPower = document.getElementById("infoId")
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
    });
};
// creates button events
for(let i = 0; i < exampleData.length; i++){
    buttons[i].addEventListener('click', () => {
        buttonClicked(exampleData[i]);
    });
}

const dropdown = document.getElementById('dropdown');
const inputElement = document.getElementById('textSearch')

dropdown.addEventListener('change', function () {
    let valueInput = dropdown.value
    let textInput = inputElement.value
    search(textInput,exampleData[valueInput])
});

inputElement.addEventListener('input', function () {
    let valueInput = dropdown.value
    let textInput = inputElement.value
    search(textInput,valueInput,exampleData)
})
