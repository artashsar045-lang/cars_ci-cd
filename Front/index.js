const API_URL = "http://127.0.0.1:8000/api/cars/"; 
// поменяй если url другой

async function loadCars(){

    const response = await fetch(API_URL)
    const cars = await response.json()

    const container = document.getElementById("cars-container")

    cars.forEach(car => {

        const card = document.createElement("div")
        card.className = "car-card"

        card.innerHTML = `
            <img src="${car.image}">
            <div class="car-info">
                <div class="car-model">${car.model}</div>
                <div class="car-price">$${car.price}</div>
            </div>
        `

        container.appendChild(card)

    })

}

loadCars()