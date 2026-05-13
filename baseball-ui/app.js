// The base URL of our Spring Boot API.
// Every fetch request will start with this.
const API_URL = 'http://localhost:8080';

// Keeps track of which player is currently selected
let selectedPlayerId = null;

// Keeps track of whether we're editing an existing player or creating a new one
let editingPlayerId = null;

// ─────────────────────────────────────────
// LOAD PLAYERS
// Runs when the page loads. Fetches all players from the API
// and displays them in the sidebar list.
// ─────────────────────────────────────────
async function loadPlayers() {
    const response = await fetch(`${API_URL}/players`);
    const players = await response.json();

    const list = document.getElementById('player-list');
    list.innerHTML = ''; // clear the list before re-rendering

    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.firstName} ${player.lastName}`;
        li.dataset.id = player.id;

        // Highlight the currently selected player
        if (player.id === selectedPlayerId) {
            li.classList.add('active');
        }

        // When a player is clicked, show their details
        li.addEventListener('click', () => selectPlayer(player.id));
        list.appendChild(li);
    });
}

// ─────────────────────────────────────────
// SELECT PLAYER
// Called when a player is clicked in the sidebar.
// Fetches that player's data and stats, then renders the detail view.
// ─────────────────────────────────────────
async function selectPlayer(id) {
    selectedPlayerId = id;

    // Fetch the player and their stats at the same time
    const [playerRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/players/${id}`),
        fetch(`${API_URL}/players/${id}/stats`)
    ]);

    const player = await playerRes.json();
    const stats = await statsRes.json();

    renderPlayerDetail(player, stats);
    loadPlayers(); // re-render sidebar to update the active highlight
}

// ─────────────────────────────────────────
// RENDER PLAYER DETAIL
// Builds the HTML for the right-side panel showing
// a player's info and their stats table.
// ─────────────────────────────────────────
function renderPlayerDetail(player, stats) {
    const detail = document.getElementById('player-detail');

    detail.innerHTML = `
        <h2>${player.firstName} ${player.lastName}</h2>
        <p class="meta">${player.position} · ${player.team} · Age ${player.age}</p>

        <div class="action-buttons">
            <button class="btn btn-edit" onclick="openEditModal()">Edit Player</button>
            <button class="btn btn-delete" onclick="deletePlayer(${player.id})">Delete Player</button>
            <button class="btn btn-add-stat" onclick="openStatModal()">+ Add Stat</button>
        </div>

        <div id="stats-section">
            <h3>Career Stats</h3>
            ${stats.length === 0
                ? '<p style="color:#999; margin-top:10px;">No stats yet.</p>'
                : `<table>
                    <thead>
                        <tr>
                            <th>Season</th>
                            <th>Stat</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${stats.map(stat => `
                            <tr>
                                <td>${stat.seasonYear}</td>
                                <td>${stat.statName}</td>
                                <td>${stat.statValue}</td>
                                <td>
                                    <button class="btn-delete-stat" onclick="deleteStat(${stat.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`
            }
        </div>
    `;
}

// ─────────────────────────────────────────
// DELETE PLAYER
// Sends a DELETE request to the API, then reloads the sidebar
// and clears the detail view.
// ─────────────────────────────────────────
async function deletePlayer(id) {
    if (!confirm('Are you sure you want to delete this player?')) return;

    await fetch(`${API_URL}/players/${id}`, { method: 'DELETE' });

    selectedPlayerId = null;
    document.getElementById('player-detail').innerHTML = '<p class="placeholder">Select a player to view their stats.</p>';
    loadPlayers();
}

// ─────────────────────────────────────────
// DELETE STAT
// Sends a DELETE request to remove one stat entry,
// then refreshes the current player's detail view.
// ─────────────────────────────────────────
async function deleteStat(statId) {
    await fetch(`${API_URL}/players/${selectedPlayerId}/stats/${statId}`, { method: 'DELETE' });
    selectPlayer(selectedPlayerId); // reload the detail view
}

// ─────────────────────────────────────────
// PLAYER MODAL — ADD
// Opens the modal form with empty fields for creating a new player.
// ─────────────────────────────────────────
function openAddModal() {
    editingPlayerId = null;
    document.getElementById('modal-title').textContent = 'Add Player';
    document.getElementById('player-form').reset();
    document.getElementById('modal').classList.remove('hidden');
}

// ─────────────────────────────────────────
// PLAYER MODAL — EDIT
// Opens the modal form pre-filled with the selected player's current data.
// ─────────────────────────────────────────
async function openEditModal() {
    editingPlayerId = selectedPlayerId;

    const response = await fetch(`${API_URL}/players/${selectedPlayerId}`);
    const player = await response.json();

    document.getElementById('modal-title').textContent = 'Edit Player';
    document.getElementById('input-firstName').value = player.firstName;
    document.getElementById('input-lastName').value = player.lastName;
    document.getElementById('input-position').value = player.position;
    document.getElementById('input-team').value = player.team;
    document.getElementById('input-age').value = player.age;

    document.getElementById('modal').classList.remove('hidden');
}

// ─────────────────────────────────────────
// PLAYER FORM SUBMIT
// Handles both create and update depending on whether editingPlayerId is set.
// ─────────────────────────────────────────
document.getElementById('player-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent the page from refreshing

    const data = {
        firstName: document.getElementById('input-firstName').value,
        lastName: document.getElementById('input-lastName').value,
        position: document.getElementById('input-position').value,
        team: document.getElementById('input-team').value,
        age: parseInt(document.getElementById('input-age').value)
    };

    if (editingPlayerId) {
        // Update existing player
        await fetch(`${API_URL}/players/${editingPlayerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        selectPlayer(editingPlayerId); // refresh the detail view
    } else {
        // Create new player
        await fetch(`${API_URL}/players`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    document.getElementById('modal').classList.add('hidden');
    loadPlayers();
});

// ─────────────────────────────────────────
// STAT MODAL
// Opens the modal form for adding a new stat to the selected player.
// ─────────────────────────────────────────
function openStatModal() {
    document.getElementById('stat-form').reset();
    document.getElementById('stat-modal').classList.remove('hidden');
}

// ─────────────────────────────────────────
// STAT FORM SUBMIT
// Sends a POST request to add a new stat entry for the selected player.
// ─────────────────────────────────────────
document.getElementById('stat-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        seasonYear: parseInt(document.getElementById('input-seasonYear').value),
        statName: document.getElementById('input-statName').value,
        statValue: parseFloat(document.getElementById('input-statValue').value)
    };

    await fetch(`${API_URL}/players/${selectedPlayerId}/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    document.getElementById('stat-modal').classList.add('hidden');
    selectPlayer(selectedPlayerId); // reload stats
});

// ─────────────────────────────────────────
// CLOSE MODALS
// ─────────────────────────────────────────
document.getElementById('cancel-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

document.getElementById('cancel-stat-btn').addEventListener('click', () => {
    document.getElementById('stat-modal').classList.add('hidden');
});

document.getElementById('add-player-btn').addEventListener('click', openAddModal);

// ─────────────────────────────────────────
// INIT
// Runs when the page first loads.
// ─────────────────────────────────────────
loadPlayers();
