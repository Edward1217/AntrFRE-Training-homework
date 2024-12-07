const data = [
  { region: "US", model: "A", sales: 150 },
  { region: "US", model: "B", sales: 120 },
  { region: "US", model: "C", sales: 350 },
  { region: "EU", model: "A", sales: 200 },
  { region: "EU", model: "B", sales: 100 },
  { region: "EU", model: "C", sales: 250 },
  { region: "CA", model: "A", sales: 200 },
  { region: "CA", model: "B", sales: 100 },
  { region: "CA", model: "C", sales: 230 },
  { region: "CA", model: "D", sales: 400 },
];

const total_region = data.map((element) => element.region);
// select dinstict region
const region_set = new Set(total_region);
const elem = document.getElementById("q1");

region_set.forEach((element) => {
  const each_regionData = data.filter((item) => item.region === element);
  let sum_region = 0;
  //caculate the sum for each region
  each_regionData.forEach((element) => {
    sum_region += element.sales;
  });
  //add sum row first
  const sumRow = document.createElement("tr");
  const sumRegion = document.createElement("td");
  const sumModel = document.createElement("td");
  const sumSales = document.createElement("td");
  sumRegion.textContent = element;
  sumModel.textContent = "Sum";
  sumSales.textContent = sum_region;

  sumRow.appendChild(sumRegion);
  sumRow.appendChild(sumModel);
  sumRow.appendChild(sumSales);
  elem.appendChild(sumRow);

  //add individual rows

  each_regionData.forEach((element) => {
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
    elem.appendChild(indieRow);
  });
});
