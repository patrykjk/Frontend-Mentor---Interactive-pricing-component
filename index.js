let slider = document.querySelector('.slider')
let monthlyPlanInput = document.querySelector('#monthly')
let yearlyPlanInput = document.querySelector('#yearly')
let planOptionsToggleBtn = document.querySelector('.plan-options-toggle-btn')
let pageViewsElement = document.querySelector('.page-views span')
let priceElement = document.querySelector('.price span')
let DISCOUNT_RATE = .25

let pricePerViewsArray = [
    {
        views: '10k',
        price: 8
    },
    {
        views: '50k',
        price: 12
    },
    {
        views: '100k',
        price: 16
    },
    {
        views: '500k',
        price: 24
    },
    {
        views: '1m',
        price: 36
    },
]




function updatePrice() {
    let price = pricePerViewsArray[Number(slider.value)].price

    if (yearlyPlanInput.checked) price = price - price * DISCOUNT_RATE

    priceElement.innerText = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function updateViewsDisplay() {
    let selectedOption = pricePerViewsArray[Number(slider.value)]
    pageViewsElement.innerText = selectedOption.views
}

slider.addEventListener('input', () => {
    updateViewsDisplay()
    updatePrice()
})


function updateSlider() {
    let sliderPosition = 100 / Number(slider.max) * Number(slider.value) + '%'
    slider.style.setProperty('--slider-position', sliderPosition)
}

slider.addEventListener('input', updateSlider)


slider.addEventListener('mousedown', () => slider.classList.add('dragging'))
slider.addEventListener('mouseup', () => slider.classList.remove('dragging'))


function switchToMonthly() {
    planOptionsToggleBtn.classList.remove('move-right')
    monthlyPlanInput.checked = true
}

function switchToYearly() {
    planOptionsToggleBtn.classList.add('move-right')
    yearlyPlanInput.checked = true
}

planOptionsToggleBtn.addEventListener('click', function () {
    if (this.classList.contains('move-right')) {
        switchToMonthly()
    } else {
        switchToYearly()
    }
    updatePrice()
})


document.querySelector('label[for="monthly"]').addEventListener('click', function () {
    switchToMonthly()
    updatePrice()
})

document.querySelector('label[for="yearly"]').addEventListener('click', function () {
    switchToYearly()
    updatePrice()
})




slider.max = pricePerViewsArray.length - 1
monthlyPlanInput.checked = true
updatePrice()
updateViewsDisplay()
updateSlider()