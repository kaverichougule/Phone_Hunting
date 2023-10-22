let search=document.querySelector(".search")
let searchPhone=document.querySelector("#searchPhone")
let btn=document.querySelector(".item button")
let ansArray=[]
let showDetails= document.querySelector(".showDetails")
showDetails.style.display = "none";

// async function PreData(){
//     try{
//         const response=await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
//         let responseInJson=await response.json()
//         let arrayOfData=responseInJson.data
//         ansArray=creatingDiv(arrayOfData);
//         ansArray.splice(6);
//     }
//     catch(error){
//         console.log("Please Refresh");
//     }

//     document.querySelector(".showItem-container").replaceChildren(...ansArray);
//     btn = document.querySelectorAll(".showSpecification");
//     showMobileDetails(btn)
// }
// PreData()

search.addEventListener("click", (e) => {
    document.querySelectorAll(".item button");
    e.preventDefault();
    fetchData(searchPhone.value);
});

async function fetchData(dataToBeSearch) {
    try {
      let response = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${dataToBeSearch}`
      );
      let allData = await response.json();
      let array_of_Data = allData.data;
       ansArray = creatingDiv(array_of_Data);
    } catch (error) {
      console.log("Please refresh");
    }
    document.querySelector(".showItem-container").replaceChildren(...ansArray);
    btn = document.querySelectorAll(".showSpecification");
    console.log(btn);
    showMobileDetails(btn);
  }
  function creatingDiv(array_of_Data) {
    let dataArray = [];
    
    array_of_Data.forEach((element) => {
      let div1 = document.createElement("div");
      div1.classList.add("item");
      div1.innerHTML = ` <img src=${element["image"]} alt="">
      <h2>${element["phone_name"]}</h2>
      <p>There are many variations of passages of available, but the majority have suffered</p>
      <span class="slug">${element["slug"]}</span>
      <button class="showSpecification">Show Details</button>`;
      dataArray.push(div1);
    });
    return dataArray;
  }
  
  
  
  
  function showMobileDetails(btn) {
    btn.forEach((val, idx) => {
      val.addEventListener("click", (e) => {
        e.preventDefault();
        
        showData(idx);
      });
    });
  
    async function showData(idx) {
      console.log("idx=", idx);
      // console.log(items[idx].children[3].innerText);
      let items=document.querySelectorAll(".item");
      console.log(items);
      let slug = items[idx].children[3].innerText;
      // console.log(slug);
      let specify = await fetch(
        `https://openapi.programming-hero.com/api/phone/${slug}`
      );
      let specificationData = await specify.json();
      let sub_data=specificationData.data;
      // console.log(specificationData.data.mainFeatures);
      let div2 = document.createElement("div");
      div2.innerHTML = `  <img src=${sub_data.image} alt="">
                      <h3>${sub_data.name}</h3>
                      <p>Brand: ${sub_data.brand}</p>
                      <table>
                          <tr>
                              <td>Storage</td>
                             <td class="detail">${sub_data.mainFeatures.storage}</td>
                          </tr>
                          <tr>
                              <td>display Size</td>
                              <td class="detail"> ${sub_data.mainFeatures.displaySize}</td>
                          </tr>
                          <tr>
                              <td>Chipset</td>
                              <td class="detail"> ${sub_data.mainFeatures.chipSet}</td>
                          </tr>
                          <tr>
                              <td>memory</td>
                              <td class="detail">${sub_data.mainFeatures.memory}</td>
                          </tr>
                          <tr>
                              <td>sensor</td>
                              <td class="detail">${sub_data.mainFeatures.sensors}</td>
                          </tr>
                      </table>
                      <button class="close">Close</button>`;
  
      // <img src=${specificationData.data.image} alt="">
      //                       <h3>${specificationData.data.name}</h3>
      //                       <p>${specificationData.data.brand}</p>
      //                        <p>${specificationData.data.mainFeatures.storage}${specificationData.data.mainFeatures.displaySize,specificationData.data.mainFeatures.chipSet,specificationData.data.mainFeatures.memory}
  
      //                        </p>`
      showDetails.replaceChildren(div2);
      closeBtn=document.querySelector(".close");
      closeDetails(closeBtn);
      showDetails.style.display = "block";
      // console.log(div2);
    }
  }
  
  function closeDetails(closeBtn){
    closeBtn.addEventListener("click",()=>{
      showDetails.style.display = "none";
    })
  }