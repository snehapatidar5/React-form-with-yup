import { useState } from 'react';
import * as Yup from 'yup';

function Form({ onSubmit }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    number: '',
    gender: '',
    state: '',
    subjects: [],
    date: '',  
    time: ''
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    number: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    gender: Yup.string().required("Gender is required"),
    subjects: Yup.array()
      .min(1, "Select at least one interest")
      .required("Subjects are required"),
    date: Yup.date().required("Date of birth is required"),
    state: Yup.string()
      .oneOf(["Madhya Pradesh", "Rajasthan", "Maharashtra"], "Please select a valid state")
      .required("State is required"),
    time: Yup.string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM, 24-hour format)")
      .required("Time is required"),
  });

  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setForm({ ...form, subjects: [...form.subjects, value] });
      } else {
        setForm({
          ...form,
          subjects: form.subjects.filter((subject) => subject !== value),
        });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(form, { abortEarly: false });
      console.log("Form Submitted", form);
      onSubmit(form); 
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full m-auto">
      <h1 className="text-2xl font-bold text-gray-700">Registration Form</h1>
      <form className="w-full max-w-lg" onSubmit={handleOnSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm  font-bold mb-2">
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter Your Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleForm}
            />
            {errors.fullName && <p className="text-red-500  text-sm mb-2  ">{errors.fullName}</p>}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm mb-2 font-bold ">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={form.email}
              onChange={handleForm}
            />
            {errors.email && <p className="text-red-500  text-sm mb-2  ">{errors.email}</p>}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm  font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={form.password}
              onChange={handleForm}
            />
            {errors.password && <p className="text-red-500  text-sm mb-2  ">{errors.password}</p>}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm  font-bold mb-2">
              Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="tel"
              placeholder="Enter Your Phone Number"
              name="number"
              value={form.number}
              onChange={handleForm}
            />
            {errors.number && <p className="text-red-500  text-sm mb-2  ">{errors.number}</p>}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm  font-bold mb-2">
              Gender
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="gender"
                value={form.gender}
                onChange={handleForm}
              >
                <option value="">Select a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500  text-sm mb-2  ">{errors.gender}</p>}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm  font-bold mb-2">
              Date Of Birth
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
              name="date"
              value={form.date}
              onChange={handleForm}
            />
            {errors.date && <p className="text-red-500  text-sm mb-2  ">{errors.date}</p>}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm  font-bold mb-2">
              Time
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="time"
              name="time"
              value={form.time}
              onChange={handleForm}
            />
            {errors.time && <p className="text-red-500  text-sm mb-2  ">{errors.time}</p>}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm  font-bold mb-2">
              State
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="state"
                value="Madhya Pradesh"
                checked={form.state === 'Madhya Pradesh'}
                onChange={handleForm}
                className="mr-2"
              />
              <label className="mr-4">Madhya Pradesh</label>
              <input
                type="radio"
                name="state"
                value="Rajasthan"
                checked={form.state === 'Rajasthan'}
                onChange={handleForm}
                className="mr-2"
              />
              <label className="mr-4">Rajasthan</label>
              <input
                type="radio"
                name="state"
                value="Maharashtra"
                checked={form.state === 'Maharashtra'}
                onChange={handleForm}
                className="mr-2"
              />
              <label>Maharashtra</label>
            </div>
            {errors.state && <p className="text-red-500  text-sm mb-2  ">{errors.state}</p>}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-sm font-bold mb-2">
              Subjects
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="subjects"
                value="Math"
                onChange={handleForm}
                checked={form.subjects.includes('Math')}
                className="mr-2"
              />
              <label className="mr-4">Math</label>
              <input
                type="checkbox"
                name="subjects"
                value="Science"
                onChange={handleForm}
                checked={form.subjects.includes('Science')}
                className="mr-2"
              />
              <label className="mr-4">Science</label>
              <input
                type="checkbox"
                name="subjects"
                value="History"
                onChange={handleForm}
                checked={form.subjects.includes('History')}
                className="mr-2"
              />
              <label className="mr-4">History</label>
            </div>
            {errors.subjects && <p className="text-red-500  text-sm mb-2  ">{errors.subjects}</p>}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
