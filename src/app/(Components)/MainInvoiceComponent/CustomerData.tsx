export function CustomerData({ patientData }: any) {
  const outPut = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    return formattedDate;
  };
  const TimeOutPut = () => {
    const currentDate = new Date();
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    return formattedTime;
  };
  return (
    <div className="flex justify-evenly p-2 border-black border-y-2">
      <div className="flex flex-col">
        <p>
          Patient name:{" "}
          <span className="font-semibold"> {patientData.patient_name}</span>
        </p>
        <p>
          Patient number:
          <span className="font-semibold"> {patientData.phone_number}</span>
        </p>
      </div>
      <div className="flex flex-col">
        <p>
          Gender:
          <span className="font-semibold"> {patientData.gender} </span>
        </p>
        <p>
          Age:
          <span className="font-semibold"> {patientData.age}</span>
        </p>
      </div>
      <div>
        <p>Date: {outPut()}</p>
        <p>Time: {TimeOutPut()}</p>
      </div>
    </div>
  );
}
