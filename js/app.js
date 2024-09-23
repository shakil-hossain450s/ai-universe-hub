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
                        <img src="../assets/arrow.png">
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
  show_details.showModal();

  const { accuracy, website, description, pricing = {}, tool_name, features, integrations } = singleAiInfo;

  const integrationsList = !integrations ? `<li class="text-sm text-[#585858]">No Data Found</li>` : integrations.map(integration => `
      <li class="list-disc text-sm text-[#585858]">${integration ? integration : "not found"}</li>`).join("");

  const dialogContainer = document.querySelector("#show_details");

  const modalDiv = document.createElement("div");
  modalDiv.classList = "modal-box max-w-4xl";
  modalDiv.innerHTML = `
    <div class="flex justify-between gap-5">
      <div class="flex-1 bg-[#EB57570D] border border-[#EB5757] p-7 rounded-2xl">
        <h3 class="text-lg font-bold">${tool_name ? tool_name : "no data found"}</h3>
        <p class="py-4 text-[#111]">${description ? description : "no data found"}</p>
        <div class="grid grid-cols-3 gap-3 text-sm">
          <div class="bg-white flex flex-col justify-center items-center min-h-24 rounded-2xl p-2 text-center font-medium text-[#03A30A]">
            <p>${pricing?.item1?.price}</p>
            <p>${pricing?.item1?.plan}</p>
          </div>
          <div class="bg-white flex flex-col justify-center items-center min-h-24 rounded-2xl p-2 text-center font-medium text-[#F28927]">
            <p>${pricing?.item2?.price}</p>
            <p>${pricing?.item2?.plan}</p>
          </div>
          <div class="bg-white flex flex-col justify-center items-center min-h-24 rounded-2xl p-2 text-center font-medium text-[#EB5757]">
            <p>${pricing?.item3?.price}</p>
            <p>${pricing?.item3?.plan}</p>
          </div>
        </div>
        <div class="flex justify-between gap-3 mt-4">
          <div class="">
            <h3 class="text-lg font-bold">Features</h3>
            <ul class="ml-5 mt-3" id="features-container">

            </ul>
          </div>
          <div class="">
            <h3 class="text-lg font-bold">Integrations</h3>
            <ul class="ml-5 mt-3" id="integrations-container">
              ${integrationsList}
            </ul>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
              <button class="btn bg-[#EB5757] hover:bg-[#EB5757] absolute right-0 top-0 btn-circle">
                  <img src="../assets/cross.png">
              </button>
          </form>
        </div>
      </div>
      <div class="flex-1 border border-[#E7E7E7] rounded-2xl p-6 text-center">
        <img class="w-full rounded-2xl mb-6 border" src="${singleAiInfo?.image_link[0] ? singleAiInfo?.image_link[0] : "no image found"}" alt="image not found">
        <h4 class="text-lg font-bold mb-4">${accuracy?.description ? accuracy?.description : "no data found"}</h4>
        <a href="${website}" class="hover:underline text-[#585858]">${website ? website : "no data found"}</a>
    </div>
  `;
  dialogContainer.appendChild(modalDiv);

  const featuresContainer = modalDiv.querySelector("#features-container");
  const keys = Object.keys(features);
  keys.forEach(i => {
    // console.log(features[i].feature_name)
    const li = document.createElement("li");
    li.classList.add("list-disc", "text-[#585858]", "text-sm");
    li.innerText = features[i].feature_name;
    featuresContainer.appendChild(li);
  })
}

document.querySelector("#see-all-btn").addEventListener("click", () => {
  loadData(true);
})

loadData();