//动态创建script
//利用src
//callback
//自定义jsonp跨域请求模块

function jsonp(url,callbackName){
    return new Promise((resolve,reject)=>{
        window[callbackName]=function(data){
            resolve(data)
        }
        let script = document.createElement('script')
        let body = document.body;
        script.src=url;
        
        body.appendChild(script);
        
    })
}
export default jsonp