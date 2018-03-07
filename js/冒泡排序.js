/**
 * 冒泡排序
*/

let arr = createRandomArr(10, 20, 5);
console.log(arr);
sort(arr);
console.log(arr);
console.log(check(arr));
checks(sort, 10000);


function sort(arr) {
    let len = arr.length;
    for(let i=0; i<len; ++i) {
        //把i到结尾最小的项排到第i位
        for(let j=len; j>i; --j) {
            if(arr[j] < arr[j-1]) {
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
            }
        }
    }
}

//生成一随机整数数组，取值范围为[min, max)，返回值为一数组
function createRandomArr(min, max, len) {
    let arr = new Array(len);
    let delta = max - min;
    for(let i=0; i<len; ++i) {
        arr[i] = Math.floor(Math.random()*delta) + min;
    }
    
    return arr;
}

//判断数组是否升序排序
function check(arr) {
    if(arr.length === 0) {
        return false;
    }

    for(let i=arr.length-1; i>0; --i) {
        switch(arr[i] >= arr[i-1]) {
            case true: 
                break;
            case false: 
                return false;
                break;
            default: 
                break;
        }
    }
    return true;
}

//随机生成多次数组，看是否是升序排序
function checks(func, check_num) {
    let [succeed_num, failure_num, time] = [0, 0, -1];
    for(let i=check_num; i>0; --i) {
        //随机生成[begin,end)的整数，数组长度为len
        let begin = Math.floor(Math.random()*10000);
        let end = Math.floor(Math.random()*5000) + begin;
        let len = Math.floor(Math.random()*100) + 50;
        let arr = createRandomArr(begin, end, len);
        if(check(arr)) {
            ++i;
            continue;
        }
        let begin_time = new Date();
        func(arr);
        let end_time = new Date();
        time += end_time - begin_time;
        check(arr) ? ++succeed_num : ++failure_num;
    }
    console.log("正确次数：" + succeed_num);
    console.log("失败次数：" + failure_num);
    console.log("准确率：" + (succeed_num/check_num).toFixed(4)*100 + "%");
    console.log("排序总用时：" + time + "毫秒");
}