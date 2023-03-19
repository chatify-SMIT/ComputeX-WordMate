let checkbuttons = document.querySelectorAll(".check-button");
let alignbuttons = document.querySelectorAll(".align-button");
let clipbuttons = document.querySelectorAll(".clip-button");
let urbuttons = document.querySelectorAll(".ur-button");
let clipoddbuttons = document.querySelectorAll(".clip-odd-button");
let spacebuttons = document.querySelectorAll(".space-button");
let advancedOptionButton = document.querySelectorAll(".advancedOptionButton");
let fontName = document.getElementById("fontName");
let editor = document.getElementById("text-editor");

const editorContent = document.getElementById('text-editor').innerHTML;
let sizeno = document.getElementById("fontSize");
let fontList = ["Arial", "Helvetica"," Verdana", "Calibri"," Noto"," Lucida Sans", "Gill Sans", "Century Gothic"," Candara", "Futara", "Franklin Gothic Medium", "Trebuchet MS"," Geneva"," Segoe UI","Optima", "Avanta Garde","Times New Roman"," Big Caslon", "Bodoni MT"," Book Antiqua", "Bookman", "c", "Calisto MT", "Cambria", "Didot", "Garamond ","Georgia"," Goudy Old Style", "Hoefler Text", "Lucida Bright", "Palatino", "Perpetua", "Rockwell", "Rockwell Extra Bold", "Baskerville","Consolas"," Courier"," Courier New", "Lucida Console", "Lucidatypewriter", "Lucida Sans Typewriter", "Monaco", "Andale Mono","Comic Sans", "Comic Sans MS", "Apple Chancery", "Bradley Hand"," Brush Script MT" ,"Brush Script Std ","URW Chancery ", "Coronet script","Florence","Parkavenue","Impact"," Brushstroke", "Luminari"," Chalkduster", "Jazz LET"," Blippo", "Stencil Std", "Marker Felt", "Trattatello" ,"Arnoldboecklin", "Oldtown", "Copperplate","papyrus"];
function Export2Word(element, filename = ''){
  var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  var postHtml = "</body></html>";
  var html = preHtml+document.getElementById('text-editor').innerHTML+postHtml;

  var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
  });
  
  // Specify link url
  var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
  
  // Specify file name
  filename = filename?filename+'.doc':'document.doc';
  
  // Create download link element
  var downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob ){
      navigator.msSaveOrOpenBlob(blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = url;
      
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
  
  document.body.removeChild(downloadLink);
}

advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});
let inputsize =document.getElementById("inputtexts2");

const setSize = (size) => {
  const selection = window.getSelection();
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = size + "px";
    range.surroundContents(span);
  }
};

  sizeno.addEventListener("click", () => {
    console.log(inputsize.value);
    setSize(inputsize.value);
  });
  inputsize.addEventListener("change", () => {
    console.log(inputsize.value);
    setSize(inputsize.value);
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








const initializer = () => {
  highlighter(checkbuttons, false);
  highlighter(alignbuttons, true);  

  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    option.style.fontFamily=value;
    fontName.appendChild(option);
  });
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
