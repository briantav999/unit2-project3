const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  height: Number,
  canShoot: Boolean,
  position: String,
  shootingHand: String,
  jerseyNumber: Number,
});
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;