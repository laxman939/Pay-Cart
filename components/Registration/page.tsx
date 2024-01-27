"use client";
import { UserType, addUser, setLoginPage } from "@/app/redux/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [storedUser, setStoredUser] = useState<UserType | null>(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatcher = useDispatch();

  const toggleForm = () => {
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const errorMethod = (isTrue: boolean, type: string) => {
    console.log(type);

    if (isTrue) {
      setErrorMessage("");
    } else {
      setErrorMessage(
        type === "mail"
          ? "Please enter valid email address"
          : "Please enter valid password"
      );
      // setTimeout(() => {
      //   setErrorMessage("");
      // }, 10000);
    }
  };

  useEffect(() => {
    const storedObjectString: string | null =
      localStorage.getItem("payCart_User");
    const storedObject: UserType | null = storedObjectString
      ? JSON.parse(storedObjectString)
      : null;
    setStoredUser(storedObject);
    console.log(storedObject, "storedObjectString");
    // dispatcher(addUser(newUser));
    console.log(isLoginFormVisible, "isLoginFormVisible");
  }, [isLoginFormVisible]);

  return (
    <div className="register_page relative">
      <div className={`form-structor ${isLoginFormVisible ? "" : "slide-up"}`}>
        <div
          className={`signup relative ${isLoginFormVisible ? "" : "slide-up"}`}
        >
          <h2
            className="form-title font-semibold cursor-pointer text-center"
            onClick={toggleForm}
          >
            <span
              className={`text-secondary`}
              style={{
                display: isLoginFormVisible ? "none" : "inline-block",
                fontSize: "0.8rem",
              }}
            >
              or
            </span>
            Sign up
          </h2>
          <div className="form-holder">
            <input
              type="text"
              className="input"
              placeholder="Name"
              name="name"
              value={userName}
              onChange={(e) => {
                !/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g.test(
                  e.target.value
                ) &&
                  /^[a-zA-Z]+$/.test(e.target.value) &&
                  setUserName(e.target.value);
              }}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              value={userEmail}
              onChange={(e) => {
                !/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g.test(
                  e.target.value
                ) && setUserEmail(e.target.value),
                  setErrorMessage("");
              }}
              onBlur={() => {
                userEmail.length > 2 &&
                  errorMethod(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail),
                    "mail"
                  );
              }}
            />
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="input"
                placeholder="Password"
                name="password"
                value={userPassword}
                onChange={(e) => {
                  !/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g.test(
                    e.target.value
                  ) && setUserPassword(e.target.value),
                    setErrorMessage("");
                }}
                onBlur={() => {
                  userPassword.length > 2 &&
                    errorMethod(
                      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(userPassword),
                      "password"
                    );
                }}
              />
              <span
                className="absolute bottom-3 right-3 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={` ${
              !(
                userName.length > 2 &&
                userPassword.length > 7 &&
                userEmail.length > 7
              )
                ? "submit-btn opacity-70 cursor-not-allowed font-bold rounded-xl w-full text-sm border-0 block my-4 mx-auto py-3 px-11"
                : "submit-btn opacity-100 font-bold rounded-xl w-full text-sm border-0 block my-4 mx-auto py-3 px-11"
            }`}
            disabled={
              !(
                userName.length > 2 &&
                userPassword.length > 7 &&
                userEmail.length > 7
              )
            }
            onClick={() => {
              setBtnLoader(true);
              if (
                userName.length > 2 &&
                /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(userPassword) &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
              ) {
                const newUser: UserType = {
                  name: userName,
                  emailId: userEmail,
                  password: userPassword,
                  isRegistered: true,
                  isSaved: false,
                };
                localStorage.setItem("payCart_User", JSON.stringify(newUser));
                console.log(newUser);
                dispatcher(addUser(newUser));
                setSuccessMessage(
                  "You've successfully signed up! Start shopping with code 'NEWUSER' to get 10% off your first purchase."
                );
                setTimeout(() => {
                  setBtnLoader(false);
                  setSuccessMessage("");
                  setIsLoginFormVisible(!isLoginFormVisible);
                  setUserName("");
                  setUserEmail("");
                  setUserPassword("");
                }, 6000);
              }
            }}
          >
            Sign up
          </button>
        </div>
        <div className={`login ${isLoginFormVisible ? "slide-up" : ""}`}>
          <div className="center">
            {successMessage === "" ? (
              <h2
                className="form-title font-semibold cursor-pointer text-center"
                onClick={toggleForm}
              >
                <span
                  className={`text-secondary`}
                  style={{
                    display: !isLoginFormVisible ? "none" : "inline-block",
                    fontSize: "0.8rem",
                  }}
                >
                  or
                </span>
                Log in
              </h2>
            ) : null}

            <div className="form-holder">
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                value={userEmail}
                onChange={(e) => {
                  !/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g.test(
                    e.target.value
                  ) && setUserEmail(e.target.value),
                    setErrorMessage("");
                }}
                onBlur={() => {
                  userEmail.length > 2 &&
                    errorMethod(
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail),
                      "mail"
                    );
                }}
              />

              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className="input"
                  placeholder="Password"
                  name="password"
                  value={userPassword}
                  onChange={(e) => {
                    !/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g.test(
                      e.target.value
                    ) && setUserPassword(e.target.value),
                      setErrorMessage("");
                  }}
                  onBlur={() => {
                    userPassword.length > 2 &&
                      errorMethod(
                        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(userPassword),
                        "password"
                      );
                  }}
                />
                <button
                  className="absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              className={` ${
                !(userPassword.length > 7 && userEmail.length > 7)
                  ? "submit-btn opacity-70 cursor-not-allowed font-bold rounded-xl w-full text-sm border-0 block my-4 mx-auto py-3 px-11"
                  : "submit-btn opacity-100 font-bold rounded-xl w-full text-sm border-0 block my-4 mx-auto py-3 px-11"
              }`}
              disabled={!(userPassword.length > 7 && userEmail.length > 7)}
              onClick={() => {
                setBtnLoader(true);
                if (storedUser?.emailId !== userEmail) {
                  setErrorMessage(
                    "Invalid email address. Please check your email and try again."
                  );
                  setTimeout(() => {
                    setErrorMessage("");
                    setBtnLoader(false);
                  }, 3000);
                } else if (storedUser?.password !== userPassword) {
                  setErrorMessage(
                    "Incorrect password. Please double-check your password and try again."
                  );
                  setTimeout(() => {
                    setErrorMessage("");
                    setBtnLoader(false);
                  }, 3000);
                } else if (
                  storedUser?.emailId === userEmail &&
                  storedUser?.password === userPassword
                ) {
                  setSuccessMessage(
                    "Successfully logged in! Don't forget to check out our latest collections and promotions. Your savings and rewards are waiting for you."
                  );
                  setTimeout(() => {
                    setSuccessMessage("");
                    setBtnLoader(false);
                    dispatcher(addUser(storedUser));
                    dispatcher(setLoginPage(false));
                  }, 6000);
                }
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <p
        className={`z-auto small text-sm absolute bottom-3 pb-3 font-semibold h-14 text-center w-1/4 ${
          errorMessage ? " text-red-500" : "text-green-700"
        }`}
      >
        {errorMessage || successMessage}
      </p>
    </div>
  );
};

export default Register;
