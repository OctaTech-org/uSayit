let twtBtn = document.getElementById("twt-button");
let twtImg = document.getElementById("twt-img");
let igBtn = document.getElementById("ig-button");
let igImg = document.getElementById("ig-img");

let body = document.getElementById("body");
let message = document.getElementById("message");
let igPrev = document.getElementById("ig-preview");
let postButton = document.getElementById("post-button");

let twtBtnIsClick = false;
let igBtnIsClick = false;

twtBtn.addEventListener('mouseenter', twtMouseEnter);
twtBtn.addEventListener('mouseleave', twtMouseLeave);
twtBtn.addEventListener('click', twtClick);
igBtn.addEventListener('mouseenter', igMouseEnter);
igBtn.addEventListener('mouseleave', igMouseLeave);
igBtn.addEventListener('click', igClick);

function twtMouseEnter(){
    if(twtBtnIsClick === false){
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
    else{
        twtImg.style.animation = 'none';
    }
}

function twtMouseLeave(){
    if(twtBtnIsClick === false){
        twtBtn.style.cursor = 'default';
        twtBtn.style.backgroundColor = '#FFFFFF';
        twtBtn.style.borderColor = '#3FA3FF';
        twtBtn.style.boxShadow = 'var(--twtBS_b)';
        twtBtn.style.transform = 'scale(1)'
        twtBtn.style.marginTop = '0';
        twtBtn.style.transition = 'transform 100ms linear';
        twtImg.style.filter = 'none';
        twtImg.style.animation = 'none';
        twtImg.style.transition = 'transform 100ms linear';
    }
}

function twtClick(){
    if(igBtnIsClick){
        igClick();
        igBtnIsClick = false;
    }

    if(twtBtnIsClick === false){
        twtBtn.style.backgroundColor = '#3FA3FF';
        twtBtn.style.borderColor = '#FFFFFF';
        twtBtn.style.boxShadow = 'var(--twtBS_b)';
        twtBtn.style.transform = 'scale(1.1)'
        twtBtn.style.marginTop = '0';
        twtBtn.style.animation = 'transform 100ms linear'
        twtImg.style.filter = 'brightness(0) invert(1) drop-shadow(3px 3px 2px rgba(0, 0, 0, .2))';

        postButton.style.display = 'block';
        message.style.height = 'fit-content';
        body.style.height = 'var(--twtH)';

        twtBtnIsClick = true;
    }
    else {
        twtBtn.style.backgroundColor = '#FFFFFF';
        twtBtn.style.borderColor = '#3FA3FF';
        twtBtn.style.boxShadow = 'var(--twtBS_b)';
        twtBtn.style.transform = 'scale(1)';
        twtBtn.style.animation = 'transform 100ms linear'
        twtImg.style.filter = 'none';

        postButton.style.display = 'none';
        message.style.height = 'var(--msheight)';
        body.style.height = 'auto';

        twtBtnIsClick = false;
    }
}

function igMouseEnter(){
    if(igBtnIsClick === false){
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
    else{
        igImg.style.animation = 'none';
    }
}

function igMouseLeave(){
    if(igBtnIsClick === false){
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

function igClick(){
    if(twtBtnIsClick){
        twtClick();
        twtBtnIsClick = false;
    }

    if(igBtnIsClick === false){
        igBtn.style.backgroundColor = '#E25B5B';
        igBtn.style.borderColor = '#FFFFFF';
        igBtn.style.boxShadow = 'var(--igBS_b)';
        igBtn.style.transform = 'scale(1.1)'
        igBtn.style.marginTop = '0';
        igBtn.style.animation = 'transform 100ms linear'
        igImg.style.filter = 'brightness(0) invert(1) drop-shadow(3px 3px 2px rgba(0, 0, 0, .2))';

        igPrev.style.display = 'block'
        postButton.style.display = 'block'
        message.style.height = 'fit-content';
        body.style.height = 'var(--igH)';

        igBtnIsClick = true;
        
        console.log("tru min")
        let content_message = document.querySelector(".msg-input").value;
        fetch('https://usayit-api.herokuapp.com/api/igPreview', {
            method: 'POST',
            body: JSON.stringify({"text": content_message})
        })
            .then(response => console.log(response));
    }
    else {
        igBtn.style.borderColor = '#E25B5B';
        igBtn.style.backgroundColor = '#FFFFFF';
        igBtn.style.boxShadow = 'var(--igBS_b)';
        igBtn.style.transform = 'scale(1)';
        igBtn.style.animation = 'transform 100ms linear'
        igImg.style.filter = 'none';

        igPrev.style.display = 'none'
        postButton.style.display = 'none'
        message.style.height = 'var(--msheight)';
        body.style.height = 'auto';

        igBtnIsClick = false;
    }
}