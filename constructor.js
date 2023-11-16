function generateTable() {
    const weekdays = Array.from(document.getElementById('weekdays').selectedOptions).map(option => option.value);
    const language = document.getElementById('language').value;

    let tableHTML = `<table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    ${weekdays.map(day => `<th>${day}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>`;
    
    const items = ["Nuka-Cola", "RadAway", "Stimpak", "Power Armor", "Caps", "Gauss Rifle", "Vault Suit", "Fusion Core"];

    for (const item of items) {
        tableHTML += `<tr>
                        <td>${item}</td>`;
        for (const day of weekdays) {
            const randomAmount = Math.floor(Math.random() * 10) + 1;
            tableHTML += `<td>${randomAmount}</td>`;
        }
        tableHTML += `</tr>`;
    }

    tableHTML += `</tbody>
                    </table>`;

    document.getElementById('tableContainer').innerHTML = tableHTML;
}

const savedConfig = localStorage.getItem('tableConfig');

if (savedConfig) {
    const { weekdays, language } = JSON.parse(savedConfig);
    document.getElementById('weekdays').value = weekdays;
    document.getElementById('language').value = language;
}

document.getElementById('tableForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateTable(); 
});
