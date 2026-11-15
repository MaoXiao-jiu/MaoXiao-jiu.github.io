// ============================================================
// 登录 / 注册页:静态原型阶段的表单校验
//
// 为什么要拦提交:这两个页面挂在静态服务器上
// (本地是 VS Code Live Server,GitHub Pages 同理),
// 静态服务器不处理 POST,一点提交就是 405 错误页。
//
// 接上 Django 之后,把这个文件从 HTML 里删掉 ——
// 那时表单会真的 POST 给后端,由视图函数做真正的校验。
// 记住:前端校验只是"提前告诉用户",永远不能当成安全措施,
// 因为任何人打开 DevTools 都能改掉它。
// ============================================================


// --- 用户名 ---
// 2~20 个字符,只允许 字母 / 数字 / _ . @ + -
//   \p{L} 是"任意语言的字母",包含中文。
//   注意不能写成 \w —— JavaScript 的 \w 只认 ASCII,中文会被判不合法
//   (这一点和 Python 不一样,和 Django 的 UnicodeUsernameValidator 是对齐的)
const USERNAME_RE = /^[\p{L}\p{N}_.@+-]{2,20}$/u;

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 64;

// 需求 2:太常见的密码
const COMMON_PASSWORD_RE =
    /^(?:password|passwd|qwerty|admin|abcabc|abc123|12345678|123456789|11111111|00000000|iloveyou|letmein)$/i;

// 需求 2:全是同一个字符,比如 aaaaaaaa
const SAME_CHAR_RE = /^(.)\1+$/;


// 需求 1:大写 / 小写 / 数字 / 特殊符号,数一数占了哪几种
// 空格不算特殊符号,免得 " 12345678 " 这种被当成"两种"
function passwordKinds(pwd) {
    let kinds = 0;
    if (/[A-Z]/.test(pwd)) kinds++;
    if (/[a-z]/.test(pwd)) kinds++;
    if (/[0-9]/.test(pwd)) kinds++;
    if (/[^A-Za-z0-9\s]/.test(pwd)) kinds++;
    return kinds;
}


const form = document.querySelector('.register-form');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();          // 阻止浏览器真的发请求

        const usernameInput = form.querySelector('input[name="username"]');
        const passwordInput = form.querySelector('input[name="password"]');
        const password2Input = form.querySelector('input[name="password2"]');   // 登录页没有这个框

        const username = usernameInput.value.trim();   // 用户名去掉两端空格
        const password = passwordInput.value;          // 密码原样保留,绝不 trim

        // 校验顺序 = 表单从上往下的填写顺序,用户改完不用回头再看一遍
        if (!username) {
            showAlert('请填写用户名');
            return;
        }
        if (!USERNAME_RE.test(username)) {
            showAlert('用户名只能是 2~20 个字母、数字或 _ . @ + -');
            return;
        }
        if (!password) {
            showAlert('请填写密码');
            return;
        }
        if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
            showAlert('密码长度需要在 ' + PASSWORD_MIN + '~' + PASSWORD_MAX + ' 个字符之间');
            return;
        }
        if (COMMON_PASSWORD_RE.test(password) || SAME_CHAR_RE.test(password)) {
            showAlert('这个密码太容易被猜到了');
            return;
        }
        if (passwordKinds(password) < 2) {
            showAlert('密码需要包含大写字母、小写字母、数字、特殊符号中的至少两种');
            return;
        }
        if (password2Input && password !== password2Input.value) {
            showAlert('两次输入的密码不一致');
            return;
        }

        // 静态原型的占位提示。接上 Django 之后换成真的提交。
        showAlert('账号功能还在开发中');
    });
}
