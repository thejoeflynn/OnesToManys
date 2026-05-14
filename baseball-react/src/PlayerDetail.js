// PlayerDetail renders the right panel showing a player's info and stats.
// Props it receives from App.js:
//   - player: the selected player object
//   - stats: array of stat entries for that player
//   - onDelete: function to call when Delete Player is clicked
//   - onDeleteStat: function to call when a stat's Delete button is clicked

function PlayerDetail({ player, stats, onDelete, onDeleteStat }) {
  // If no player is selected yet, show a placeholder message
  if (!player) {
    return (
      <div id="main">
        <p className="placeholder">Select a player to view their stats.</p>
      </div>
    );
  }

  return (
    <div id="main">
      <h2>{player.firstName} {player.lastName}</h2>
      <p className="meta">{player.position} · {player.team} · Age {player.age}</p>

      <div className="action-buttons">
        <button className="btn btn-delete" onClick={() => onDelete(player.id)}>
          Delete Player
        </button>
      </div>

      <div id="stats-section">
        <h3>Career Stats</h3>

        {/* If there are no stats, show a message. Otherwise show the table. */}
        {stats.length === 0 ? (
          <p className="placeholder">No stats yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Season</th>
                <th>Stat</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stats.map(stat => (
                <tr key={stat.id}>
                  <td>{stat.seasonYear}</td>
                  <td>{stat.statName}</td>
                  <td>{stat.statValue}</td>
                  <td>
                    <button
                      className="btn-delete-stat"
                      onClick={() => onDeleteStat(stat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PlayerDetail;
