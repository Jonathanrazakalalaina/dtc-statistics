const displayBoard = document.querySelector('.display')
const statLengthBoard = document.querySelector('.length')
const allBtn = document.querySelector('.all')
const selectOrderDate = document.querySelector('.selectOrderDate')
const chartsBtn = document.querySelector('.charts')

const fetchData = async () => {
    const reponse = await fetch('./sales_100.json')
    const data = await reponse.json()
    const allData = data.sales_100

    // chart integration

    // graphic : units sold per item types
    const itemTypeLabels = []
    const unitsSold = []
    for (let i = 0; i < allData.length; i++) {
        itemTypeLabels.push(allData[i].item_type)
    }
    const itemTypeLabelsSet = Array.from(new Set(itemTypeLabels))
    // console.log(itemTypeLabelsSet)

    const sommeUnitsSoldParItemType = allData.reduce((acc, objet) => {
        const item_type = objet.item_type
        const units_sold = objet.units_sold

        const itemExistant = acc.find((item) => item.item_type === item_type)

        if (itemExistant) {
            itemExistant.units_sold += units_sold
        } else {
            acc.push({ item_type, units_sold })
        }

        return acc
    }, [])

    for (let i = 0; i < sommeUnitsSoldParItemType.length; i++) {
        unitsSold.push(sommeUnitsSoldParItemType[i].units_sold)
    }
    // console.log(unitsSold)

    const barTypeChart = document.getElementById('barTypeChart')

    new Chart(barTypeChart, {
        type: 'bar',
        data: {
            labels: itemTypeLabelsSet,
            datasets: [
                {
                    label: 'units sold',
                    data: unitsSold,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    })

    // graphic : units sold per years

    const orderDate = []
    for (let i = 0; i < allData.length; i++) {
        orderDate.push(allData[i].order_date.substring(0, 4))
    }
    const orderDateSet = Array.from(new Set(orderDate)).sort().reverse()
    // console.log(orderDateSet)

    const sommeUnitsSoldParYear = allData.reduce((acc, objet) => {
        const order_date = objet.order_date.substring(0, 4)
        // console.log(order_date);
        const units_sold = objet.units_sold

        const itemExistant = acc.find((item) => item.order_date === order_date)

        if (itemExistant) {
            itemExistant.units_sold += units_sold
        } else {
            acc.push({ order_date, units_sold })
        }

        return acc
    }, [])

    const sommeUnitsSoldParYearSorted = sommeUnitsSoldParYear.sort((a, b) => {
        return parseInt(a.order_date) - parseInt(b.order_date)
    })

    const unitsSoldSortedByDate = []
    for (let i = 0; i < sommeUnitsSoldParYear.length; i++) {
        unitsSoldSortedByDate.push(sommeUnitsSoldParYearSorted[i].units_sold)
    }
    // console.log(unitsSoldSortedByDate)

    const lineTypeChart = document.getElementById('lineTypeChart')

    new Chart(lineTypeChart, {
        type: 'line',
        data: {
            labels: orderDateSet.reverse(),
            datasets: [
                {
                    label: 'units sold',
                    data: unitsSoldSortedByDate,
                    fill: false,
                    borderColor: 'rgb(250, 152, 24)',
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    })

    // graphic : available regions

    const allRegions = allData.map((sale) => {
        return sale.region
    })
    // console.log(allRegions)

    const allRegionSet = Array.from(new Set(allRegions))
    console.log(allRegionSet);

    const regionsOccurence = []
    allRegionSet.forEach(regionSet => regionsOccurence.push(allData.filter(sale => sale.region.toLowerCase() === `${regionSet.toLowerCase()}`).length))
    console.log(regionsOccurence)

    const polarAreaTypeChart = document.getElementById('polarAreaTypeChart')

    new Chart(polarAreaTypeChart, {
        type: 'polarArea',
        data: {
            labels: allRegionSet,
              datasets: [{
                label: 'available regions',
                data: regionsOccurence,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(75, 192, 192)',
                  'rgb(255, 205, 86)',
                  'rgb(201, 203, 207)',
                  'rgb(54, 162, 235)',
                  'rgb(139, 1, 151)',
                  'rgb(252, 141, 15)'
                ]
              }]
        },
        options: {},
    })

    // sort by order date

    orderDateSet.forEach((valeur) => {
        const option = document.createElement('option')
        option.classList.add('optionOrderDates')

        option.innerText = `${valeur}`

        selectOrderDate.appendChild(option)
    })

    selectOrderDate.addEventListener('change', function () {
        const selectedOption = this.options[this.selectedIndex]
        console.log(`Option sélectionnée : ${selectedOption.textContent}`)
        displayData(
            allData.filter(
                (data) =>
                    data.order_date.substring(0, 4) ===
                    `${selectedOption.textContent}`
            )
        )
    })

    //all items
    allBtn.addEventListener('click', () => displayData(allData))

    // sort by clothes
    const clothes = document.querySelector('.clothes')
    const clothesSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'clothes'
    )

    clothes.addEventListener('click', () => displayData(clothesSort))

    // sort by  Office Supplies
    const OfficeSupplies = document.querySelector('.officeSupplies')
    const OfficeSuppliesSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'office supplies'
    )
    OfficeSupplies.addEventListener('click', () =>
        displayData(OfficeSuppliesSort)
    )

    // sort by  snacks
    const snacks = document.querySelector('.snacks')
    const snacksSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'snacks'
    )
    snacks.addEventListener('click', () => displayData(snacksSort))

    // sort by  household
    const household = document.querySelector('.household')
    const householdSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'household'
    )
    household.addEventListener('click', () => displayData(householdSort))

    // sort by  fruits
    const fruits = document.querySelector('.fruits')
    const fruitsSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'fruits'
    )
    fruits.addEventListener('click', () => displayData(fruitsSort))

    // sort by  beverages
    const beverages = document.querySelector('.beverages')
    const beveragesSort = allData.filter(
        (data) => data.item_type.toLowerCase() === 'beverages'
    )
    beverages.addEventListener('click', () => displayData(beveragesSort))

    // sort by sales channel types

    //ONLINE
    const saleschannelOnline = document.querySelector('.saleschannelOnline')
    const saleschannelOnlineSort = allData.filter(
        (data) => data.sales_channel.toLowerCase() === 'online'
    )
    saleschannelOnline.addEventListener('click', () =>
        displayData(saleschannelOnlineSort)
    )

    //OFFLINE
    const saleschannelOffline = document.querySelector('.saleschannelOffline')
    const saleschannelOfflineSort = allData.filter(
        (data) => data.sales_channel.toLowerCase() === 'offline'
    )
    saleschannelOffline.addEventListener('click', () =>
        displayData(saleschannelOfflineSort)
    )

    //Most sold
    const mostsold = document.querySelector('.mostsold')
    const mostSoldSort = allData
        .sort((a, b) => b.units_sold - a.units_sold)
        .slice(0, 10)
    mostsold.addEventListener('click', () => displayData(mostSoldSort))

    //Price Sort
    const minToMaxPrice = document.querySelector('.minToMaxPrice')
    const minToMaxPriceSort = allData.sort(
        (a, b) => a.unit_price - b.unit_price
    )
    minToMaxPrice.addEventListener('click', () =>
        displayData(minToMaxPriceSort)
    )
}

fetchData()

const displayData = (allData) => {
    const statlength = `<div>Number of result(s) : <b>${allData.length}</b></div>`
    statLengthBoard.innerHTML = statlength

    const cards = allData
        .map(
            (data) =>
                `<div class="card">
                    <span class="orderDate">${data.order_date.substring(
                        0,
                        4
                    )}</span>
                    <span class="shipDate">${data.ship_date.substring(
                        0,
                        4
                    )}</span>
                    <h2>${data.country}</h2>
                    <h3>${data.region}</h3>
                    <h4>Item type : ${data.item_type}</h4>
                    <h5>Sales channel : ${data.sales_channel}</h5>
                    <p>Unit cost : ${data.unit_cost}</p>
                    <p>Unit price : ${data.unit_price}</p>
                    <p>Unit sold : ${data.units_sold}</p>
                </div>`
        )
        .join('')

    displayBoard.innerHTML = cards
}

// Sélectionnez tous les boutons
const btns = document.querySelectorAll('button')

btns.forEach((bouton) => {
    bouton.addEventListener('click', () => {
        btns.forEach((b) => {
            b.classList.remove('active')
        })

        bouton.classList.add('active')
    })
})
