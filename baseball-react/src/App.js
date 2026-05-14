import { useState, useEffect } from 'react';
import PlayerList from './PlayerList';
import PlayerDetail from './PlayerDetail';
import './App.css';

const API_URL = 'http://localhost:8080';

function App() {
  // useState creates a piece of data that React watches.
  // When it changes, React automatically re-renders the parts of the page that use it.
  const [players, setPlayers] = useState([]);         // list of all players
  const [selectedId, setSelectedId] = useState(null); // ID of the selected player
  const [player, setPlayer] = useState(null);         // full data of selected player
  const [stats, setStats] = useState([]);             // stats for selected player

  // useEffect runs code after the component renders.
  // The empty [] at the end means "only run this once, when the page first loads."
  useEffect(() => {
    loadPlayers();
  }, []);

  // Fetch all players from the API and store them in state
  async function loadPlayers() {
    const res = await fetch(`${API_URL}/players`);
    const data = await res.json();
    setPlayers(data);
  }

  // Called when a player is clicked in the sidebar.
  // Fetches that player's details and stats.
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

  // Delete a player, then clear the detail panel and reload the list
  async function handleDeletePlayer(id) {
    if (!window.confirm('Are you sure you want to delete this player?')) return;

    await fetch(`${API_URL}/players/${id}`, { method: 'DELETE' });

    setSelectedId(null);
    setPlayer(null);
    setStats([]);
    loadPlayers();
  }

  // Delete a stat entry, then reload the stats for the current player
  async function handleDeleteStat(statId) {
    await fetch(`${API_URL}/players/${selectedId}/stats/${statId}`, { method: 'DELETE' });

    const res = await fetch(`${API_URL}/players/${selectedId}/stats`);
    const data = await res.json();
    setStats(data);
  }

  return (
    <div id="app">
      {/* Pass data and functions down to child components as props */}
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
      />
    </div>
  );
}

export default App;
