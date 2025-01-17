import { FaClinicMedical } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface ClinicData {
  id: string;
  clinic_id: string;
  doctor_id: string;
  timing: string;
  working_days: string;
  created_at: string;
  clinic_name: string;
  clinic_type: number;
}
interface AddressData {
  address_id: string;
  house_number: string;
  lane: string;
  address_one: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  doctor_id?: string;
  clinic_id?: String;
}
interface DoctorProfileBodyProps {
  data: ClinicData[];
  addressData: AddressData[];
}

export function DoctorProfileBody({
  data,
  addressData,
}: DoctorProfileBodyProps) {
  return (
    <div className="flex justify-between w-[100%]">
      <div className="p-10 bg-white">
        <p className="w-full bg-indigo-500 text-white font-semibold pl-2 rounded-lg p-1">
          Partnered Clinic
        </p>
        <div className="flex gap-20 justify-evenly text-md font-bold text-indigo-900 bg-production-white rounded-lg p-2">
          <p>Name of clinic</p>
          <p>Working days & Hrs</p>
          <p>Address</p>
        </div>
        {data.map((clinic, index) => (
          <div
            key={index}
            className="flex gap-32 bg-production-white m-2 rounded-lg"
          >
            <div className="flex min-w-[200px] line-clamp-2 text-indigo-900 text-md font-semibold">
              <FaClinicMedical className="size-10 ml-1 mr-2" />
              <p className="line-clamp-3">{clinic.clinic_name}</p>
            </div>
            <div className="flex flex-col min-w-[200px] text-md font-semibold text-indigo-900 items-center">
              <p>{clinic.timing}</p>
              <div className="flex gap-2">
                <p>M</p>
                <p>T</p>
                <p>W</p>
                <p>T</p>
                <p>F</p>
                <p>S</p>
                <p>S</p>
              </div>
            </div>
            {addressData.map((data) => (
              <div key={data.address_id} className="items-center">
                <p className="font-semibold line-clamp-1   items-center max-w-[150px] overflow-hidden text-indigo-900">
                  {data.house_number},{data.lane},{data.address_one},
                  {data.landmark},{data.city},{data.state},{data.pincode},
                  {data.country}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="p-8 bg-white">
        <p className="w-full bg-indigo-500 text-white font-semibold pl-4 rounded-lg pr-4 p-2">
          Clinic request
        </p>

        <div className="flex gap-4 items-center m-1 w-full  bg-indigo-500 p-1 rounded-md text-white border-2 font-semibold">
          <FaClinicMedical className="size-10 " />
          <p className=" max-w-[200px] line-clamp-2">
            Gentle Care Family Clinic
          </p>
          <div className="bg-production-white text-black">
            <p className="text-sm text-center">New request</p>
            <div className="flex justify-center">
              <button className="bg-production-green p-1 pl-5 pr-5 m-2 rounded-lg">
                <FaCheck />
              </button>
              <button className="bg-production-red p-1 pl-5 pr-5 m-2 rounded-lg">
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
