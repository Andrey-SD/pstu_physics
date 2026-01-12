// --------------------------------------------
//  ——— Зміна літер у описі як у реченнях. ——— 
//----------------------------------------------


// --------------------------------------------
//  ——— Некоректна поведынка алгоритма для власних назв ——— 
//------------------------------------------
/*function sentenceCase(text) {
  text = text.trim();
  if (!/[.!?]$/.test(text)) {
    text += ".";
  }

  let result = "";
  let capitalizeNext = true;

  for (const letter of text) {
    if (/^\p{L}$/u.test(letter)) {
      if (capitalizeNext) {
        result += letter.toUpperCase();
        capitalizeNext = false;
      } else {
        result += letter.toLowerCase();
      }
    } else {
      result += letter;
      if (letter === "." || letter === "!" || letter === "?") {
        capitalizeNext = true;
      }
    }
  }

  return result;
}

document.querySelectorAll(".lab-item__desc").forEach(span => {
  if (span.textContent.trim() !== "") {
    span.textContent = sentenceCase(span.textContent.trim());
  }
});
*/

//------------------------------
// ——— Копіювання посилання ———
//------------------------------

const toast = document.getElementById("copyToast");

function showPopup(text, isError = false) {
  const toast = document.getElementById("copyToast");

  toast.textContent = text;
  toast.classList.add("is-visible");
  toast.classList.toggle("is-error", isError);

  setTimeout(() => {
    toast.classList.remove("is-visible", "is-error");
  }, 2000);
}

document.querySelectorAll(".lab-item__copy").forEach(button => {
  button.addEventListener("click", async () => {
    const link = button.closest(".lab-item").querySelector(".lab-item__link");
    const fullUrl = new URL(link.getAttribute("href"), location.href).href;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        fallbackCopy(fullUrl);
      }

      showPopup("посилання скопійовано");
    } catch (err) {
      showPopup("Помилка копіювання");
      console.error(err);
    }
  });
});

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();

  const success = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!success) {
    throw new Error("Fallback copy failed");
  }
}



