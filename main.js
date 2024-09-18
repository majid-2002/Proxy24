const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
  });
}

function toggleAccordion(index) {
  const content = document.getElementById(`content-${index}`);
  const icon = document.getElementById(`icon-${index}`);
  const accordionBtn = document.getElementById(`accordion-btn-${index}`);
  const faqBg = content.querySelector(".faq_bg_transition");

  // SVG for Minus icon
  const minusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  `;

  // SVG for Plus icon
  const plusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  `;

  if (content.style.maxHeight && content.style.maxHeight !== "0px") {
    // Close the accordion
    content.style.maxHeight = "0";
    icon.innerHTML = plusSVG;
    accordionBtn.classList.remove("rounded-b-none");
    content.classList.remove("rounded-b-xl");
    icon.style.color = "white";
    accordionBtn.style.color = "white";

    // Ensure the background transition happens first
    setTimeout(() => {
      faqBg.classList.remove("active");
      accordionBtn.classList.remove("accordion-open");
    }, 300); // Duration of the content and background transition
  } else {
    // Open the accordion
    content.style.maxHeight = content.scrollHeight + "px";
    icon.innerHTML = minusSVG;
    accordionBtn.classList.add("rounded-b-none");
    accordionBtn.classList.remove("text-white");
    accordionBtn.style.color = "var(--freshlime)";
    icon.style.color = "var(--freshlime)";

    content.classList.add("rounded-b-xl");

    accordionBtn.classList.add("accordion-open");
    setTimeout(() => {
      faqBg.classList.add("active");
    }, 100); // Small delay to ensure the transition applies after content opens
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cursorDot = document.querySelector("[data-cursor-dot]");
  // const cursorOutline = document.querySelector("[data-cursor-outline]"); // Remove this line

  if (!cursorDot) {
    console.error("Cursor dot element not found.");
    return;
  }

  function updateCursorColor(x, y) {
    const sections = document.querySelectorAll(
      ".hero_section, .scroller_section, .about_us"
    );
    let inSection = "default";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        if (section.classList.contains("hero_section")) {
          inSection = "section1";
        } else if (section.classList.contains("about_us")) {
          inSection = "section2";
        } else {
          inSection = "default";
        }
      }
    });

    cursorDot.className = `cursor-dot ${inSection}`;
    // cursorOutline.className = `cursor-outline ${inSection}`; // Remove this line
  }

  // Event listener for mouse move
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Remove the outline positioning
    // cursorOutline.style.left = `${posX}px`;
    // cursorOutline.style.top = `${posY}px`;

    updateCursorColor(posX, posY);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const createOdometer = (el, value) => {
    if (el) {
      const odometer = new Odometer({
        el,
        value: 0,
      });
      odometer.update(value);
    }
  };

  const hours_odometer = document.querySelector(".hours_odometer");
  const prize_odometer = document.querySelector(".prize_odometer");
  const events_odometer = document.querySelector(".events_odometer");
  const first_od = document.querySelector(".first_od");
  const second_od = document.querySelector(".second_od");
  const third_od = document.querySelector(".third_od");

  // Function to trigger all odometers
  const triggerOdometers = () => {
    createOdometer(hours_odometer, 36);
    createOdometer(prize_odometer, 60000);
    createOdometer(events_odometer, 3);
    createOdometer(first_od, 30000);
    createOdometer(second_od, 20000);
    createOdometer(third_od, 10000);
  };

  const highlightsSection = document.querySelector(".highlights_section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerOdometers();
          // Stop observing once the odometers are triggered
          observer.unobserve(highlightsSection);
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the section is visible
    }
  );

  observer.observe(highlightsSection);
});
