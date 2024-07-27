import { getAllSubject } from "@/actions/subject/show";
import CardList from "@/components/card-list";

interface Props {
  search?: string;
}
const SubjectList = async ({ search }: Props) => {
  const subjects = await getAllSubject(search);

  if (subjects.length > 0) {
    return (
      <CardList
        list={subjects}
        id="id"
        name="name"
        icon="check"
        href="/admin/subject/[id]"
        background="image"
        description="description"
        title="Subject"
      />
    );
  } else {
    return <div>Data tidak ditemukan</div>;
  }
};

SubjectList.Skeleton = CardList.Skeleton;

export default SubjectList;
