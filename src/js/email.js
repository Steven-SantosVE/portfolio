const sendEmail = () => {
    let templateID = "template_4e993im";
    let serviceID = "service_26h15xs";

    let params = {
        user_email : document.querySelector(".email-holder").value,
        message : document.querySelector(".message-holder").value,
    };

    emailjs.send(
        serviceID, 
        templateID, 
        params
    )
    .then(res => {
        document.querySelector(".email-holder").value = "";
        document.querySelector(".message-holder").value = "";
        console.log(res);
    }).catch(err => console.log(err));
}

document.querySelector(".contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
});