// community JS - community.js
import communityData from '../data/community_data.json' with {type:'json'};
import CommunityFn from "./function/community_Fn.js";
// console.log(communityData);
// set communityData in LocalStorage
localStorage.setItem("community_data", JSON.stringify(communityData));

// set communityFn
const cmFn = new CommunityFn();

// 대상
const searchBtn = document.querySelector(".search-button")
// tab-content map
const targetTab = document.querySelectorAll(".table>table");
const tabContent = `
    ${communityData
      .map((v,i) =>
        `
      <tr>
        <td>${i+1}</td>
        <td>
          <a href="">${v.title}</a>
        </td>
        <td>${v.date}</td>
        <td>${v.user}</td>
      </tr>
      `
      )
      .join("")}
  `;

console.log(targetTab)
targetTab.forEach((TT)=>{
TT.innerHTML = tabContent;
})

function boardFn(){
  let Data = [];
  cosnt
}






// start Fn
window.onload = () => {
  cmFn.ChangeTabContent();
  cmFn.ParentToggleActiveFn(searchBtn);
};
