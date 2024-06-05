document.addEventListener("DOMContentLoaded", function () {
  // Function to get URL parameter
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Fetch question data based on URL parameter
  async function fetchQuestionData() {
    const questionId = getQueryParam("soal");
    if (questionId) {
      const trybutton = document.getElementById("trybutton");
      trybutton.href = `soal.html?soal=${questionId}`;
    }
  }

  fetchQuestionData();
});
