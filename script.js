/* =====================================
   PREPCSE REGISTRATION PORTAL
   FINAL SCRIPT.JS
===================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbxvAwDtRIdvVnv-M5xiABNB88ZCLCp6Sv777LnqbTm-mJb9ezFn3P67PJCylBNs4ol39g/exec";

let currentLanguage = "en";

/* =====================================
   PAGE NAVIGATION
===================================== */

function hideAllPages() {

    document.querySelectorAll(".page")
    .forEach(page => {
        page.style.display = "none";
    });

}

function showPage(pageId) {

    hideAllPages();

    document.getElementById(pageId)
    .style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* =====================================
   LANGUAGE SELECTION
===================================== */

function setLanguage(language) {

    currentLanguage = language;

    applyLanguage();

    showPage("landingPage");

}

/* =====================================
   TRANSLATIONS
===================================== */

function applyLanguage() {

    if(currentLanguage === "hi") {

        document.getElementById("landingTagline").innerText =
        "जहाँ अभ्यर्थी प्रशासक बनते हैं";

        document.getElementById("journeyHeading").innerText =
        "एलबीएसएनएए की यात्रा";

        document.getElementById("step1").innerText =
        "तैयारी";

        document.getElementById("step2").innerText =
        "उत्तर लेखन";

        document.getElementById("step3").innerText =
        "साप्ताहिक परीक्षा";

        document.getElementById("step4").innerText =
        "यूपीएससी सिविल सेवा परीक्षा";

        document.getElementById("step5").innerText =
        "सिविल सेवाएँ";

        document.getElementById("step6").innerText =
        "एलबीएसएनएए";

        document.getElementById("welcomeHeading").innerText =
        "स्वागत है अभ्यर्थी";

        document.getElementById("welcomeText").innerText =
        "अनुशासन, निरंतरता और उत्तर लेखन पर आधारित समुदाय से जुड़ें।";

        document.getElementById("registerBtn").innerText =
        "🚀 पंजीकरण करें";

    }

}

/* =====================================
   SHOW INSTRUCTIONS
===================================== */

function showInstructions() {

    showPage("instructionsPage");

}

/* =====================================
   VALIDATE INSTRUCTIONS
===================================== */

function validateInstructions() {

    for(let i=1;i<=7;i++){

        const selected =
        document.querySelector(
        `input[name="inst${i}"]:checked`);

        if(!selected){

            alert(
            currentLanguage==="hi"
            ? `कृपया निर्देश ${i} चुनें`
            : `Please select instruction ${i}`
            );

            return;
        }

        if(selected.value !== "accept"){

            alert(
            currentLanguage==="hi"
            ? "सभी निर्देश स्वीकार करना आवश्यक है।"
            : "All instructions must be accepted."
            );

            return;
        }

    }

    const declaration =
    document.querySelector(
    'input[name="declaration"]:checked');

    if(!declaration){

        alert(
        currentLanguage==="hi"
        ? "कृपया घोषणा स्वीकार करें।"
        : "Please accept declaration."
        );

        return;
    }

    if(declaration.value !== "accept"){

        alert(
        currentLanguage==="hi"
        ? "घोषणा स्वीकार करना आवश्यक है।"
        : "Declaration must be accepted."
        );

        return;
    }

    showPage("registrationPage");

}

/* =====================================
   GO HOME
===================================== */

function goToHome(){

    showPage("landingPage");

}

/* =====================================
   FORM SUBMISSION
===================================== */

document.addEventListener(
"DOMContentLoaded",
function(){

    const form =
    document.getElementById(
    "registrationForm"
    );

    if(!form) return;

    form.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const submitBtn =
        document.getElementById(
        "submitBtn"
        );

        submitBtn.disabled = true;

        submitBtn.innerText =
        currentLanguage==="hi"
        ? "जमा किया जा रहा है..."
        : "Submitting...";

        const data = {

            fullName:
            document.getElementById(
            "fullName"
            ).value,

            email:
            document.getElementById(
            "email"
            ).value,

            dob:
            document.getElementById(
            "dob"
            ).value,

            state:
            document.getElementById(
            "state"
            ).value,

            graduationDegree:
            document.getElementById(
            "graduationDegree"
            ).value,

            attemptsTillNow:
            document.getElementById(
            "attemptsTillNow"
            ).value,

            upscAttemptYear:
            document.getElementById(
            "upscAttemptYear"
            ).value,

            optionalSubject:
            document.getElementById(
            "optionalSubject"
            ).value,

            currentOccupation:
            document.getElementById(
            "currentOccupation"
            ).value,

            telegramUsername:
            document.getElementById(
            "telegramUsername"
            ).value,

            whyJoin:
            document.getElementById(
            "whyJoin"
            ).value

        };

        try{

            const response =
            await fetch(
            API_URL,
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:
                JSON.stringify(data)
            });

            const result =
            await response.json();

            if(result.success){

                form.reset();

                showPage(
                "successPage"
                );

            }
            else{

                alert(
                currentLanguage==="hi"
                ? "कुछ त्रुटि हुई।"
                : "Something went wrong."
                );

            }

        }
        catch(error){

            console.error(error);

            alert(
            currentLanguage==="hi"
            ? "सर्वर से संपर्क नहीं हो सका।"
            : "Unable to connect to server."
            );

        }

        submitBtn.disabled = false;

        submitBtn.innerText =
        currentLanguage==="hi"
        ? "पंजीकरण जमा करें"
        : "Submit Registration";

    });

});

/* =====================================
   INITIAL PAGE
===================================== */

document.addEventListener(
"DOMContentLoaded",
function(){

    showPage(
    "languagePage"
    );

});
