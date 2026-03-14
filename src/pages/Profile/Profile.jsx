// src/pages/Profile/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Initial profile data (later load from auth / backend / localStorage)
  const [profile, setProfile] = useState({
    name: "Noshin Syara",
    email: "noshin.syara@example.com",
    university: "Begum Rokeya University, Rangpur",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    hall: "Begum Rokeya Hall",
    age: 21,
    bio: "I love late-night study sessions with tea and cozy blankets 🧸\nHoping to find a calm & understanding roomie who also loves anime and good food ♡",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Noshin&backgroundColor=b6e3f4",
    preferences: {
      cleanliness: 8,
      sleep: 6,
      noise: 7,
      guests: 4,
      sharing: 7,
      conflict: 9,
      pets: 5,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: Number(value) },
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully! ♡ Your new vibe is saved~");
    // Later: send to backend, update context, etc.
  };

  const handleAvatarChange = (e) => {
    // In real app: upload image to server / cloudinary
    alert("Avatar upload coming soon! For now it's just cute placeholder avatars ♡");
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">Your Profile ♡</h1>
        <p className="subtitle">This is how your future roomie will see you~</p>

        <div className="profile-card">
          {/* Avatar + Basic Info */}
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img
                src={profile.avatar}
                alt="Your avatar"
                className="avatar-img"
              />
              {isEditing && (
                <button className="change-avatar-btn" onClick={handleAvatarChange}>
                  Change Avatar ✏️
                </button>
              )}
            </div>

            <div className="basic-info">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="edit-input name-input"
                  placeholder="Your name"
                />
              ) : (
                <h2 className="profile-name">{profile.name}</h2>
              )}

              <div className="profile-meta">
                <span>Age: {profile.age}</span>
                <span>•</span>
                <span>{profile.university}</span>
                <span>•</span>
                <span>{profile.hall}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bio-section">
            <h3 className="section-title">About Me</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="bio-textarea"
                rows={4}
                placeholder="Tell future roomies about yourself ♡"
              />
            ) : (
              <p className="bio-text">{profile.bio}</p>
            )}
          </div>

          {/* Personal Details */}
          <div className="personal-details">
            <h3 className="section-title">Personal Info</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">{profile.email}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Department</div>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                    className="edit-input"
                  />
                ) : (
                  <div className="info-value">{profile.department}</div>
                )}
              </div>
              <div className="info-item">
                <div className="info-label">Year</div>
                {isEditing ? (
                  <input
                    type="text"
                    name="year"
                    value={profile.year}
                    onChange={handleChange}
                    className="edit-input"
                  />
                ) : (
                  <div className="info-value">{profile.year}</div>
                )}
              </div>
            </div>
          </div>

          {/* Roomie Preferences */}
          <div className="preferences-section">
            <h3 className="section-title">Your Roomie Preferences</h3>
            <div className="preferences-grid">
              {Object.entries(profile.preferences).map(([key, value]) => (
                <div key={key} className="preference-item">
                  <div className="pref-label">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {isEditing ? (
                    <select
                      value={value}
                      onChange={(e) => handlePreferenceChange(key, e.target.value)}
                      className="pref-select"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}/10
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="pref-score">{value}/10</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>
                  Save My Changes ♡
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile ✏️
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;