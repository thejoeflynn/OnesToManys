// Team logos — same mapping as PlayerList
const teamLogos = {
  Phillies: '/logos/phillies.png',
  Braves: '/logos/braves.png',
  Nationals: '/logos/nationals.png',
};

// Converts snake_case stat names to readable labels
function formatStatName(name) {
  const labels = {
    batting_avg:   'Batting Avg',
    home_runs:     'Home Runs',
    rbis:          'RBIs',
    stolen_bases:  'Stolen Bases',
  };
  return labels[name] || name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Formats stat values — batting avg shows as .247 instead of 0.247
function formatStatValue(name, value) {
  if (name === 'batting_avg') {
    return value.toFixed(3).replace('0.', '.');
  }
  return value;
}

// Groups a flat array of stats into an object keyed by season year,
// sorted newest year first
function groupByYear(stats) {
  const grouped = {};
  stats.forEach(stat => {
    if (!grouped[stat.seasonYear]) grouped[stat.seasonYear] = [];
    grouped[stat.seasonYear].push(stat);
  });
  return Object.keys(grouped)
    .sort((a, b) => b - a) // newest first
    .map(year => ({ year, stats: grouped[year] }));
}

function PlayerDetail({ player, stats, onDelete, onDeleteStat, onEdit }) {
  if (!player) {
    return (
      <div id="main">
        <div className="empty-state">
          <p>⚾ Select a player to view their stats</p>
        </div>
      </div>
    );
  }

  const statsByYear = groupByYear(stats);

  return (
    <div id="main">

      {/* Player header */}
      <div className="player-header">
        <div className="player-header-left">
          {teamLogos[player.team] && (
            <img
              src={teamLogos[player.team]}
              alt={player.team}
              className="detail-logo"
            />
          )}
          <div>
            <h2>{player.firstName} {player.lastName}</h2>
            <p className="meta">{player.position} · {player.team} · Age {player.age}</p>
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-edit" onClick={onEdit}>Edit</button>
          <button className="btn btn-delete" onClick={() => onDelete(player.id)}>Delete</button>
        </div>
      </div>

      {/* Career stats */}
      <div id="stats-section">
        <h3>Career Stats</h3>

        {stats.length === 0 ? (
          <p className="no-stats">No stats recorded yet.</p>
        ) : (
          statsByYear.map(({ year, stats: yearStats }) => (
            <div key={year} className="season-block">
              <div className="season-label">{year}</div>
              <div className="stat-cards">
                {yearStats.map(stat => (
                  <div key={stat.id} className="stat-card">
                    <div className="stat-value">{formatStatValue(stat.statName, stat.statValue)}</div>
                    <div className="stat-name">{formatStatName(stat.statName)}</div>
                    <button
                      className="btn-delete-stat"
                      onClick={() => onDeleteStat(stat.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PlayerDetail;
