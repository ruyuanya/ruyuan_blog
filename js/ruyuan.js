/* 动态标题 */
let defaultTitle = document.title; // 保存默认标题
let timeout;

// 当用户离开窗口时
window.addEventListener('blur', function () {
    document.title = "别走呀~"; // 修改为离开时的标题
});

// 当用户回到窗口时
window.addEventListener('focus', function () {
    document.title = "你回来啦！"; // 修改为回来时的标题

    // 设置一个2秒后的超时，恢复默认标题
    if (timeout) {
        clearTimeout(timeout); // 清除之前的超时，防止重复设置
    }
    timeout = setTimeout(() => {
        document.title = defaultTitle; // 恢复默认标题
    }, 1500); // 2秒后
});

let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}

/* 复制提示 */
document.addEventListener("copy", function () {
    debounce(function () {
        new Vue({
            data: function () {
                this.$notify({
                    title: "哎嘿！复制成功🍬",
                    message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        })
    }, 300)
})

// f12提醒但不禁用
document.onkeydown = function (e) {
    if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) {
        debounce(function () {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "你已被发现😜",
                        message: "小伙子，扒源记住要遵循GPL协议！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "warning",
                        duration: 5000
                    });
                }
            })
        }, 300);
    }
};

/* 夜间动画切换 */
const activateDarkMode = () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    if (document.querySelector('meta[name="theme-color"]') !== null) {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '${themeColorDark}')
    }
}
const activateLightMode = () => {
    document.documentElement.setAttribute('data-theme', 'light')
    if (document.querySelector('meta[name="theme-color"]') !== null) {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '${themeColorLight}')
    }
}

const saveToLocal = {
    set: (key, value, ttl) => {
        if (!ttl) return
        const expiry = Date.now() + ttl * 86400000
        localStorage.setItem(key, JSON.stringify({ value, expiry }))
    },
    get: key => {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) return undefined
        const { value, expiry } = JSON.parse(itemStr)
        if (Date.now() > expiry) {
            localStorage.removeItem(key)
            return undefined
        }
        return value
    }
}

function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
        setTimeout(function () {
            document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
                setTimeout(function () {
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
                    setTimeout(function () {
                        document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
                    }, 1e3);
                }, 2e3)
        })
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
        // 延时弹窗提醒
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "关灯啦🌙",
                        message: "当前已成功切换至夜间模式！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            })
        }, 2000)
    } else {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);

        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "开灯啦🌞",
                        message: "当前已成功切换至白天模式！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            })
        }, 2000)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}

/* f12显示 */
var now1 = new Date();

function createtime1() {
    var grt = new Date("08/09/2022 00:00:00"); //此处修改你的建站时间或者网站上线时间
    now1.setTime(now1.getTime() + 250);
    var days = (now1 - grt) / 1000 / 60 / 60 / 24;
    var dnum = Math.floor(days);

    var ascll = [
        `欢迎来到Fomalhaut🥝の小家!`,
        `Future is now 🍭🍭🍭`,
        `
        
███████  ██████  ███    ███  █████  ██      ██   ██  █████  ██    ██ ████████ 
██      ██    ██ ████  ████ ██   ██ ██      ██   ██ ██   ██ ██    ██    ██    
█████   ██    ██ ██ ████ ██ ███████ ██      ███████ ███████ ██    ██    ██    
██      ██    ██ ██  ██  ██ ██   ██ ██      ██   ██ ██   ██ ██    ██    ██    
██       ██████  ██      ██ ██   ██ ███████ ██   ██ ██   ██  ██████     ██   
                                              
`,
        "小站已经苟活",
        dnum,
        "天啦!",
        "©2022 By Fomalhaut",
    ];

    setTimeout(
        console.log.bind(
            console,
            `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n%c ${ascll[6]}\n`,
            "color:#39c5bb",
            "",
            "color:#39c5bb",
            "color:#39c5bb",
            "",
            "color:#39c5bb",
            ""
        )
    );
}

createtime1();

function createtime2() {
    var ascll2 = [`NCC2-036`, `调用前置摄像头拍照成功，识别为「大聪明」`, `Photo captured: `, ` 🤪 `];

    setTimeout(
        console.log.bind(
            console,
            `%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}`,
            "color:white; background-color:#10bcc0",
            "",
            "",
            'background:url("https://unpkg.zhimg.com/anzhiyu-assets@latest/image/common/tinggge.gif") no-repeat;font-size:450%'
        )
    );

    setTimeout(console.log.bind(console, "%c WELCOME %c 欢迎光临，大聪明", "color:white; background-color:#23c682", ""));

    setTimeout(
        console.warn.bind(
            console,
            "%c ⚡ Powered by Fomalhaut🥝 %c 你正在访问Fomalhaut🥝の小家",
            "color:white; background-color:#f0ad4e",
            ""
        )
    );

    setTimeout(console.log.bind(console, "%c W23-12 %c 系统监测到你已打开控制台", "color:white; background-color:#4f90d9", ""));
    setTimeout(
        console.warn.bind(console, "%c S013-782 %c 你现在正处于监控中", "color:white; background-color:#d9534f", "")
    );
}
createtime2();

// 重写console方法
console.log = function () { };
console.error = function () { };
console.warn = function () { };