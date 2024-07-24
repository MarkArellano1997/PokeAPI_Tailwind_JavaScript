const pokemon = document.querySelector('#pokemon')
const buscarBtn = document.querySelector('#buscar')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

buscarBtn.addEventListener('click', validarPokemon)

function validarPokemon() {

    const alertaPrevia = document.querySelector('.bg-red-500')

    alertaPrevia?.remove()

    if (pokemon.value === '') {
        mostrarAlertar('Todos los campos son obligatorios')
        return
    }

    obtenerPokemon(pokemon.value)
}

function obtenerPokemon(pokemon) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((respuesta) => {
            if (respuesta.ok) {
                return respuesta.json()
            }
            mostrarAlertar('El pokemon no se encuentra')
        })
        .then((resultado) => {
            mostrarPokemon(resultado)
        })
}

function mostrarPokemon(pokemon) {

    const { name, sprites: { other }, stats, types } = pokemon

    resultado.innerHTML =
        `
                            <h3 class="text-center font-semibold text-xl">${name}</h3>

                            <img src="${other['official-artwork'].front_default}" alt="" class="w-[70vw] md:w-[30vw] mx-auto">
                            <div class="text-center grid justify-items-center" id="stats">
                                <div class="flex justify-between w-[40%] md:w-[10%]" id='types'>
                                    
                                </div>
                            </div>
                        `

    types.forEach(type => {

        const divTypes = document.querySelector('#types')

        const divType = document.createElement('P')
        divType.classList.add('bg-gray-100', 'rounded-full', 'px-2')

        divType.innerHTML =
                            `
                                <p class="bg-gray-100 rounded-full px-2">${type.type.name}</p>
                            `

        divTypes.appendChild(divType)
    });

    stats.forEach(stat => {

        const { base_stat, stat: { name } } = stat

        const divStats = document.querySelector('#stats')

        const divStat = document.createElement('P')

        divStat.innerHTML = `<strong>${name}:</strong> ${base_stat}`

        divStats.appendChild(divStat)

    })
}

function mostrarAlertar(mensaje) {
    const div = document.createElement('DIV')
    div.classList.add('text-center', 'bg-red-500', 'text-white', 'py-1', 'px-4', 'mb-2')
    div.textContent = mensaje

    formulario.insertBefore(div, document.querySelector('input'))

    setTimeout(() => {
        div.remove()
    }, 3000);
}
