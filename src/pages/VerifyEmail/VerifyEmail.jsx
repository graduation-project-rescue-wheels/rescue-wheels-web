import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import verifyImageWait from "../../assets/icons/verify-cryptocurrency.svg";
import verifyImageDone from "../../assets/icons/verify-cryptocurrency (1).svg";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { VerifyAccount } from "../../store/AuthSlice";
import { Toaster } from "react-hot-toast";
import { showErrorToast, showSuccessToast } from "../../components/toast";
const VerifyEmail = () => {
  const [verifyImage, setVerifyImage] = useState(verifyImageWait);
  const [loading, setloading] = useState(false);
  const { userToken } = useParams();
  console.log(userToken);
  const dispatch = useDispatch();
  const verifyAccount = async () => {
    let formData = {
      userToken,
    };
    setloading(true);
    const res = await dispatch(VerifyAccount(formData));
    console.log(res.payload);
    if (res.payload.data?.errMsg) {
      if (res.payload.data?.errMsg == "jwt expired")
        showErrorToast("Token expired");
      console.log(res.payload.data.errMsg);
    } else {
      if (res.payload.status == 200) {
        showSuccessToast(res.payload.message);

        setVerifyImage(verifyImageDone);
      } else {
        showErrorToast(res.payload.message);
      }
    }

    setloading(false);
  };

  return (
    <div className="py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-50 mt-5 text-center m-auto bg-white rounded-5">
        <div>
          <Card maxW="sm">
            <CardBody>
              <Stack mt="6" spacing="3">
                {/* <Loader/> */}
                <div className="m-auto mt-3  d-flex justify-content-center">
                  {loading ? (
                    <Loader />
                  ) : (
                    <img src={verifyImage} width={90} alt="verify" />
                  )}
                </div>

                <Heading size="md">Rescue Wheels</Heading>
                <Text>
                  Please click on the following button to activate your Account.
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2" className=" w-100 m-auto">
                <Button
                  onClick={verifyAccount}
                  className="btn mb-3 w-50 m-auto"
                  style={{ backgroundColor: "#e48700", color: "white" }}
                  variant="solid"
                  colorScheme="blue"
                >
                  Verify
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
