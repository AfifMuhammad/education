import type { HeadingType } from "@/types";

interface Props {
  heading: HeadingType;
}
const Heading = ({ heading }: Props) => {
  return (
    <h2
      className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
      id={heading.id}
    >
      {heading.title}
    </h2>
  );
};

export default Heading;
