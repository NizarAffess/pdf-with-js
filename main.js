const convert = document.querySelector('button');
convert.addEventListener('click', convertToPDF);

const fileUpload = document.querySelector("#file");
fileUpload.addEventListener("change", loadImage);

function loadImage(event) {
  const image = document.getElementById("imgDisplayed");
  image.src = URL.createObjectURL(event.target.files[0]);
}

function convertToPDF(e) {
  e.preventDefault();
  const image = document.getElementById("imgDisplayed");
  const imageUrl = image.src;
  getBase64FromImageUrl(imageUrl);

}

function getBase64FromImageUrl(url) {
  var img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');

  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;

    const doc = new jsPDF({ lineHeight: 1.5 });
    doc.addImage(dataURL, 15, 10, 75, 75);
    // header
    doc.setFontSize(16);
    doc.setFontType("bold");
    doc.text(title, 15, 100);
    // description
    doc.setFontSize(12);
    doc.setFontType("normal");
    const splitDescription = doc.splitTextToSize(description, 182);
    doc.text(splitDescription, 15, 112);

    doc.output("dataurlnewwindow");
  };

  img.src = url;
}
