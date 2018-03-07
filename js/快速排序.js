/**
 * 快速排序
 * 仔细阅读划分函数partition()的作用便及每一步作用可快速理解此算法
*/


let arr = createRandomArr(10, 20, 5);
console.log(arr);
sort(arr);
console.log(arr);
console.log(check(arr));
checks(sort, 10000);


function sort(arr) {
    sortRange(arr, 0, arr.length-1);
}

//把指定范围序数的元素进行排序
function sortRange(arr, low, hei) {
    if(low >= hei) {
        return false;
    }

    let j = partition(arr, low, hei);
    sortRange(arr, low, j-1);
    sortRange(arr, j+1, hei);
}

//作用为找到arr[low]在[low,hei]范围内的位置
//并使其左边元素小于他，右边元素大于他，即使其的位置为排好序的位置
//返回值为该元素位置的序数
function partition(arr, low, hei) {
    //定义两计数指针，i从左往右找大的数，j从右往左找小的数
    let [i, j] = [low, hei+1];
    let item = arr[low];
    while(true) {
        //从左到右找大于item的数，最多找到右边界
        while(arr[++i] <= item) {
            if(i === hei) break;
        }
        //从右到左找小于item的数，最多找到左边界
        while(arr[--j] >= item) {
            if(j === low) break;
        }
        if(i >= j) break;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    //最后把首项放在合适的位置（此为排好序后的位置）
    [arr[low], arr[j]] = [arr[j], arr[low]];
    //并返回其位置
    return j;
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