import { useState, useEffect } from 'react';

// EditPlayerModal shows a form pre-filled with the player's current data.
// Props:
//   - player: the player object to edit
//   - onSave: function to call with the updated data when the form is submitted
//   - onClose: function to call when Cancel is clicked

function EditPlayerModal({ player, onSave, onClose }) {
  // Pre-fill the form fields with the player's current values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    team: '',
    age: ''
  });

  // When the player prop changes, update the form fields
  useEffect(() => {
    if (player) {
      setFormData({
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
        team: player.team,
        age: player.age
      });
    }
  }, [player]);

  // Update a single field in formData when the user types
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...formData, age: parseInt(formData.age) });
  }

  return (
    <div id="modal">
      <div id="modal-content">
        <h3>Edit Player</h3>
        <form onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
          <input name="team" placeholder="Team" value={formData.team} onChange={handleChange} />
          <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} />
          <div id="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPlayerModal;
