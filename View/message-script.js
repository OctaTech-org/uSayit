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
let err = false

twtBtn.addEventListener('mouseenter', twtMouseEnter);
twtBtn.addEventListener('mouseleave', twtMouseLeave);
twtBtn.addEventListener('click', twtClick);
igBtn.addEventListener('mouseenter', igMouseEnter);
igBtn.addEventListener('mouseleave', igMouseLeave);
igBtn.addEventListener('click', igClick);

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

    while(true) {
        console.log(1)
        let getMessage = document.querySelector(".msg-input").value.replace(/\s\s+/g, ' ');
        let prevImage = document.getElementById("preview-img");
        let prevLoad = document.getElementById("preview-loading");
        let words = getMessage.split(' ');
        let char = getMessage.split('');
        let accCharacters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890 ~!@#$%^&*()-_=+[]{}\\|;:\'",<.>/?';
        let accCharArr = accCharacters.split('');
        let isWordLengthValid = true;
        let isInvalidChar = false;

        words.forEach((val, idx, arr) => {

            if (val.length > 25) {

                isWordLengthValid = false;

                return;
            }

        });

        char.forEach((val, idx, arr) => {

            let charFound = false;
            
            accCharArr.forEach((val2, idx2, arr2) => {

                if(val === val2) {

                    charFound = true;

                }

            });

            if(!charFound) {

                isInvalidChar = true;

                return;
            }

        })

        if (getMessage === '') {

            prevImage.src = '';
            prevImage.style.display = 'none';
            prevLoad.style.display = 'block';

            await Sleep.msleep(delay);

            continue;
        } else if (msgPreview === getMessage) {

            await Sleep.msleep(delay);

            continue;
        } else if (getMessage.length < 6) {

            prevImage.src = '';
            prevImage.style.display = 'none';
            prevLoad.style.display = 'block';

            await Sleep.msleep(delay);

            continue;
        } else if (isWordLengthValid === false) {

            prevImage.src = '';
            prevImage.style.display = 'none';
            prevLoad.style.display = 'block';

            await Sleep.msleep(delay);

            continue;
        } else if(isInvalidChar) {

            prevImage.src = '';
            prevImage.style.display = 'none';
            prevLoad.style.display = 'block';

            await Sleep.msleep(delay);

            continue;
        } else if (!igBtnIsClick) {

            await Sleep.msleep(delay);

            continue;
        }

        msgPreview = getMessage;

        prevImage.src = '';
        prevImage.style.borderStyle = 'solid';
        prevImage.style.display = 'none';
        prevLoad.style.display = 'block';

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