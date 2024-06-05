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
  function updateQuizContent(data) {
    document.getElementById("question-image").src = data.image;
    document.getElementById("question-text").innerText = data.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    data.options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("flex", "gap-4", "items-center");

      const linkElement = document.createElement("a");
      linkElement.href = option.correct
        ? `correct-soal.html?soal=${data.id}`
        : `wrong.html?soal=${data.id}`;
      linkElement.classList.add(
        "bg-yellow-500",
        "hover:bg-yellow-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-5",
        "rounded-full",
        "text-[30px]"
      );
      linkElement.innerText = option.option;

      const answerElement = document.createElement("h6");
      answerElement.classList.add(
        "text-[40px]",
        "font-bold",
        "text-yellow-900",
        "text-shadow"
      );
      answerElement.innerText = option.answer;

      optionElement.appendChild(linkElement);
      optionElement.appendChild(answerElement);

      optionsContainer.appendChild(optionElement);
    });
  }

  // Initialize quiz
  fetchQuestionData();
});
