"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// see src/blendMode.js for available blend modes
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");
const prerevealDir = path.join(basePath, "/prereveal");

const { incompatible, forcedCombinations, MAX_SUPPLY } = require('../constants')

/*********************
 * General Generator Options
 ***********************/

const description =
  "This is the description of your NFT project, remember to replace this";
const PrerevealDescription =
  "This is the description of your unrevealed NFT project, remember to replace this";
const baseUri = "ipfs://NewUriToReplace";
const prerevealBaseUri = "ipfs://NewPrerevealUriToReplace";

const outputJPEG = false; // if false, the generator outputs png's

/**
 * Set your tokenID index start number.
 * ⚠️ Be sure it matches your smart contract!
 */
const startIndex = 1;

const format = {
  width: 600,
  height: 600,
  smoothing: true,
};

const background = {
  generate: true,
  brightness: "100%",
  static: false,
  default: "#000000",
};

const layerConfigurations = [
  {
    growEditionSizeTo: MAX_SUPPLY,
    namePrefix: "KookyKats",
    layersOrder: [
      { name: "Background", },
      { name: "Wings" },
      { name: "Fur Color" },
      { name: "Clothes" },
      { name: "Eyes" },
      { name: "Mouth" },
      { name: "Hats" },
      { name: "Accessories" },
    ],
  },
];

const backgroundMapping = {
  "Backyard": "Cabin",
  "Rainbow": "Colorful",
  "Blue": "Cozy",
  "City": "Dark",
  "Space": "Void",
  default: "Party"
}

/**
 * Set to true for when using multiple layersOrder configuration
 * and you would like to shuffle all the artwork together
 */
const shuffleLayerConfigurations = false;

const debugLogs = true;

/*********************
 * Advanced Generator Options
 ***********************/

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "NONE";

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {};

const extraMetadata = {};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

// Outputs an Keccack256 hash for the image. Required for provenance hash
const hashImages = true;

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  background,
  baseUri,
  prerevealBaseUri,
  buildDir,
  debugLogs,
  description,
  PrerevealDescription,
  emptyLayerName,
  extraAttributes,
  extraMetadata,
  forcedCombinations,
  format,
  hashImages,
  incompatible,
  layerConfigurations,
  layersDir,
  outputJPEG,
  preview,
  preview_gif,
  rarityDelimiter,
  shuffleLayerConfigurations,
  startIndex,
  traitValueOverrides,
  uniqueDnaTorrance,
  useRootTraitType,
  prerevealDir,
  backgroundMapping
};
