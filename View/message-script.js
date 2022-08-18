let twtBtn = document.getElementById("twt-button");
let twtImg = document.getElementById("twt-img");
let igBtn = document.getElementById("ig-button");
let igImg = document.getElementById("ig-img");

let body = document.getElementById("body");
let message = document.getElementById("message");
let msgWarnEle = document.getElementById("msg-warn");
let prevImage = document.getElementById("preview-img");
let igPrev = document.getElementById("ig-preview");
let postButton = document.getElementById("post-button");

let twtBtnIsClick = false;
let igBtnIsClick = false;

let igFirstClick = false;
let msgValid = true;
let msgWarn;

twtBtn.addEventListener('mouseenter', twtMouseEnter);
twtBtn.addEventListener('mouseleave', twtMouseLeave);
twtBtn.addEventListener('click', twtClick);
igBtn.addEventListener('mouseenter', igMouseEnter);
igBtn.addEventListener('mouseleave', igMouseLeave);
igBtn.addEventListener('click', igClick);

function twtMouseEnter() {
    if (twtBtnIsClick === false) {
        twtBtn.style.cursor = 'pointer';
        twtBtn.style.backgroundColor = '#3FA3FF';
        twtBtn.style.borderColor = '#FFFFFF';
        twtBtn.style.boxShadow = 'var(--twtBS_a)';
        twtBtn.style.transform = 'scale(1.2)';
        twtBtn.style.marginTop = '-5px';
        twtBtn.style.transition = 'transform 100ms linear';
        twtImg.style.filter = 'brightness(0) invert(1) drop-shadow(3px 3px 2px rgba(0, 0, 0, .2))';
        twtImg.style.animation = 'bounce 1.25s ease-out';
    }
    else {
        twtImg.style.animation = 'none';
    }
}

function twtMouseLeave() {
    if (twtBtnIsClick === false) {
        twtBtn.style.cursor = 'default';
        twtBtn.style.backgroundColor = '#FFFFFF';
        twtBtn.style.borderColor = '#3FA3FF';
        twtBtn.style.boxShadow = 'var(--twtBS_b)';
        twtBtn.style.transform = 'scale(1)';
        twtBtn.style.marginTop = '0';
        twtBtn.style.transition = 'transform 100ms linear';
        twtImg.style.filter = 'none';
        twtImg.style.animation = 'none';
        twtImg.style.transition = 'transform 100ms linear';
    }
}

function twtClick() {
    if (twtBtnIsClick === false) {
        twtBtn.style.backgroundColor = '#3FA3FF';
        twtBtn.style.borderColor = '#FFFFFF';
        twtBtn.style.boxShadow = 'var(--twtBS_b)';
        twtBtn.style.transform = 'scale(1.1)';
        twtBtn.style.marginTop = '0';
        twtBtn.style.animation = 'transform 100ms linear';
        twtImg.style.filter = 'brightness(0) invert(1) drop-shadow(3px 3px 2px rgba(0, 0, 0, .2))';

        twtBtnIsClick = true;

        showWarn();

        if (msgValid) {
            if (!igBtnIsClick) {
                postButton.style.display = 'block';
                message.style.height = 'fit-content';
                body.style.height = 'var(--twtH)';
            } else {
                message.style.height = 'fit-content';
            }
        }
    }
    else {
        twtBtn.style.backgroundColor = '#FFFFFF';
        twtBtn.style.borderColor = '#3FA3FF';
        twtBtn.style.boxShadow = 'var(--twtBS_b)';
        twtBtn.style.transform = 'scale(1)';
        twtBtn.style.animation = 'transform 100ms linear';
        twtImg.style.filter = 'none';

        twtBtnIsClick = false;

        showWarn();

        if (msgValid) {
            if (!igBtnIsClick) {
                postButton.style.display = 'none';
                message.style.height = 'var(--msheight)';
                body.style.height = 'auto';
            } else {
                message.style.height = 'fit-content';
            }
        }
    }
}

function igMouseEnter() {
    if (igBtnIsClick === false) {
        igBtn.style.cursor = 'pointer';
        igBtn.style.backgroundColor = '#E25B5B';
        igBtn.style.borderColor = '#FFFFFF';
        igBtn.style.boxShadow = 'var(--igBS_a)';
        igBtn.style.transform = 'scale(1.2)';
        igBtn.style.marginTop = '-5px';
        igBtn.style.transition = 'transform 100ms linear';
        igImg.style.filter = 'brightness(0) invert(1) drop-shadow(3px 3px 2px rgba(0, 0, 0, .2))';
        igImg.style.animation = 'bounce 1.25s ease-out';
    }
    else {
        igImg.style.animation = 'none';
    }
}

function igMouseLeave() {
    if (igBtnIsClick === false) {
        igBtn.style.cursor = 'default';
        igBtn.style.backgroundColor = '#FFFFFF';
        igBtn.style.borderColor = '#E25B5B';
        igBtn.style.boxShadow = 'var(--igBS_b)';
        igBtn.style.transform = 'scale(1)'
        igBtn.style.marginTop = '0';
        igBtn.style.transition = 'transform 100ms linear';
        igImg.style.filter = 'none';
        igImg.style.animation = 'none';
        igImg.style.transition = 'transform 100ms linear';
    }
}

function igClick() {
    if (igBtnIsClick === false) {
        igBtn.style.backgroundColor = '#E25B5B';
        igBtn.style.borderColor = '#FFFFFF';
        igBtn.style.boxShadow = 'var(--igBS_b)';
        igBtn.style.transform = 'scale(1.1)'
        igBtn.style.marginTop = '0';
        igBtn.style.animation = 'transform 100ms linear';
        igImg.style.filter = 'brightness(0) invert(1) drop-shadow(3px 3px 2px rgba(0, 0, 0, .2))';

        igBtnIsClick = true;

        showWarn();

        if (msgValid) {
            igPrev.style.display = 'block';
            postButton.style.display = 'block';
            body.style.height = 'var(--igH)';
            message.style.height = 'fit-content';
            if (igFirstClick === false) {
                prevImage.style.borderStyle = 'hidden';
                igFirstClick = true;
            }
        }
    }
    else {
        igBtn.style.borderColor = '#E25B5B';
        igBtn.style.backgroundColor = '#FFFFFF';
        igBtn.style.boxShadow = 'var(--igBS_b)';
        igBtn.style.transform = 'scale(1)';
        igBtn.style.animation = 'transform 100ms linear';
        igImg.style.filter = 'none';

        igBtnIsClick = false;

        showWarn();

        if (msgValid) {
            igPrev.style.display = 'none';
            if (!twtBtnIsClick) {
                postButton.style.display = 'none';
                body.style.height = 'auto';
            } else {
                message.style.height = 'fit-content';
            }
        }
    }
}

const Sleep = {
    sleep: (second = 0) => {
        return new Promise((resolve) => {
            setTimeout(resolve, second * 1000);
        });
    },
    msleep: (milisecond = 0) => {
        return new Promise((resolve) => {
            setTimeout(resolve, milisecond);
        });
    }
}

function showWarn() {

    if (twtBtnIsClick === true || igBtnIsClick === true) {

        checkMsg();

        if (!msgValid) {

            msgWarnEle.textContent = msgWarn;
            msgWarnEle.style.display = 'block';
            message.style.height = 'fit-content';

        } else {

            msgWarnEle.style.display = 'none';
            message.style.height = 'fit-content';

        }

    } else if (twtBtnIsClick === false && igBtnIsClick === false) {

        msgWarnEle.style.display = 'none';
        message.style.height = 'var(--msheight)';

    }

}

function checkMsg() {

    let contentMessage = document.querySelector(".msg-input").value.replace(/\s\s+/g, ' ');
    let accCharacters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890 ~!@#$%^&*()-_=+[]{}\\|;:\'",<.>/?';
    let accCharArr = accCharacters.split('');
    let words = contentMessage.split(' ');
    let chars = contentMessage.split('');
    let wordLenValid = true;
    let charValid = true;

    words.forEach((val) => {

        if (val.length > 25) {

            wordLenValid = false;

            return;
        }

    });

    chars.forEach((val) => {

        let charFound = false;

        accCharArr.forEach((val2) => {

            if (val === val2) {

                charFound = true;

                return;
            }

        });

        if (!charFound) {

            charValid = false;

            return;
        }

    });

    if (contentMessage === '') {

        msgWarn = 'Message can\'t be empty!';
        msgValid = false;

        return;
    } else if (contentMessage[0] === ' ') {

        msgWarn = 'Your message is invalid!';
        msgValid = false;

        return;
    } else if (contentMessage.length < 6) {

        msgWarn = 'Your message is too short!';
        msgValid = false;

        return;
    } else if (contentMessage.length > 270) {

        msgWarn = 'Your message is too long!';
        msgValid = false;

        return
    } else if (!wordLenValid) {

        msgWarn = 'Your message is invalid!';
        msgValid = false;

        return;
    } else if (!charValid) {

        msgWarn = 'Your message is invalid!';
        msgValid = false;

        return;
    } else {

        msgWarn = '';
        msgValid = true;

    }

}

const igContentPrev = async () => {

    let msgPreview;
    let delay = 100;
    let err = false;


    while(true) {

        checkMsg();
        showWarn();

        if (msgValid && !err) {

            igClick();
            igClick();
            err = true;

        }

        if (!msgValid && twtBtnIsClick) {
            console.log('aa')
        }

        if (!igBtnIsClick) {

            err = false;

            await Sleep.msleep(delay);

            continue;
        }

        if (!msgValid && igPrev.style.display == 'block') {

            showWarn();
            igPrev.style.display = 'none';
            postButton.style.display = 'none';
            body.style.height = 'auto';
            err = false;

        }

        if (!msgValid) {

            await Sleep.msleep(delay);

            continue;
        }

        let contentMessage = document.querySelector(".msg-input").value.replace(/\s\s+/g, ' ');
        let prevImage = document.getElementById("preview-img");
        let prevLoad = document.getElementById("preview-loading");

        if (contentMessage !== msgPreview) {

            prevImage.style.display = 'none';
            prevLoad.style.display = 'block';

            msgPreview = contentMessage;

        } else {

            await Sleep.msleep(delay);

            continue;
        }

        await fetch('https://usayit-api.herokuapp.com/api/igPreview', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: msgPreview })

        }).then(response => response.json()).then(response => {
            
            prevImage.src = response.image;
            prevLoad.style.display = 'none';
            prevImage.style.borderStyle = 'solid';
            prevImage.style.display = 'block';

        });

        await Sleep.msleep(delay);

    }
}
igContentPrev();

postButton.addEventListener('click', async () => {
    let contentMessage = document.querySelector(".msg-input").value.replace(/\s\s+/g, ' ');
    let statusCode;
    let userIp;
    let deviceInfo = (clientInformation.appVersion).match(/\((.*?)\)/g)[0];
    let failEle = document.querySelector(".n-failed p");
    let failMessage;

    let nBorder = document.querySelector(".n-border");
    let nCont = document.querySelector(".n-cont");
    let nLoading = document.querySelector(".n-loading");
    let nSuccess = document.querySelector(".n-success");
    let nFailed = document.querySelector(".n-failed");

    nCont.style.display = "block";
    nLoading.style.display = "block";

    await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(res => userIp = res.ip);

    await fetch('https://usayit-api.herokuapp.com/api/sendMessage', {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            text: contentMessage,
            instagram: igBtnIsClick,
            twitter: twtBtnIsClick,
            ipv4: userIp,
            deviceInfo: deviceInfo
        
        })

    }).then(response => response.json()).then(response => {

        statusCode = response.statusCode;
        failMessage = response.message;

    });

    nLoading.style.display = "none";

    if (statusCode === 200){

        nSuccess.style.display = "block";
        nBorder.style.height = "fit-content";
        nBorder.style.padding = "6px 1px";

    } else {

        failEle.innerHTML = failMessage;
        nFailed.style.display = "block";
        nBorder.style.height = "fit-content";
        nBorder.style.padding = "6px 1px";

    }

});