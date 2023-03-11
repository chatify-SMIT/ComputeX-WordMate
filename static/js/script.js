let checkbuttons = document.querySelectorAll(".check-button");
let editor = document.getElementById("text-editor");

document.body.addEventListener("click", function () {
  editor.focus();
});

const initializer = () => {
  highlighter(checkbuttons, false);
};
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};


checkbuttons.forEach((button) => {
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
    button.classList.toggle("active",isActive);
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
