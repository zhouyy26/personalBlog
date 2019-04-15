// 随机标签云
var randomTags = new Vue({
    el: '#randomTags',
    data() {
        return {
            tags: [],
        }
    },
    computed: {
        // 随机颜色
        randomColor() {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return 'rgb(' + red + ',' + green + ',' + blue + ')';
            }
        },
        // 随机字体大小
        randomSize() {
            return function () {
                var size = (Math.random() * 20 + 12) + 'px';
                return size;
            }
        }
    },
    created() {
        // 获取随机标签
        axios.get('/queryRandomTags').then(data => {
            this.tags = [];
            data.data.data.forEach(ele => {
                this.tags.push(ele.tag);
            });
        });
    }
});

// 最近热门
var recentHot = new Vue({
    el: '#recentHot',
    data() {
        return {
            titleList: []
        }
    },
    created() {
        // 获取最近热门
        axios.get('/queryHotBlog', {
            params: {
                size: 7
            }
        }).then(data => {
            this.titleList = [];
            data.data.data.forEach((ele, index) => {
                this.titleList[index] = {};
                this.titleList[index].title = ele.title;
                this.titleList[index].link = 'blog_detail.html?bid=' + ele.id;
            });
        });
    }
});

// 最新评论
var recentHot = new Vue({
    el: '#newComment',
    data() {
        return {
            commentList: []
        }
    },
    created() {
        // 获取最新评论
        axios.get('/queryNewComment',{
            params: {
                size: 8
            }
        }).then(data => {
            var arr = [];
            data.data.data.forEach(ele => {
                var obj = {};
                obj.name = ele.user_name;
                obj.date = ele.ctime;
                obj.comment = ele.comments;
                obj.link = 'blog_detail.html?bid=' + ele.blog_id;
                arr.push(obj);
            });
            this.commentList = arr;
        });
    }
});