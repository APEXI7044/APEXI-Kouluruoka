document.addEventListener("DOMContentLoaded", function() {


    const MENU_ID = 96005; // Get your kitchen id from the .txt file provided 
    const TextPrefix = "🍽️ - "; // Get your kitchen id from the .txt file provided 
    const TextEndfix = " - 🧃"; // Get your kitchen id from the .txt file provided 


    function fetchMenuForToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const currentDate = `${year}${month}${day}`;

        const url = `https://fi.jamix.cloud/apps/menuservice/rest/haku/menu/${MENU_ID}/2?lang=fi&type=json&date=${currentDate}&date2=${currentDate}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                filterAndDisplayFirstItem(data);
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    }

    function filterAndDisplayFirstItem(jsonData) {
        const filteredItems = [];
        let foundItems = false; // Flag to track if items are found

        jsonData.forEach(kitchen => {
            kitchen.menuTypes.forEach(menuType => {
                menuType.menus.forEach(menu => {
                    menu.days.forEach(day => {
                        day.mealoptions.forEach(option => {
                            option.menuItems.forEach(item => {
                                if (item.orderNumber === 1000) {
                                    filteredItems.push({ name: item.name });
                                    foundItems = true; // Set flag to true when item is found
                                }
                            });
                        });
                    });
                });
            });
        });
        
        // Check if no items were found and push 'T' if true
        if (!foundItems) {
            filteredItems.push({ name: 'Ruokalista Ei Saatavilla' });
        }
        
        if (filteredItems.length > 0) {
            displayJsonContent(filteredItems[0]);
        } else {
            displayJsonContent({});
        }
    }

    function displayJsonContent(jsonData) {
        const contentToDisplay = `${TextPrefix}${jsonData.name}${TextEndfix}`;

        const jsonContent = document.getElementById("json-content");
        jsonContent.textContent = contentToDisplay;
    }

    fetchMenuForToday();
});




