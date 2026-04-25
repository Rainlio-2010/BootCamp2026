const mainContainer = document.getElementById("main")

const url = "https://tsimobile.viarail.ca/data/allData.json"



fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        const key = Object.keys(data);
        for (let i = 0; i < key.length; i++) {
            console.log(key)
            const statue = "arrived statue = " + data[key[i]].arrived;
            const depart = data[key[i]].from
            const destony = data[key[i]].to
            const timeO = data[key[i]].instance
            const title = key[i]
            console.log(title)


            const trainForm = document.createElement("div")
            trainForm.innerHTML = `
                    <div class="card">
                    <div class="title"> Train ${title}</div>
                    <div class="statue">${statue}</div>
                    <div class="departement"> ${depart}</div>
                    <div class="destination">${destony}</div>
                    <div class="time" id="T">${timeO}</div>
                    <div calss="lat">
                </div>
        `;
            trainForm.addEventListener("click", () => {

            })

            mainContainer.appendChild(trainForm)
        }

        //     const statue = "arrived statue = " + data[key[i]].arrived;
        //     const depart = data[key[i]].from
        //     const destony = data[key[i]].to
        //     const timeO = data[key[i]].instance
        //     const title = data[key]


        //     const trainForm = document.createElement("div")
        //     trainForm.innerHTML = `
        //             <div class="card">
        //             <div class="title"> Train ${title}</div>
        //             <div class="statue">${statue}</div>
        //             <div class="departement"> ${depart}</div>
        //             <div class="destination">${destony}</div>
        //             <div class="time" id="T">${timeO}</div>
        //         </div>
        // `;

        //     mainContainer.appendChild(trainForm)
        // 

    })
