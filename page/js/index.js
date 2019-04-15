// 每日一句
var everyday = new Vue({
    el: '#everyday',
    data: {
        content: 'The simplest and most effective way for creation is to observe people and matters around you.',
    },
    computed: {
        getContent () {
            return this.content;
        }
    },
    created: function() {
        // 请求数据
        axios.get('/queryEveryday').then(data => {
            everyday.content = data.data.data[0].content;
        }).catch(err => {
            console.log('请求失败')
        })
    }
})

// 文章列表
var articleList = new Vue({
    el: '#articleList',
    data() {
        return {
            articleList: [], // 文章列表
            page: 1, // 当前页
            pageSize: 2, //  每页有多少条数据
            count: 100, // 数据总数
            pageNumList: []
        }
    },
    computed: {
        // 生成翻页
        generatePageTool() {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalPage = this.count;
            let result = [];
            result.push({text: '<', page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            // 是否是最后一页
            if (nowPage + 1 <= (totalPage + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalPage + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: '>', page: (totalPage + pageSize - 1) / pageSize});
            this.pageNumList = result;
            return result;
        },
        // 翻页点击跳转
        jumpTo() {
           return function (page) {
               this.getPage(page, this.pageSize);
           } 
        },
        // 获取翻页对应的博客数
        getBlog() {
            return function (page, pageSize) {
                // 获取tag值
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split("&"): '';
                var tag = '';
                if (searchUrlParams != '') {
                    searchUrlParams.forEach(ele => {
                        if (ele.split('=')[0] == 'tag') {
                            try {
                                tag = ele.split('=')[1];
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });
                }
                // 没有tag值时，直接按分页来获取文章；则按tag进行筛选，在按分页获取
                if (tag == '') { // 直接按分页来获取文章
                    axios.get('/queryBlogByPage', {
                        params: {
                            page: page - 1,
                            pageSize: pageSize
                        }
                    }).then(data => {
                        var result = data.data.data;
                        this.articleList = []; // 清空
                        result.forEach((ele,index) => {
                            this.articleList[index] = {};
                            this.articleList[index].id = ele.id;
                            this.articleList[index].title = ele.title;
                            this.articleList[index].content = ele.content;
                            this.articleList[index].date = ele.ctime;
                            this.articleList[index].views = ele.views;
                            this.articleList[index].tags = ele.tags;
                            this.articleList[index].link = '/blog_detail.html?bid=' + ele.id;
                        });
                        this.page = page;
                    });
                    // 获取文章总数
                    axios.get('/queryBlogCount').then(data => {
                        this.count = data.data.data[0].count;
                        this.generatePageTool; // 生成翻页
                    });
                } else {  // 先按tag来筛选文章
                    axios.get('/queryBlogByTag', {
                        params: {
                            tag: tag,
                            page: page - 1,
                            pageSize: pageSize
                        }
                    }).then(data => {
                        console.log(data)
                        var result = data.data.data;
                        this.articleList = [];
                        result.forEach((ele,index) => {
                            this.articleList[index] = {};
                            this.articleList[index].id = ele.id;
                            this.articleList[index].title = ele.title;
                            this.articleList[index].content = ele.content;
                            this.articleList[index].date = ele.ctime;
                            this.articleList[index].views = ele.views;
                            this.articleList[index].tags = ele.tags;
                            this.articleList[index].link = '/blog_detail.html?bid=' + ele.id;
                        });
                        this.page = page;
                    });
                    // 获取文章总数
                    axios.get('/queryBlogCountByTag', {
                        params: {
                            tag: tag
                        }
                    }).then(data => {
                        this.count = data.data.data[0].count;
                        this.generatePageTool;
                    });
                }
            }
        },
    },
    created() {
        // 获取翻页对应的博客数
        this.getBlog(this.page, this.pageSize);
    }
});