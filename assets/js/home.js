/* Homepage: copy a publication's BibTeX when its "BibTeX" button is clicked. */
(function () {
  "use strict";
  var buttons = document.querySelectorAll(".bib");
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.nextElementSibling;
      var text = pre ? pre.textContent.trim() : "";
      if (!text) return;
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "BibTeX"; }, 1600);
      };
      var fallback = function () {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { btn.textContent = "Copy failed"; }
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  });
})();
