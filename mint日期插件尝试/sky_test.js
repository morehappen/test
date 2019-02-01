'use strict';

Vue.prototype.$ = $;
Vue.prototype.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};
var app = new Vue({
    el: '#app',
    data: function data() {
        return {
            timeType: "book",
            mint_startTime: '',
            mint_endTime: '',
            sky_testTime: "",
            sky_startTime: "",
            sky_endTime: "",
            week_src: ""
        };
    },

    watch: {},
    filters: {
        time_obj_string: function time_obj_string(value) {
            return moment(value).format('YYYY-MM-DD HH:mm');
        }
    },
    methods: {
        //打开自定义日期插件
        togglePickerSky: function togglePickerStart() {
            var this_ = this;
            this_.$refs.picker_sky_test.open();
        },
        //打开日期插件
        togglePickerStart: function togglePickerStart() {
            var this_ = this;
            this_.$refs.picker_start.open();
        },
        togglePickerEnd: function togglePickerEnd() {
            var this_ = this;
            this_.$refs.picker_end.open();
        },
        //抓取起始时间的日期
        startTimeGet: function startTimeGet(value) {
            var this_ = this;
            var date = moment(value).format('YYYY/MM/DD HH:mm:ss');
            this_.mint_startTime = new Date(date)

        },
        //抓取结束时间的日期
        endTimeGet: function endTimeGet(value) {
            var this_ = this;
            var date = moment(value).format('YYYY/MM/DD HH:mm:ss');
            this_.mint_endTime = new Date(date);
        },

        //打开日期插件
        togglePickerStart: function togglePickerStart() {
            this.$refs.picker_start.open();
        },
        //抓取自定义时间的日期
        sky_testTimeGet: function sky_testTimeGet(value) {
            var this_ = this;
            var date = moment(value).format('YYYY/MM/DD HH:mm');
            this_.sky_testTime = new Date(date);
            this.year = value.getFullYear();
            this.month = value.getMonth() + 1;
            this.date = value.getDate();
            this.hours = value.getHours();
            this.minutes = value.getMinutes();
        },
        //抓取起始时间的日期
        startTimeGet: function startTimeGet(value) {
            var date = moment(value).format('YYYY/MM/DD HH:mm:ss');
            this.mint_startTime = new Date(date);
            var date1 = moment(value).format('YYYY/MM/DD HH:mm:ss');
            this.mint_endTime = new Date(date1);
        },
        cleanSearchParam: function cleanSearchParam() {
            var first_end_time = moment(new Date()).format('YYYY-MM-DD');
            this.mint_endTime = new Date(first_end_time.replace(/-/g, "/"));
            var first_start_time = moment(first_end_time).add('days', -90).format('YYYY-MM-DD');
            this.mint_startTime = new Date(first_start_time.replace(/-/g, "/"));

            var sky_testTime = moment(new Date()).format('YYYY-MM-DD HH:mm');
            debugger
            var sky_start_time = moment(new Date()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add('days', -1).format('YYYY-MM-DD HH:mm');
            var sky_end_time = moment(new Date()).set({ hour: 23, minute: 59, second: 59, millisecond: 59 }).add('days', 1).format('YYYY-MM-DD HH:mm');
            debugger


            this.sky_testTime = new Date(sky_testTime.replace(/-/g, "/"));
            this.sky_startTime = new Date(sky_start_time.replace(/-/g, "/"));
            this.sky_endTime = new Date(sky_end_time.replace(/-/g, "/"));

            var week_map = { 0: '周日', 1: "周一", 2: "周二", 3: "周三", 4: "周四", 5: "周五", 6: "周六" };
            var week_num = new Date().getDay();
            console.log(week_num);
            var week_show = week_swatch(week_num);
            this.week_src = week_show;

            function week_swatch(week_num) {
                var week_show = week_map[week_num];
                return week_show;
            }

            // 方法一：数组实现法  document.getElementById('content').innerHTML = '今天是'  +  arr[date] 
            // 方法二：对象实现法  document.getElementById('content').innerHTML = '今天是'  +  object[date] 
            //方法三：charAt定位方法  document.getElementById('content').innerHTML = "今天是周" + "天一二三四五六".charAt(date); 
            //方法四：switch选择法  


        },

    },
    mounted: function mounted() {
        var this_ = this;
        this_.cleanSearchParam();
    }
});