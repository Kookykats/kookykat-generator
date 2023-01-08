const fs = require("fs");
const path = require("path");

const { incompatible, forcedCombinations, MAX_SUPPLY } = require("./constants");

const validateIncompatible = (attributes) => {
  const parentTraits = Object.keys(incompatible);
  for (const parentTrait of parentTraits) {
    const parentAttribute = attributes.find(
      (attr) => attr.value === parentTrait
    );
    if (!parentAttribute) continue;

    const childTraits = incompatible[parentTrait];
    for (const childTrait of childTraits) {
      const childAttribute = attributes.find(
        (attr) => attr.value === childTrait
      );
      if (childAttribute) return false;
    }
  }

  return true;
};

const validateForcedCombinations = (attributes) => {
  const parentTraits = Object.keys(forcedCombinations);
  for (const parentTrait of parentTraits) {
    const parentAttribute = attributes.find(
      (attr) => attr.value === parentTrait
    );
    if (!parentAttribute) continue;

    const childTraits = forcedCombinations[parentTrait];
    for (const childTrait of childTraits) {
      const childAttribute = attributes.find(
        (attr) => attr.trait_type === "Accessories"
      );
      if (childAttribute.value !== childTrait) return false
    }
  }

  return true;
};

const cleanMeta = (meta) => {
  // meta.attributes = meta.attributes.filter(attribute => attribute.value !== 'Accessories')
  delete meta["compiler"];
  return meta;
};

const main = () => {
  const rawData = fs.readFileSync(
    path.join(__dirname, `build/json/_metadata.json`)
  );
  const metadata = JSON.parse(rawData.toString());

  let isValidated = true;
  for (const meta of metadata) {
    const { attributes } = meta;
    if (!validateIncompatible(attributes)) {
      console.log("-----------Incompatible Failed-------------");
      console.log(meta);
      isValidated = false;
    }

    if (!validateForcedCombinations(attributes)) {
      console.log("===========Forced compatible failed==========");
      console.log(meta);
      isValidated = false;
    }
  }

  if (!isValidated) return;
  for (let i = 0; i < metadata.length; i++) {
    metadata[i] = cleanMeta(metadata[i]);
  }
  fs.writeFileSync(
    path.join(__dirname, `build/json/_metadata.json`),
    JSON.stringify(metadata, null, 2)
  );

  for (let i = 1; i <= MAX_SUPPLY; i++) {
    const rawData = fs.readFileSync(
      path.join(__dirname, `build/json/${i}.json`)
    );
    const meta = JSON.parse(rawData.toString());

    fs.writeFileSync(
      path.join(__dirname, `build/json/${i}.json`),
      JSON.stringify(cleanMeta(meta), null, 2)
    );
  }
};

main();
