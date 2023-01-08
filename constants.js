/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */
const incompatible = {
  "Angel Wings": ["Blue Tee", "Gold Armour", "Green Rags", "Grey Tee", "Kooky Shirt", "Pink Tee", "Purple Rags", "Skull Jacket", "Wifebeater", "Yellow Tree", ],
  "Cosmic": ["Mowhawk"], 
  "Skull Jacket": ["Scepter"],
  Headband: ["Earrings"],
  Ribbon: ["Earrings"],
  Watermelon: ["Earrings"],
};

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */
const forcedCombinations = {
  "Angel Wings": ["No Accessory"],
  "Gold Armour": ["No Accessory"],
};

const MAX_SUPPLY = 8000

const IMAGE_IPFS = 'QmUpvhcZ8UJZLqFAZqLqUhWHq5upjdMfz3o1c1d453uj3Q'

module.exports = {
  incompatible,
  forcedCombinations,
  MAX_SUPPLY,
  IMAGE_IPFS,
}
