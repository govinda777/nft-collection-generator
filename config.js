const config = {};

config.DEFAULT_IMAGES_PATH = "./images/";
config.DEFAULT_METADATA_PATH = "./metadata/";
config.DEFAULT_HASHES_PATH = "./hashes/";

// UPDATE THESE CONSTANTS BELOW WITH YOUR VALUES
config.GIF_FRAMES = 10;
config.IMAGES_BASE_URI = "https://base-uri-to-my-nft-images.com/";
config.IMAGES_HEIGHT = 350;
config.IMAGES_WIDTH = 350;
config.TOKEN_NAME_PREFIX = "Amazonia Crypto Animal #";
config.TOKEN_DESCRIPTION = "A collection of unique crypto animals from the Amazon rainforest.";
config.TOTAL_TOKENS = 5;

// UPDATE THIS ARRAY BELOW WITH YOUR TRAITS LIST
config.ORDERED_TRAITS_LIST = [
  {
    type: "Background",
    options: [
      {
        image: "./traits/background/forest.png",
        value: "Forest",
        weight: 1,
      },
    ],
  },
  {
    type: "Animal",
    options: [
      {
        image: "./traits/animal/jaguar.png",
        value: "Jaguar",
        weight: 1,
      },
      {
        image: "./traits/animal/capybara.png",
        value: "Capybara",
        weight: 1,
      },
    ],
  },
  {
    type: "Headwear",
    options: [
      {
        image: "./traits/headwear/leaf-hat.png",
        value: "Leaf Hat",
        weight: 1,
      },
      {
        image: "./traits/headwear/flower-crown.png",
        value: "Flower Crown",
        weight: 1,
      },
      {
        weight: 1,
      },
    ],
  },
];

module.exports = config;