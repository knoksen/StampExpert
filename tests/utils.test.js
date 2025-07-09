const { getRarityClass } = require('../src/utils');

test('returns correct class for known rarity', () => {
  expect(getRarityClass('rare')).toBe('bg-purple-100 text-purple-800');
});

test('falls back to default class for unknown rarity', () => {
  expect(getRarityClass('mythic')).toBe('bg-gray-100 text-gray-800');
});
