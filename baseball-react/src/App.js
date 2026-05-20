import { useState, useEffect } from 'react';
import PlayerList from './PlayerList';
import PlayerDetail from './PlayerDetail';
import EditPlayerModal from './EditPlayerModal';
import './App.css';

const API_URL = 'http://localhost:8080';

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);

  // Controls whether the edit modal is visible
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    const res = await fetch(`${API_URL}/players`);
    const data = await res.json();
    setPlayers(data);
  }

  async function handleSelectPlayer(id) {
    setSelectedId(id);

    const [playerRes, statsRes] = await Promise.all([
      fetch(`${API_URL}/players/${id}`),
      fetch(`${API_URL}/players/${id}/stats`)
    ]);

    const playerData = await playerRes.json();
    const statsData = await statsRes.json();

    setPlayer(playerData);
    setStats(statsData);
  }

  async function handleDeletePlayer(id) {
    if (!window.confirm('Are you sure you want to delete this player?')) return;

    await fetch(`${API_URL}/players/${id}`, { method: 'DELETE' });

    setSelectedId(null);
    setPlayer(null);
    setStats([]);
    loadPlayers();
  }

  async function handleDeleteStat(statId) {
    await fetch(`${API_URL}/players/${selectedId}/stats/${statId}`, { method: 'DELETE' });

    const res = await fetch(`${API_URL}/players/${selectedId}/stats`);
    const data = await res.json();
    setStats(data);
  }

  // Opens the edit modal
  function handleEditPlayer() {
    setShowEditModal(true);
  }

  // Called when the edit form is submitted.
  // Sends a PUT request to update the player, then refreshes the detail view.
  async function handleSaveEdit(updatedData) {
    await fetch(`${API_URL}/players/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });

    setShowEditModal(false);
    handleSelectPlayer(selectedId); // refresh the detail panel
    loadPlayers();                  // refresh the sidebar
  }

  return (
    <div id="app">
      <PlayerList
        players={players}
        onSelect={handleSelectPlayer}
        selectedId={selectedId}
      />
      <PlayerDetail
        player={player}
        stats={stats}
        onDelete={handleDeletePlayer}
        onDeleteStat={handleDeleteStat}
        onEdit={handleEditPlayer}
      />

      {/* Only render the modal when showEditModal is true */}
      {showEditModal && (
        <EditPlayerModal
          player={player}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default App;
