import { registerUser } from "@/lib/api/UserApi";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])[A-Za-z\d!?-]{6,24}$/;

const RegisterForm = () => {
  const userRef = useRef<HTMLInputElement>(null);

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const valid = USER_REGEX.test(form.email);
    setValidEmail(valid);
    setError("");
  }, [form.email]);

  useEffect(() => {
    const valid = PWD_REGEX.test(form.password);
    setValidPassword(valid);
    setError("");
  }, [form.password, form.confirm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validEmail && validPassword && form.password === form.confirm) {
      try {
        const resp = await registerUser("/register", {
          email: form.email,
          password: form.password,
        });
        if (resp) {
          const response = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: true,
            callbackUrl: "/",
          });
        }
      } catch (err) {
        console.log(err);
        setError("Error with sending the request");
      }
    } else if (!validEmail) {
      setError("Invalid Email!");
    } else if (!validPassword) {
      setError(
        "Password must be 6 characters. Allowed special characters: !?-"
      );
    } else if (form.confirm !== form.password) {
      setError("Passwords must match");
    } else {
      setError("Login failed");
    }
  };

  return (
    <form
      className="flex flex-col gap-6 px-12 pt-6 pb-8 font-semibold text-white bg-gray-800 bg-opacity-50 border border-red-900 rounded w-80"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="pt-2 text-red-500 min-h-[35px] text-sm">{error} </p>
      <input
        className="px-1 text-black rounded"
        ref={userRef}
        placeholder="Username or Email..."
        value={form.email}
        onChange={(e) =>
          setForm((prev) => {
            return { ...prev, email: e.target.value };
          })
        }
      />
      <input
        className="px-1 text-black rounded"
        placeholder="Password..."
        value={form.password}
        type="password"
        onChange={(e) =>
          setForm((prev) => {
            return { ...prev, password: e.target.value };
          })
        }
      />
      <div>
        <input
          className="px-1 text-black rounded"
          placeholder="Confirm Password..."
          value={form.confirm}
          type="password"
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, confirm: e.target.value };
            })
          }
        />
        <p className="text-sm">Use at least 6 characters</p>
      </div>

      <button
        type="submit"
        className="p-1 rounded bg-dLightGreen disabled:bg-gray-400"
        // disabled={validEmail && validPassword ? false : true}
      >
        Register
      </button>

      <Link className="underline underline-offset-2" href="/signin">
        Already have an account?
      </Link>
    </form>
  );
};

export default RegisterForm;
