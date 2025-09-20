'use strict';

/* ------------------------------
   Utility Functions
------------------------------ */
const elementToggle = elem => elem.classList.toggle("active");

document.addEventListener('DOMContentLoaded', function() {
  /* ------------------------------
     Sidebar Toggle
  ------------------------------ */
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", () => elementToggle(sidebar));
  }

  /* ------------------------------
     Testimonials Modal
  ------------------------------ */
  const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const toggleModal = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItems.forEach(item => {
    item.addEventListener("click", () => {
      modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
      toggleModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", toggleModal);
  }
  if (overlay) {
    overlay.addEventListener("click", toggleModal);
  }

  /* ------------------------------
     Custom Select + Filter
  ------------------------------ */
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]"); // fixed typo
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  if (select) {
    select.addEventListener("click", () => elementToggle(select));
  }

  const filterFunc = selected => {
    filterItems.forEach(item => {
      if (selected === "all" || selected === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedValue = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText;
      elementToggle(select);
      filterFunc(selectedValue);
    });
  });

  if (filterBtns.length > 0) {
    let lastClickedBtn = filterBtns[0];
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedValue = btn.innerText.toLowerCase();
        selectValue.innerText = btn.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        btn.classList.add("active");
        lastClickedBtn = btn;
      });
    });
  }

  /* ------------------------------
     Contact Form Validation
  ------------------------------ */
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  /* ------------------------------
     Page Navigation
  ------------------------------ */
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
      const pageName = link.dataset.target;

      // Toggle active class on pages
      pages.forEach(page => {
        if (pageName === page.dataset.page) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      // Toggle active class on nav links
      navigationLinks.forEach(nav => {
        if (nav === link) {
          nav.classList.add("active");
        } else {
          nav.classList.remove("active");
        }
      });

      window.scrollTo(0, 0);
    });
  });

  /* ------------------------------
     Dynamic About Section Animations
  ------------------------------ */
  
  // Animate stats on scroll
  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = target.textContent;
          const isPercentage = finalValue.includes('%');
          const isPlus = finalValue.includes('+');
          const isM = finalValue.includes('M');
          
          let numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
          let currentValue = 0;
          const increment = numericValue / 50;
          
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
              currentValue = numericValue;
              clearInterval(timer);
            }
            
            let displayValue = Math.floor(currentValue);
            if (isM) displayValue += 'M';
            if (isPlus) displayValue += '+';
            if (isPercentage) displayValue += '%';
            
            target.textContent = displayValue;
          }, 30);
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
  };

  // Animate tech tags on hover
  const techTags = document.querySelectorAll('.tech-tag');
  techTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Initialize animations
  animateStats();

});