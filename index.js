const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const errorEl = document.getElementById("error-el")

let myLeads = JSON.parse(localStorage.getItem("myLeads")) || []



if(myLeads){
    renderLeadsFromLocalstorage(myLeads)
}

// Rendring leads from localStorage
function renderLeadsFromLocalstorage(leads) {
    let listItems = ""
    
    for(let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a href='${leads[i]}' target='_black'> 
                    ${leads[i]}             
                </a>
            </li>
        `
    }

    ulEl.innerHTML = listItems
}


// Save tab button logic
tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let check = false
        for(let i = 0; i < myLeads.length; i++){
            if(tabs[0].url === myLeads[i]) {
                check = true
            }
        }

        if(check) {
            errorEl.style.display = "block"

            setTimeout(() => {
                errorEl.style.display = "none"
            }, 3000)

        } else {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            renderLeadsFromLocalstorage(myLeads)
        }
    })
})

// Delete button logic
deleteBtn.addEventListener("dblclick", function (){
    if(myLeads) {
        localStorage.clear()
        myLeads = []
        renderLeadsFromLocalstorage(myLeads)
    }
})


// Save button logic
inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLead()
    inputEl.value = ""
})

// Rendring the list items
function renderLead() {
    if(inputEl.value !== ""){
        let listItem = `
        <li>
            <a href='${inputEl.value}' target='_black'> 
                ${inputEl.value}             
            </a>
        </li>
     `
        ulEl.innerHTML += listItem
    }
}