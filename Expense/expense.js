const url = "https://crudcrud.com/api/2f91090874504ae1889051e1f8eea1eb/ExpenseTracker"

async function savetoLocalstorage(event) {
    event.preventDefault();

    let userDetails = {
        My_Expense_Amount: document.getElementById('amount').value,
        Description: document.getElementById('des').value,
        category: document.getElementById('cat').value
    }

    let userDetails_serialized = JSON.stringify(userDetails)
    const data = await axios.post(url, userDetails)
    console.log(data);

    document.getElementById('amount').value = ""
    document.getElementById('des').value = ""
    document.getElementById('cat').value = ""
}

function deleteUser(amount) {
    let child = document.getElementById(amount)
    let parent = document.getElementById('ul')
    parent.removeChild(child)
}

async function deleteUser(Id) {
    try {
        const deleteNow = await axios.delete(`${url}/${Id}`)
    }
    catch(error){
        console.log(error)
    }
 }

function editUser( amount, description, category,Id) {

    document.getElementById('amount').value = amount;
    document.getElementById('des').value = description;
    document.getElementById('cat').value = category;

    deleteUser(Id);
}
window.addEventListener(`DOMContentLoaded`, async () => {
    try {
        const response = await axios.get(url)
        console.log(response)
        const d = document.getElementById(`ul`);
        let li = ""

        for (let i = 0; i < response.data.length; i++) {
            li += `<li id="${response.data[i].My_Expense_Amount}"> '${response.data[i].My_Expense_Amount}','${response.data[i].Description}','${response.data[i].category}'
            <button onclick = "editUser('${response.data[i].My_Expense_Amount}','${response.data[i].Description}',
            '${response.data[i].category}' , '${response.data[i]._id}')"> Edit </button> 
            <button onclick = deleteUser('${response.data[i]._id}')> Delete </button> 
             </li>`
        
        }
        d.innerHTML = d.innerHTML + li
    }
    catch (error) {
        console.log(error);
    }

})