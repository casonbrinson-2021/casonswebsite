/*
 * Developer: Cason Brinson
 * Date Created: 12/05/2021
 */

/* set the scroll position to be at the top of the page */
setTimeout(function() {window.scrollTo(0,0);}, 1);

 /* get elements we need form the webpage for the animaitons */
const navBar = document.querySelector("nav");                           //the nav bar
const navContainer = document.querySelector("#div-nav-bar");            // div containing the nav bar

//get the body for static views etc
const body = document.querySelector("body");
const blurElem = document.querySelector(".container-mobile-blur");

//mobile nav side bar
const menuButton = document.querySelector(".container-menu-icon");
const closeButton = document.querySelector(".container-close-icon");
const sideBar = document.querySelector(".container-mobile-side-bar");
const menuLinks = document.querySelectorAll(".mobile-nav-link");




/* set variables we need */
let lastScrollPosY = window.scrollY;            //the Y position the page is scrolled to
let scrolledToBottom = false;                    //start off with the user not at the bottom of the page




/* set up the event listeners that will trigger various functions */
//window.addEventListener("scroll", scrollFunction);                  //called whenever the user scrolls
//navContainer.addEventListener("mouseenter", enterNavbarFunction);   //called based on mouse entering element
//navContainer.addEventListener("mouseleave", leaveNavbarFunction);   //called based on mouse leaving element

//add event listener for the mobile side bar
menuButton.addEventListener("click", clickMenuFunction);
closeButton.addEventListener("click", clickCloseFunction);
menuLinks.forEach(link => {
    link.addEventListener("click", clickCloseFunction);
});



/* functions */
/*
 * gets called whenever the user scrolls
 */
function scrollFunction() {
    //set the current scroll y to be used for comparison
    let curScrollPosY = window.scrollY;
    
    scrolledToBottom = (((window.innerHeight + curScrollPosY) >= document.body.scrollHeight) ? true : false);

    //if the user is scrolling down hide the nav bar
    if(((lastScrollPosY < curScrollPosY) && (curScrollPosY >= 75)) && !scrolledToBottom) {
        navBar.classList.add("nav-hidden");
    }
    //if the user is scrolling up show the nav bar
    else {
        navBar.classList.remove("nav-hidden");
    }

    //reset the lastScrollPosY for the next time this function might get called
    lastScrollPosY = window.scrollY;
}

/* 
 * gets called whenever the user hover the mouse over the nav bar area of the screen
 */
function enterNavbarFunction() {
    navBar.classList.remove("nav-hidden");
}

/* 
 * gets called whenever the user was hovering over the nav bar and then moves themouse away
 */
function leaveNavbarFunction() {
    let curScrollPosY = window.scrollY;

    if(curScrollPosY >= 75) {
        navBar.classList.add("nav-hidden");
    }
}

/*
 * gets called at the start of the website load to setup the nav bar things
 */
function setupNavBarMouseEvents() {
    navContainer.addEventListener("mouseenter", enterNavbarFunction);   //called based on mouse entering element
    navContainer.addEventListener("mouseleave", leaveNavbarFunction);   //called based on mouse leaving element
    window.addEventListener("scroll", scrollFunction);                  //called whenever the user scrolls
}

/* 
 * gets called whenever the use clicks the menu button on the mobile navigation bar
 */
function clickMenuFunction()  {
    //stuff that activates the side bar menu
    sideBar.classList.add("show-side-bar");
    body.classList.add("stay");
    blurElem.classList.add("blur");
}

/* 
 * gets called whenever the user clickt he close menu button on the nav bar mobile
 */
function clickCloseFunction() {
    sideBar.classList.remove("show-side-bar");
    body.classList.remove("stay");
    blurElem.classList.remove("blur");
}




/* Animation stuff specifically */
/* Setup the hwole page for all aniamtions (this will run as soon as the page loads */
function setupPageForAnimations() {

    
    setupTypingAnimation();
    hideNavBar();
    navBar.style.transitionDuration = "0.8s";
    setupWelcomeTextAnimation();
    setupWelcomeSubtextAnimation();
    setupIntroAnimations();
    

    //observer setups
    setupAboutObserver();
    setupProjectsObserver();
    setupContactObserver();
    setupDividersObserver();
    
}

//hiding random things on the page that need to be gone for the opening animation
function hideNavBar() {
    navBar.classList.add("nav-hidden");
}
function showNavBar() {
    navBar.classList.remove("nav-hidden");
}
function resetNavBarAnimation() {
    navBar.style.transitionDuration = "0.2s";
}

//setting up everything involved in the typing animation
function setupTypingAnimation() {
    const typingOne = document.querySelector("#typing-animation-span");
    const typingTwo = document.querySelector("#typing-animation-glowing-span");
    document.querySelector("#typing-animation-text-all").classList.add("animate-blinking-cursor");
    typingOne.textContent = " ";
    typingTwo.textContent = "";

    typingOne.classList = "normal-color";
    typingTwo.classList = "normal-color";
}

//setting up everything for the welcome text animations
function setupWelcomeTextAnimation() {
    const welcomeElem = document.querySelector("#welcome-animation-top-text");
    const text = welcomeElem.textContent;
    welcomeElem.textContent = ""
    welcomeElem.innerHTML = "<span class=\"welcome-span\">" + text + "</span>";
}

//setting up everything for the welcome subtext animation() {
function setupWelcomeSubtextAnimation() {
    const welcomeSubElem = document.querySelector("#welcome-animation-bottom-text");
    const text = welcomeSubElem.textContent;
    welcomeSubElem.textContent = "";
    welcomeSubElem.innerHTML = "<span class=\"welcome-sub-span\">" + text + "</span>";
}


/* Here begins the animation specific functions and objects */
//keeps all of the variables needed for the typing animation together 
const typingAnimationVars = {
    text: "Hey there. My name is ",
    textTwo: "Cason Brinson.",
    letters: "",
    index: 0,
    displayedText: document.querySelector("#typing-animation-span"),
    animationNum: 1,
};

//takes care of everything for the typing animation
function typingAnimationFunction() {
    if(typingAnimationVars.letters === "") {
        document.querySelector("#typing-animation-text-all").classList = "cursor";
    }

    let typingSpeed = Math.random()*(300 - 50) + 50;

    //Add one letter to the text each time
    if(typingAnimationVars.letters.length < typingAnimationVars.text.length) {
        typingAnimationVars.letters += typingAnimationVars.text[typingAnimationVars.index];
        typingAnimationVars.index++;

        if((typingAnimationVars.text[typingAnimationVars.index] == '.') && (typingAnimationVars.animationNum > 1)) {
            typingSpeed = 1750;
            document.querySelector("#typing-animation-text-all").classList = "animate-blinking-cursor";
        } 
        if((typingAnimationVars.text[typingAnimationVars.index-1] == '.') && (typingAnimationVars.animationNum == 1)) {
            typingSpeed = 700;
        }
        if((typingAnimationVars.letters === typingAnimationVars.text) && typingAnimationVars.animationNum > 1) {
            typingSpeed = 2000;
            document.querySelector("#typing-animation-text-all").classList = "animate-blinking-cursor";
        }

        typingAnimationVars.displayedText.textContent = typingAnimationVars.letters;
        
        //loop the function again but with a delay (adding in some random speed components)
        setTimeout(typingAnimationFunction, typingSpeed);
    }
    else if(typingAnimationVars.animationNum < 2) {
        //reset all the variables so that we can animate the next part of the sentance
        typingAnimationVars.animationNum++;
        typingAnimationVars.displayedText = document.querySelector("#typing-animation-glowing-span");
        typingAnimationVars.text = typingAnimationVars.textTwo;
        typingAnimationVars.letters = "";
        typingAnimationVars.index = 0;

        //loop the function again now that all the variables have been reset
        setTimeout(typingAnimationFunction, typingSpeed);
    }
    else {
        document.querySelector(".animate-blinking-cursor").classList = "";
    }
}

//takes care of everything for the welcome text animation
function welcomeTextAnimation() {
    document.querySelector(".welcome-span").classList.add("fade-up");
}
function welcomeSubtextAnimation() {
    document.querySelector(".welcome-sub-span").classList.add("fade-up");
}

//takes care of everything with the intro section animations when the page loads
function setupIntroAnimations() {
    //stop the user form being able to scroll when the webpage initiall loads********
    document.querySelector("body").classList.add("stop-scroll");

    //setup the first observer things properly
    document.querySelector("#intro-image-left").classList.add("hide-image-left");
    document.querySelector("#intro-image-right").classList.add("hide-image-right");
    document.querySelector("#intro-text-all").classList.add("hide-text");
}
//the actual class adding for the intro animation
function introAnimation() {
    document.querySelector("#intro-text-all").classList.add("reveal-text");
    document.querySelector("#intro-image-left").classList.add("reveal-image-from-left");
    document.querySelector("#intro-image-right").classList.add("reveal-image-from-right");
}



/* setting up the intersection observers needed */
//about me section observers
function setupAboutObserver() {
    document.querySelector("#about-me-header-text").classList.add("hide-text");
    document.querySelector("#about-me-paragraph-text").classList.add("hide-text");
    document.querySelector(".container-about-me-logos").classList.add("hide-text");
}

const sectionAbout = document.querySelector(".section-about-me");
const sectionAboutOptions = {
    threshold: 1,
    rootMargin: "0px 0px -50px 0px",
};
const sectionAboutObserver = new IntersectionObserver(function (entries, sectionAboutObserver) {
    //function for the observer
    entries.forEach(entry => {
        if(entry.isIntersecting === false) {
            return;
        }
        else {
            //setup all the new styles now that the user sees the whole seciton and then unobserve this section so it stay
            document.querySelector("#about-me-header-text").classList.add("reveal-text");
            document.querySelector("#about-me-paragraph-text").classList.add("reveal-text");
            document.querySelector(".container-about-me-logos").classList.add("reveal-text");
            sectionAboutObserver.unobserve(entry.target);
        }
    });
}, sectionAboutOptions);
sectionAboutObserver.observe(sectionAbout);

//projects section observers
const projectPieces = document.querySelectorAll(".projects");
function setupProjectsObserver() {
    projectPieces.forEach(piece => {
        piece.classList.add("hide-project");
    });

}
const projectPiecesOptions = {
    threshold: 1,
    rootMargin: "0px 0px -50px 0px",
};
const projectPiecesObserver = new IntersectionObserver(function(entries, projectPiecesObserver) {
    //function for the observer
    entries.forEach(entry => {
        if(entry.isIntersecting === false) {
            return;
        }
        else {
            entry.target.classList.add("reveal-project");
            projectPiecesObserver.unobserve(entry.target);
        }
    });
}, projectPiecesOptions);
projectPieces.forEach(piece => {
    projectPiecesObserver.observe(piece);
});


//contact section observers
const contactPieces = document.querySelectorAll(".contact-piece");
function setupContactObserver() {
    contactPieces.forEach(piece => {
        piece.classList.add("hide-contact-piece");
    });
}
const contactPiecesOptions = {
    threshold: 1,
    rootMargin: "0px 0px -50px 0px",
};
const contactPiecesObserver = new IntersectionObserver(function(entries, contactPiecesObserver) {
    //function for the observer
    entries.forEach(entry => {
        if(entry.isIntersecting === false) {
            return;
        }
        else {
            entry.target.classList.add("reveal-contact-piece");
            contactPiecesObserver.unobserve(entry.target);
        }
    });
}, contactPiecesOptions);
contactPieces.forEach(piece => {
    contactPiecesObserver.observe(piece);
});


//section borders observer
const dividers = document.querySelectorAll(".container-divider");
function setupDividersObserver() {
    dividers.forEach(divider => {
        divider.classList.add("hide-divider");
    });
}
const dividersOptions = {
    threshold: 1,
    rootMargin: "0px 0px -200px 0px",
};
const dividersObserver = new IntersectionObserver(function(entries, dividersObserver) {
    //function for the observer
    entries.forEach(entry => {
        if(entry.isIntersecting === false) {
            return;
        }
        else {
            entry.target.classList.add("reveal-divider");
            dividersObserver.unobserve(entry.target);
        }
        
    });
}, dividersOptions);
dividers.forEach(divider => {
    dividersObserver.observe(divider);
});








/* Running everything you need to run on page load (animations etc.) */
//may want to find some way to run these beter than this but this works and sems to not be against any coding practices I'm aware of yet
/*
setupPageForAnimations(); 

setTimeout(typingAnimationFunction, 3000);
setTimeout(welcomeTextAnimation, 14000);
setTimeout(welcomeSubtextAnimation, 14200);
setTimeout(showNavBar, 14600);
setTimeout(resetNavBarAnimation, 14200);
setTimeout(introAnimation, 14200);
setTimeout(function() {document.querySelector("body").classList.remove("stop-scroll");}, 14800);
setTimeout(setupNavBarMouseEvents, 14800);
*/

setupNavBarMouseEvents();
setTimeout(function() {document.querySelector("body").classList.remove("stop-scroll");}, 2);


