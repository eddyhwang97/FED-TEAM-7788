// community_fn.jsx
import $ from "jquery";
window.$ = $;

// ChangeTabContent s

$(() => {
  const $faqToggleList = $('#faq-tab .list');

  $faqToggleList.on({
    click: function () {
      $(this).toggleClass('active');
    }
  })
  
});
