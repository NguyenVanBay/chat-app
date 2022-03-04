import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument } from "../../firebase/services";

const { Title } = Typography;

export default function Login() {
  async function handeGoogleLogin() {
    const provider = new GoogleAuthProvider();

    provider.addScope("profile");
    provider.addScope("email");
    const result = await signInWithPopup(auth, provider);
    const { user, _tokenResponse } = result;
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;

    if (!!_tokenResponse.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: user.providerData[0].providerId
      });
    }
  }

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlight: "center" }} level={3}>
            Chat app
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={handeGoogleLogin}
          >
            Login google
          </Button>
          <Button style={{ width: "100%" }}>Login facebook</Button>
        </Col>
      </Row>
    </div>
  );
}
