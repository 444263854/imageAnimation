
    /**
     * 
     * @param {target}  执行动画的元素
     * @param {obj}  动画的效果
     * @param {time}  动画运行时间，默认1000ms
     * @param {callBack}
     */
    function animation(target, obj = {}, time = 1000, callBack = () => {}) {
        //obj为空对像，不运动
        if (obj.toString() == '{}') {
            return;
        }

        function getStyle(ele) {
            //window.getComputedStyle(target)的属性值会随着元素的属性改变而动态的更新
            return window.getComputedStyle(ele) || ele.currentStyle;
        }
        let startTime = new Date();
        let changeStyle = {};
        let startStyle = {};
        let originStyle = getStyle(target);
        for (let key in obj) {
            let objVal = parseInt(obj[key])
            if (isNaN(objVal)) {
                throw new Error(`(${key}) this attribute is invalid`);
                return false;
            }
            obj[key] = objVal;
            let originVal = parseInt(originStyle[key])
            startStyle[key] = originVal;
            changeStyle[key] = obj[key] - originVal;
        }

        run()

        function run() {
            let currentTime = new Date();
            let interTime = currentTime - startTime;
            let progress = interTime / time;
            if (interTime >= time) {
                progress = 1;
            } else {
                requestAnimationFrame(run);
            }
            for (var key in obj) {
                target.style[key] = startStyle[key] + changeStyle[key] * progress + 'px';
            }
            if (progress == 1) {
                callBack();
            }
        }
    } //end animation