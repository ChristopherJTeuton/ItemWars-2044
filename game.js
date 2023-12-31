console.log("Script loaded");
const POLICE_FINE_PROBABILITY = 0.05;
const MUGGING_PROBABILITY = 0.1;
const FINDING_MONEY_PROBABILITY = 0.15;
document.addEventListener("DOMContentLoaded", function() {
    let playerName = prompt("Enter your character's name:");
    document.getElementById('player-name').textContent = `Player: ${playerName}`;
    let money = 500;
    let inventory = {
        "Banned Books": 0,
        "3D-Printed Weapons": 0,
        "Gallons of Rain Water": 0,
        "Prescribed Drugs": 0,
        "Unprescribed Drugs": 0,
        "Birth Control": 0
    };
    const itemPrices = {
        "Banned Books": 20,
        "3D-Printed Weapons": 50,
        "Gallons of Rain Water": 35,
        "Prescribed Drugs": 30,
        "Unprescribed Drugs": 15,
        "Birth Control": 45
    };
    const cities = ['Savannah', 'Atlanta', 'Jacksonville', 'Orlando', 'Charleston'];
    let gameEventsElement = document.getElementById('game-events');
    let city = cities[Math.floor(Math.random() * cities.length)];

    // Define price ranges for each item in each city
    const cityItemPrices = {
        "Savannah": {
            "Banned Books": { min: 25, max: 45 },
            "3D-Printed Weapons": { min: 40, max: 60 },
            "Gallons of Rain Water": { min: 30, max: 40 },
            "Prescribed Drugs": { min: 1, max: 10 },
            "Unprescribed Drugs": { min: 10, max: 20 },
            "Birth Control": { min: 50, max: 100 }
        },
"Atlanta": {
            "Banned Books": { min: 15, max: 25 },
            "3D-Printed Weapons": { min: 40, max: 60 },
            "Gallons of Rain Water": { min: 1, max: 20 },
            "Prescribed Drugs": { min: 25, max: 35 },
            "Unprescribed Drugs": { min: 10, max: 20 },
            "Birth Control": { min: 35, max: 50 }
        },
        "Jacksonville": {
            "Banned Books": { min: 10, max: 25 },
            "3D-Printed Weapons": { min: 10, max: 60 },
            "Gallons of Rain Water": { min: 10, max: 40 },
            "Prescribed Drugs": { min: 25, max: 35 },
            "Unprescribed Drugs": { min: 10, max: 70 },
            "Birth Control": { min: 15, max: 50 }
        },
"Orlando": {
            "Banned Books": { min: 15, max: 25 },
            "3D-Printed Weapons": { min: 40, max: 60 },
            "Gallons of Rain Water": { min: 30, max: 40 },
            "Prescribed Drugs": { min: 25, max: 35 },
            "Unprescribed Drugs": { min: 10, max: 80 },
            "Birth Control": { min: 35, max: 50 }
        },
"Charleston": {
            "Banned Books": { min: 15, max: 25 },
            "3D-Printed Weapons": { min: 40, max: 60 },
            "Gallons of Rain Water": { min: 20, max: 50 },
            "Prescribed Drugs": { min: 25, max: 35 },
            "Unprescribed Drugs": { min: 1, max: 10 },
            "Birth Control": { min: 30, max: 60 }
        },

    };
    function updateUI() {
        document.getElementById('city-description').textContent = `Current City: ${city}`;
        document.getElementById('money-description').textContent = `Money: $${money}`;
        document.getElementById('options-description').textContent = `Options: Click 'Buy' to buy items, 'Sell' to sell items, 'Travel' to travel, or 'Quit' to quit.`;
        document.getElementById('inventory-description').textContent = `Inventory: Banned Books: ${inventory["Banned Books"]}, 3D-Printed Weapons: ${inventory["3D-Printed Weapons"]}, Gallons of Rain Water: ${inventory["Gallons of Rain Water"]}, Prescribed Drugs: ${inventory["Prescribed Drugs"]}, Unprescribed Drugs: ${inventory["Unprescribed Drugs"]}, Birth Control: ${inventory["Birth Control"]}`;
    }

function populateDropdown(elementId, options, itemPrices) {
    let dropdown = document.getElementById(elementId);
    dropdown.innerHTML = ""; // Clear existing options

    options.forEach(item => {
        let option = document.createElement('option');
        option.value = item;
        option.textContent = `${item} - $${itemPrices[item]}`;
        dropdown.appendChild(option);
    });
}


function displayGameEvent(eventText) {
    window.alert(eventText);
}


    function handleBuy() {
    let buySelectedItem = document.getElementById('buy-item-dropdown').value;
    let buyQuantity = parseInt(document.getElementById('buy-quantity-input').value);
    let buyItemPrice = itemPrices[buySelectedItem]; // Use updated itemPrices here
    let buyTotalCost = buyItemPrice * buyQuantity;

    if (money >= buyTotalCost) {
        money -= buyTotalCost;
        inventory[buySelectedItem] += buyQuantity;
        displayGameEvent(`You bought ${buyQuantity} ${buySelectedItem} for $${buyTotalCost}.`);
        updateInventoryDisplay(); // Update inventory display
    } else {
        displayGameEvent("Not enough money to make the purchase.");
    }

    updateUI();
}

    function handleSell() {
    let sellSelectedItem = document.getElementById('sell-item-dropdown').value;
    let sellQuantity = parseInt(document.getElementById('sell-quantity-input').value);
    let sellItemPrice = itemPrices[sellSelectedItem]; // Use updated itemPrices here
    let sellTotalEarnings = sellItemPrice * sellQuantity;
    if (inventory[sellSelectedItem] >= sellQuantity) {
        money += sellTotalEarnings;
        inventory[sellSelectedItem] -= sellQuantity;
        displayGameEvent(`You sold ${sellQuantity} ${sellSelectedItem} for $${sellTotalEarnings}.`);
        updateInventoryDisplay(); // Update inventory display
    } else {
        displayGameEvent(`You don't have ${sellQuantity} ${sellSelectedItem} to sell.`);
    }

    updateUI();
}

    // Function to update item prices based on the current city
    function updateItemPrices(city) {
        for (let item in itemPrices) {
            let priceRange = cityItemPrices[city][item];
            itemPrices[item] = Math.floor(Math.random() * (priceRange.max - priceRange.min + 1) + priceRange.min);
        }
    }

    // Function to handle travel and update item prices when the player travels and display travel price and also have random events occur

function handleTravel() {
    let travelCost = Math.floor(Math.random() * (151) + 50);
    let randomEvent = Math.random(); // Generate a random number to determine the event

    if (randomEvent < POLICE_FINE_PROBABILITY) {  // 5% chance for police fine event
        let fineAmount = Math.floor(money * 0.05); // 5% of total money
        money -= fineAmount;
        displayGameEvent(`You got pulled over by the police and were fined $${fineAmount}.`);
    } else if (randomEvent < MUGGING_PROBABILITY) { // 5% chance for mugging event
        let randomItem = Object.keys(inventory)[Math.floor(Math.random() * Object.keys(inventory).length)]; // Random item from inventory
        if (inventory[randomItem] > 0) {
            let lostQuantity = Math.floor(inventory[randomItem] * 0.2); // 20% of the item quantity
            inventory[randomItem] -= lostQuantity;
            displayGameEvent(`You got mugged by a stock broker and lost ${lostQuantity} ${randomItem}.`);
        }
} else if (randomEvent < FINDING_MONEY_PROBABILITY) { // 5% chance for finding money event
        let foundMoney = Math.floor(Math.random() * 100) + travelCost; // Random money between travel cost and 100
        money += foundMoney;
        displayGameEvent(`You found $${foundMoney} on the street!`);
    } else {
        // All other travel events will be displayed using displayGameEvent
        displayGameEvent(`You traveled to ${city}! It cost you $${travelCost}.`);
    }

    if (money >= travelCost && randomEvent >= 0.15) {
        money -= travelCost;
        city = cities[Math.floor(Math.random() * cities.length)];
        updateItemPrices(city);
        populateDropdown("buy-item-dropdown", Object.keys(itemPrices), itemPrices); // Update buy item dropdown
        populateDropdown("sell-item-dropdown", Object.keys(inventory), itemPrices); // Update sell item dropdown
        updateUI();
    } else if (money < travelCost) {
        displayGameEvent(`Not enough money to travel. Travel cost: $${travelCost}`);
    }
}




// Function to update inventory display inside the game-events element
function updateInventoryDisplay() {
    let existingInventoryDisplay = document.getElementById('inventory-display');
    if (existingInventoryDisplay) {
        existingInventoryDisplay.parentNode.removeChild(existingInventoryDisplay);
    }

    let inventoryDisplay = document.createElement('ul'); // Create a new ul element
    inventoryDisplay.id = 'inventory-display'; // Set an id for styling
    gameEventsElement.appendChild(inventoryDisplay); // Append the ul element to game-events

    for (let item in inventory) {
        let listItem = document.createElement('li');
        listItem.textContent = `${item}: ${inventory[item]}`;
        inventoryDisplay.appendChild(listItem);
    }
}





    // Populate the Buy Item dropdown with prices
    let buyItemDropdown = document.getElementById('buy-item-dropdown');
    for (let item in itemPrices) {
        let option = document.createElement('option');
        option.value = item;
        option.textContent = `${item} - $${itemPrices[item]}`;
        buyItemDropdown.appendChild(option);
    }

    // Populate the Sell Item dropdown with prices
    let sellItemDropdown = document.getElementById('sell-item-dropdown');
    for (let item in inventory) {
        let option = document.createElement('option');
        option.value = item;
        option.textContent = `${item} - $${itemPrices[item]}`;
        sellItemDropdown.appendChild(option);
    }


    function handleQuit() {
        if (money >= 10000000) {
            displayGameEvent(`Congratulations, ${playerName}! You earned $${money} and won the game!`);
        } else {
            displayGameEvent("Game over. Thanks for playing!");
        }
        // Disable buttons to prevent further actions after quitting
        document.getElementById('buy-button').disabled = true;
        document.getElementById('sell-button').disabled = true;
        document.getElementById('travel-button').disabled = true;
        document.getElementById('quit-button').disabled = true;
    }

    // Set event listeners for buttons
    document.getElementById('buy-button').addEventListener('click', handleBuy);
    document.getElementById('sell-button').addEventListener('click', handleSell);
    document.getElementById('travel-button').addEventListener('click', handleTravel);
    document.getElementById('quit-button').addEventListener('click', handleQuit);

    populateDropdown("buy-item-dropdown", Object.keys(itemPrices), itemPrices);
    populateDropdown("sell-item-dropdown", Object.keys(inventory), itemPrices);

    // Set event listeners for buttons and implement other functions as needed

    // Initialize game UI
    updateUI();
});