/* eslint-disable camelcase */
const csvtojson = require('csvtojson');
const axios = require('axios').default;
// const fs = require('fs');

// async function getData(id) {
//   const vis_data = await axios.get(
//     `https://public.flourish.studio/visualisation/${id}/visualisation.json`
//   );
//   fs.writeFileSync(`data/out/${id}.json`, JSON.stringify(vis_data.data));
// }

// TODO: get data > convert to array of objects > add other fields (name, section, etc.) > write to csv
async function getDataTest(id) {
  const vis_data = await axios.get(
    `https://public.flourish.studio/visualisation/${id}/visualisation.json`
  );
  console.log(vis_data.data);
}

async function main() {
  const data = await csvtojson().fromFile('data/in/Retirement-IDs.csv');

  const ids = data.map(d => d.id);

  for (const id of ids) {
    await getDataTest(id);
  }
}

main();
