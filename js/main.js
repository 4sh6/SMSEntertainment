// Paste the Web app URL from your Google Apps Script deployment here.
// See google-apps-script.gs for the script and deployment steps.
var GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyxKm6F-8CYhoCuPNPWCFgZ08dt2QMeElKSUT35rVuEEY3R2m5_BCSG88nU8T38ct7F/exec";

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".menu-toggle");
  var links = document.querySelector("nav.links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // Contact form -> Google Sheet submission
  var form = document.querySelector(".contact-form");
  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var successBox = document.querySelector(".form-success");
    var errorBox = document.querySelector(".form-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var phone = form.querySelector("#phone").value.trim();
      var company = form.querySelector("#company").value.trim();
      var website = form.querySelector("#website").value.trim();
      var interest = form.querySelector("#interest").value;
      var message = form.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        return;
      }

      if (successBox) successBox.style.display = "none";
      if (errorBox) errorBox.style.display = "none";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          company: company,
          website: website,
          interest: interest,
          message: message
        })
      })
        .then(function () {
          if (successBox) successBox.style.display = "block";
          form.reset();
        })
        .catch(function () {
          if (errorBox) errorBox.style.display = "block";
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Enquiry";
          }
        });
    });
  }
});
