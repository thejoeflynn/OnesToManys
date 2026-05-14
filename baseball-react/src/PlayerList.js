import { useState } from 'react';

// Map team names to their logo files in /public/logos/
const teamLogos = {
  Phillies: '/logos/phillies.png',
  Braves: '/logos/braves.png',
  Nationals: '/logos/nationals.png',
};

function PlayerList({ players, onSelect, selectedId }) {
  const [selectedTeam, setSelectedTeam] = useState('All');

  // Build a unique sorted list of team names for the dropdown
  const teams = ['All', ...Array.from(new Set(players.map(p => p.team))).sort()];

  // Filter players based on selected team
  const filteredPlayers = selectedTeam === 'All'
    ? players
    : players.filter(p => p.team === selectedTeam);

  return (
    <div id="sidebar">
      <h2>Players</h2>

      <select
        value={selectedTeam}
        onChange={e => setSelectedTeam(e.target.value)}
      >
        {teams.map(team => (
          <option key={team} value={team}>{team}</option>
        ))}
      </select>

      <ul>
        {filteredPlayers.map(player => (
          <li
            key={player.id}
            onClick={() => onSelect(player.id)}
            className={player.id === selectedId ? 'active' : ''}
          >
            {/* Show the team logo if we have one, otherwise show nothing */}
            {teamLogos[player.team] && (
              <img
                src={teamLogos[player.team]}
                alt={player.team}
                className="team-logo"
              />
            )}
            {player.firstName} {player.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
