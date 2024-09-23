const loadData = async (isSeeAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const allAiInfo = data.data.tools;
  displayLoadData(allAiInfo, isSeeAll);
}

const displayLoadData = (allAiInfo, isSeeAll) => {
  const cardContainer = document.querySelector("#card-container");

  cardContainer.textContent = "";

  const seeAllContainer = document.querySelector("#see-all-container");
  if (allAiInfo.length > 9 && !isSeeAll) {
    seeAllContainer.classList.remove("hidden");
  } else {
    seeAllContainer.classList.add("hidden");
  }

  if (!isSeeAll) {
    allAiInfo = allAiInfo.slice(0, 9);
  }

  allAiInfo.forEach(aiInfo => {
    const { id, image, name, features, published_in } = aiInfo;
    const featureList = features.map((item, index) => `<li class="ml-2 text-[#585858]">${index + 1}. ${item}</li>`).join("");
    const cardDiv = document.createElement("div");
    cardDiv.classList = `card bg-base-100 border border-[#1111111A] p-6 pb-0`;
    cardDiv.innerHTML = `
            <figure>
              <img class="rounded-2xl"
                src="${image ? image : "no image found"}"
                alt=""
              />
            </figure>
            <div class="card-body px-0 pt-4 justify-end">
              <h2 class="card-title">Features:</h2>
              <ul class="mt-4 leading-6">${featureList}</ul>
              <div class="border-b my-6 border-[#11111133]"></div>
              <div class="flex justify-between items-center">
                <div class="space-y-3">
                    <h2 class="card-title">${name}</h2>
                    <p class="flex items-center gap-2"><img src="./assets/calender.png"> ${published_in}</p>
                </div>
                <div class="card-actions justify-end">
                    <button onclick="handleShowDetail(${id})" class="btn btn-circle">
                        <img src="./assets/arrow.png">
                    </button>
                </div>
              </div>
            </div>
        `;
    cardContainer.appendChild(cardDiv);
  })
}

const handleShowDetail = async (id) => {
  const formattedId = id.toString().padStart(2, 0);
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${formattedId}`);
  const data = await res.json();
  const singleAiInfo = data.data;
  displayShowDetails(singleAiInfo);
}

const displayShowDetails = singleAiInfo => {
  show_details.showModal()
}

document.querySelector("#see-all-btn").addEventListener("click", () => {
  loadData(true);
})

loadData();