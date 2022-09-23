/* eslint-disable camelcase */
const csvtojson = require('csvtojson');
const axios = require('axios').default;
// const fs = require('fs');

function convertToArrayOfObjects(array) {
  const cols = array.shift();

  const result = array.map(el => {
    const obj = {};
    cols.forEach((col, i) => (obj[col] = el[i]));
    return obj;
  });

  result.columns = cols;
  return result;
}

// TODO: get data > convert to array of objects > add other fields (name, section, etc.) > write to csv
async function getVisData(id) {
  const vis_data = await axios.get(
    `https://public.flourish.studio/visualisation/${id}/visualisation.json`
  );
  return vis_data;
}

async function main() {
  const base_data = await csvtojson().fromFile('data/in/Retirement-IDs.csv');

  for (const row of base_data) {
    const vis_data = await getVisData(row.id);
    const data_of_first_object = Object.values(vis_data.data.data)[0];
    const vis_data_objects = convertToArrayOfObjects(data_of_first_object);
    const final_data = vis_data_objects.map(d => ({
      ...d,
      chart_question: row.question,
      chart_section: row.section,
      chart_name: row.name,
      chart_id: row.id,
    }));
    console.log(final_data);
  }

  // const ids = base_data.map(d => d.id);

  // for (const id of ids) {
  //   const vis_data = await getVisData(id);

  // }
}

main();
