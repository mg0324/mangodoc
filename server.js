const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const basePath = path.join(__dirname, '');

const server = http.createServer((req, res) => {
  let url = req.url;
  console.info(url);
  // if(url.endsWith(".md")){
  //   url = "/docs" + url;
  // }
  if( url.endsWith(".js") 
    || url.endsWith(".md")
    || url.endsWith(".css")
    || url.endsWith(".json")
    ){
    fs.readFile(basePath + url,function(err,data){
      if(err) {
        res.end(err.message)
        return;
      }
      // res.setHeader('Content-Type', 'text/javascript');
      res.end(data.toString("utf-8"));
      return;
    });
  }else{
    // 返回 HTML 页面
    res.setHeader('Content-Type', 'text/html');
    var template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>mangodoc</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="Description">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
        <meta name="renderer" content="webkit">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui/lib/theme-chalk/index.css">
        <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
        <!--[if lt IE 9]>
            <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
            <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
      </head>
      <body>
        <div id="vue"></div>
        <script>
            window.$mangodoc = {
                title: 'mangodoc',
                repo: 'https://github.com/mg0324/mangodoc',
                footer: '<span>mango mei &copy; 2023</span> @ copyright',
                // giscus评论
                giscus:{
                  repo: "mg0324/docsify-comments",
                  repoId: "R_kgDOI68LwA",
                  category: "Announcements",
                  categoryId: "DIC_kwDOI68LwM4CUDhM",
                  mapping: "url",
                  reactionsEnabled: "1",
                  strict: "1",
                  emitMetadata: "0",
                  inputPosition: "bottom",
                  theme: "light",
                  lang: "zh-CN",
                  loading: "lazy"
                },
                toc:{
                  select: "h1, h2, h3, h4, h5, h6"
                }
            };
        </script>
        <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/element-ui/lib/index.js"></script>
        <script src="./dist/mangodoc.min.js"></script>
        <!-- giscus评论  -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mangodoc-giscus@1.0.1/dist/giscus.css">
        <script src="https://cdn.jsdelivr.net/npm/mangodoc-giscus@1.0.1/dist/mangodoc-giscus.min.js"></script>
        <!-- toc文章目录  -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mangodoc-toc@1.0.1/dist/toc.css">
        <script src="https://cdn.jsdelivr.net/npm/mangodoc-toc@1.0.1/dist/mangodoc-toc.min.js"></script>  
        <!-- to top  -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mangodoc-top@1.0.1/dist/top.css">
        <script src="https://cdn.jsdelivr.net/npm/mangodoc-top@1.0.1/dist/mangodoc-top.min.js"></script> 
        <!-- imgview插件  -->
        <script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/mangodoc-imgview@1.0.3/dist/imgview.css">
        <script src="https://unpkg.com/mangodoc-imgview@1.0.3/dist/mangodoc-imgview.min.js"></script>

        <!-- java语法高亮 -->
        <script src="//cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-java.min.js"></script>
      </body>
    </html>
    `;
    res.end(template);
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
