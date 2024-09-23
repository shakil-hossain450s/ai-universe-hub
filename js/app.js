const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    const allAiInfo = data.data.tools;
    displayLoadData(allAiInfo);
}

const displayLoadData = allAiInfo => {
    const cardContainer = document.querySelector("#card-container");

    allAiInfo.forEach(aiInfo => {
        console.log(aiInfo)
        const { image, name, features, published_in } = aiInfo;
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
                <div>
                    <h2 class="card-title">${name}</h2>
                    <p class="flex items-center gap-2"><img src="./assets/calender.png"> ${published_in}</p>
                </div>
                <div class="card-actions justify-end">
                    <button class="btn btn-circle">
                        <img src="./assets/arrow.png">
                    </button>
                </div>
              </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    })
}

loadData();