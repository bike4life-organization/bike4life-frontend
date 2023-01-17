import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "1 route/week. Up to 2 per month",
      "With 5 users",
      "Up to 5 friends",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Basic",
    subheader: "Most popular",
    price: "2",
    description: [
      "2 routes/week. Up to 4 per month",
      "With 10 users",
      "Up to 20 friends",
      "Up to 2 places of interest",
      "Standard",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Advanced",
    price: "10",
    description: [
      "4 routes/week. Up to 16 per month",
      "With 20 users",
      "Up to 100 friends",
      "all places of interest",
      "Preference",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    price: "20",
    description: [
      "7 routes/week. Up to 31 per month",
      "With 100 users",
      "Unlimited Friends",
      "all places of interest",
      "Preference",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

function PricingContent() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ pt: 13, pb: 3 }}
      ></Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={8} md={3}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Basic" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme: any) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                      onClick={()=>navigate("/create-route")}
                      fullWidth
                      variant={tier.buttonVariant as 'outlined' | 'contained'}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
