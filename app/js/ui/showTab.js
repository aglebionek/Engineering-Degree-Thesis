const showTab = (button) => {
    const topBarButtons = {
        calculator: document.getElementById('nav__calculator'),
        table: document.getElementById('nav__table'),
        definitions: document.getElementById('nav__definitions'),
    }

    Object.keys(topBarButtons).forEach(key => {
        key === 'table' ? topBarButtons[key].disabled = !window.data.tableGenerated : topBarButtons[key].disabled = false
        topBarButtons[key].classList.remove('nav-button-current')

        document.getElementById(`app__${key}`).classList.add('hidden')
        document.getElementById(`tab__nav-${key}`).classList.add('hidden')
        document.getElementById(`app__${key}`).classList.remove(`app-${key}`)
    })

    topBarButtons[button].disabled = true
    topBarButtons[button].classList.add('nav-button-current')
    document.getElementById(`app__${button}`).classList.remove('hidden')
    document.getElementById(`app__${button}`).classList.add(`app-${button}`)
    document.getElementById(`tab__nav-${button}`).classList.remove('hidden')
}