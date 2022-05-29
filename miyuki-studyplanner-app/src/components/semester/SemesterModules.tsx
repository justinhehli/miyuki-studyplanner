import { useAppSelector } from "../../store";
import { selectModulesBySemesterId } from "../../store/semester/semester-slice-selectors";

const SemesterModules: React.FC<{ semesterId: string }> = (props) => {
  const modules = useAppSelector((state) => selectModulesBySemesterId(state, props.semesterId));
  console.log(modules)

  return null;
};

export default SemesterModules;
