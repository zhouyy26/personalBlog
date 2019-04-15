let blogList = new Vue({
    el: '#blog_list',
    data() {
        return {
            blogList: [
                {
                    title: '111',
                    link: 1
                }
            ],
        }
    },
    computed: {

    },
    created() {
        // 查询所有博客
        axios.get('queryAllBlog').then(data => {
            var result = data.data.data;
            this.blogList = [];
            result.forEach((ele, index) => {
                console.log(ele)
                this.blogList[index] = {};
                this.blogList[index].title = ele.title;
                this.blogList[index].link = '/blog_detail.html?bid=' + ele.id;
            });
        });
    }
})