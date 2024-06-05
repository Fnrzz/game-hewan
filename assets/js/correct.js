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
      try {
        const response = await fetch("assets/datasoal.json");
        const questions = await response.json();
        const questionData = questions.find((q) => q.id == questionId);

        if (questionData) {
          updateQuizContent(questionData);
        } else {
          console.error("Question not found");
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    }
  }

  // Function to update the quiz content
  async function updateQuizContent(data) {
    document.getElementById("correct-image").src = data.image;
    document.getElementById("correct-option").innerText = data.option;
    document.getElementById("answer-text").innerText = data.answer;
    document.getElementById("description-text").innerText = data.explanation;
    try {
      const response = await fetch("assets/datasoal.json");
      const questions = await response.json();
      const questionData = questions.find((q) => q.id == data.id + 1);

      if (questionData) {
        document.getElementById("next-button").href = `soal.html?soal=${
          data.id + 1
        }`;
        document.getElementById("next-button").innerText = `Lanjut Soal ${
          data.id + 1
        }`;
      } else {
        document.getElementById("next-button").href = `selesai.html`;
        document.getElementById("next-button").innerText = `Selesai`;
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  }

  fetchQuestionData();
});
