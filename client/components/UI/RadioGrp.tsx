import { Radio, RadioGroup, RadioGroupProps } from '@nextui-org/radio';

type Props = {
  radioGroupProps: RadioGroupProps;
  data: {
    value: string;
    label: string;
  }[];
};

const RadioGrp = (props: Props) => {
  return (
    <RadioGroup orientation='horizontal' {...props.radioGroupProps}>
      {props.data.map(item => (
        <Radio key={item.value} value={item.value}>
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default RadioGrp;
