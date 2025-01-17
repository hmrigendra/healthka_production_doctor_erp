"use client";
import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useState } from "react";
import { Modal } from "../(Components)/Modal";
import { Backdrop, CircularProgress } from "@mui/material";

export default function ClinicProfile() {
  console.log("====================================");
  console.log("test");
  console.log("====================================");
  const [clinic, setClinic] = useState({
    clinic_name: "",
    start_time: "",
    end_time: "",

    clinic_phone_number: "",
    GST: "",
  });
  const [workingDays, setWorkingDays] = useState<Set<string>>(new Set());

  const [onAdding, setOnAdding] = useState<boolean[]>([
    false, // Monday
    false, // Tuesday
    false, // Wednesday
    false, // Thursday
    false, // Friday
    false, // Saturday
    false, // Sunday
  ]);

  const onSelect = (value: string, index: number) => {
    setWorkingDays((previous) => {
      const newSet = new Set(previous); // Create a new Set based on the previous state
      if (newSet.has(value + " ")) {
        newSet.delete(value + " "); // If the value exists in the set, delete it
      } else {
        newSet.add(value + " "); // If the value doesn't exist, add it to the set
      }
      setOnAdding((previousOnAdding) => {
        const updatedOnAdding = [...previousOnAdding];
        updatedOnAdding[index] = !updatedOnAdding[index];
        return updatedOnAdding;
      });
      return newSet; // Return the new Set
    });
  };

  const [clinicAddress, setClinicAddress] = useState({
    house_number: "",
    lane: "",
    address_one: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOnclose = () => setShowModal(false);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // const test = () => {
  //   router.push("/Auth");
  // };

  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const clinicPost = async () => {
    try {
      if (
        clinic.clinic_name.length === 0 ||
        clinic.start_time.length === 0 ||
        clinic.end_time.length === 0 ||
        clinic.clinic_phone_number.length === 0
      ) {
        setErrors(true);
      } else {
        const doctor_id = searchParams.get("doctor_id");
        const name = searchParams.get("doctor_name");
        setIsLoading(true);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/doctors/add_clinic`,
          {
            clinic_name: clinic.clinic_name,
            start_time: clinic.start_time,
            end_time: clinic.end_time,
            working_days: [...workingDays],
            clinic_phone_number: clinic.clinic_phone_number,
            gst: clinic.GST,
            house_number: clinicAddress.house_number,
            lane: clinicAddress.lane,
            address_one: clinicAddress.address_one,
            landmark: clinicAddress.landmark,
            city: clinicAddress.city,
            state: clinicAddress.state,
            pin_code: clinicAddress.pin_code,
            clinic_type: 1,
            country: "INDIA",
            doctor_id: doctor_id,
          }
        );
        setIsLoading(false);
        if (response) {
          console.log("====================================");
          console.log(response.data.clinicDoctorsResult.result);
          console.log("====================================");
          console.log("Response:", response.data.clinicDoctorsResult.result);

          router.push(
            `/Auth?doctor_id=${doctor_id}&name=${name}&clinic_id=${response.data.clinicDoctorsResult.result}`
          );
        }
      }
    } catch (error: any) {
      setMessage(error.message);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Suspense>
        <Modal visible={showModal} onClose={handleOnclose} response={message} />
        <div className=" md:max-w-xl md:mx-auto  xl:max-w-4xl xl:mx-auto m-5 p-5 rounded shadow-xl lg:max-w-xl lg:mx-auto bg-white">
          {isLoading ? (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={isLoading} // Use isLoading state variable here
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <div className=" p-20 bg-white">
              <div className="w-full ">
                <div className="flex">
                  <div className="flex-col w-1/2 ">
                    <p>Clinic name</p>
                    <input
                      value={clinic.clinic_name}
                      onChange={(e) =>
                        setClinic({ ...clinic, clinic_name: e.target.value })
                      }
                      type="text"
                      placeholder="Clinic name"
                      className="bg-red-200 rounded-lg m-3  placeholder:text-gray-500 w-[70%] p-2"
                    />
                    {clinic.clinic_name.length === 0 && errors ? (
                      <p className="text-sm text-blue-700">
                        Clinic name can't be empty
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex-col">
                    <p>Clinic Phone number</p>
                    <input
                      type="text"
                      placeholder="Phone number"
                      className="bg-red-200 rounded-lg  m-3  placeholder:text-gray-500 w-[100%] p-2"
                      value={clinic.clinic_phone_number}
                      onChange={(e) =>
                        setClinic({
                          ...clinic,
                          clinic_phone_number: e.target.value,
                        })
                      }
                    />
                    {clinic.clinic_phone_number.length === 0 && errors ? (
                      <p className="text-sm text-blue-700">
                        Clinic phone number can't be empty
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-[75%] p-6">
                <div className="flex-col mr-10">
                  <p>opening time</p>
                  <input
                    type="time"
                    className="text-red-700  text-lg"
                    value={clinic.start_time}
                    onChange={(e) =>
                      setClinic({ ...clinic, start_time: e.target.value })
                    }
                  />
                  {clinic.start_time.length === 0 && errors ? (
                    <p className="text-sm text-blue-700">
                      Clinic opening time is required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex-col mr-10">
                  <p>closing time</p>
                  <input
                    type="time"
                    className="text-red-700  text-lg"
                    value={clinic.end_time}
                    onChange={(e) =>
                      setClinic({ ...clinic, end_time: e.target.value })
                    }
                  />
                  {clinic.end_time.length === 0 && errors ? (
                    <p className="text-sm text-blue-700">
                      Clinic opening time is required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex w-full justify-between">
                <div className="">
                  <p>GST</p>
                  <input
                    type="text"
                    placeholder="Gst number"
                    className="bg-red-200 rounded-lg  m-3  placeholder:text-gray-500 w-[100%] p-2"
                    value={clinic.GST}
                    onChange={(e) =>
                      setClinic({ ...clinic, GST: e.target.value })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <p>working days</p>
                  <ul className="space-x-1">
                    {days.map((data: any, i: number) => (
                      <li
                        key={i}
                        onClick={() => onSelect(data, i)}
                        className={`inline-block m-2 p-2 rounded-md bg-red-300 cursor-pointer`}
                      >
                        {data && data.charAt(0)}
                      </li>
                    ))}
                  </ul>

                  <p>{workingDays}</p>

                  {workingDays.size === 0 && errors ? (
                    <p className="text-sm text-blue-700">
                      Working days are required
                    </p>
                  ) : null}
                </div>
              </div>
              <div>
                <div>
                  <p>Clinic Address</p>
                </div>
                <div className="flex w-full m-3">
                  <input
                    type="text"
                    className="w-2/6 mr-10 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
                    placeholder="House No./Room No./Apartment no"
                    value={clinicAddress.house_number}
                    onChange={(e) =>
                      setClinicAddress({
                        ...clinicAddress,
                        house_number: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="w-2/6 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
                    placeholder="Locality/Lane/colony/Road"
                    value={clinicAddress.lane}
                    onChange={(e) =>
                      setClinicAddress({
                        ...clinicAddress,
                        lane: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex w-full m-3">
                  <input
                    type="text"
                    className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                    placeholder="Address one"
                    value={clinicAddress.address_one}
                    onChange={(e) =>
                      setClinicAddress({
                        ...clinicAddress,
                        address_one: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                    placeholder="Landmark"
                    value={clinicAddress.landmark}
                    onChange={(e) =>
                      setClinicAddress({
                        ...clinicAddress,
                        landmark: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex w-full m-3">
                  <div className="flex">
                    <input
                      type="text"
                      className="w-1/2 p-2 m-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                      placeholder="City"
                      value={clinicAddress.city}
                      onChange={(e) =>
                        setClinicAddress({
                          ...clinicAddress,
                          city: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      className="w-1/2 p-2 m-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                      placeholder="State"
                      value={clinicAddress.state}
                      onChange={(e) =>
                        setClinicAddress({
                          ...clinicAddress,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-col ">
                    <input
                      type="text"
                      className="w-1/2 p-2 m-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                      placeholder="Pincode"
                      value={clinicAddress.pin_code}
                      onChange={(e) =>
                        setClinicAddress({
                          ...clinicAddress,
                          pin_code: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={clinicPost}
                className="bg-blue-500 p-2 pl-6 pr-6 rounded-md  text-white font-semibold "
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </Suspense>
    </>
  );
}
