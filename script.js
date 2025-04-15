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

// Optimized cursor effect
const cursorDot = document.querySelector(".cursor-dot")
const cursorOutline = document.querySelector(".cursor-outline")

// Variables to store the current and target positions
let cursorX = 0
let cursorY = 0
let dotX = 0
let dotY = 0
let outlineX = 0
let outlineY = 0

// Update cursor position on mousemove
document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX
  cursorY = e.clientY
})

// Animation function using requestAnimationFrame for smooth performance
function animateCursor() {
  // Calculate the distance between current position and target position
  const dotDiffX = cursorX - dotX
  const dotDiffY = cursorY - dotY
  const outlineDiffX = cursorX - outlineX
  const outlineDiffY = cursorY - outlineY

  // Update positions with easing
  dotX += dotDiffX * 0.2
  dotY += dotDiffY * 0.2
  outlineX += outlineDiffX * 0.15
  outlineY += outlineDiffY * 0.15

  // Apply the new positions
  cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`
  cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`

  // Continue the animation loop
  requestAnimationFrame(animateCursor)
}

// Start the animation
animateCursor()

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll("a, button, input, textarea, .gallery-item, .progress-dot")

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`
    cursorOutline.style.borderColor = "var(--secondary-color)"
    cursorOutline.style.boxShadow = "var(--neon-glow-purple)"
    cursorDot.style.opacity = "0.5"
  })

  el.addEventListener("mouseleave", () => {
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`
    cursorOutline.style.borderColor = "var(--primary-color)"
    cursorOutline.style.boxShadow = "var(--neon-glow)"
    cursorDot.style.opacity = "1"
  })
})

// Hide cursor when mouse leaves the window
document.addEventListener("mouseout", (e) => {
  if (e.relatedTarget === null) {
    cursorDot.style.opacity = "0"
    cursorOutline.style.opacity = "0"
  }
})

document.addEventListener("mouseover", () => {
  cursorDot.style.opacity = "1"
  cursorOutline.style.opacity = "1"
})

// Click effect
document.addEventListener("mousedown", () => {
  cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(0.7)`
  cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(0.7)`
})

document.addEventListener("mouseup", () => {
  cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1)`
  cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`
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
