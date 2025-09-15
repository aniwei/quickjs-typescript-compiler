const storeId = "1014165857";
const venderId = "12108937";
const shopLogo = "https://img30.360buyimg.com/vendersettle/s162x162_jfs/t1/116125/36/37373/25337/649bd9e6F6e76a453/76e6ed831634bb9d.png.webp";
const storeName = "华为专营店（居然之家）";
const distance = "8.1km";
const storeTagVOList = [
  {
    name: "配送时效标",
    tagType: 2,
    tagText: "75分钟"
  },
  {
    tagType: 11,
    tagImage: {
      imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/168912/38/43338/2414/65efc245Fa610fcfb/0c5e35015d945070.png"
    }
  }
];
const srvJson = '{"distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","isScanCodeStore":"-100","floorid":"1357","storetype":"1","StoreTagVO":"[]","purchTimes":"0","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"did":"-100"}';
const jumpLink = 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","bizType":1},"scene":"fafe","mpMode":"1"}';
const couponVOList = [
  {
    couponDesc: "6减6",
    couponKind: 1,
    receiveFlag: true,
    batchId: 1129648173,
    id: "326529607450",
    style: "1",
    couponAssistKind: "1",
    couponStyle: "0",
    amount: "6",
    quota: "6.01",
    srvJson: '{"coupon_amount":"6.0","btnName":"已领","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"6.01","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"1"}'
  },
  {
    couponDesc: "500减450",
    couponKind: 1,
    receiveFlag: false,
    batchId: 1042622826,
    roleId: "d0cb99f425a84121d8ad20d54599834290fe1ab15539c170f7f89af722e0d2a66b426056214ca9c713ccfd7a276815f121c301fe7e447466c4d44e4ec7f41b1f",
    id: "152495064",
    style: "2",
    couponAssistKind: "A",
    couponStyle: "0",
    amount: "450",
    quota: "500",
    srvJson: '{"coupon_amount":"450.0","btnName":"领取","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"500","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"A"}'
  },
  {
    couponDesc: "600减500",
    couponKind: 1,
    receiveFlag: false,
    batchId: 1042691034,
    roleId: "104f993d67f56966255588db27a84d8d346913bac82dee1ad6a901a955938347ed7e9734cf07477d1085adaa3537f22d4a8397bf48845b44e7b2a30bc3d6d5f6",
    id: "152495646",
    style: "2",
    couponAssistKind: "A",
    couponStyle: "0",
    amount: "500",
    quota: "600",
    srvJson: '{"coupon_amount":"500.0","btnName":"领取","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"600","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"A"}'
  },
  {
    couponDesc: "600减500",
    couponKind: 1,
    receiveFlag: false,
    batchId: 1042257618,
    roleId: "40fd89ab1588a61a5933e6cd4915582badbc054c33475e020db0edb83e3ac90344998b0c3b129484e5bc2a1c67776384f1df58e5abf4f1b491e4855d70df41f0",
    id: "152494810",
    style: "2",
    couponAssistKind: "A",
    couponStyle: "0",
    amount: "500",
    quota: "600",
    srvJson: '{"coupon_amount":"500.0","btnName":"领取","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"600","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"A"}'
  }
];
const baseFreight = "满¥29免运费";
const baseFreightColor = "#553C0A";
const lineFreight = "¥28";
const lineFreightColor = "#927339";
const freightBgStartColor = "#FFE2A6";
const freightBgEndColor = "#E7BE78";
const storeCouponVOList = [
  {
    couponDesc: "6减6",
    couponKind: 1,
    receiveFlag: true,
    batchId: 1129648173,
    id: "326529607450",
    style: "1",
    couponAssistKind: "1",
    couponStyle: "0",
    amount: "6",
    quota: "6.01",
    srvJson: '{"coupon_amount":"6.0","btnName":"已领","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"6.01","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"1"}'
  }
];
const productCouponVOList = [
  {
    couponDesc: "大牌饮料巴拉巴拉",
    couponKind: 1,
    receiveFlag: false,
    batchId: 1042622826,
    roleId: "d0cb99f425a84121d8ad20d54599834290fe1ab15539c170f7f89af722e0d2a66b426056214ca9c713ccfd7a276815f121c301fe7e447466c4d44e4ec7f41b1f",
    id: "152495064",
    style: "2",
    couponAssistKind: "A",
    couponStyle: "0",
    amount: "450",
    quota: "500",
    srvJson: '{"coupon_amount":"450.0","btnName":"领取","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"500","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"A"}'
  },
  {
    couponDesc: "600减500",
    couponKind: 1,
    receiveFlag: false,
    batchId: 1042691034,
    roleId: "104f993d67f56966255588db27a84d8d346913bac82dee1ad6a901a955938347ed7e9734cf07477d1085adaa3537f22d4a8397bf48845b44e7b2a30bc3d6d5f6",
    id: "152495646",
    style: "2",
    couponAssistKind: "A",
    couponStyle: "0",
    amount: "500",
    quota: "600",
    srvJson: '{"coupon_amount":"500.0","btnName":"领取","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"600","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"A"}'
  },
  {
    couponDesc: "600减500",
    couponKind: 1,
    receiveFlag: false,
    batchId: 1042257618,
    roleId: "40fd89ab1588a61a5933e6cd4915582badbc054c33475e020db0edb83e3ac90344998b0c3b129484e5bc2a1c67776384f1df58e5abf4f1b491e4855d70df41f0",
    id: "152494810",
    style: "2",
    couponAssistKind: "A",
    couponStyle: "0",
    amount: "500",
    quota: "600",
    srvJson: '{"coupon_amount":"500.0","btnName":"领取","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","venderid":"12108937","couponKind":"1","index":"250","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","couponStyle":"0","floorid":"1357","couponLimitRule":"600","storetype":"1","style":"58","aids":"-100","page":"28","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"usedemension":"A"}'
  }
];
const deliveryCouponVOList = [];
const serverInfoList = [];
const initialDeliveryPrice = "起送¥0";
const bizStartHours = "09:30";
const bizEndHours = "19:30";
const orginalAgingType = 75;
const deliveryBatch = "15:45-17:05";
const fastDeliveryDate = "2024-06-05 00:00:00";
const productBaseVOList = [
  {
    skuId: "10099351048580",
    name: "华为HUAWEI FreeClip 耳夹耳机不入耳无线蓝牙 星空黑 FreeClip",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/242696/19/1244/48326/658c187cF1f8dceb0/77597996149a731d.png.webp",
    majorPrice: {
      price: "1299",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "1293",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "1299",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10099351048580","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc4IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGs1TXpVeE1EUTROVGd3WHpFd01EazVNelV4TURRNE5UZ3cifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"1","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"1293.0","firprice":"1299.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10099351048580","did":"-100"}'
  },
  {
    skuId: "10073433276973",
    name: "华为畅享 60X 7000mAh续航 6.95英寸大屏 鸿蒙手机 曜金黑 256",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/147273/26/36282/43033/643d0da6Fad79b662/199f00401bb1d586.png.webp",
    majorPrice: {
      price: "1538",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "1382",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "1538",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10073433276973","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjcyIiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGN6TkRNek1qYzJPVGN6WHpFd01EY3pORE16TWpjMk9UY3oifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"2","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"1382.0","firprice":"1538.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10073433276973","did":"-100"}',
    productTagList: [
      {
        text: "减156元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10098761978452",
    name: "华为 WATCH D 腕部心电血压记录仪 血压测量 心电采集 曜石黑 拆封后不支持退换",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/133478/6/22276/61185/61e6620eE6cacd8d4/d9d2b1c49e1b4e70.jpg.webp",
    majorPrice: {
      price: "1998",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "1992",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "1998",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10098761978452","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc4IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGs0TnpZeE9UYzRORFV5WHpFd01EazROell4T1RjNE5EVXkifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"3","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"1992.0","firprice":"1998.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10098761978452","did":"-100"}'
  },
  {
    skuId: "10074363407289",
    name: "华为 MatePad 11英寸 2023 WIFI款 120Hz高刷屏  平板 晶钻白 8+256GB（柔光版）",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/161233/38/36388/19484/641c469bFcae6098c/0b8a92868b699a8d.jpg.webp",
    majorPrice: {
      price: "2599",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "2493",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "2599",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10074363407289","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc0IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGMwTXpZek5EQTNNamc1WHpFd01EYzBNell6TkRBM01qZzUifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"4","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"2493.0","firprice":"2599.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10074363407289","did":"-100"}',
    productTagList: [
      {
        text: "减106元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10098781854656",
    name: "华为HUAWEI 原装线充套装（充电器+6AType-C数据线）66W 白色",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/100661/22/40598/17928/65fa8dcfF9de41eec/a32502fb5a828783.jpg.webp",
    majorPrice: {
      price: "299",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "293",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "299",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10098781854656","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjcyIiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGs0TnpneE9EVTBOalUyWHpFd01EazROemd4T0RVME5qVTIifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"5","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"293.0","firprice":"299.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10098781854656","did":"-100"}'
  },
  {
    skuId: "10097980075985",
    name: "华为 Mate X5 折叠屏手机 玄武钢化昆仑玻璃 四曲机身 幻影紫 12+512",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/157741/17/45869/79999/665ec344Ff680af23/e72dfa9c140d8ad0.jpg.webp",
    majorPrice: {
      price: "13899",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "13093",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "13899",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10097980075985","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc4IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGszT1Rnd01EYzFPVGcxWHpFd01EazNPVGd3TURjMU9UZzEifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"6","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"13093.0","firprice":"13899.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10097980075985","did":"-100"}',
    productTagList: [
      {
        text: "减806元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10088453360721",
    name: "华为 HUAWEI WATCH GT 4 智能手表 皓月银 不锈钢间金表带 41mm",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/91777/2/44830/53350/65c1bf92F345fd58e/c37d23e7b6cfef8e.jpg.webp",
    majorPrice: {
      price: "2588",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "2282",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "2588",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10088453360721","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc0IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGc0TkRVek16WXdOekl4WHpFd01EZzRORFV6TXpZd056SXgifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"7","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"2282.0","firprice":"2588.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10088453360721","did":"-100"}',
    productTagList: [
      {
        text: "减306元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10095691789594",
    name: "华为 HUAWEI MatePad Pro 13.2英寸 WiFi 柔性OLED大屏平板电脑 曜金黑 16GB+1TB",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/103854/12/45891/42560/651187ebFb902b1b8/85ee118418384543.png.webp",
    majorPrice: {
      price: "7199",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "6993",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "7199",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10095691789594","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc0IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGsxTmpreE56ZzVOVGswWHpFd01EazFOamt4TnpnNU5UazAifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"8","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"6993.0","firprice":"7199.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10095691789594","did":"-100"}',
    productTagList: [
      {
        text: "减206元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10089847008995",
    name: "华为HUAWEI FreeBuds 5i 真无线蓝牙耳机主动降噪 入耳式耳机双重混合降噪 海岛蓝 真无线",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/208019/18/22470/21977/62a19491Ef973ec2e/feaa26af7dcf4af4.jpg.webp",
    majorPrice: {
      price: "549",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "393",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "549",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10089847008995","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc4IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGc1T0RRM01EQTRPVGsxWHpFd01EZzVPRFEzTURBNE9UazEifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"9","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"393.0","firprice":"549.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10089847008995","did":"-100"}',
    productTagList: [
      {
        text: "减156元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10101811834857",
    name: "华为 Pura70  乐臻版 鸿蒙手机 华为P70 雪域白+陶瓷白 12+512",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/231491/4/17085/42447/662723c9F54408a39/1c71bdb278d5ca49.jpg.webp",
    majorPrice: {
      price: "6799",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "6793",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "6799",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10101811834857","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc0IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNVEF4T0RFeE9ETTBPRFUzWHpFd01UQXhPREV4T0RNME9EVTMifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"10","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"6793.0","firprice":"6799.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10101811834857","did":"-100"}'
  },
  {
    skuId: "10083857413354",
    name: "华为智能手表 WATCH 4 Pro  一键微体检 高血糖风险评估研究 木星棕 深棕色真皮表带 48mm",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/182805/32/34950/94850/6466e129Fe7729e4b/117e28ebe6043d54.jpg.webp",
    majorPrice: {
      price: "3199",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "2993",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "3199",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10083857413354","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc4IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGd6T0RVM05ERXpNelUwWHpFd01EZ3pPRFUzTkRFek16VTAifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"11","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"2993.0","firprice":"3199.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10083857413354","did":"-100"}',
    productTagList: [
      {
        text: "减206元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10100604505117",
    name: "华为（HUAWEI）原装Type-C耳机华为经典耳机 CM33 白色 华为耳机",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/109814/31/29815/8047/644a6401F9a18ce26/9984683325becddc.jpg.webp",
    majorPrice: {
      price: "199",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "193",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "199",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10100604505117","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc0IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNVEF3TmpBME5UQTFNVEUzWHpFd01UQXdOakEwTlRBMU1URTMifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"12","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"193.0","firprice":"199.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10100604505117","did":"-100"}'
  },
  {
    skuId: "10088453357371",
    name: "华为 FreeBuds Pro 3 无线降噪耳机 雅川青 FreeBuds Pro 3 无线充",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/88584/37/45191/43205/65c1a031Fae9fb526/aeb462fe2b8ea356.jpg.webp",
    majorPrice: {
      price: "1399",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "1193",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "1399",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10088453357371","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc0IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGc0TkRVek16VTNNemN4WHpFd01EZzRORFV6TXpVM016Y3gifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"13","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"1193.0","firprice":"1399.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10088453357371","did":"-100"}',
    productTagList: [
      {
        text: "减206元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10095334347577",
    name: "华为畅享 70 Pro 1亿像素 40W充电 鸿蒙手机 雪域白 8+128",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/108151/25/45247/45605/65c0d760Ff2a5c7f5/2538dccf4c5e415a.jpg.webp",
    majorPrice: {
      price: "1499",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "1443",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "1499",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10095334347577","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjcyIiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGsxTXpNME16UTNOVGMzWHpFd01EazFNek0wTXpRM05UYzMifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"14","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"1443.0","firprice":"1499.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10095334347577","did":"-100"}',
    productTagList: [
      {
        text: "减56元",
        textColor: "#FFFFFF",
        tagType: 14,
        bgColor: "#FF782D",
        bgEndColor: "#FF593D"
      }
    ]
  },
  {
    skuId: "10098762209161",
    name: "华为 WATCH GT 3 保时捷设计款 黑色钛金属表带 蓝宝石玻璃镜面 微晶陶瓷背壳 黑色 钛金属表带",
    picUrl: "https://m.360buyimg.com/babel/s222x222_jfs/t1/196852/5/23942/37960/62a0aff3E6d643dc8/e90cac9b224c2c52.png.webp",
    majorPrice: {
      price: "2388",
      priceType: 1,
      priceColor: "#FA2C19"
    },
    minorPrice: {
      price: "2382",
      priceType: 4,
      priceStyle: 2,
      priceColor: "#FA2C19",
      priceImage: {
        imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/231066/17/14009/1856/65e920feF21a6b86e/ac001042565d650d.png",
        width: 96,
        height: 30
      },
      priceText: "预估到手",
      priceText2: "预估"
    },
    priceGroupType: 3,
    channelVipTagFlag: false,
    pPrice: "2388",
    jumpLink: 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"B594E1702946F919D4B3B9C0DA5B4985","vapptype":"1","param":{"source":"index_nearby_tab","venderId":"12108937","storeId":"1014165857","skuId":"10098762209161","bizType":1},"scene":"fafe","mpMode":"1"}',
    srvJson: '{"3rdprice":"-100","distance":"8.1km","biinfo":{"brokerInfo":"eyJwIjoiNjE5NjY5IiwiY2x1c3Rlcl9pZCI6ImxmIiwicGkiOiJuZWFyYnktZmVlZHMiLCJzb3VyY2UiOiIwIiwidGFnIjoiMjc4IiwiY3NfdXNlciI6IjIiLCJwYWxhbnRpcl9leHBpZHMiOiJSfFJfUl9MZmlyc3RfUiIsImV4cGlkIjoiIiwicmVxc2lnIjoiZjU3YjA0NjdmNjhiM2RkMjQ0YjNkMDc1NDMyZWJhYWFlZTVhMTUwNSIsInBvc2l0aW9uX2lkIjoiTUY4d1h6RXdNRGs0TnpZeU1qQTVNVFl4WHpFd01EazROell5TWpBNU1UWXgifQ\\u003d\\u003d","storeBrokerInfo":"eyJwIjoiNjE5NjcwIiwiY2x1c3Rlcl9pZCI6ImxmIiwic291cmNlIjoiMCIsInRhZyI6IjcwMTkiLCJjc191c2VyIjoiMiIsInBhbGFudGlyX2V4cGlkcyI6IlJ8Ul9SX0xmaXJzdF9MNDYyNDQiLCJleHBpZCI6IiIsInJlcXNpZyI6ImQwNmUzYjhkZmY2YzZkNzIxZmI3MWM1YjhlNWU5MmVkZTRhZDk4OTEiLCJwb3NpdGlvbl9pZCI6Ik1GODJObDh3WHpFd01UUXhOalU0TlRjPSJ9"},"modulestyle":"1","isPurchasedStore":"false","attributeList":"-100","venderid":"12108937","index":"15","promise":{"businessBeginTime":"09:30","fastDeliveryDate":"2024-06-05 00:00:00","batch":"15:45-17:05","agingType":75,"businessEndTime":"19:30"},"storeid":"1014165857","floorid":"1357","firpricetype":"44","storetype":"1","secprice":"2382.0","firprice":"2388.0","3rdpricetype":"-100","style":"58","aids":"-100","page":"28","secpricetype":"11","moduleid":"11398","request_id":["10193354840-131057-1717572481562"],"skuid":"10098762209161","did":"-100"}'
  }
];
const purchaseStoreFlag = false;
const purchTimes = 0;
const storeType = "1";
const dataJSON = {
  storeId,
  venderId,
  shopLogo,
  storeName,
  distance,
  storeTagVOList,
  srvJson,
  jumpLink,
  couponVOList,
  baseFreight,
  baseFreightColor,
  lineFreight,
  lineFreightColor,
  freightBgStartColor,
  freightBgEndColor,
  storeCouponVOList,
  productCouponVOList,
  deliveryCouponVOList,
  serverInfoList,
  initialDeliveryPrice,
  bizStartHours,
  bizEndHours,
  orginalAgingType,
  deliveryBatch,
  fastDeliveryDate,
  productBaseVOList,
  purchaseStoreFlag,
  purchTimes,
  storeType
};
export {
  dataJSON as d
};
