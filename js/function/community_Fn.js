// community_fn JS
export default function CommunityFn() {
  // ChangeTabContent s
  this.ChangeTabContent = function () {
    const tabs = document.querySelectorAll("[data-tab-target]");
    const tabcon = document.querySelectorAll("[data-tab-content]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabs.forEach((tab_all) => {
          tab_all.classList.remove("active");
        });
        tabcon.forEach((tabc_all) => {
          tabc_all.classList.remove("active");
        });
        target.classList.add("active");
        tab.classList.add("active");
      });
    });
  };
  //  ChangeTabContent e

  // ToggleActiveFn s
  this.ToggleActiveFn = function(target){
    if(target.length ===1){
      target.addEventListener("click",()=>{
      target.classList.toggle("active");
    })
    }
    else if(target.length >1){
      target.forEach((t)=>{
        t.addEventListener("click",()=>{
        t.classList.toggle("active");
      })
      })
    }
    
  }
  // ParentToggleActiveFn s
  this.ParentToggleActiveFn = function(target){
    target.addEventListener("click",()=>{
      target.parentElement.classList.toggle("active");
    })
  }
}


