import axios from "axios";
import http from "../api/http";
import axiosInstance from "../api/login";
export function signup(creds, redirectCallback) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return http
      .post("/users", { user: { ...creds } })
      .then((response) => {
        if (localStorage.getItem("jwt")) {
          localStorage.removeItem("jwt");
          dispatch({ type: "LOG_OUT" });
        }
        localStorage.setItem("jwt", response.data.jwt);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.jwt}`;
        dispatch({ type: "LOADING_DONE" });
        dispatch({ type: "LOG_IN", payload: response.data.user });
        redirectCallback();
      })
      .catch((r) => {
        dispatch({ type: `${r.response.status}` });
      });
  };
}

export function logIn(creds) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return (
      axiosInstance
        // .post("/login", { user: creds })
        .post(`auth/token/`, {
          grant_type: "password",
          username: creds.username,
          password: creds.password,
          client_id: "hzM2yj6DCF9zx5pI171nFNFsNbkyrU51FLMl39UL",
          client_secret:
            "0FP7oVRMz9m87S9S3y6kyyJOsdwxPbPkPEE65nAd9vmVAULYsIkMpnlg6wJr2mrRqtViwt0ODatGr8e3yyAnzOJP82YCyHdqynN6RkSZFQrY6nz0qo7cuQrirt6Alooi",
        })
        .then((response) => {
          localStorage.setItem("jwt", response.data.access_token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          dispatch({ type: "LOADING_DONE" });
          dispatch({
            type: "LOG_IN",
            payload: response.data.user,
          });
        })

        .catch((r) => {
          dispatch({ type: `${r.response.status}` });
        })
    );
  };
}

export function logOut() {
  localStorage.removeItem("jwt");
  return { type: "LOG_OUT" };
}

export function fetchCurrentUser() {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return http
      .get("user/get/")
      .then((response) => {
        // window.location.reload();
        dispatch({
          type: "LOADING_DONE",
        });
        dispatch({
          type: "LOG_IN",
          payload: response.data.user,
        });
      })
      .catch((r) => {
        dispatch({ type: `${r.response.status}` });
      });
  };
}

export function fetchSelectedAsset(sym) {
  var symbol = [];
  symbol.push(sym);
  return (dispatch) => {
    var api_key = encodeURIComponent("/ailjnQvniJt73luemfjIuaQiJk=");
    // delete axios.defaults.headers.common["Authorization"];
    axios(
      `https://apidata5.accelpix.in/api/fda/rest/quote?api_token=${api_key}`,
      {
        method: "POST",
        data: JSON.stringify(symbol),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => {
        console.log("res", res.data[0].pr);
        var price = 0.0;
        res.data.map((item) => {
          price = price + "" + item.pr;
          return null;
        });
        console.log("res.data[0]", res.data[0]);
        dispatch({ type: "ASSET_SELECTED", payload: res.data[0] });
      })
      .catch((err) => { console.log("error", err) });
  };
}

export const fetchExistingAsset = (id, sym) => async (dispatch) => {
  await dispatch(fetchSelectedAsset(sym));
  dispatch({ type: "ADD_ASSET_ID", payload: { id } });
};

export function modalClose() {
  return { type: "MODAL_CLOSE" };
}

export function modalOpen() {
  return { type: "MODAL_CLOSE" };
}

export function purchaseAsset(reqObj) {
  return (dispatch) => {
    dispatch({ type: "PURCHASE_COMPLETED", payload: "user" });
    reqObj["user"] = 1;
    console.log(" purchaseAsset reqObj", reqObj);
    return http
      .post("user/api/usertrade/", JSON.stringify(reqObj))
      .then((response) => {
        console.log("PURCHASE_COMPLETED", response);
        dispatch({
          type: "PURCHASE_COMPLETED",
          payload: response.data.user,
        });
      })
      .catch((r) => {
        dispatch({ type: `${r.response.status}` });
      });
  };
}

export function sellAsset(reqObj) {
  return (dispatch) => {
    console.log("sellAsset reqObj", reqObj);
    // return http
    //   .get("user/get/")
    //   .then((response) => {
    //     console.log("response.data", response.data);

    //     dispatch({
    //       type: "COMPLETED_SALE",
    //       payload: response.data.user,
    //     });
    //   })
    //   .catch((r) => {
    //     dispatch({ type: `${r.response.status}` });
    //   });

    return http
      .patch(`user/api/usertrade/${reqObj.id}/`, { ...reqObj })
      .then((response) => {
        dispatch({ type: "COMPLETED_SALE", payload: response.data.user });
      })
      .catch((r) => {
        dispatch({ type: `${r.response.status}` });
      });
  };
}

export function updateGainLoss(asset) {
  return { type: "UPDATE_GAIN_LOSS", payload: asset };
}
