let checkbuttons = document.querySelectorAll(".check-button");
let alignbuttons = document.querySelectorAll(".align-button");
let clipbuttons = document.querySelectorAll(".clip-button");
let urbuttons = document.querySelectorAll(".ur-button");
let clipoddbuttons = document.querySelectorAll(".clip-odd-button");
let spacebuttons = document.querySelectorAll(".space-button");
let advancedOptionButton = document.querySelectorAll(".advancedOptionButton");
let editor = document.getElementById("text-editor");


advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});



  document.getElementById("borders").addEventListener("click", () => {
    var selection = window.getSelection(); /* get the current selection */
    var range = selection.getRangeAt(0); /* get the range of the current selection */

    var selectedText = range.cloneContents(); /* get the selected text */
    var span = document.createElement("span"); /* create a new span element */
    span.appendChild(selectedText); /* add the selected text to the span */
    span.classList.add("myclass"); /* add the class to the span */
  
    range.deleteContents(); /* delete the selected text */
    range.insertNode(span); /* insert the span in its place */
  
    selection.removeAllRanges(); /* clear the selection */
  
    editor.focus();
  });


const contentWrapper = document.querySelector(".cont");
const zoomRange = document.getElementById("zoom-range");
const minus =document.getElementById("minus");
const plus =document.getElementById("plus");

function zooming() {
  const zoomLevel = zoomRange.value / 100;
  const maxZoomLevel = 1.85; // maximum zoom level of 185%
  const zoomedMarginBottom = (zoomLevel * 100) + 50; // calculate margin bottom based on zoom level
  const marginBottom = Math.min(zoomedMarginBottom, (maxZoomLevel * 100) + 50); // set minimum and maximum margin bottom
  contentWrapper.classList.add("zoomed");
  contentWrapper.style.transform = `scale(${zoomLevel})`;
  console.log(marginBottom);
  document.querySelector(".cont").style.marginBottom = `${marginBottom}px`;
}

contentWrapper.addEventListener("scroll", () => {
  if (contentWrapper.classList.contains("zoomed")) {
    contentWrapper.classList.remove("zoomed");
    contentWrapper.style.transform = "none";
    zoomRange.value = 100;
  }
});
zoomRange.addEventListener("input", zooming);
zoomRange.addEventListener("input", () => {

    document.getElementById("range-percent").innerHTML = zoomRange.value;
 
  });


  plus.addEventListener("click", () => {

    zoomRange.value = parseInt(zoomRange.value) + 1;
    document.getElementById("range-percent").innerHTML = zoomRange.value;
    zooming();
  });

  minus.addEventListener("click", () => {

    zoomRange.value = parseInt(zoomRange.value) - 1;
    document.getElementById("range-percent").innerHTML = zoomRange.value;
    zooming();
  });









  document.body.addEventListener('click', function(event) {

  
    // Check if the click event target is the particular div or one of its children
    if (!editor.contains(event.target)) {
      // Your code here
      editor.focus();

    
    }
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
  document.execCommand("insertText", false, text);
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

spacebuttons.forEach((button) => {
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
editor.addEventListener('input', function () {
  var text = this.innerText;
  var text2 = this.innerHTML;
   console.log(text2);
  count_words = text.trim().replace(/[\s\n]+/g, ' ').split(' ').length;
  count_lines  = text2.split(/<div>|<\/div>/).filter(function(line) {
    return line.trim() !== '';
  }).length;
  document.getElementById('lines').innerHTML=count_lines;
  document.getElementById('words').innerHTML=count_words;

});























function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
document.getElementById('fullscreens').addEventListener("click", toggleFullScreen);
