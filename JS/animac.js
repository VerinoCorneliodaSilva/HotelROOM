const header = document.querySelector(".topo")
const backToTopBtn = document.getElementById("backToTop")
const reservaForm = document.getElementById("reservaForm")
const roomCards = document.querySelectorAll(".room-card")
const serviceItems = document.querySelectorAll(".service-item")
const newsletterForm = document.querySelector(".newsletter")

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
    backToTopBtn.classList.add("show")
  } else {
    header.classList.remove("scrolled")
    backToTopBtn.classList.remove("show")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

reservaForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const nome = formData.get("nome")
  const email = formData.get("email")
  const telefone = formData.get("telefone")
  const quarto = formData.get("quarto")
  const entrada = formData.get("entrada")
  const saida = formData.get("saida")

  const entradaDate = new Date(entrada)
  const saidaDate = new Date(saida)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (entradaDate < today) {
    showNotification("A data de entrada deve ser hoje ou uma data futura.", "error")
    return
  }

  if (saidaDate <= entradaDate) {
    showNotification("A data de saída deve ser posterior à data de entrada.", "error")
    return
  }

  const nights = Math.ceil((saidaDate - entradaDate) / (1000 * 60 * 60 * 24))

  const prices = {
    "quarto-standard-deluxe": 80,
    "quarto-standard-twin": 85,
    "quarto-superior": 100,
    "quarto-familiar": 130,
    "quarto-deluxe-vista-mar": 150,
    "junior-suite": 180,
    "quarto-executivo": 160,
    "suite-master": 220,
    "penthouse-suite": 350,
    "suite-romantica": 200,
    "quarto-acessivel": 90,
    "quartos-conectados": 170,
    "studio-apartamento": 140,
    "quarto-vista-jardim": 110,
    "suite-presidencial": 500,
  }
  const total = nights * (prices[quarto] || 80)

  const confirmationMessage = `
        Reserva confirmada!
        
        Nome: ${nome}
        Email: ${email}
        Telefone: ${telefone}
        Quarto: ${quarto.charAt(0).toUpperCase() + quarto.slice(1).replace(/-/g, " ")}
        Check-in: ${formatDate(entradaDate)}
        Check-out: ${formatDate(saidaDate)}
        Noites: ${nights}
        Total: €${total}
        
        Receberá um email de confirmação em breve.
    `

  showNotification(confirmationMessage, "success")
  this.reset()
})

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${type === "error" ? "#ff4444" : "#ffcb74"};
        color: ${type === "error" ? "#fff" : "#111"};
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        white-space: pre-line;
        animation: slideInRight 0.3s ease;
    `

  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)

  notification.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  })
}

function formatDate(date) {
  return date.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

const roomCardsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

const cards = document.querySelectorAll('.cada .card');

cards.forEach((card, index) => {
  card.style.opacity = 0;
  setTimeout(() => {
    card.style.transition = "all 0.8s ease";
    card.style.opacity = 1;
    card.style.transform = "translateY(0)";
  }, index * 300); // delay entre cada card
});

document.querySelectorAll(".cada").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  roomCardsObserver.observe(card)
})

serviceItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`
})

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector('input[type="email"]').value

    if (email) {
      showNotification("Obrigado por se inscrever na nossa newsletter!", "success")
      this.querySelector('input[type="email"]').value = ""
    }
  })
}

const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

const today = new Date().toISOString().split("T")[0]
const entradaInput = document.getElementById("entrada")
const saidaInput = document.getElementById("saida")

if (entradaInput) {
  entradaInput.min = today
  entradaInput.addEventListener("change", function () {
    const selectedDate = new Date(this.value)
    const nextDay = new Date(selectedDate)
    nextDay.setDate(nextDay.getDate() + 1)
    saidaInput.min = nextDay.toISOString().split("T")[0]
  })
}

function showLoadingState(button) {
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = originalText
    button.disabled = false
  }, 2000)
}

const submitBtn = document.querySelector(".submit-btn")
if (submitBtn) {
  reservaForm.addEventListener("submit", () => {
    showLoadingState(submitBtn)
  })
}

