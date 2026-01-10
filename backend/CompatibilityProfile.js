// backend/src/models/CompatibilityProfile.js

// Mock data array to simulate database
let compatibilityProfiles = [
  {
    id: 1,
    userName: "Alice",
    email: "alice@example.com",
    sleepTime: "Night Owl",
    noiseTolerance: "Moderate",
    cleanliness: "Relaxed",
    compatibilityScore: 85,
    personalityLabel: "Gentle Night Owl",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userName: "Bob",
    email: "bob@example.com",
    sleepTime: "Early Bird",
    noiseTolerance: "Sensitive",
    cleanliness: "Strict",
    compatibilityScore: 70,
    personalityLabel: "Organized Early Riser",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to get all profiles
function getAllProfiles() {
  return compatibilityProfiles;
}

// Function to add a new profile
function addProfile(profile) {
  const newProfile = {
    id: compatibilityProfiles.length + 1,
    ...profile,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  compatibilityProfiles.push(newProfile);
  return newProfile;
}

// Export the mock data functions
module.exports = {
  getAllProfiles,
  addProfile,
};
