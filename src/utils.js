function getRarityClass(rarity) {
  const classes = {
    common: 'bg-green-100 text-green-800',
    uncommon: 'bg-blue-100 text-blue-800',
    rare: 'bg-purple-100 text-purple-800',
    'ultra-rare': 'bg-pink-100 text-pink-800',
    legendary: 'bg-yellow-100 text-yellow-800'
  };
  return classes[rarity] || 'bg-gray-100 text-gray-800';
}

module.exports = { getRarityClass };
