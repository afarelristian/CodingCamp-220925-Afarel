// Global variables
let currentUserName = "harfi"
let currentPage = "home"

// Navigation functionality
function showPage(pageId) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page-content')
    allPages.forEach(page => {
        page.classList.add('hidden')
    })

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page')
    if (targetPage) {
        targetPage.classList.remove('hidden')
    }

    // Update nav item active state
    const navItems = document.querySelectorAll('.nav-item')
    navItems.forEach(item => {
        item.classList.remove('active')
    })

    const activeNavItem = document.querySelector(`[data-page="${pageId}"]`)
    if (activeNavItem) {
        activeNavItem.classList.add('active')
    }

    currentPage = pageId
}

// Navigation click handlers
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item')
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            const pageId = item.getAttribute('data-page')
            
            if (pageId === 'home') {
                showPage('home')
            } else if (pageId === 'profile') {
                showPage('profile')
            } else if (pageId === 'portfolio') {
                alert('Halaman Portfolio sedang dalam pengembangan! 🚧')
            } else if (pageId === 'message') {
                showPage('home')
                // Scroll to message section
                setTimeout(() => {
                    const messageSection = document.querySelector('.message-section')
                    if (messageSection) {
                        messageSection.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        })
                    }
                }, 100)
            }
        })
    })

    // Set initial active state
    showPage('home')
})

// Login functionality
const loginModal = document.getElementById('loginModal')
const mainContainer = document.getElementById('mainContainer')
const loginNameInput = document.getElementById('loginNameInput')
const loginBtn = document.getElementById('loginBtn')

// Function to update hero title
function updateHeroTitle(name) {
    const heroTitle = document.querySelector(".welcome-title")
    const newName = name || "harfi"
    heroTitle.textContent = `Hi ${newName}, Welcome To Website`
    currentUserName = newName
}

// Function to show main website
function showMainWebsite(userName) {
    // Update hero title with user name
    updateHeroTitle(userName)
    
    // Hide modal and show main content
    loginModal.classList.add('hidden')
    mainContainer.classList.add('visible')
}

// Login button click handler
loginBtn.addEventListener('click', () => {
    const userName = loginNameInput.value.trim()
    
    if (userName.length === 0) {
        alert('Silakan masukkan nama Anda!')
        loginNameInput.focus()
        return
    }
    
    if (userName.length < 2) {
        alert('Nama harus minimal 2 karakter!')
        loginNameInput.focus()
        return
    }
    
    showMainWebsite(userName)
})

// Allow Enter key to login
loginNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click()
    }
})

// Focus on input when page loads
window.addEventListener('load', () => {
    loginNameInput.focus()
})

// Function to update current time
function updateCurrentTime() {
    const now = new Date()
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    }
    const timeString = now.toLocaleDateString("en-US", options)
    document.getElementById("current-time").textContent = `Current time : ${timeString}`
}

// Update time every second
updateCurrentTime()
setInterval(updateCurrentTime, 1000)

// Function to format date
function formatDate(dateString) {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

// Form submit handler
document.getElementById("message-form").addEventListener("submit", (e) => {
    e.preventDefault() // Prevent form from actually submitting

    // Remove previous error messages and styling
    clearErrors()

    // Get form data
    const nameInput = document.getElementById("name")
    const birthDateInput = document.getElementById("tempat-lahir")
    const genderInputs = document.querySelectorAll('input[name="gender"]')
    const messageInput = document.getElementById("pesan")

    const name = nameInput.value.trim()
    const birthDate = birthDateInput.value
    const selectedGender = Array.from(genderInputs).find(radio => radio.checked)
    const message = messageInput.value.trim()

    // Validation
    let hasError = false
    let errorMessages = []

    if (!name) {
        nameInput.classList.add('error')
        errorMessages.push("Nama wajib diisi")
        hasError = true
    }

    if (!birthDate) {
        birthDateInput.classList.add('error')
        errorMessages.push("Tanggal lahir wajib diisi")
        hasError = true
    }

    if (!selectedGender) {
        errorMessages.push("Jenis kelamin wajib dipilih")
        hasError = true
    }

    if (!message) {
        messageInput.classList.add('error')
        errorMessages.push("Pesan wajib diisi")
        hasError = true
    }

    // Show errors if any
    if (hasError) {
        showErrorMessage(errorMessages)
        return
    }

    // If no errors, process the form
    processFormSubmission(name, birthDate, selectedGender.value, message)
})

// Function to clear previous errors
function clearErrors() {
    // Remove error messages
    const existingErrors = document.querySelectorAll('.error-message, .success-message')
    existingErrors.forEach(error => error.remove())

    // Remove error styling
    const errorInputs = document.querySelectorAll('.error')
    errorInputs.forEach(input => input.classList.remove('error'))
}

// Function to show error messages
function showErrorMessage(messages) {
    const formContainer = document.querySelector('.form-container')
    const messageTitle = document.querySelector('.message-title')
    
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error-message'
    errorDiv.innerHTML = `
        <strong>⚠️ Terdapat kesalahan:</strong><br>
        ${messages.map(msg => `• ${msg}`).join('<br>')}
    `
    
    messageTitle.insertAdjacentElement('afterend', errorDiv)

    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

// Function to show success message
function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container')
    const messageTitle = document.querySelector('.message-title')
    
    const successDiv = document.createElement('div')
    successDiv.className = 'success-message'
    successDiv.innerHTML = `
        <strong>✅ Form berhasil disubmit!</strong><br>
        Data Anda telah tersimpan dan ditampilkan di sebelah kanan.
    `
    
    messageTitle.insertAdjacentElement('afterend', successDiv)

    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove()
    }, 3000)
}

// Function to process form submission
function processFormSubmission(name, birthDate, gender, message) {
    // Update hero title with submitted name
    updateHeroTitle(name)

    // Format birth date
    const formattedDate = formatDate(birthDate)

    // Update display values
    document.getElementById("display-nama").textContent = name
    document.getElementById("display-tanggal").textContent = formattedDate
    document.getElementById("display-gender").textContent = gender
    document.getElementById("display-pesan").textContent = message

    // Show results and hide no-data message
    document.getElementById("form-results").classList.remove("hidden")
    document.getElementById("no-data-message").style.display = "none"

    // Show success message
    showSuccessMessage()

    // Scroll to results
    document.getElementById("form-results").scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    })
}

// Remove real-time form updates since we only want to show data after submit
// The old event listeners for real-time updates are removed