import fs from "fs";

const config = {
  name: "modular",
  ext: ".jpg",
  url: "https://res.insta360.com/dynamic/www/oners_1inch/HQ/Modular/{seq}.jpg",
  start: 1,
  end: 306,
};

if (fs.existsSync(`./images/${config.name}`)) {
  fs.rmSync(`./images/${config.name}`, { recursive: true });
}
fs.mkdirSync(`./images/${config.name}`);

let successIndex = [];

for (let i = config.start; i <= config.end; i++) {
  try {
    const data = await fetch(config.url.replace("{seq}", i));
    const buffer = await data.arrayBuffer();
    fs.writeFileSync(`./images/${config.name}/${i}.jpg`, Buffer.from(buffer));
    console.log(`Download ${i} success`);
    successIndex.push(i);
  } catch (error) {
    console.log(`Download ${i} error: ${error.message}`);
  }
}

fs.writeFileSync(
  `./images/${config.name}/config.json`,
  JSON.stringify(successIndex.map((i) => `${i}.jpg`))
);
