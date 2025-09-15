var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { j as jsxRuntimeExports, c as classNames } from "./vendor.js";
import { useState } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { d as dataJSON } from "./data.js";
const styles$6 = { "coupon": "index-module__coupon___lU2V-", "coupon-text": "index-module__coupon-text___-fZwZ", "coupon-flag": "index-module__coupon-flag___SuajB" };
function StoreCoupon(props) {
  const { data } = props;
  function ReceivedStatus({ coupon }) {
    if (coupon.receiveFlag) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$6["coupon-flag"], children: "已领" });
    } else {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$6["coupon-flag"], children: "领券" });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: data.couponVOList.map((coupon, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$6["coupon"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$6["coupon-text"], children: coupon.couponDesc }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReceivedStatus, { coupon })
    ] }, index);
  }) });
}
var store_coupon_default = StoreCoupon;
const styles$5 = { "store-info": "index-module__store-info___1z1x0", "store-logo": "index-module__store-logo___28Os-", "logo-img": "index-module__logo-img___kRqBo", "tips": "index-module__tips___s5WdS", "store-detail": "index-module__store-detail___K0q-Y", "detail-header": "index-module__detail-header___4H0UT", "store-title": "index-module__store-title___OPPe2", "store-name": "index-module__store-name___U2A-I", "store-tag": "index-module__store-tag___4Sbd1", "store-logistics": "index-module__store-logistics___qMU5s", "delivery": "index-module__delivery___cTsKC", "delivery-detail": "index-module__delivery-detail___5Ln3t", "initial-delivery": "index-module__initial-delivery___o-XlG", "delivery-fee": "index-module__delivery-fee___UAADG", "time-distance": "index-module__time-distance___ZoJhq", "time-consuming": "index-module__time-consuming___ZLsjJ", "store-sales-retention": "index-module__store-sales-retention___-iyXu", "sales-detail": "index-module__sales-detail___IUFpz", "sales-text": "index-module__sales-text___rICWX", "retention-detail": "index-module__retention-detail___Zlm-L", "retention-text": "index-module__retention-text___XVzwY", "distance": "index-module__distance___h5UO7", "store-coupons": "index-module__store-coupons___ncm3o", "store-coupons-collapse": "index-module__store-coupons-collapse___OGi-r", "store-coupons-expand": "index-module__store-coupons-expand___zuIqW", "icon-arrow": "index-module__icon-arrow___TvE9b", "icon-arrow-img": "index-module__icon-arrow-img___awevS" };
function StoreInfo(props) {
  var _a;
  const { data, onChangeData } = props;
  const isShouldCollapse = (length) => {
    if (length > 2) {
      return "store-coupons-collapse";
    }
    return "";
  };
  const isShouldExpand = () => {
    if (data.isShouldExpand) {
      return "store-coupons-expand";
    }
    return "";
  };
  const expand = () => {
    if (data.isShouldExpand) {
      onChangeData("isShouldExpand", false);
    } else {
      onChangeData("isShouldExpand", true);
    }
  };
  function StoreTag() {
    if (data.storeTagVOList[1]) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Image,
        {
          className: styles$5["store-tag"],
          src: data.storeTagVOList[1].tagImage.imgUrl,
          mode: "aspectFit"
        }
      );
    } else {
      return null;
    }
  }
  function TimeDistance() {
    if (data.storeTagVOList[0]) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["time-distance"], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$5["time-consuming"], children: data.storeTagVOList[0].tagText }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$5["distance"], children: data.distance })
      ] });
    } else {
      return null;
    }
  }
  function SalesText() {
    if (data.salesText) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$5["sales-detail"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$5["sales-text"], children: data.salesText }) });
    } else {
      return null;
    }
  }
  function RetentionsDetail() {
    if (data.storeTagVOList[2]) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$5["retentions-detail"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Text,
        {
          style: {
            color: data.storeTagVOList[2].textColor
          },
          className: styles$5["retention-text"],
          children: data.storeTagVOList[2].tagText
        }
      ) });
    } else {
      return null;
    }
  }
  function StoreCouponArrow() {
    if (data.couponVOList.length > 3) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$5["icon-arrow"], onClick: () => expand(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Image,
        {
          className: styles$5["icon-arrow-img"],
          src: "https://img13.360buyimg.com/img/jfs/t1/103075/30/27091/208/66603645Fd4a56b9b/dc3cb1e18c940f34.png",
          mode: "aspectFit"
        }
      ) });
    } else {
      return null;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["store-info"], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$5["store-logo"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Image,
      {
        className: styles$5["logo-img"],
        src: data.shopLogo,
        mode: "aspectFit"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["store-detail"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["detail-header"], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["store-title"], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$5["store-name"], children: data.storeName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StoreTag, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["store-logistics"], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["delivery-detail"], children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$5["delivery"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                className: classNames([
                  styles$5["minimum-delivery-fee"],
                  styles$5["delivery-fee"]
                ]),
                children: data.initialDeliveryPrice
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              View,
              {
                style: {
                  backgroundColor: data.freightBgStartColor
                },
                className: styles$5["delivery"],
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: data.baseFreightColor
                    },
                    className: classNames([
                      styles$5["initial-delivery-fee"],
                      styles$5["delivery-fee"]
                    ]),
                    children: data.baseFreight
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TimeDistance, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$5["store-sales-retention"], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SalesText, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RetentionsDetail, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        View,
        {
          className: classNames([
            styles$5["store-coupons"],
            styles$5[isShouldCollapse((_a = data.couponVOList) == null ? void 0 : _a.length)],
            styles$5[isShouldExpand()]
          ]),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(store_coupon_default, { data }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StoreCouponArrow, {})
          ]
        }
      )
    ] })
  ] }) });
}
var store_info_default = StoreInfo;
const styles$4 = { "product": "index-module__product___aRuVu", "product-cover": "index-module__product-cover___J6ZlD", "product-img": "index-module__product-img___mi-H9", "product-tag": "index-module__product-tag___se0Vg", "product-tag-text": "index-module__product-tag-text___KUIpa", "product-name": "index-module__product-name___gYq6K", "product-name-text": "index-module__product-name-text___5PUq9", "product-prices": "index-module__product-prices___-TFQG", "product-price": "index-module__product-price___tg27d", "crossed-out": "index-module__crossed-out___wDDEy", "product-price-text": "index-module__product-price-text___VVUa6", "crossed-out-text": "index-module__crossed-out-text___rtxjj" };
function StoreProductMod(props) {
  const { data } = props;
  const ProductMinorPrice = (props2) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { color: "#F92B18", fontSize: 11 }, children: "¥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { color: "#F92B18", fontSize: 23 }, children: props2.price })
    ] });
  };
  function ProductTagList({ product }) {
    if (product.productTagList && product.productTagList[0]) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        View,
        {
          style: {
            backgroundColor: product.productTagList[0].bgColor
          },
          className: styles$4["product-tag"],
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Text,
            {
              style: {
                color: product.productTagList[0].textColor
              },
              className: styles$4["product-tag-text"],
              children: product.productTagList[0].text
            }
          )
        }
      );
    } else {
      return null;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: data.productBaseVOList.map((product, index) => {
    var _a;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$4["product"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$4["product-cover"], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            className: styles$4["product-img"],
            src: product.picUrl,
            mode: "aspectFit"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProductTagList, { product })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$4["product-name"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$4["product-name-text"], children: product.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$4["product-prices"], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$4["product-price"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductMinorPrice, { price: product.minorPrice }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          View,
          {
            className: classNames([
              styles$4["crossed-out"],
              styles$4["product-price"]
            ]),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                className: classNames([
                  styles$4["crossed-out-text"],
                  styles$4["product-price-text"]
                ]),
                children: (_a = product.minorPrice.priceText2) != null ? _a : product.minorPrice.priceText
              }
            )
          }
        )
      ] })
    ] }, index);
  }) });
}
var store_product_default = StoreProductMod;
const styles$3 = { "product-coupon": "index-module__product-coupon___vV3u9", "product-coupon-detail": "index-module__product-coupon-detail___vpaK5", "product-coupon-price": "index-module__product-coupon-price___kOrro", "product-coupon-desc": "index-module__product-coupon-desc___GUWad", "product-coupon-text": "index-module__product-coupon-text___lPx2U", "product-coupon-price-sym": "index-module__product-coupon-price-sym___aGTRM", "product-coupon-price-amount": "index-module__product-coupon-price-amount___EWydi", "product-coupon-name": "index-module__product-coupon-name___OGytj", "coupon-product-desc": "index-module__coupon-product-desc___K-7Dg", "coupon-product-text": "index-module__coupon-product-text___-bzT3", "product-coupon-line": "index-module__product-coupon-line___26OCC", "product-coupon-bottom": "index-module__product-coupon-bottom___JsaDn", "product-coupon-button": "index-module__product-coupon-button___EJpv3", "product-coupon-button-text": "index-module__product-coupon-button-text___viJ01", "product-coupon-button-icon": "index-module__product-coupon-button-icon___TYWG8" };
function ProductCoupon(props) {
  const { data } = props;
  function ProductCouponDesc() {
    if (data.productCouponVOList[0].couponDesc) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$3["product-coupon-desc"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$3["product-coupon-text"], children: data.productCouponVOList[0].couponDesc }) });
    } else {
      return null;
    }
  }
  if (data.productCouponVOList.length <= 0)
    return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: classNames([styles$3["product"], styles$3["product-coupon"]]), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$3["product-coupon-detail"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$3["product-coupon-price"], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$3["product-coupon-price-sym"], children: "¥" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$3["product-coupon-price-amount"], children: data.productCouponVOList[0].amount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$3["product-coupon-name"], children: [
        "满",
        data.productCouponVOList[0].quota,
        "减",
        data.productCouponVOList[0].amount
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCouponDesc, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$3["product-coupon-line"] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles$3["product-coupon-bottom"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$3["product-coupon-button"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: styles$3["product-coupon-button-text"], children: "领超值券" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Image,
        {
          className: styles$3["product-coupon-button-icon"],
          src: "https://img20.360buyimg.com/img/jfs/t1/245373/21/9987/252/666058e6F5c555577/f2847ed3879528f5.png",
          mode: "aspectFit"
        }
      )
    ] }) })
  ] });
}
var product_coupon_default = ProductCoupon;
const styles$2 = { "store-products": "index-module__store-products___MzGSn", "products": "index-module__products___gu98x" };
function StoreProducts(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollView, { scrollX: true, className: styles$2["store-products"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$2["products"], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(product_coupon_default, __spreadValues({}, props)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(store_product_default, __spreadValues({}, props))
  ] }) });
}
var store_products_default = StoreProducts;
const styles$1 = { "store": "index-module__store___cZ3qG" };
function StoreMod(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: styles$1["store"], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(store_info_default, __spreadValues({}, props)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(store_products_default, __spreadValues({}, props))
  ] });
}
var store_default = StoreMod;
const styles = { "product": "index-module__product___-8U9g", "product-cover": "index-module__product-cover___7JMwM", "product-img": "index-module__product-img___EcSkO", "product-tag": "index-module__product-tag___s4u5-", "product-tag-text": "index-module__product-tag-text___8SYtd", "product-name": "index-module__product-name___dXj7k", "product-name-text": "index-module__product-name-text___oO50N", "product-prices": "index-module__product-prices___PpAAv", "product-price": "index-module__product-price___0HjZW", "crossed-out": "index-module__crossed-out___oqOJZ", "product-price-text": "index-module__product-price-text___Pgawz", "crossed-out-text": "index-module__crossed-out-text___zMLk3", "product-coupon": "index-module__product-coupon___fGdtb", "product-coupon-detail": "index-module__product-coupon-detail___u-oX9", "product-coupon-price": "index-module__product-coupon-price___isQLG", "product-coupon-price-sym": "index-module__product-coupon-price-sym___EIO8H", "product-coupon-price-amount": "index-module__product-coupon-price-amount___ewR2-", "product-coupon-name": "index-module__product-coupon-name___XlBTq", "coupon-product-desc": "index-module__coupon-product-desc___4mQQk", "coupon-product-text": "index-module__coupon-product-text___73HaY", "product-coupon-line": "index-module__product-coupon-line___TwcZW", "product-coupon-bottom": "index-module__product-coupon-bottom___n-SoV", "product-coupon-button": "index-module__product-coupon-button___T3Ssd", "product-coupon-button-text": "index-module__product-coupon-button-text___8mJzO", "product-coupon-button-icon": "index-module__product-coupon-button-icon___Kwu-b", "store-products": "index-module__store-products___vObIm", "products": "index-module__products___e6sLv", "coupon": "index-module__coupon___ZJmz-", "coupon-text": "index-module__coupon-text___JVtAp", "coupon-flag": "index-module__coupon-flag___FESlA", "store-info": "index-module__store-info___jJHwc", "store-logo": "index-module__store-logo___psP9a", "logo-img": "index-module__logo-img___uj3C4", "tips": "index-module__tips___U-Eke", "store-detail": "index-module__store-detail___VdXCs", "detail-header": "index-module__detail-header___aBOQC", "store-title": "index-module__store-title___XHkZA", "store-name": "index-module__store-name___HLFpA", "store-tag": "index-module__store-tag___wrKqP", "store-logistics": "index-module__store-logistics___-b4Ev", "delivery": "index-module__delivery___r7Xcv", "delivery-detail": "index-module__delivery-detail___b3NrP", "initial-delivery": "index-module__initial-delivery___zkjJA", "delivery-fee": "index-module__delivery-fee___QY4Gf", "time-distance": "index-module__time-distance___xaEQQ", "time-consuming": "index-module__time-consuming___NqeuV", "store-sales-retention": "index-module__store-sales-retention___yrzTV", "sales-detail": "index-module__sales-detail___JDNWv", "sales-text": "index-module__sales-text___hmYnE", "retention-detail": "index-module__retention-detail___RLKzb", "retention-text": "index-module__retention-text___Yqy7j", "distance": "index-module__distance___9s0ce", "store-coupons": "index-module__store-coupons___KtMvs", "store-coupons-collapse": "index-module__store-coupons-collapse___gwd2J", "store-coupons-expand": "index-module__store-coupons-expand___f-EzK", "icon-arrow": "index-module__icon-arrow___91Jz7", "icon-arrow-img": "index-module__icon-arrow-img___oENo3", "store": "index-module__store___9MW-H", "main": "index-module__main___vDKwo" };
function OneHourShopping() {
  const [data, setData] = useState(dataJSON);
  const onChangeData = (key, val) => {
    const newData = __spreadValues({}, data);
    newData[key] = val;
    setData(newData);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: styles["main"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(store_default, { data, onChangeData }) });
}
var index_default = OneHourShopping;
export {
  index_default as default
};
