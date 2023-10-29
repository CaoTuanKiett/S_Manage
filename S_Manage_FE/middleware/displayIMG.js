
const displayIMG = ( idInputIMG, idDisplayIMG) => {
  const imageInput = document.getElementById(idInputIMG);
  const imageDisplay = document.getElementById(idDisplayIMG);

  imageInput.addEventListener("change", function (event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
          const reader = new FileReader();

          reader.onload = function (e) {
              imageDisplay.src = e.target.result;
          };

          reader.readAsDataURL(selectedFile);
      } else {
          imageDisplay.src = ""; // Xóa ảnh nếu không có tệp được chọn
      }
  });
}

export default displayIMG;

