import { useForm, Controller } from "react-hook-form";
import { Checkbox, Radio, Button } from "antd";
import FormField from "../components/FormField";

const HealthDeclarePage = () => {
  const { control, handleSubmit } = useForm();
  const checkboxesItems = [
    {
      value: "cough",
      text: "Cough",
    },
    {
      value: "smellImpairment",
      text: "Smell/test impairment",
    },
    {
      value: "fever",
      text: "Fever",
    },
    {
      value: "breathingDifficulty",
      text: "Breathing Difficulty",
    },
    {
      value: "bodyaches",
      text: "Body aches",
    },
    {
      value: "headaches",
      text: "Headaches",
    },
    {
      value: "fatigue",
      text: "Fatigue",
    },
    {
      value: "soreThroat",
      text: "Sore throat",
    },
    {
      value: "diarrhea",
      text: "Diarrhea",
    },
    {
      value: "runnyNose",
      text: "Runny nose (even if your symptoms are mild)",
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="health-declare-page flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 my-8 rounded shadow-md w-full max-w-3xl"
      >
        <FormField
          control={control}
          label="Name"
          name="name"
          type="text"
          required
        />
        <FormField
          control={control}
          label="Temperature"
          name="temperature"
          type="number"
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-left font-bold">
            Symptoms
          </label>
          <Controller
            name="symptoms"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Checkbox.Group {...field}>
                <div className="grid grid-cols-2 gap-2">
                  {checkboxesItems.map((item) => (
                    <Checkbox value={item.value} className="flex items-center">
                      {item.text}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-left font-bold">
            Have you been in contact with anyone who is suspected to have/ has
            been diagnosed with COVID-19 within the last 14 days?
          </label>
          <Controller
            name="contactedWithCovid19Suspects"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            )}
          />
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HealthDeclarePage;
