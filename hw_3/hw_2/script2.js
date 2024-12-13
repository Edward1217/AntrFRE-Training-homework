const regionFilter = document.getElementById("region-filter");
const modelFilter = document.getElementById("model-filter");
const tableBody = document.querySelector("#data-table tbody");

// function for render talbe
function renderTable() {
  const selectedRegion = regionFilter.value;
  const selectedModel = modelFilter.value;

  // clear existing table rows avoid adding up
  tableBody.innerHTML = "";

  // filter data based on dropdown values
  const filteredData = data.filter((element) => {
    return (
      (selectedRegion === "All" || element.region === selectedRegion) &&
      (selectedModel === "All" || element.model === selectedModel)
    );
  });

  // creatte table rows
  filteredData.forEach((element) => {
    const indieRow = document.createElement("tr");
    const indieRegion = document.createElement("td");
    const indieModel = document.createElement("td");
    const indieSales = document.createElement("td");

    indieRegion.textContent = element.region;
    indieModel.textContent = element.model;
    indieSales.textContent = element.sales;

    indieRow.appendChild(indieRegion);
    indieRow.appendChild(indieModel);
    indieRow.appendChild(indieSales);
    tableBody.appendChild(indieRow);
  });
}

// initialize table
renderTable();

// add event listeners for changes
regionFilter.addEventListener("change", renderTable);
modelFilter.addEventListener("change", renderTable);
