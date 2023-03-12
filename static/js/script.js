let checkbuttons = document.querySelectorAll(".check-button");
let alignbuttons = document.querySelectorAll(".align-button");
let clipbuttons = document.querySelectorAll(".clip-button");
let urbuttons = document.querySelectorAll(".ur-button");
let clipoddbuttons = document.querySelectorAll(".clip-odd-button");

let editor = document.getElementById("text-editor");

document.body.addEventListener("click", function () {
  editor.focus();
});

const initializer = () => {
  highlighter(checkbuttons, false);
  highlighter(alignbuttons, true);
  
};


const modifyText = (command, defaultUi, value) => {

  document.execCommand(command, defaultUi, value);
};

const modifyText2 = (command) => {
    document.execCommand(command);
};

clipoddbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    editor.focus();
    editor.dispatchEvent(new Event("paste", { bubbles: true }));
  });
});
editor.addEventListener("paste", async (event) => {
  event.preventDefault();
  const text = await navigator.clipboard.readText();
  document.execCommand("insertHTML", false, text);
});

urbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    document.execCommand(button.id);
  });
});



checkbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});



clipbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText2(button.id);
  });
});




alignbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = document.queryCommandState(button.id);
      console.log(button.id);
      console.log(isActive);
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className,isActive);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active",isActive);
      }
    });
  });
};

const highlighterRemover = (className,isActive) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};






const checks = () => {
  checkbuttons.forEach((button) => {
    const isActive = document.queryCommandState(button.id);
    button.classList.toggle("active", isActive);
  });

};


editor.addEventListener("mouseup", checks);
editor.addEventListener("keyup", checks);


window.onload = initializer();
