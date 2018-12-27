var cityData = require("./city.js");
var address = [];
Page({
    data: {
        addressMenuIsShow: false,
        value: [0, 0, 0],
        provinces: [],
        citys: [],
        areas: [],
        areaInfo:'',
        districtId: ''
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        address = cityData.cityData;
        this.setData({
            provinces: address,
            citys: address[0].sub,
            areas: address[0].sub[0].sub
        });
    },

    open: function(){
        this.setData({
            addressMenuIsShow: true
        })
    },
    
    // 点击地区选择取消按钮
    cancel: function (e) {
        this.setData({
            addressMenuIsShow: false
        });
    },
    // 点击地区选择确定按钮
    ok: function (e) {
        var value = this.data.value;
        var areaInfo = this.data.provinces[value[0]].name + ',' + this.data.citys[value[1]].name + ',' + this.data.areas[value[2]].name;
        this.setData({
            areaInfo: areaInfo,
            addressMenuIsShow: false
        });
    },
    // 点击蒙版时取消组件的显示
    hideCitySelected: function (e) {
        this.setData({
            addressMenuIsShow: false
        })
    },
    // 处理省市县联动逻辑
    cityChange: function (e) {
        var value = e.detail.value;
        var provinceNum = value[0];
        var cityNum = value[1];
        var countyNum = value[2];

        // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
        if (this.data.value[0] != provinceNum) {
            this.setData({
                value: [provinceNum, 0, 0],
                citys: address[provinceNum].sub,
                areas: address[provinceNum].sub[0].sub,
                districtId: this.data.areas[countyNum].id
            });
        } else if (this.data.value[1] != cityNum) {
            // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
            this.setData({
                value: [provinceNum, cityNum, 0],
                areas: address[provinceNum].sub[cityNum].sub,
                districtId: this.data.areas[countyNum].id
            });
        } else {
            // 滑动选择了区
            this.setData({
                value: [provinceNum, cityNum, countyNum],
                districtId: this.data.areas[countyNum].id
            });
        }
    },
    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})