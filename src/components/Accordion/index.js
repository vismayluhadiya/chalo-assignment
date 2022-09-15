import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import IconArrowForwardIosSharp from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {},
    "&:before": {
      display: "none"
    }
  })
);

Accordion.Summary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<IconArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#F4F6FB",
  border: "none",
  borderRadius: theme.spacing(0.25),
  boxShadow: "0 0 0 1px #F4F6FB",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

Accordion.Details = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2)
  // borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

export default Accordion;
