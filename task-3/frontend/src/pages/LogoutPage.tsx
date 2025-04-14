import { userSignedOut } from "@/slices/auth-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LogoutPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userSignedOut());
  }, [dispatch]);
  return <></>;
}
