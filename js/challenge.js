const handlePage = () => {
    const counterElement = document.getElementById('counter');
    let iterator = 1;
    let unpause = true;
    const clickCounts = {};

    let counterInterval = setInterval(counter, 1000);

    const decrementElement = document.getElementById('minus');
    decrementElement.addEventListener('click', decrement);

    const incrementElement = document.getElementById('plus');
    incrementElement.addEventListener('click', increment);

    const likeElement = document.getElementById('heart');
    likeElement.addEventListener('click', like);

    const submitButton = document.getElementById('submit');

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', pauseCounter);

    const form = document.getElementById('comment-form');
    form.addEventListener('submit', leaveComment);

    function counter() {
        counterElement.textContent = iterator++;
    }

    function decrement(){
        counterElement.textContent = iterator--;
    }

    function increment(){
        counterElement.textContent = iterator++;
    }

    function like(){
        const ulParent = document.querySelector('.likes');
        let listItem = document.querySelector(`#li-counter-num-${iterator - 1}`)

        if(listItem === null){
            const li = document.createElement('li');
            li.id = `li-counter-num-${iterator - 1}`;
            li.textContent = `${iterator - 1} has been liked 1 time`;
            ulParent.appendChild(li);
            clickCounts[iterator - 1] = 1;
        } else {
            clickCounts[iterator - 1] +=1;
            listItem.textContent = `${iterator - 1} has been liked ${clickCounts[iterator - 1]} times`;
        }
    }

    function pauseCounter() {
        const buttons = [decrementElement, incrementElement, likeElement, submitButton];

        if(unpause){
            pauseButton.textContent = 'restart'
            buttons.map((element) => element.disabled = true);
            clearInterval(counterInterval);
            unpause = false;
        } else {
            pauseButton.textContent = 'pause'
            buttons.map((element) => element.disabled = false);
            counterInterval = setInterval(counter, 1000);
            unpause = true;
        }
    }

    function leaveComment(e) {
        e.preventDefault();
        const commentList = document.getElementById('list');
        const newComment = document.createElement('li');
        newComment.className = 'comment-list';
        newComment.textContent = e.target[0].value;
        commentList.appendChild(newComment);
    }
}

handlePage();