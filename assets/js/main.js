(function () {
  "use strict";
  var menu = document.querySelector("[data-mobile-menu]");

  if (menu) {
    var summary = menu.querySelector("summary");

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        summary.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });

    window.matchMedia("(min-width: 64rem)").addEventListener("change", function (event) {
      if (event.matches) menu.open = false;
    });
  }
  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-video-id]");
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();

    var params = new URLSearchParams({ autoplay: "1", rel: "0" });
    if (link.dataset.videoStart) params.set("start", link.dataset.videoStart);

    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(link.dataset.videoId) + "?" + params.toString();
    iframe.title = link.dataset.videoTitle || "YouTube video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    iframe.className = "absolute inset-0 size-full border-0";

    var frame = document.createElement("div");
    frame.className = "relative aspect-video bg-navy-950";
    frame.dataset.videoFrame = "";
    frame.appendChild(iframe);
    link.replaceWith(frame);
    iframe.focus();
  });
  document.querySelectorAll("[data-copy]").forEach(function (button) {
    if (!navigator.clipboard) return;
    button.hidden = false;
    var label = button.querySelector("span");
    var original = label.textContent;
    button.addEventListener("click", function () {
      navigator.clipboard.writeText(button.dataset.copy).then(function () {
        label.textContent = "Copied!";
        setTimeout(function () { label.textContent = original; }, 2000);
      });
    });
  });
})();
