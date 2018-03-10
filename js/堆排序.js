/**
 * 堆排序
*/


let arr = createRandomArr(10, 20, 5);
console.log(arr);
sort(arr);
console.log(arr);
console.log(check(arr));
checks(sort, 10000);


function sort(arr) {
    const len = arr.length;
    //先把原数组做成堆
    for(let i=(len/2 | 0)-1; i>=0; --i) {
        sink(arr, i);
    }

    //把最大的数（根节点）放到数组末尾，多次执行进而排序
    let unsort_index = len - 1;
    while(unsort_index > 0) {
        //把最大的元素与末尾元素交换位置，进而把最大元素放到了数组末尾
        [arr[0], arr[unsort_index]] = [arr[unsort_index], arr[0]];
        //对根节点进行下沉操作，进而保证根节点值最大
        sink(arr, 0, unsort_index--);
    }
}

//对选定元素进行下沉操作（把值小的元素进行下沉），index为要下沉元素的索引
//若要指定截取从头算起的长度进行下沉操作，则输入截取长度N
function sink(arr, index, LEN) {
    const len = (typeof LEN === "number") ? LEN : arr.length;
    let down_index = 2*index + 1;   //此为左边子节点的索引

    while(down_index < len) {
        //这里找到子节点中值最大的一个，并记录索引值为down_index
        if(down_index+1<len && arr[down_index+1]>arr[down_index]) {
            ++down_index;
        }
        if(arr[index] >= arr[down_index]) break;
        [arr[index], arr[down_index]] = [arr[down_index], arr[index]];
        index = down_index;
        down_index = 2*index + 1;
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