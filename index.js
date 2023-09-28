const displayBoard = document.querySelector(".display");
const statLengthBoard = document.querySelector(".length")
const allBtn = document.querySelector(".all");

const fetchData = async () => {

    const reponse = await fetch('./sales_100.json');
    const data = await reponse.json();
    const allData = data.sales_100;

    console.log(allData);

    // for (let i = 0; i < 50; i++) {
    //     console.log(allData[i].item_type);
    // }

    allBtn.addEventListener('click', () => displayData(allData));

    // sort by clothes
    const clothes = document.querySelector(".clothes");
    const clothesSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'clothes'
        )
        clothes.addEventListener('click', () => displayData(clothesSort));
        
    // sort by  Office Supplies
    const OfficeSupplies = document.querySelector(".officeSupplies");
    const OfficeSuppliesSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'office supplies'
    )
    OfficeSupplies.addEventListener('click', () => displayData(OfficeSuppliesSort));
    
    // sort by  snacks
    const snacks = document.querySelector(".snacks");
    const snacksSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'snacks'
    )
    snacks.addEventListener('click', () => displayData(snacksSort));
    
    // sort by  household
    const household = document.querySelector(".household");
    const householdSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'household'
    )
    household.addEventListener('click', () => displayData(householdSort));

    // sort by  fruits
    const fruits = document.querySelector(".fruits");
    const fruitsSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'fruits'
    )
    fruits.addEventListener('click', () => displayData(fruitsSort));

    // sort by  beverages
    const beverages = document.querySelector(".beverages");
    const beveragesSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'beverages'
    )
    beverages.addEventListener('click', () => displayData(beveragesSort));

    // sort by sales channel types

    //ONLINE
    const saleschannelOnline = document.querySelector(".saleschannelOnline");
    const saleschannelOnlineSort = allData.filter(
        (data) => data.sales_channel.toLowerCase() === 'online'
    )
    saleschannelOnline.addEventListener('click', () => displayData(saleschannelOnlineSort));
    
    //OFFLINE
    const saleschannelOffline = document.querySelector(".saleschannelOffline");
    const saleschannelOfflineSort = allData.filter(
        (data) => data.sales_channel.toLowerCase() === 'offline'
    )
    saleschannelOffline.addEventListener('click', () => displayData(saleschannelOfflineSort));

    //Most sold
    const mostsold = document.querySelector(".mostsold");
    const mostSoldSort = allData.sort((a, b) => (b.units_sold)-(a.units_sold)).splice(0, 10)
    mostsold.addEventListener('click', () => displayData(mostSoldSort));
    
    //Price Sort
    const minToMaxPrice = document.querySelector(".minToMaxPrice");
    const minToMaxPriceSort = allData.sort((a, b) => (a.unit_price)-(b.unit_price))
    minToMaxPrice.addEventListener('click', () => displayData(minToMaxPriceSort));
}

fetchData()


const displayData = (allData) => {
    const statlength = `<div>Number of result(s) : <b>${allData.length}</b></div>`;
    statLengthBoard.innerHTML = statlength;

    const cards = 
        allData.map((data) => 
        `<div class="card">
            <h2>${data.country}</h2>
            <h3>${data.region}</h3>
            <h4>Item type : ${data.item_type}</h4>
            <h5>Sales channel : ${data.sales_channel}</h5>
            <p>Unit cost : ${data.unit_cost}</p>
            <p>Unit price : ${data.unit_price}</p>
            <p>Unit sold : ${data.units_sold}</p>
        </div>`
    ).join('');

    displayBoard.innerHTML = cards;
}

// const btns = document.querySelectorAll("button")
// let clicked = false
// btns.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         if(!clicked) {
//             clicked = true;
//             btn.classList.add('active')
//         } else {
//             clicked = false;
//             btn.classList.remove('active')
//         }
//     }) 
// })