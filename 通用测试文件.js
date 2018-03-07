/**
 * 三向切分快速排序
 * 把待排序元素分为小于区，大于区，等于区（比较参考元素为首元素）
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

    let [lt, gt, i] = [low, hei, low+1];
    let item = arr[low];
    //遍区域[low,hei]划分为三个区域：(小于item, 等于item, 大于item)
    while(i <= gt) {
        //遍历到的元素排在小于区
        if(arr[i] < item) {
            //把区域边界移一下空出位置来放
            [arr[lt++], arr[i++]] = [arr[i], arr[lt]];
            //i也需要自增，因为新交换类的元素原来是在前面的，已经遍历过了
            // ++lt, ++i;   //提到上一句上去了
        }
        //遍历到的元素在大于区
        else if(arr[i] > item) {
            //放元素，再扩充边界
            [arr[gt--], arr[i]] = [arr[i], arr[gt]];
            //不需要自增i，因为新交换来的元素原来是在后面的，仍未遍历
            // --gt;   //提到上一句上去了
        }
        //遍历到的元素在等于区
        else {
            ++i;
        }
    }
    //接着对小于区和大于区进行排序
    sortRange(arr, low, lt-1);
    sortRange(arr, gt+1, hei);
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