// community JS - community.js
import communityData from '../data/community_data.json' with {type:'json'};
import CommunityFn from "./function/community_Fn.js";
// console.log(communityData);
// set communityData in LocalStorage
localStorage.setItem("community_data", JSON.stringify(communityData));

// set communityFn
const cmFn = new CommunityFn();

// 대상
// tab-content map
const targetTab1 = document.querySelector("#announcement-tab>ul");
const targetTab2 = document.querySelector("#faq-tab>ul");
const targetTab3 = document.querySelector("#freeboard-tab>ul");


const tabContent1 = `
  ${communityData.filter(x => x.type === 'announcement').sort((a,b)=>a.date==b.date?0:a.date>b.date?-1:1)
    .map((v, i) =>
      `
    <li class="list">
      <div class="list-header">
        <p class="list-num">${i + 1}</p>
        <p class="list-title">${v.title}</p>
        <p class="list-date">${v.date}</p>
        <p class="list-user">${v.user}</p>
        <i class="fa-solid fa-chevron-up fa-flip-vertical"></i>
      </div>
      <div class="list-info">
        <strong>${v.content}</strong>
      </div>
    </li>
    `
    )
    .join("")}
  `;
const tabContent2 = `
  ${communityData.filter(x => x.type === 'faq').sort((a,b)=>a.date==b.date?0:a.date>b.date?-1:1)
    .map((v, i) =>
      `
    <li class="list">
      <div class="list-header">
        <p class="list-num">${i + 1}</p>
        <p class="list-title">${v.title}</p>
        <p class="list-date">${v.date}</p>
        <p class="list-user">${v.user}</p>
        <i class="fa-solid fa-chevron-up fa-flip-vertical"></i>
      </div>
      <div class="list-info">
        <strong>${v.content}</strong>
      </div>
    </li>
    `
    )
    .join("")}
  `;
const tabContent3 = `
  ${communityData.filter(x => x.type === 'freeboard').sort((a,b)=>a.date==b.date?0:a.date>b.date?-1:1)
    .map((v, i) =>
      `
    <li class="list">
      <div class="list-header">
        <p class="list-num">${i + 1}</p>
        <p class="list-title">${v.title}</p>
        <p class="list-date">${v.date}</p>
        <p class="list-user">${v.user}</p>
        <i class="fa-solid fa-chevron-up fa-flip-vertical"></i>
      </div>
      <div class="list-info">
        <strong>${v.content}</strong>
      </div>
    </li>
    `
    )
    .join("")}
  `;

  // start Fn
  window.onload = () => {
    
    targetTab1.innerHTML = tabContent1;
    targetTab2.innerHTML = tabContent2;
    targetTab3.innerHTML = tabContent3;
    const list = document.querySelectorAll(".list");
    const writeBtn = document.querySelector('.write-btn')

  cmFn.ChangeTabContent();
  cmFn.ToggleActiveFn(list);
  cmFn.ParentToggleActiveFn(writeBtn);
};
