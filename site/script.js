// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Set Open Container
gsap.set('.open', { opacity: 0, y: 50 });

// Pin Final Grid
ScrollTrigger.create({
    trigger: '.final-grid-wrapper',
    start: 'top top',
    pin: true,
    scrub: false,
    endTrigger: '#finalPage',
    end: 'center center',
    pinSpacing: false
  });

// Load Zoom Dots
window.addEventListener('load', () => {
    createZoomDotsFromViewportPixels([
      { x: 159, y: 197, color: 'rgb(125, 126, 117)' },
      { x: 388, y: 370, color: 'rgb(162, 87, 53)' },
      { x: 603, y: 607, color: 'rgb(39, 33, 30)' }
    ]);
  });
  

// Set Merge Point Variables
let mergeLeftVw = 0;
let mergeTopVh = 0;

gsap.set('.intro-photo img', {
    opacity: 0,
    y: '5vh',
    scale: 1
  });

  gsap.set('.final-photo', {
    opacity: 0,
    transformOrigin: 'center center',
    position: 'absolute'
  });

// Rotating Background //
gsap.to('.rotating-bg', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
});

// Open Initial State
gsap.set('.open', {
    opacity: 0,
  });

// Title Timeline //
const titleTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.title',
        start: 'center center',
        end: 'bottom 75%',
        scrub: true,
        pin: true,
    }
}); 

// Calculate Merged Point
titleTimeline
    .to('.masked-title', {
        opacity: 1,
        duration: 0.5
    })
    .to(['.corner-text', '.icons'], {
        opacity: 0,
        duration: 0.7   
    })
    .to('.title h1', {
        opacity: 0,
        y: -100,
        duration: 0.7   
    })
;  

// Opener Animation
const words = [
"immigrant",
"refugee",
"prisoner",
"convict",
"inmate",
"felon",
"welfare recipient",
"gang member",
"drug dealer",
"janitor",
"street vendor",
"deportee",
"cab driver",
"construction worker",
"homeless person",
"orphan",
"farmer",
"pharmacist",
"nurse",
"receptionist",
"security guard",
"volunteer",
"social worker",
"activist",
"elite",
"trust-funder",
"capitalist",
"pastor",
"lawyer",
"business executive",
"philanthropist",
"banker",
"doctor",
"politician",
"leader",
"software engineer",
"judge",
"professor",
"architect",
"astronaut", "human"
];

const display = document.getElementById('open-wordDisplay');

// Opener Timeline
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".open",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    pinSpacing: false
  }
});

tl.fromTo('.open', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
const timePerWord = 0.9; // Adjustable total time per word

words.forEach((word, i) => {
  const startTime = i * timePerWord;

  tl.set(display, { textContent: word, opacity: 0 }, startTime);
  tl.to(display, { opacity: 1, duration: 0.15 }, startTime);

  if (i < words.length - 1) {
    tl.to(display, {}, { duration: 0.6 }, startTime + 0.15); // hold
    tl.to(display, { opacity: 0, duration: 0.15 }, startTime + 0.75);
  }  
});

const totalWordDuration = words.length * timePerWord;
tl.to('.open', {
  opacity: 0,
  y: "-20vh",
  duration: 3,
  ease: 'power2.out'
}, totalWordDuration + 5); 


// SACRED TIMELINE SETUP // 
const scrollTextTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro-section',
        start: 'center center',
        endTrigger: '#scroll-end-marker', 
        end: 'top center', 
        scrub: 1,
        pin: true,
        pinSpacing: false, 
    }
});

// Scroll-line Texts Script - SOLID DO NOT TOUCH //
scrollTextTimeline
    .add('startTexts', 0); 
    scrollTextTimeline.to('.intro-photo img', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, 'startTexts'); 
const scrollLines = document.querySelectorAll(".scroll-line");
scrollLines.forEach((line, i) => {
    const text = line.querySelector(".scroll-text");
    text.style.zIndex = 100 - i; 
    const position = i === 0 ? 'startTexts' : "+=0.6";
    scrollTextTimeline
        .fromTo(text,
            { opacity: 0, y: "15vh" },
            { opacity: 1, y: "0vh", duration: 0.5 },
            position
        )
        .to(text, { 
            opacity: 1, 
            y: "0vh", 
            duration: 1.2 
        })
        .to(text, {
            opacity: 0,
            y: "-15vh",
            duration: 0.5
        });
});

// Scroll-line Break
const percent = 5/13; // PERCENT OF SCROLL LINE TO BREAK
const startLineIndex = Math.floor(scrollLines.length * percent);
const estimatedTimePerLine = 2.3; // Adjust if needed
const labelPosition = startLineIndex * estimatedTimePerLine;

scrollTextTimeline.add('startTransform', labelPosition);

const percent1 = 7/13; // PERCENT OF SCROLL LINE TO BREAK
const startLineIndex1 = Math.floor(scrollLines.length * percent1);
const estimatedTimePerLine1 = 2.3; // Adjust if needed
const labelPosition1 = startLineIndex1 * estimatedTimePerLine1;

scrollTextTimeline.add('startMerge', labelPosition1);

const percent2 = 8/13; // PERCENT OF SCROLL LINE TO BREAK
const startLineIndex2 = Math.floor(scrollLines.length * percent2);
const estimatedTimePerLine2 = 2.3; // Adjust if needed
const labelPosition2 = startLineIndex2 * estimatedTimePerLine2;

scrollTextTimeline.add('startZoom', labelPosition2);

const percent3 = 9/13; // PERCENT OF SCROLL LINE TO BREAK
const startLineIndex3 = Math.floor(scrollLines.length * percent3);
const estimatedTimePerLine3 = 2.3; // Adjust if needed
const labelPosition3 = startLineIndex3 * estimatedTimePerLine3;

scrollTextTimeline.add('Zoomretreat', labelPosition3);

const percent4 = 10/13; // PERCENT OF SCROLL LINE TO BREAK
const startLineIndex4 = Math.floor(scrollLines.length * percent4);
const estimatedTimePerLine4 = 2.3; // Adjust if needed
const labelPosition4 = startLineIndex4 * estimatedTimePerLine4;

scrollTextTimeline.add('finalgrid', labelPosition4);


const finalFadeoutIndex = 12; // (line 13, 0-based indexing)
const finalfadeoutTime = (finalFadeoutIndex + 1) * estimatedTimePerLine;

scrollTextTimeline.add('finalfadeout', finalfadeoutTime);

// Intro Transform 

function runScrollSyncedPhotoTransform() {
    const introPhoto = document.querySelector('.intro-photo img');
    const placeholder = document.querySelector('.first-cell-placeholder');
  
    // Clear transform-related properties only
    gsap.set(introPhoto, {
      clearProps: "x,y,scale,scaleX,scaleY,transform",
      x: 0,
      y: 0,
      scale: 1,
      transformOrigin: "top left"
    });
  
    // Wait for DOM to update before measuring
    requestAnimationFrame(() => {
      const introRect = introPhoto.getBoundingClientRect();
      const targetRect = placeholder.getBoundingClientRect();
  
      const xMove = targetRect.left - introRect.left;
      const yMove = targetRect.top - introRect.top;
      const scaleX = targetRect.width / introRect.width;
      const scaleY = targetRect.height / introRect.height;
  
      gsap.to(introPhoto, {
        x: xMove,
        y: yMove,
        scaleX: scaleX,
        scaleY: scaleY,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
            const gridIntroImage = document.querySelector('.grid-photo-intro');
          
            if (gridIntroImage) {
              gsap.set(gridIntroImage, { visibility: 'visible', opacity: 0});
          
              // CROSSFADE
              gsap.to(gridIntroImage, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                onStart: () => {
                  // delay
                  gsap.to(introPhoto, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                      introPhoto.style.display = 'none';
                    } 
                  });
                }
              });
            }
          
            // Reveal grid container (if needed)
            gsap.to('.grid-container', {
              autoAlpha: 1,
              duration: 0.7
            });
          }
      });
    });
  } 
  

scrollTextTimeline
    // FINDMEHERE
    .to({}, { duration: 0.5 })
    .call(runScrollSyncedPhotoTransform, null, 'startTransform')
    .to('.grid-container', {
        autoAlpha: 1,
        duration: 1,
        ease: 'power2.inOut',
        onStart: () => {
            waitForGridImagesAndApplyFade();
        }
    }, "< 0.25")//
    .call(mergeGridPhotosToCenter, null, 'startMerge')
    .call(() => {
        positionFinalPhotoAtConvergencePoint();
        gsap.set('.final-photo', { opacity: 0 }); 
    }, null, 'startMerge')
    .call(() => {
        gsap.set('.final-photo', {
            position: 'absolute',
            left: `${mergeLeftVw}vw`,  
            top: `${mergeTopVh}vh`,
            width: '5vw',
            height: '5vw',
            transform: 'translate(-50%, -50%) scale(1)',
            transformOrigin: 'center center',
            opacity: 0
        });
    }, null, 'startMerge')
    
    .to('.final-photo', {
        opacity: 0.3,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        onComplete: function() {
            gsap.to('.final-photo', {
                scale: 8,
                top: '50vh',
                opacity: 1,
                duration: 1.5, 
                ease: 'power3.inOut',
                onComplete: () => {
                    gsap.to('.grid-container', {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            })
        } 
    }, 'startMerge+=0.3')
    
    .to('.zoom-dot', {
        opacity: 1,
        width: '4vw',
        height: '4vw',
        border: '3px solid white',
        stagger: 0.1,
        duration: 1.5
      }, 'startZoom+=0.5')

    .to('.zoom-dot', {
        opacity: 0,
        width: '0vw',
        height: '0vw',
        duration: 1.5
      }, 'Zoomretreat+=0.5')

    .to('.final-photo', {
    opacity: 0,
    visible: 'hidden',
    pointerEvents: 'none',
    duration: 1,
    ease: 'power2.inOut',
    onComplete: () => {
        gsap.set('.final-grid-wrapper', {
        visibility: 'visible',
        pointerEvents: 'auto'
        })

        gsap.to('.scroll-line:nth-child(9)', { // 0-based indexing → line 9 = index 10
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out'
          });
        
        setTimeout(() => {},300);

        gsap.to('.final-grid-wrapper', {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
        });

        
        gsap.to('#finalGrid img', {
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: 'power2.out',
        });
    }
    }, 'finalgrid')
    
      .call(() => {
        ScrollTrigger.getById('finalGridPin')?.kill(); 
        gsap.to('.final-grid-wrapper', {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            gsap.set('.final-grid-wrapper', { display: 'none' });
          }
        });
      
        gsap.set('#finalPage', {
          visibility: 'visible',
          pointerEvents: 'auto'
        });
      
        gsap.to('#finalPage', {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out'
        });
      }, null, 'finalfadeout+=6'); 



function positionFinalPhotoAtConvergencePoint() {
    const finalPhoto = document.querySelector('.final-photo');
  
    const targetX = window.innerWidth * 0.15 + (window.innerWidth * 0.3) / 2;
    const targetY = window.innerHeight * 0.4;

    mergeLeftVw = (targetX / window.innerWidth) * 100;
    mergeTopVh = (targetY / window.innerHeight) * 100;    
  
    const leftVw = (targetX / window.innerWidth) * 100;
    const topVh = (targetY / window.innerHeight) * 100;
  
    finalPhoto.style.position = 'absolute';
    finalPhoto.style.left = `${leftVw}vw`;
    finalPhoto.style.top = `${topVh}vh`;
    finalPhoto.style.width = `5vw`;
    finalPhoto.style.height = `auto`;
    finalPhoto.style.transform = `translate(-50%, -50%)`; 
  }

// Merge Animation

function mergeGridPhotosToCenter() {
    const introPhoto = document.querySelector('.intro-photo img');
    const gridPhotos = document.querySelectorAll('.grid-photo');
  
    const targetX = window.innerWidth * 0.15 + (window.innerWidth * 0.3) / 2;
    const targetY = window.innerHeight * 0.4;
  
    gridPhotos.forEach((photo, i) => {
      const rect = photo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      const xMove = targetX - centerX;
      const yMove = targetY - centerY;
  
      gsap.to(photo, {
        x: xMove,
        y: yMove,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
    });
    // Animate the intro photo too
    const introRect = introPhoto.getBoundingClientRect();
    const introX = introRect.left + introRect.width / 2;
    const introY = introRect.top + introRect.height / 2;

    const xMoveIntro = targetX - introX;
    const yMoveIntro = targetY - introY;

    const gridIntroImage = document.querySelector('.grid-photo-intro');
    if (gridIntroImage) {
    gsap.to(gridIntroImage, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
            gridIntroImage.style.display = 'none'; 
        }
    });
    }


    gsap.to(introPhoto, {
        x: xMoveIntro,
        y: yMoveIntro,
        // scale: 0.2,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',  
    });
  }
 
// Final Photo Sizing

function positionFinalPhotoToPlaceholder() {
    const finalPhoto = document.querySelector('.final-photo');
    const placeholder = document.querySelector('.first-cell-placeholder');
  
    const placeholderRect = placeholder.getBoundingClientRect();
  
    // Convert to viewport units
    const leftVw = (placeholderRect.left / window.innerWidth) * 100;
    const topVh = (placeholderRect.top / window.innerHeight) * 100;
    const widthVw = (placeholderRect.width / window.innerWidth) * 100;
    const heightVh = (placeholderRect.height / window.innerHeight) * 100;
  
    finalPhoto.style.position = 'absolute';
    finalPhoto.style.left = `${leftVw}vw`;
    finalPhoto.style.top = `${topVh}vh`;
    finalPhoto.style.width = `${widthVw}vw`;
    finalPhoto.style.height = `${heightVh}vh`;
    finalPhoto.style.transform = `translate(0, 0)`;
  }

function applyColumnFadeEffectRobust() {
  console.log("Attempting to apply column fade effect");
  
  const gridPhotos = document.querySelectorAll('.grid-photo');
  
  if (gridPhotos.length === 0) {
    console.warn("No grid photos found when applying column fade effect!");
    return; // Exit if no photos are found
  }
  
  console.log(`Found ${gridPhotos.length} grid photos for fade effect`);
  
  const photosByColumn = {};
  
  gridPhotos.forEach((photo) => {
    const rect = photo.getBoundingClientRect();
    const column = Math.round(rect.left); 
    
    if (!photosByColumn[column]) {
      photosByColumn[column] = [];
    }
    
    photosByColumn[column].push(photo);
  });
  
  Object.values(photosByColumn).forEach(column => {
    column.sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return rectA.top - rectB.top;
    });
  });
  
  const columns = Object.keys(photosByColumn).sort((a, b) => parseInt(a) - parseInt(b));
  
  console.log(`Identified ${columns.length} columns for fade effect`);
  
  columns.forEach((column, columnIndex) => {
    const photos = photosByColumn[column];
    
    const reverseIndex = columns.length - 1 - columnIndex;
    const fadeAmount = reverseIndex / (columns.length - 1);
    
    console.log(`Column ${columnIndex} (reversed: ${reverseIndex}): opacity = ${0.3 + (0.7 * fadeAmount)}`);
    
    photos.forEach((photo) => {
      // Start with full opacity
      gsap.set(photo, { opacity: 1 });
      
      // Apply column-based fade - columns on right are more transparent
      gsap.to(photo, {
        opacity: 0.3 + (0.7 * fadeAmount), 
        duration: 0.5,
        delay: reverseIndex * 0.05, 
        ease: 'power1.out',
        onComplete: () => photo.setAttribute('data-faded', 'true')
      });
    });
  });
  
  console.log("Column fade effect applied successfully");
}

// Function to wait for grid images to be loaded
function waitForGridImagesAndApplyFade() {
  const gridContainer = document.querySelector('.grid-container');
  
  if (!gridContainer) {
    console.warn("Grid container not found!");
    return;
  }
  
  gsap.set(gridContainer, { autoAlpha: 1 });
  
  const maxWaitTime = 2000; 
  const checkInterval = 100; 
  let elapsedTime = 0;
  
  const checkForImages = () => {
    const gridPhotos = document.querySelectorAll('.grid-photo');
    
    if (gridPhotos.length > 0) {
      console.log(`Found ${gridPhotos.length} grid photos, applying fade effect`);
      // Apply the fade effect
      applyColumnFadeEffectRobust();
    } else if (elapsedTime < maxWaitTime) {
      elapsedTime += checkInterval;
      setTimeout(checkForImages, checkInterval);
    } else {
      console.warn("Timed out waiting for grid photos to load!");
    }
  };
  
  // Start checking
  checkForImages();
}

// Dynamic Grid //

function setupDynamicGrid() {
    console.log("✅ setupDynamicGrid running");
    console.log("🤖 container found?", document.querySelector('.grid-container'));
    const container = document.querySelector('.grid-container');
    const paddingVw = 5; 
    const gapVw = 1; 
    
    let firstCellPosition = { x: 0, y: 0, size: 0 };
  
    function optimizeGrid() {
      const availableWidthVw = 100 - (paddingVw * 2);
      const availableHeightVh = 100 - (paddingVw * 2);
      
      const availableWidthPx = (window.innerWidth * availableWidthVw) / 100;
      const availableHeightPx = (window.innerHeight * availableHeightVh) / 100;
      const gapPx = (window.innerWidth * gapVw) / 100;
      
      const viewportRatio = availableWidthPx / availableHeightPx;

      let columns = Math.floor(Math.sqrt(viewportRatio * 100)); 
      
      const itemSizeVw = (availableWidthVw - ((columns - 1) * gapVw)) / columns;
      const itemSizeVh = (itemSizeVw * window.innerWidth) / window.innerHeight;
      const possibleRows = Math.floor((availableHeightVh - gapVw) / (itemSizeVh + gapVw));
      
      const totalItems = columns * possibleRows;
      
      container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      container.style.gridTemplateRows = `repeat(${possibleRows}, 1fr)`;
      container.style.width = `${itemSizeVw * columns + gapVw * (columns - 1)}vw`;
      container.style.height = `${itemSizeVh * possibleRows + gapVw * (possibleRows - 1)}vh`;
      container.style.gap = `${gapVw}vw`;
      container.style.padding = `0`; 
      
      container.style.top = `50%`;
      container.style.left = `50%`;
      container.style.transform = `translate(-50%, -50%)`;
      
      firstCellPosition = {
        x: paddingVw, 
        y: paddingVw, 
        width: itemSizeVw, 
        height: itemSizeVh 
      };
      console.log("📦 calling loadTopImages() with", totalItems - 1, "images");
      console.log(`Created grid: ${columns}×${possibleRows} = ${totalItems} items`);
      
      
      loadTopImages(totalItems - 1, true);

      positionPlaceholder(itemSizeVw, itemSizeVh);
      const introImg = document.createElement('img');
      introImg.src = 'photos/intro-photo.png';
      introImg.alt = 'Intro photo in grid';
      introImg.classList.add('grid-photo', 'grid-photo-intro');
      introImg.style.opacity = 0; // starts hidden
      introImg.style.pointerEvents = 'none'; 
      introImg.style.visibility = 'hidden'; 
      introImg.style.gridColumn = '1 / 2';
      introImg.style.gridRow = '1 / 2';
      container.appendChild(introImg);
    }
    
    function positionPlaceholder(widthVw, heightVh) {
      // Remove any existing placeholder
      const existingPlaceholder = document.querySelector('.first-cell-placeholder');
      if (existingPlaceholder) existingPlaceholder.remove();
      
      // Create a new placeholder
      const placeholder = document.createElement('div');
      placeholder.classList.add('first-cell-placeholder');
      placeholder.style.width = `${widthVw}vw`;
      placeholder.style.height = `${heightVh}vh`;
      placeholder.style.gridColumn = '1 / 2';
      placeholder.style.gridRow = '1 / 2';
      
      container.appendChild(placeholder);
    }
    
    optimizeGrid();
    window.addEventListener('resize', optimizeGrid);
    
    return function getDestinationCoords() {
      return firstCellPosition;
    };
  }
  
  function loadTopImages(count, skipFirst = false) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Clear previous images
    
    const startIndex = skipFirst ? 2 : 1;
    const endIndex = skipFirst ? count + 1 : count;
    
    for(let i = startIndex; i <= endIndex; i++) {
      const img = document.createElement('img');
      img.src = `photos/grid/grid${i}.png`;
      img.alt = `Grid image ${i}`;
      img.classList.add('grid-photo');
      gridContainer.appendChild(img);
    }
  }
  

  let getDestinationCoords;

    window.addEventListener("DOMContentLoaded", () => {
    console.log("🎉 DOM fully loaded, initializing grid");
    getDestinationCoords = setupDynamicGrid();
    });


gsap.to('.grid-container img', {
    opacity: 1,
    scale: 1,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.grid',
        start: 'top center',
        end: 'bottom center',
        scrub: true
    }
});

function positionOverlayToMatchFinalPhoto() {
    const photo = document.querySelector('.final-photo');
    const overlay = document.querySelector('.zoom-dot-overlay');
    const rect = photo.getBoundingClientRect();

    Object.assign(overlay.style, {
        position: 'absolute',
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        pointerEvents: 'none',
        zIndex: 9999
    });
}

function createZoomDotsFromViewportPixels(pixelCoords) {
    const container = document.querySelector('.zoom-dot-overlay');
    const rect = container.getBoundingClientRect();

    console.log("Final photo position:", rect.left, rect.top, rect.right, rect.bottom, rect.width, rect.height);
  
    pixelCoords.forEach(({ x, y, color }) => {
      const relativeX = x/800 * 100;
      const relativeY = y/800 * 100;

      if (relativeX < 0 || relativeX > 100 || relativeY < 0 || relativeY > 100) {
        console.warn('Dot out of bounds:', { relativeX, relativeY });
        return;
      }
  
      const dot = document.createElement('div');
      dot.classList.add('zoom-dot');
      dot.style.position = 'absolute';
      dot.style.left = `${relativeX}%`;
      dot.style.top = `${relativeY}%`;
      dot.style.backgroundColor = color;
      container.appendChild(dot);
    });
  }


// Zoom Modal 
function openModal(src, caption) {
    console.log("🟢 openModal called:", src, caption);
    const modal = document.getElementById('zoomModal');
    const modalImg = document.getElementById('zoomImg');
    const modalCaption = document.getElementById('zoomCaption');
  
    modalImg.src = src;
    modalCaption.textContent = caption;
    modal.classList.add('show');
  }
  
  function closeModal() {
    document.getElementById('zoomModal').classList.remove('show');
  }

const captions = [
"An Immigrant",
"A Capitalist",
"A Convict",
"A Welfare Recipient",
"A Business Executive",
"A Janitor",
"A Street Vendor",
"A Deportee",
"A Cab Driver",
"A Construction Worker",
"A Trust-Funder",
"A Homeless Person",
"A Farmer",
"A Pharmacist",
"A Refugee",
"A Nurse",
"A Gang Member",
"A Lawyer",
"A Security Guard",
"A Felon",
"A Volunteer",
"An Elite",
"A Pastor",
"A Philanthropist",
"A Banker",
"An Orphan",
"A Social Worker",
"A Doctor",
"An Inmate",
"A Politician",
"A Receptionist",
"An Activist",
"A Software Engineer",
"A Drug Dealer",
"A Judge",
"A Professor",
"A Leader",
"An Architect",
"A Prisoner",
"An Astronaut",
];

function createFinalGrid() {
    const grid = document.getElementById("finalGrid");

    const finalCell = document.createElement("img");
    finalCell.src = "photos/final-grid/immigrant_med.png";
    finalCell.classList.add("final-grid-photo");
    finalCell.style.opacity = 0;
    finalCell.onclick = () => openModal(finalCell.src, "An Immigrant");
    grid.appendChild(finalCell);

    for (let i = 1; i <= 39; i++) {
    const img = document.createElement("img");
    img.src = `photos/final-grid/portrait${i}.png`;
    img.alt = `Grid image ${i}`;
    img.classList.add("final-grid-photo");
    img.style.opacity = 0;
    img.onclick = () => openModal(img.src, captions[i] || `Photo ${i}`);
    grid.appendChild(img);
    }
}

  // Auto-run after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    createFinalGrid();
  }); 