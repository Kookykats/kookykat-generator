const fs = require("fs");
const path = require("path");

const { MAX_SUPPLY, IMAGE_IPFS } = require("./constants");

const release = (fileName) => {
  const rawData = fs.readFileSync(
    path.join(__dirname, `build/json/${fileName}.json`)
  );

  const meta = JSON.parse(rawData.toString());
  meta.image = meta.image.replace(
    "NewUriToReplace",
    IMAGE_IPFS
  );
  meta.description = 'They call us the Kooky Kats. We are 8000 unique cats who have been abandoned and need a new owner. Life in the streets is rough, we have lived through countless hardships and every day is a struggle to survive. After many close escapes and perilous journeys, we have finally arrived in the great world of Web3. The no.1 thing we have learned is that we must come together as a family, and look forward to a bright future.'
  meta.compiler && delete meta.compiler;

  fs.writeFileSync(
    path.join(__dirname, `release/${fileName}`),
    JSON.stringify(meta, null, 2)
  );
};

const main = () => {
  for (let i = 1; i <= MAX_SUPPLY; i++) {
    release(i);
  }

  release('placeholder')
};

main();
