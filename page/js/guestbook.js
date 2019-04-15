// 发表评论
let sendComment = new Vue({
    el: '#send_comment',
    data() {
        return {
            replyId: -1, // 回复id
            replyName: 0, // 回复名
            userName: '', // 用户名
            email: '', // 用户邮箱
            content: '', // 评论内容
            code: '', // 输入的验证码
            vcode: '', // SVG内容
            rightCode: '' // 正确的验证码
        }
    },
    computed: {
        // 刷新验证码
        changeCode() {
            return () => {
                axios.get('/queryRandomCode').then(data => {
                    this.vcode = data.data.data.data;
                    this.rightCode = data.data.data.text;
                })
            }
        },
        // 提交评论
        submitComment() {
            return function () {
                if (this.code != this.rightCode.toLowerCase()) {
                    alert('验证码错误');
                    return;
                }
                var bid = -2;
                // 发送请求
                axios.post('/addComment',{
                    bid: bid,
                    parent: this.replyId,
                    parentName: this.replyName,
                    userName: this.userName,
                    content: this.content,
                    email: this.email
                }).then(data => {
                    alert('评论成功');
                    this.userName = '';
                    this.content = '';
                    this.email = '';
                })
            }
        },
    },
    created() {
        this.changeCode();
    }
});

// 评论区
let blogComments = new Vue({
    el: '#blog_comments',
    data() {
        return {
            total: 0,
            comments: []
        }
    },
    computed: {
        // 回复评论
        reply() {
            return (commentId, userName) => {
                sendComment.replyId = commentId; // 要回复的id
                sendComment.replyName = userName; // 要回复的名字
                location.href = '#send_comment'; // 跳转到发表评论区
            }
        }
    },
    created() {
        var bid = -2; // 非-1，不然在查不出来时，容易把留言查出来
        // 获取所有评论
        axios.get('/queryCommentByBlogId',{
            params: {
                bid: bid
            }
        }).then(data => {
            var result = data.data.data;
            this.comments = [];
            result.forEach((ele, index) => {
                this.comments[index] = {};
                this.comments[index].id = ele.id;
                this.comments[index].parent = ele.parent;
                this.comments[index].parentName = ele.parent_name;
                this.comments[index].userName = ele.user_name;
                this.comments[index].comment = ele.comments;
                this.comments[index].ctime = ele.ctime;
            });
            this.comments.forEach((ele, index) => {
                if (ele.parent > -1) {
                    ele.options = '回复@'+ this.comments[index].parentName;
                }
            });
        });
        // 通过blogId获取评论总数
        axios.get('/queryCommentCountByBlogId', {
            params: {
                bid: bid
            }
        }).then(data => {
            this.total = data.data.data[0].count;
        }).catch(error => {
            console.log('获取评论总数失败');
        })
    }
})