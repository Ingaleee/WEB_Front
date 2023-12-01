window.addEventListener("load", function() {
    const tableTemplate = document.getElementById('table-template');

    function generateTable(item) {
        const weekdays = Array.from(document.getElementById('weekdays').selectedOptions).map(option => option.value);
    
        const tableContainer = document.getElementById('tableContainer');
    
        tableContainer.innerHTML = '';
    
        const tableClone = document.importNode(tableTemplate.content, true);
        const tableHead = tableClone.querySelector('thead tr');
        const tableBody = tableClone.querySelector('tbody');
    
        tableHead.innerHTML = `<th>Item</th>${weekdays.map(day => `<th>${day}</th>`).join('')}`;
    
        let items = JSON.parse(localStorage.getItem("items")) || [];
    
        if (item) {
            items.push(item);
        }
    
        for (current of items) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${current}</td>`;
    
            tableBody.appendChild(row);
        }
    
        tableContainer.appendChild(tableClone);
    
        localStorage.setItem("items", JSON.stringify(items));
    }

    generateTable();

    document.getElementById('tableForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const item = document.getElementById('item').value;
        generateTable(item);
    });
});

