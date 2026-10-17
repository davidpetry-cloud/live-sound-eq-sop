// Runs before first paint so the page never flashes the wrong theme.
// A saved choice wins; otherwise the device's light/dark setting decides.
// The choice lives only in this browser's storage and is never sent anywhere.
(function () {
  var saved = null;
  try { saved = localStorage.getItem("eq-sop-theme"); } catch (e) {}
  var mode = saved === "light" || saved === "dark"
    ? saved
    : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.setAttribute("data-mode", mode);
})();
