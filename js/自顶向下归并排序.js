/**
 * 自顶向下归并排序
 * 主要运用了递归的思想，把一个数列的排序分为两个数列的排序
 * 再进一步把数列继续划分
 * 最后只会有两个元素的排序
 * 最后的函数主要部分就是怎样把两个有序数列按序合并为一个数列
*/


let arr = createRandomArr(10, 20, 5);
console.log(arr);
sort(arr);
console.log(arr);
console.log(check(arr));
checks(sort, 10000);


function sort(arr) {
    sort_range(arr, 0, arr.length-1);
}

//将数组内指定范围内的元素排序
function sort_range(arr, low, hei) {
    if(low >= hei) {
        return false;
    }

    //分为两部分再各自进行排序
    let mid = low + Math.ceil((hei-low)/2);
    // arguments.callee(arr, low, mid-1);       //用arguments.callee好慢。。。。。
    // arguments.callee(arr, mid, hei);
    sort_range(arr, low, mid-1);
    sort_range(arr, mid, hei);
    //各自排完序后再把两部分合并
    merge(arr, low, mid, hei);
}

//对分开两半并各自排好序的数组进行合并操作
function merge(arr, low, mid, hei) {
    //将数据复制到辅助数组
    let aux_arr = arr.slice(low, hei+1);
    let len = aux_arr.length;
    let middle = mid - low;

    //遍历辅助数组，在两部分挑选最小的值放在前头
    for(let [i, j, k] = [0, middle, 0]; k<len; ++k) {
        if(i >= middle) {      //前半部分已经挑完
            arr[k+low] = aux_arr[j++];
        }
        else if(j >= len) {     //后半部分已经挑完
            arr[k+low] = aux_arr[i++];
        }
        else {      //两半都没有挑完
            arr[k+low] = (aux_arr[i]<aux_arr[j]) ? aux_arr[i++] : aux_arr[j++];
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