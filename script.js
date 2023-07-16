const dom_tsuki_move = document.querySelector('#tsuki_move')
const dom_tsuki_mochi = document.querySelector('#tsuki_mochi')
let isMouseDown = false
let img_count = 1032

preloadimg()

dom_tsuki_move.onmousedown = function(event) {
    isMouseDown = true
        // console.log("mouse down")
    let bfX = event.pageX
    let bfY = event.pageY

    function mouseMove(event) {
        if (isMouseDown == true) {
            // console.log("mouse move")

            change_img(hantei(bfX, bfY, event.pageX, event.pageY))
        }
    }
    document.addEventListener('mousemove', mouseMove);

    document.onmouseup = function() {
        document.removeEventListener('mousemove', mouseMove);
        isMouseDown = false
            // console.log("mouse up")

    }
}


function hantei(beforeX, beforeY, afterX, afterY) {
    let res = 0
    if (beforeX < afterX && beforeY > afterY) {
        res = -1
    } else if (beforeX > afterX && beforeY < afterY) {
        res = 1
    }

    return res
}

function get_img_path(img_no) {
    if (img_count < 1032) {
        img_count = 1032
    } else if (img_count > 1061) {
        img_count = 1061
    }
    return "./src/png/tsuki-mochi_" + img_no + ".png"
}

function change_img(add_count) {
    if (add_count == 1) {
        if (img_count < 1061) {
            // 次のimgに切り替え
            img_count += 1
            dom_tsuki_mochi.src = get_img_path(img_count)
                // console.log("add count")
        }
    } else if (add_count == -1) {
        if (img_count > 1032) {
            // 前のimgに切り替え
            img_count -= 1
            dom_tsuki_mochi.src = get_img_path(img_count)
                // console.log("down count")
        }
    }
    // console.log("add_count:" + add_count)
    // console.log("img_count:" + img_count)
    sleep(9)
}

function sleep(waitMsec) {
    var startMsec = new Date();
    while (new Date() - startMsec < waitMsec);
}

function preloadimg() { 
    let img_list = []
    for (let i = 1031; i <= 1062; i++){
        img_list.push(get_img_path(i))
    }
    preloadImages(img_list)
}

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}
