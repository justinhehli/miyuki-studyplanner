import Container from "@mui/material/Container";

export const tabA11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const TabPanel: React.FC<{ index: number; value: number; width?: string; containerPadding?: number }> = (props) => {
  const { children, value, index, width, containerPadding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: width }}
      {...other}
    >
      {value === index && <Container sx={{ p: containerPadding ?? 3 }}>{children}</Container>}
    </div>
  );
};

export default TabPanel;
