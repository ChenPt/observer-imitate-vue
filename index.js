import { 
    observe,
    Observer 
} from './observer.js'

import Dep from './dep'
import Watcher from './watch'

(function test () {
    let data = {
        name: 'hello',
        wow: 'fuck'
    }

    //首先先把数据变成可观察的
    observe(data);

    //给每个属性建立一个订阅者实例.创建这个watcher实例时，实例内部会读取这个key的value，从而触发这个key的getter，将这个订阅者实例push进这个key的Dep实例维护的subs（订阅者）数组
    for(let key in data) {
        new Watcher(data, key,function() {
            console.log('this is a callBack');
        })
    }
    

    window.test = data;


})()
