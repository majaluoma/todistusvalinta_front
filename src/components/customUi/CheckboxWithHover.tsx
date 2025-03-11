import { Checkbox } from "../ui/checkbox";
import HoverInfo from "./HoverInfo";
import { CheckboxWithHoverProps } from "./types";

export default function CheckboxWithHover ({tooltip, value, onChange, label} : Readonly<CheckboxWithHoverProps>) {
    return (
        <HoverInfo text={tooltip}>
                    <div className="space-y-1 leading-none align-middle flex">
                        <Checkbox
                          className='mr-3 w-6 h-6'
                          checked={value}
                          defaultChecked
                          onCheckedChange={(e)=> {onChange(e.valueOf() === true)}}
                        />
                      {label && <p className='self-center'>{label}</p>}
                    </div>
        </HoverInfo>
    )
}