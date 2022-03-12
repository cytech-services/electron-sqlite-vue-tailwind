document.addEventListener('DOMContentLoaded', async () => {
    window.api.loadDatabase().then((result) => {
        // console.log(result)

        // window.api.initDb(result)

        let names = window.api.getNames(result)
        console.log(names)

        if (names) {
            let divNames = document.getElementById('names')
            let namesArray = []
            names.forEach(name => {
                namesArray.push(name.name)
            });
            let nameString = namesArray.join('<br />')
            divNames.innerHTML = nameString
        }

    })
})



