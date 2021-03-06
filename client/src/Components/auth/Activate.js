import React, { useEffect, useCallback } from "react";
import { useUserStore } from "../../Context/appStore";
import { activation } from "../../actions/userAction";
import { Redirect } from "react-router-dom";

const Activate = props => {
  const [, dispatch] = useUserStore();
  const stableDispatch = useCallback(dispatch, []);

  let username = props.match.params.username;
  let token = props.match.params.token;
  useEffect(() => {
    async function funActivation() {
      await activation(username, token, stableDispatch);
    }
    funActivation();
  }, [stableDispatch, username, token]);
  return <Redirect to="/login" />;
};
export default Activate;
