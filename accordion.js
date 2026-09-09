// ACCORDION MENU
// active header global var
let activeAccordionHeader = null;
let isSectionOpen = false;

function openBrowse(targetId = null){
    const accordianMenu = document.getElementById("accordionMenu");
    const fadeScreen = document.getElementById("fadeScreen");

    accordianMenu.classList.add("showMenu");
    fadeScreen.classList.add("showFadeScreen");
    document.body.style.overflow = 'hidden';

    fadeScreen.addEventListener('click', function() {
      closeBrowse();
    });


  if (window.location.href.includes("shop")) {
    const accordianMenu = document.getElementById("accordionMenu");
    accordianMenu.classList.add("bumpUp");
  }
  
	if (targetId) {
		isSectionOpen = true;
		  setTimeout(() => {
			const targetHeader = document.getElementById(targetId);
			if (targetHeader && targetHeader.getAttribute('aria-expanded') !== 'true') {
			  targetHeader.click();
			}
		  }, 50);
		}
  

}

function closeBrowse() {
    const accordianMenu = document.getElementById("accordionMenu");
    const fadeScreen = document.getElementById("fadeScreen");

    if (accordianMenu) accordianMenu.classList.remove("showMenu");
    if (fadeScreen) fadeScreen.classList.remove("showFadeScreen");
    document.body.style.overflow = '';

    // close active accordion header
    if (activeAccordionHeader) {
        activeAccordionHeader.setAttribute('aria-expanded', 'false');
        
		activeAccordionHeader.classList.remove('accordion-active');
		
        const content = activeAccordionHeader.nextElementSibling;
        if (content) {
            content.style.maxHeight = null;
        }
        
        // reset the active header var
        activeAccordionHeader = null;
    }
	
	isSectionOpen = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const accordionMenu = document.getElementById('accordionMenu');
				


  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      
      // safety, stop if there's no sibling
      if (!content) {
        console.warn("No sibling content", header);
        return;
      }

      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // close other accordions first
      if (activeAccordionHeader && activeAccordionHeader !== header) {
          activeAccordionHeader.setAttribute('aria-expanded', 'false');
		  activeAccordionHeader.classList.remove('accordion-active');
		  
          const activeContent = activeAccordionHeader.nextElementSibling;
          if (activeContent) {
              activeContent.style.maxHeight = null;
          }
      }

      // toggle accordion header
      if (isExpanded) {
        // collapsing the current header
        header.setAttribute('aria-expanded', 'false');
		header.classList.remove('accordion-active');
        content.style.maxHeight = null;
        
        // clear global header var
        activeAccordionHeader = null;
      } else {
        // open current header
        header.setAttribute('aria-expanded', 'true');
		header.classList.add('accordion-active');
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // save header to var
        activeAccordionHeader = header;


		//smooth scrolling to header top
		if (isSectionOpen) {
			setTimeout(() => {
			  if (accordionMenu) {
			  
				// Calculates distance from top of menu container to the header
				const headerPosition = header.offsetTop - accordionMenu.offsetTop;
				
				accordionMenu.scrollTo({
				  top: header.offsetTop,
				  behavior: 'smooth'
				});
			  }
			}, 230);
			
			isSectionOpen = false;
		}

		
      }

    });
  });
});