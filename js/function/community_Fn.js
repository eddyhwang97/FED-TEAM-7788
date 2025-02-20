// community_fn JS

// ChangeTabContent s
function ChangeTabContent() {
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
}
//  ChangeTabContent e

// ToggleActiveFn s
function ToggleActiveFn(target) {
  if (target.length === 1) {
    target.addEventListener("click", () => {
      target.classList.toggle("active");
    });
  } else if (target.length > 1) {
    target.forEach((t) => {
      t.addEventListener("click", () => {
        t.classList.toggle("active");
      });
    });
  }
}
// ParentToggleActiveFn s
function ParentToggleActiveFn(target) {
  target.addEventListener("click", () => {
    target.parentElement.classList.toggle("active");
  });
}

export { ChangeTabContent, ToggleActiveFn, ParentToggleActiveFn };
