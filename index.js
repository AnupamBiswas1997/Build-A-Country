window.onload = function(){
    fetchData();
}

let data;

async function fetchData(){
    try {
        let response = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries");
        data = await response.json();
        displayData(data.data);
    } catch (error) {
        console.log(error);
    }
}


function displayData(arr){
    let doc1 = document.getElementById("container");
    doc1.innerHTML = "";

    arr.forEach(ele => {
        let card = document.createElement("div");
        card.className = "card";
        doc1.append(card);

        let rank = document.createElement("div");
        rank.className = "rank";
        rank.textContent = "Rank: "+ele.Rank;
        card.append(rank);
        

        let country = document.createElement("div");
        country.className = "country";
        country.textContent = "Country: "+ele.country;
        card.append(country);

        let population = document.createElement("div");
        population.className = "population";
        population.textContent = "Country Population: "+ele.population;
        card.append(population);
    });
}


function countryPopulationSort(){
    let arr1 = [...data.data];
    //console.log(arr1);
    arr1.sort((a,b)=> {
        return b.population - a.population;
    });

    //console.log(arr1);
    displayData(arr1);
}