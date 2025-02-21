import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {




  function renderInputsByComponentType(config_wala_file) {
    const value = formData[config_wala_file.name] || "";

    switch (config_wala_file.componentType) {
      case "input":
        return (
          <Input
            name={config_wala_file.name}
            placeholder={config_wala_file.placeholder}
            id={config_wala_file.name}
            type={config_wala_file.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [config_wala_file.name]: event.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [config_wala_file.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={config_wala_file.label} />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {config_wala_file.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={config_wala_file.name}
            placeholder={config_wala_file.placeholder}
            id={config_wala_file.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [config_wala_file.name]: event.target.value,
              })
            }
          />
        );

      default:
        console.warn(
          `Unsupported componentType '${config_wala_file.componentType}', defaulting to input.`
        );
        return (
          <Input
            name={config_wala_file.name}
            placeholder={config_wala_file.placeholder}
            id={config_wala_file.name}
            type={config_wala_file.type || "text"}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [config_wala_file.name]: event.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button

        className="mt-2 w-full bg-black text-white"
      // disabled={isBtnDisabled}
      >

        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;


