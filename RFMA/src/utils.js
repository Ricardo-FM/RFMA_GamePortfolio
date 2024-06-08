export function displayDialogue(text, onDisplay) {

    const dialogueUI = document.getElementById("textbox-container")
    const dialogue = document.getElementById("dialogue");

    dialogueUI.style.display = "block";

    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += test[index];
            dialogue.innerHTML = currentText;
             index++;
             return;
        }
        clearInterval(intervalRef);
    }, 5);

    const closeBtn = document.getElementById("close");

    //Sets Dialogue box to normal state
    function onCloseBtnClick() {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onCloseBtnClick);
    }

    //event lister for the click/close button
    closeBtn.addEventListener("click", onCloseBtnClick);
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(kvec2(1));
        return;
    }

    k.camScaleamScale(kvec(1.5));
}