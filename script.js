// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault() // Prevent the form from submitting the traditional way

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Display a response message
  const responseDiv = document.getElementById("formResponse")
  responseDiv.innerHTML = `<p>Terima kasih, ${name}! Pesan Anda telah diterima.</p>`
  responseDiv.style.display = "block"

  // Clear the form
  this.reset()

  // Hide the response after 5 seconds
  setTimeout(() => {
    responseDiv.style.display = "none"
  }, 5000)
})

// Optimized cursor effect with star and crosshair
const cursorCrosshair = document.querySelector(".cursor-crosshair")
const cursorStar = document.querySelector(".cursor-star")

// Variables to store the current and target positions
let cursorX = 0
let cursorY = 0
let crosshairX = 0
let crosshairY = 0
let starX = 0
let starY = 0

// Update cursor position on mousemove
document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX
  cursorY = e.clientY
})

// Animation function using requestAnimationFrame for smooth performance
function animateCursor() {
  // Calculate the distance between current position and target position
  const crosshairDiffX = cursorX - crosshairX
  const crosshairDiffY = cursorY - crosshairY
  const starDiffX = cursorX - starX
  const starDiffY = cursorY - starY

  // Update positions with easing
  crosshairX += crosshairDiffX * 0.2
  crosshairY += crosshairDiffY * 0.2
  starX += starDiffX * 0.15
  starY += starDiffY * 0.15

  // Apply the new positions
  cursorCrosshair.style.transform = `translate(${crosshairX}px, ${crosshairY}px)`
  cursorStar.style.transform = `translate(${starX}px, ${starY}px)`

  // Continue the animation loop
  requestAnimationFrame(animateCursor)
}

// Start the animation
animateCursor()

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll("a, button, input, textarea, .gallery-item, .progress-dot")

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorStar.style.transform = `translate(${starX}px, ${starY}px) scale(1.5) rotate(45deg)`
    cursorStar.style.filter = "drop-shadow(0 0 10px rgba(255, 0, 255, 0.8))"
    cursorCrosshair.style.opacity = "0.5"
  })

  el.addEventListener("mouseleave", () => {
    cursorStar.style.transform = `translate(${starX}px, ${starY}px) scale(1) rotate(0deg)`
    cursorStar.style.filter = "drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))"
    cursorCrosshair.style.opacity = "1"
  })
})

// Hide cursor when mouse leaves the window
document.addEventListener("mouseout", (e) => {
  if (e.relatedTarget === null) {
    cursorCrosshair.style.opacity = "0"
    cursorStar.style.opacity = "0"
  }
})

document.addEventListener("mouseover", () => {
  cursorCrosshair.style.opacity = "1"
  cursorStar.style.opacity = "1"
})

// Click effect
document.addEventListener("mousedown", () => {
  cursorCrosshair.style.transform = `translate(${crosshairX}px, ${crosshairY}px) scale(0.7)`
  cursorStar.style.transform = `translate(${starX}px, ${starY}px) scale(0.7) rotate(180deg)`
})

document.addEventListener("mouseup", () => {
  cursorCrosshair.style.transform = `translate(${crosshairX}px, ${crosshairY}px) scale(1)`
  cursorStar.style.transform = `translate(${starX}px, ${starY}px) scale(1) rotate(0deg)`
})

// Scroll handling for sections
const sections = document.querySelectorAll(".section")
const navLinks = document.querySelectorAll(".nav-links a")
const progressDots = document.querySelectorAll(".progress-dot")
const scrollContainer = document.querySelector(".scroll-container")

// Function to update active section
function updateActiveSection() {
  const scrollPosition = scrollContainer.scrollTop
  const windowHeight = window.innerHeight

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    // Check if the section is in view
    if (
      scrollPosition >= sectionTop - windowHeight / 3 &&
      scrollPosition < sectionTop + sectionHeight - windowHeight / 3
    ) {
      // Update section active state
      sections.forEach((s) => s.classList.remove("active"))
      section.classList.add("active")

      // Update navigation active state
      navLinks.forEach((link) => link.classList.remove("active"))
      navLinks[index].classList.add("active")

      // Update progress dots
      progressDots.forEach((dot) => dot.classList.remove("active"))
      progressDots[index].classList.add("active")
    }
  })
}

// Add scroll event listener
scrollContainer.addEventListener("scroll", updateActiveSection)

// Add click event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    scrollContainer.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    })
  })
})

// Add click event listeners to progress dots
progressDots.forEach((dot) => {
  dot.addEventListener("click", function () {
    const targetId = this.getAttribute("data-section")
    const targetSection = document.getElementById(targetId)

    scrollContainer.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    })
  })
})

// Initialize the page
updateActiveSection()

// Add animation to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".section.active .content-wrapper")

  elements.forEach((element) => {
    element.classList.add("fade-in")
  })
}

// Call animation on scroll
scrollContainer.addEventListener("scroll", animateOnScroll)

// Initial animation
setTimeout(animateOnScroll, 100)
