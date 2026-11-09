// const btn = document.querySelector('.hint-btn');
// const shade = document.querySelector('.hint');
// btn.addEventListener('click', clickBtn);

// function clickBtn(){
//     shade.classList.add('is-closing');
//     setTimeout(() => {
//         shade.remove();
//     }, 300);
// }

const showAlert = (message) => {
    const old = document.querySelector('.hint');
    if (old) {
        old.remove();
    }
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.innerHTML = `
    <div class="card">
        <h2>提示</h2>
        <hr />
        <p class="msg"></p>
        <button type="button" class="hint-btn">确认</button>
    </div>
`;

    document.body.appendChild(hint);
    hint.querySelector('.msg').textContent = message;
    hint.querySelector('.hint-btn').addEventListener('click',clickBtn);
    function clickBtn(){
    hint.classList.add('is-closing');
    setTimeout(() => {
        hint.remove();
    }, 300);
}
}