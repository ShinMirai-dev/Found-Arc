/* Found-Ark media inputs and local demo authentication. */
(function () {
  const $ = (id) => document.getElementById(id);
  let authMode = "login";

  function initMediaControls() {
    const mediaControls = $("mediaControls");
    const source = $("mediaSource");
    const upload = $("mediaUpload");
    if (!mediaControls || !source || !upload) return;

    function selectedMedia() {
      const selected = window.Builder && Builder.state && Builder.state.selected;
      return selected && (selected.tagName === "IMG" || selected.tagName === "VIDEO") ? selected : null;
    }
    function updateVisibility() {
      const selected = window.Builder && Builder.state && Builder.state.selected;
      const isMedia = !!selected && (selected.tagName === "IMG" || selected.tagName === "VIDEO");
      mediaControls.hidden = !isMedia;
      if (isMedia) source.value = selected.currentSrc && !selected.currentSrc.startsWith("blob:") ? selected.getAttribute("src") || "" : selected.getAttribute("src") || "";
    }
    source.addEventListener("change", () => {
      const el = selectedMedia();
      if (!el || !source.value.trim()) return;
      el.src = source.value.trim();
      if (el.tagName === "VIDEO") { el.controls = true; el.load(); }
      if (window.Builder && Builder.updateCode) Builder.updateCode();
    });
    upload.addEventListener("change", () => {
      const el = selectedMedia();
      const file = upload.files && upload.files[0];
      if (!el || !file) return;
      if (el.tagName === "IMG" && !file.type.startsWith("image/")) { alert("Please choose an image file for an image element."); return; }
      if (el.tagName === "VIDEO" && !file.type.startsWith("video/")) { alert("Please choose a video file for a video element."); return; }
      const reader = new FileReader();
      reader.onload = () => {
        el.src = String(reader.result);
        if (el.tagName === "VIDEO") { el.controls = true; el.load(); }
        source.value = "";
        if (window.Builder && Builder.updateCode) Builder.updateCode();
      };
      reader.readAsDataURL(file);
    });
    document.addEventListener("click", () => setTimeout(updateVisibility, 0));
    document.addEventListener("input", (event) => {
      if (event.target && (event.target.id === "elementWidth" || event.target.id === "elementHeight")) {
        const selected = window.Builder && Builder.state && Builder.state.selected;
        if (selected && (selected.tagName === "IMG" || selected.tagName === "VIDEO")) updateVisibility();
      }
    });
    const observer = new MutationObserver(updateVisibility);
    const canvas = $("canvas");
    if (canvas) observer.observe(canvas, {subtree:true, attributes:true, attributeFilter:["data-selected"]});
    updateVisibility();
    setInterval(updateVisibility, 500);
  }

  function initAuth() {
    const overlay = $("authOverlay"), form = $("authForm"), username = $("authUsername"), password = $("authPassword");
    if (!overlay || !form) return;
    const sessionKey = "foundArkDemoSession";
    const usersKey = "foundArkDemoUsers";
    if (localStorage.getItem(sessionKey)) overlay.hidden = true;
    function setMode(mode) {
      authMode = mode;
      document.querySelectorAll("[data-auth-mode]").forEach(btn => btn.classList.toggle("active", btn.dataset.authMode === mode));
      $("authSubmit").textContent = mode === "login" ? "Login" : "Create account";
      $("authIntro").textContent = mode === "login" ? "Sign in to continue" : "Create an account with a username and password";
      $("authMessage").textContent = "";
      password.autocomplete = mode === "login" ? "current-password" : "new-password";
    }
    document.querySelectorAll("[data-auth-mode]").forEach(btn => btn.addEventListener("click", () => setMode(btn.dataset.authMode)));
    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = username.value.trim();
      const pass = password.value;
      if (name.length < 3 || pass.length < 4) { $("authMessage").textContent = "Use a username of at least 3 characters and a password of at least 4 characters."; return; }
      let users = {};
      try { users = JSON.parse(localStorage.getItem(usersKey) || "{}"); } catch (_) { users = {}; }
      if (authMode === "signup") {
        if (users[name]) { $("authMessage").textContent = "That username already exists in this browser."; return; }
        users[name] = pass;
        localStorage.setItem(usersKey, JSON.stringify(users));
        localStorage.setItem(sessionKey, name);
        overlay.hidden = true;
      } else {
        if (!users[name] || users[name] !== pass) { $("authMessage").textContent = "Incorrect username or password, or account not created yet."; return; }
        localStorage.setItem(sessionKey, name);
        overlay.hidden = true;
      }
    });
    setMode("login");
  }

  function start() { initMediaControls(); initAuth(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true}); else start();
})();
