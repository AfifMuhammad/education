import { Plate, type Value } from "@udecode/plate-common";
import { Editor } from "./plate-ui/editor";

interface Props {
  value: Value;
}
export default function PlateViewer({ value }: Props) {
  return (
    <Plate value={value} readOnly={true}>
      <Editor />
    </Plate>
  );
}
