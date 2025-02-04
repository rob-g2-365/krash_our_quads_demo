import {getGoggleTestData} from './goggles_info.js';

export function showFreqTable(){
  console.log(getGoggleTestData());
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
    <h2>Frequency Allocation Table</h2>
    <table>
      <tr>
        <th><b>Analog Channel</b></th>
        <th><b>User</b></th>
        <th><b>Platform</b></th>
      </tr>
      <tr>
        <td rowspan="2">1</td>
        <td>Rob</td>
        <td>Walksnail-Ch1</td>
      </tr>
      <tr>
        <td>Joe</td>
        <td>Analog-Ch1</td>
      </tr>
    </table>
  `;
}